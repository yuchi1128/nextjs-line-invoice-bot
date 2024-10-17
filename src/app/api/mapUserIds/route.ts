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



// export async function POST(request: Request) {
//   try {
//     const { liffUserId, webhookUserId } = await request.json();
//     console.log('Received mapping request:', { liffUserId, webhookUserId });
//     const result = await prisma.userIdMapping.upsert({
//       where: { liffUserId: liffUserId },
//       update: { webhookUserId: webhookUserId },
//       create: { liffUserId: liffUserId, webhookUserId: webhookUserId },
//     });
//     console.log('Mapping result:', result);
//     return NextResponse.json({ success: true, result });
//   } catch (error) {
//     console.error('Error mapping user ID:', error);
//     return NextResponse.json({ error: 'Failed to map user ID' }, { status: 500 });
//   }
// }



// export async function POST(request: Request) {
//   try {
//     const { liffUserId } = await request.json();
//     console.log('Received mapping request:', { liffUserId });
//     const result = await prisma.userIdMapping.upsert({
//       where: { liffUserId: liffUserId },
//       update: {},
//       create: { liffUserId: liffUserId, webhookUserId: '' },
//     });
//     console.log('Mapping result:', result);
//     return NextResponse.json({ success: true, result });
//   } catch (error) {
//     console.error('Error mapping user ID:', error);
//     return NextResponse.json({ error: 'Failed to map user ID' }, { status: 500 });
//   }
// }








// // app/api/mapUserIds/route.ts
// export async function POST(request: Request) {
//   try {
//       const { liffUserId } = await request.json();
//       console.log('Received LIFF mapping request:', { liffUserId });
      
//       // LIFF IDでマッピングを検索
//       let mapping = await prisma.userIdMapping.findUnique({
//           where: { liffUserId: liffUserId },
//       });

//       if (!mapping) {
//           // webhookUserIdで検索
//           mapping = await prisma.userIdMapping.findFirst({
//               where: { webhookUserId: liffUserId },
//           });

//           if (mapping) {
//               // 既存のマッピングを更新
//               mapping = await prisma.userIdMapping.update({
//                   where: { id: mapping.id },
//                   data: { liffUserId: liffUserId },
//               });
//           } else {
//               // 新規マッピングを作成
//               mapping = await prisma.userIdMapping.create({
//                   data: {
//                       liffUserId: liffUserId,
//                       webhookUserId: '',
//                   },
//               });
//           }
//       }

//       return NextResponse.json({ success: true, mapping });
//   } catch (error) {
//       console.error('Error in LIFF mapping:', error);
//       return NextResponse.json({ error: 'Failed to map user ID' }, { status: 500 });
//   }
// }












// app/api/mapUserIds/route.ts
export async function POST(request: Request) {
    try {
        const { liffUserId } = await request.json();
        console.log('Received LIFF mapping request:', { liffUserId });
        
        // まずliffUserIdで検索
        let mapping = await prisma.userIdMapping.findUnique({
            where: { liffUserId: liffUserId },
        });

        if (!mapping) {
            // 未使用のwebhookUserIdマッピングを探す
            mapping = await prisma.userIdMapping.findFirst({
                where: {
                    AND: [
                        { liffUserId: '' },
                        { webhookUserId: { not: '' } }
                    ]
                }
            });

            if (mapping) {
                // 既存のマッピングを更新
                mapping = await prisma.userIdMapping.update({
                    where: { id: mapping.id },
                    data: { liffUserId: liffUserId },
                });
                console.log('Updated existing mapping with LIFF ID:', mapping);
            } else {
                // 新規マッピングを作成
                mapping = await prisma.userIdMapping.create({
                    data: {
                        liffUserId: liffUserId,
                        webhookUserId: '',
                    },
                });
                console.log('Created new mapping with LIFF ID:', mapping);
            }
        }

        return NextResponse.json({ success: true, mapping });
    } catch (error) {
        console.error('Error in LIFF mapping:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to map user ID' }, 
            { status: 500 }
        );
    }
}