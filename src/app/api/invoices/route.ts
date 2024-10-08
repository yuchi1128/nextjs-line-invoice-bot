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

// export async function POST(request: Request) {
//   const body = await request.json();
//   const invoice = await prisma.invoice.create({ data: body });
//   return NextResponse.json(invoice);
// }

export async function POST(request: Request) {
    try {
      const body = await request.json();
      
      // バリデーションを追加
      if (!body.recipient) {
        return NextResponse.json({ error: 'Recipient is required' }, { status: 400 });
      }
      
      const invoice = await prisma.invoice.create({ 
        data: {
          userId: body.userId,
          recipient: body.recipient,
          amount: body.amount,
          dueDate: body.dueDate ? new Date(body.dueDate) : new Date(),
          message: body.message || '',
        } 
      });
      
      return NextResponse.json(invoice);
    } catch (error) {
      console.error('Error creating invoice:', error);
      return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
}