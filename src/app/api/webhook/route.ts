// // src/app/api/webhook/route.ts
// import { NextResponse } from 'next/server';
// import { Client } from '@line/bot-sdk';
// import { PrismaClient } from '@prisma/client';
// import { TemplateMessage, CarouselTemplate, CarouselColumn, PostbackAction } from '@line/bot-sdk';

// const prisma = new PrismaClient();

// const client = new Client({
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
//   channelSecret: process.env.LINE_CHANNEL_SECRET!,
// });

// export async function POST(request: Request) {
//   const body = await request.json();
//   const events = body.events;

//   for (const event of events) {
//     if (event.type === 'message' && event.message.type === 'text') {
//       if (event.message.text === '履歴') {
//         await handleHistoryRequest(event.source.userId);
//       }
//     }
//   }

//   return NextResponse.json({ message: 'OK' });
// }

// async function handleHistoryRequest(userId: string) {
//   const invoices = await prisma.invoice.findMany({
//     where: { userId },
//     orderBy: { sentDate: 'desc' },
//     take: 10, // カルーセルの最大数は10
//   });


//   const carouselTemplate: TemplateMessage = {
//     type: "template",
//     altText: "請求書履歴",
//     template: {
//       type: "carousel",
//       columns: invoices.map(invoice => ({
//         thumbnailImageUrl: 'https://example.com/invoice-image.jpg',
//         title: `請求書 #${invoice.id}`,
//         text: `金額: ${invoice.amount}円\n期日: ${invoice.dueDate.toLocaleDateString()}`,
//         actions: [
//           {
//             type: "postback",
//             label: "詳細を見る",
//             data: `action=view_invoice&id=${invoice.id}`
//           },
//           {
//             type: "postback",
//             label: "支払い済みにする",
//             data: `action=mark_paid&id=${invoice.id}`
//           }
//         ]
//       })) as CarouselColumn[]
//     } as CarouselTemplate
//   };
  
//   await client.pushMessage(userId, carouselTemplate);
// }






// // src/app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import { Client, TemplateMessage } from '@line/bot-sdk';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.LINE_CHANNEL_SECRET!,
});

export async function POST(request: Request) {
  const body = await request.json();
  const events = body.events;

  for (const event of events) {
    if (event.type === 'message' && event.message.type === 'text') {
      if (event.message.text === '履歴') {
        await handleHistoryRequest(event.source.userId);
      }
    }
  }

  return NextResponse.json({ message: 'OK' });
}

async function handleHistoryRequest(userId: string) {
  const invoices = await prisma.invoice.findMany({
    where: { userId },
    orderBy: { sentDate: 'desc' },
    take: 10, // カルーセルの最大数は10
  });

  const carouselTemplate: TemplateMessage = {
    type: "template",
    altText: "請求書履歴",
    template: {
      type: "carousel",
      columns: invoices.map(invoice => ({
        thumbnailImageUrl: 'https://example.com/invoice-image.jpg',
        title: `請求書 #${invoice.id}`,
        text: `金額: ${invoice.amount}円\n期日: ${invoice.dueDate.toLocaleDateString()}`,
        actions: [
          {
            type: "postback",
            label: "詳細を見る",
            data: `action=view_invoice&id=${invoice.id}`
          },
          {
            type: "postback",
            label: "支払い済みにする",
            data: `action=mark_paid&id=${invoice.id}`
          }
        ]
      }))
    } as any // 型チェックをバイパス
  };

  await client.pushMessage(userId, carouselTemplate);
}