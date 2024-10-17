//create
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { liffUserId } = await request.json();
        console.log('Received LIFF mapping request:', { liffUserId });
        
        let mapping = await prisma.userIdMapping.findFirst({
            where: {
                OR: [
                    { liffUserId: liffUserId },
                    { webhookUserId: liffUserId }
                ]
            },
        });

        if (mapping) {
            // 既存のマッピングを更新
            mapping = await prisma.userIdMapping.update({
                where: { id: mapping.id },
                data: { liffUserId: liffUserId },
            });
        } else {
            // 新規マッピングを作成
            mapping = await prisma.userIdMapping.create({
                data: {
                    liffUserId: liffUserId,
                    webhookUserId: '',
                },
            });
        }

        console.log('LIFF mapping result:', mapping);
        return NextResponse.json({ success: true, mapping });
    } catch (error) {
        console.error('Error in LIFF mapping:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to map user ID' }, 
            { status: 500 }
        );
    }
}