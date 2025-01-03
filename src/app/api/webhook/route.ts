import { NextResponse } from 'next/server';
import { Client, WebhookEvent, MessageEvent, TextMessage, TemplateMessage } from '@line/bot-sdk';
import { PrismaClient, Invoice } from '@prisma/client';

declare global {
    interface ProcessEnv {
        LINE_CHANNEL_ACCESS_TOKEN: string;
        LINE_CHANNEL_SECRET: string;
        DATABASE_URL: string;
    }
}

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

const channelAccessToken = process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN;
const channelSecret = process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET;

if (!channelAccessToken || !channelSecret) {
    throw new Error('LINEの環境変数が設定されていません。');
}

const client = new Client({
    channelAccessToken,
    channelSecret,
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const events: WebhookEvent[] = body.events;

        await Promise.all(events.map(async (event: WebhookEvent) => {
            if (event.type === 'message' && event.message.type === 'text') {
                const messageEvent = event as MessageEvent;
                const textMessage = messageEvent.message as TextMessage;
        
                const userId = messageEvent.source.userId;
                console.log('Webhook received userId:', userId);
                if (!userId) {
                    console.error('User IDが存在しません。');
                    return;
                }
        
                if (textMessage.text === '履歴') {
                    await handleHistoryRequest(userId);
                }
            }
        }));

        return NextResponse.json({ message: 'OK' });
    } catch (error) {
        console.error('リクエスト処理中にエラーが発生しました:', error);
        return NextResponse.json({ error: 'サーバー内部エラー' }, { status: 500 });
    }
}

async function handleWebhookMapping(webhookUserId: string) {
    try {
        console.log('Handling webhook mapping for userId:', webhookUserId);
        
        // webhookUserIdまたはliffUserIdでマッピングを検索
        let mapping = await prisma.userIdMapping.findFirst({
            where: {
                OR: [
                    { webhookUserId: webhookUserId },
                    { liffUserId: webhookUserId }
                ]
            },
        });

        if (mapping) {
            // マッピングが見つかった場合、webhookUserIdを更新
            if (mapping.webhookUserId !== webhookUserId) {
                mapping = await prisma.userIdMapping.update({
                    where: { id: mapping.id },
                    data: { webhookUserId: webhookUserId },
                });
            }
        } else {
            // マッピングが見つからない場合、新規作成
            mapping = await prisma.userIdMapping.create({
                data: {
                    liffUserId: '',
                    webhookUserId: webhookUserId,
                },
            });
        }

        console.log('Webhook mapping result:', mapping);
        return mapping;
    } catch (error) {
        console.error('Error in webhook mapping:', error);
        throw error;
    }
}

async function handleHistoryRequest(webhookUserId: string) {
    try {
        console.log('Handling history request for webhookUserId:', webhookUserId);
        const mapping = await handleWebhookMapping(webhookUserId);
        
        if (!mapping) {
            console.log('No mapping found for webhookUserId:', webhookUserId);
            await client.pushMessage(webhookUserId, { 
                type: 'text', 
                text: 'ユーザー情報の同期が必要です。LIFFアプリを開いて同期を行ってください。' 
            });
            return;
        }

        console.log('Found mapping:', mapping);
        const userIds = [mapping.webhookUserId, mapping.liffUserId].filter(id => id !== '');
        console.log('Searching for invoices with userIds:', userIds);

        const invoices = await prisma.invoice.findMany({
            where: { 
                userId: {
                    in: userIds
                }
            },
            orderBy: { sentDate: 'desc' },
            take: 10,
        });

        console.log('Found invoices:', invoices);

        if (invoices.length === 0) {
            await client.pushMessage(webhookUserId, { type: 'text', text: '請求書の履歴がありません。' });
            return;
        }

        const carouselTemplate: TemplateMessage = {
            type: 'template',
            altText: '請求書履歴',
            template: {
                type: 'carousel',
                columns: invoices.map((invoice: Invoice) => ({
                    thumbnailImageUrl: 'https://example.com/invoice-image.jpg',
                    title: `請求書 #${invoice.id}`,
                    text: `金額: ${invoice.amount}円\n期日: ${invoice.dueDate.toLocaleDateString('ja-JP')}`,
                    actions: [
                        {
                            type: 'postback',
                            label: '詳細を見る',
                            data: `action=view_invoice&id=${invoice.id}`
                        },
                        {
                            type: 'postback',
                            label: '支払い済みにする',
                            data: `action=mark_paid&id=${invoice.id}`
                        }
                    ]
                }))
            }
        };

        await client.pushMessage(webhookUserId, carouselTemplate);
    } catch (error) {
        console.error('履歴リクエスト処理中にエラーが発生しました:', error);
        await client.pushMessage(webhookUserId, { type: 'text', text: 'エラーが発生しました。しばらくしてからもう一度お試しください。' });
    }
}