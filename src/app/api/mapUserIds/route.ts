//create
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { liffUserId, webhookUserId } = await request.json();
    await prisma.userIdMapping.upsert({
      where: { liffUserId },
      update: { webhookUserId },
      create: { liffUserId, webhookUserId },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error mapping user IDs:', error);
    return NextResponse.json({ error: 'Failed to map user IDs' }, { status: 500 });
  }
}