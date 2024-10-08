//src/app/invoice/send/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import liff from '@line/liff';
import { useEffect, Suspense } from 'react';
import Header from '../../components/Header';
import { useRouter } from 'next/navigation';
import Navigation from '@/app/components/Navigation';

function PreviewContent() {
  const searchParams = useSearchParams();
  const invoiceImageUrl = searchParams.get('invoiceImageUrl');
  const router = useRouter();

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    if (!liffId) {
      console.error('LIFF IDが見つかりません');
      return;
    }

    liff.init({ liffId }).catch((error) => {
      console.log('LIFF初期化に失敗しました', error);
    });
  }, []);

  const handleSendToFriend = () => {
    if (!invoiceImageUrl) {
      console.error('請求書の画像URLが見つかりません');
      return;
    }
  
    liff.shareTargetPicker([
      {
        type: "text",
        text: "下記の内容にて請求書をお送りいたしますので、ご確認ください。",
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
  };  

  const handleBackToCreate = () => {
    router.push('/invoice/create');
  };

  return (
    <div className="app">
      <Header />
      <div className="invoice-heading">この請求書が相手に送信されます</div>
      <div className="preview-container">
        <div className="invoice-caption">完成した請求書:</div>
        <div className="invoice-box">
          <img src={invoiceImageUrl || ''} alt="Invoice Preview" className="invoice-image" />
        </div>
        <div className="invoice-button-container">
          <button onClick={handleBackToCreate} className="back-button">作成画面に戻る</button>
          <button onClick={handleSendToFriend} className="send-button">友達に送信</button>
        </div>
      </div>
      <Navigation />
    </div>
  );  
}

export default function Preview() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PreviewContent />
    </Suspense>
  );
}