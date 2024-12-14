import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@line/bot-sdk';

const client = new Client({
  channelAccessToken: process.env.NEXT_PUBLIC_LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET!
});

export async function POST(request: NextRequest) {
  try {
    const { invoiceImageUrl } = await request.json();
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const accessToken = authHeader.split(' ')[1];
    const profileResponse = await fetch('https://api.line.me/v2/profile', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!profileResponse.ok) {
      throw new Error('プロフィール取得に失敗しました');
    }

    const profile = await profileResponse.json();

    await client.pushMessage(profile.userId, [
      {
        type: "text",
        text: "下記の内容にて請求書をお送りいたしますので、ご確認く��さい。",
      },
      {
        type: "image",
        originalContentUrl: invoiceImageUrl,
        previewImageUrl: invoiceImageUrl,
      },
      {
        type: 'text',
        text: `このメッセージは請求書送信BOTから送信されています。\nhttps://lin.ee/qeZlCxi`,
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('共有処理エラー:', error);
    return NextResponse.json(
      { error: '共有処理に失敗しました' },
      { status: 500 }
    );
  }
} 