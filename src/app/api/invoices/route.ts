import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'ユーザーIDが必要です' }, { status: 400 });
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId },
    orderBy: { sentDate: 'desc' },
  });

  return NextResponse.json(invoices);
}

export async function POST(request: Request) {
  const body = await request.json();
  const invoice = await prisma.invoice.create({ data: body });
  return NextResponse.json(invoice);
}