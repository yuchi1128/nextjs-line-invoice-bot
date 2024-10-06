"use client";

import { useSearchParams } from 'next/navigation';
import liff from '@line/liff';
import { useEffect, Suspense } from 'react';
import Header from '../../components/Header';

function PreviewContent() {
  const searchParams = useSearchParams();
  const invoiceImageUrl = searchParams.get('invoiceImageUrl');

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

  return (
    <div className="app">
      <Header />
      <div className="preview-container">
        <img src={invoiceImageUrl || ''} alt="Invoice Preview" className="invoice-image" />
        <button onClick={handleSendToFriend} className="send-button">友達に送信</button>
      </div>
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