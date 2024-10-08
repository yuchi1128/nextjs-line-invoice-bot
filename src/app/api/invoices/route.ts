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
//     try {
//       const body = await request.json();
      
//       // バリデーションを追加
//       if (!body.recipient) {
//         return NextResponse.json({ error: 'Recipient is required' }, { status: 400 });
//       }
      
//       const invoice = await prisma.invoice.create({ 
//         data: {
//           userId: body.userId,
//           recipient: body.recipient,
//           amount: body.amount,
//           dueDate: body.dueDate ? new Date(body.dueDate) : new Date(),
//           message: body.message || '',
//         } 
//       });
      
//       return NextResponse.json(invoice);
//     } catch (error) {
//       console.error('Error creating invoice:', error);
//       return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
//     }
// }

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Received invoice data:', body);

        // Validate required fields
        if (!body.userId) {
            return NextResponse.json({ error: 'userId is required' }, { status: 400 });
        }
        if (!body.recipient) {
            return NextResponse.json({ error: 'recipient is required' }, { status: 400 });
        }
        if (typeof body.amount !== 'number' || isNaN(body.amount)) {
            return NextResponse.json({ error: 'amount must be a valid number' }, { status: 400 });
        }
        if (!body.dueDate || isNaN(Date.parse(body.dueDate))) {
            return NextResponse.json({ error: 'dueDate must be a valid date' }, { status: 400 });
        }
        if (typeof body.message !== 'string') {
            return NextResponse.json({ error: 'message must be a string' }, { status: 400 });
        }

        const invoice = await prisma.invoice.create({
            data: {
                userId: body.userId,
                recipient: body.recipient,
                amount: body.amount,
                dueDate: new Date(body.dueDate),
                message: body.message,
                // sentDate and isPaid will use default values
            }
        });

        return NextResponse.json(invoice);
    } catch (error) {
        console.error('Error creating invoice:', error);
        return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
}