// import { NextResponse } from 'next/server';
// import { Client, WebhookEvent, MessageEvent, TextMessage, TemplateMessage } from '@line/bot-sdk';
// import { PrismaClient, Invoice } from '@prisma/client';

// // 環境変数の型定義
// declare global {
//     interface ProcessEnv {
//         LINE_CHANNEL_ACCESS_TOKEN: string;
//         LINE_CHANNEL_SECRET: string;
//         DATABASE_URL: string;
//     }
// }

// // グローバル変数の型拡張
// declare global {
//     // eslint-disable-next-line no-var
//     var prisma: PrismaClient | undefined;
// }

// // Prismaクライアントの初期化
// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient();
// } else {
//     if (!global.prisma) {
//         global.prisma = new PrismaClient();
//     }
//     prisma = global.prisma;
// }

// // LINEクライアントの初期化
// const channelAccessToken = process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN;
// const channelSecret = process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET;

// if (!channelAccessToken || !channelSecret) {
//     throw new Error('LINEの環境変数が設定されていません。');
// }

// const client = new Client({
//     channelAccessToken,
//     channelSecret,
// });

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const events: WebhookEvent[] = body.events;

//         await Promise.all(events.map(async (event: WebhookEvent) => {
//             if (event.type === 'message' && event.message.type === 'text') {
//                 const messageEvent = event as MessageEvent;
//                 const textMessage = messageEvent.message as TextMessage;
        
//                 // userId が存在するかどうか確認
//                 const userId = messageEvent.source.userId;
//                 console.log('User ID:', userId); 
//                 if (!userId) {
//                     console.error('User IDが存在しません。');
//                     return; // 処理を中断
//                 }
        
//                 if (textMessage.text === '履歴') {
//                     await handleHistoryRequest(userId);
//                 }
//             }
//         }));

//         return NextResponse.json({ message: 'OK' });
//     } catch (error) {
//         console.error('リクエスト処理中にエラーが発生しました:', error);
//         return NextResponse.json({ error: 'サーバー内部エラー' }, { status: 500 });
//     }
// }

// async function handleHistoryRequest(userId: string) {
//     try {
//         const invoices = await prisma.invoice.findMany({
//             where: { userId },
//             orderBy: { sentDate: 'desc' },
//             take: 10, // カルーセルの最大数は10
//         });

//         if (invoices.length === 0) {
//             await client.pushMessage(userId, { type: 'text', text: '請求書の履歴がありません。' });
//             return;
//         }

//         const carouselTemplate: TemplateMessage = {
//             type: 'template',
//             altText: '請求書履歴',
//             template: {
//                 type: 'carousel',
//                 columns: invoices.map((invoice: Invoice) => ({
//                     thumbnailImageUrl: 'https://example.com/invoice-image.jpg',
//                     title: `請求書 #${invoice.id}`,
//                     text: `金額: ${invoice.amount}円\n期日: ${invoice.dueDate.toLocaleDateString('ja-JP')}`,
//                     actions: [
//                         {
//                             type: 'postback',
//                             label: '詳細を見る',
//                             data: `action=view_invoice&id=${invoice.id}`
//                         },
//                         {
//                             type: 'postback',
//                             label: '支払い済みにする',
//                             data: `action=mark_paid&id=${invoice.id}`
//                         }
//                     ]
//                 }))
//             }
//         };

//         await client.pushMessage(userId, carouselTemplate);
//     } catch (error) {
//         console.error('履歴リクエスト処理中にエラーが発生しました:', error);
//         await client.pushMessage(userId, { type: 'text', text: '履歴の取得中にエラーが発生しました。しばらくしてからもう一度お試しください。' });
//     }
// }





import { NextResponse } from 'next/server';
import { Client, WebhookEvent, MessageEvent, TextMessage, TemplateMessage } from '@line/bot-sdk';
import { PrismaClient, Invoice } from '@prisma/client';

// 環境変数の型定義
declare global {
    interface ProcessEnv {
        LINE_CHANNEL_ACCESS_TOKEN: string;
        LINE_CHANNEL_SECRET: string;
        DATABASE_URL: string;
    }
}

// グローバル変数の型拡張
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// Prismaクライアントの初期化
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

// LINEクライアントの初期化
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
        
                // userId が存在するかどうか確認
                const userId = messageEvent.source.userId;
                console.log('User ID:', userId); 
                if (!userId) {
                    console.error('User IDが存在しません。');
                    return; // 処理を中断
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

// async function handleHistoryRequest(userId: string) {
//     try {
//         const mapping = await prisma.userIdMapping.findUnique({
//             where: { webhookUserId },
//           });
      
//         if (!mapping) {
//             await client.pushMessage(webhookUserId, { type: 'text', text: 'ユーザーIDのマッピングが見つかりません。LIFFアプリを再度開いてください。' });
//             return;
//         }
      
//         const invoices = await prisma.invoice.findMany({
//             where: { userId: mapping.liffUserId },
//             orderBy: { sentDate: 'desc' },
//             take: 10,
//         });

//         if (invoices.length === 0) {
//             await client.pushMessage(userId, { type: 'text', text: '請求書の履歴がありません。' });
//             return;
//         }

//         const carouselTemplate: TemplateMessage = {
//             type: 'template',
//             altText: '請求書履歴',
//             template: {
//                 type: 'carousel',
//                 columns: invoices.map((invoice: Invoice) => ({
//                     thumbnailImageUrl: 'https://example.com/invoice-image.jpg',
//                     title: `請求書 #${invoice.id}`,
//                     text: `金額: ${invoice.amount}円\n期日: ${invoice.dueDate.toLocaleDateString('ja-JP')}`,
//                     actions: [
//                         {
//                             type: 'postback',
//                             label: '詳細を見る',
//                             data: `action=view_invoice&id=${invoice.id}`
//                         },
//                         {
//                             type: 'postback',
//                             label: '支払い済みにする',
//                             data: `action=mark_paid&id=${invoice.id}`
//                         }
//                     ]
//                 }))
//             }
//         };

//         await client.pushMessage(userId, carouselTemplate);
//     } catch (error) {
//         console.error('履歴リクエスト処理中にエラーが発生しました:', error);
//         await client.pushMessage(webhookUserId, { type: 'text', text: '履歴の取得中にエラーが発生しました。しばらくしてからもう一度お試しください。' });
//     }
// }


async function handleHistoryRequest(userId: string) {
    try {
        const mapping = await prisma.userIdMapping.findUnique({
            where: { webhookUserId: userId }, // ここを修正
        });
      
        if (!mapping) {
            await client.pushMessage(userId, { type: 'text', text: 'ユーザーIDのマッピングが見つかりません。LIFFアプリを再度開いてください。' });
            return;
        }
      
        const invoices = await prisma.invoice.findMany({
            where: { userId: mapping.liffUserId },
            orderBy: { sentDate: 'desc' },
            take: 10,
        });

        if (invoices.length === 0) {
            await client.pushMessage(userId, { type: 'text', text: '請求書の履歴がありません。' });
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

        await client.pushMessage(userId, carouselTemplate);
    } catch (error) {
        console.error('履歴リクエスト処理中にエラーが発生しました:', error);
        await client.pushMessage(userId, { type: 'text', text: '履歴の取得中にエラーが発生しました。しばらくしてからもう一度お試しください。' });
    }
}
