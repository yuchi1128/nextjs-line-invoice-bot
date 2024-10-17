//create
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function POST(request: Request) {
//   try {
//     const { liffUserId, webhookUserId } = await request.json();
//     await prisma.userIdMapping.upsert({
//       where: { liffUserId },
//       update: { webhookUserId },
//       create: { liffUserId, webhookUserId },
//     });
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error('Error mapping user IDs:', error);
//     return NextResponse.json({ error: 'Failed to map user IDs' }, { status: 500 });
//   }
// }


// export async function POST(request: Request) {
//   try {
//     const { liffUserId } = await request.json();
//     console.log('Received mapping request:', { userId: liffUserId });
//     const result = await prisma.userIdMapping.upsert({
//       where: { userId: liffUserId },
//       update: {},
//       create: { userId: liffUserId },
//     });
//     console.log('Mapping result:', result);
//     return NextResponse.json({ success: true, result });
//   } catch (error) {
//     console.error('Error mapping user ID:', error);
//     return NextResponse.json({ error: 'Failed to map user ID' }, { status: 500 });
//   }
// }



export async function POST(request: Request) {
  try {
    const { liffUserId, webhookUserId } = await request.json();
    console.log('Received mapping request:', { liffUserId, webhookUserId });
    const result = await prisma.userIdMapping.upsert({
      where: { liffUserId: liffUserId },
      update: { webhookUserId: webhookUserId },
      create: { liffUserId: liffUserId, webhookUserId: webhookUserId },
    });
    console.log('Mapping result:', result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error mapping user ID:', error);
    return NextResponse.json({ error: 'Failed to map user ID' }, { status: 500 });
  }
}