"use client";

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Navigation from '@/app/components/Navigation';
import { useLiff } from '@/app/context/LiffProvider';
import Header from '@/app/components/Header';
function PreviewContent() {
  const searchParams = useSearchParams();
  const invoiceImageUrl = searchParams.get('invoiceImageUrl');
  const router = useRouter();
  const { liff, isInitialized, error } = useLiff();

  const handleSendToFriend = async () => {
    if (!liff || !invoiceImageUrl) {
      console.error('LIFFが初期化されていないか、請求書の画像URLが見つかりません');
      return;
    }
  
    try {
      await liff.shareTargetPicker([
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
    } catch (error) {
      console.error('共有の処理に失敗しました:', error);
      alert('送信に失敗しました。もう一度お試しください。');
    }
  };  

  // const searchParams = useSearchParams();
  // const invoiceImageUrl = searchParams.get('invoiceImageUrl');
  // const router = useRouter();
  // const { isInitialized, error, getAccessToken } = useLiff();

  // const handleSendToFriend = async () => {
  //   if (!invoiceImageUrl) {
  //     console.error('請求書の画像URLが見つかりません');
  //     return;
  //   }

  //   const accessToken = getAccessToken();
  //   if (!accessToken) {
  //     console.error('アクセストークンが取得できません');
  //     return;
  //   }
  
  //   try {
  //     const response = await fetch('/api/line/share', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${accessToken}`
  //       },
  //       body: JSON.stringify({
  //         invoiceImageUrl,
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error('共有の処理に失敗しました');
  //     }
  //   } catch (error) {
  //     console.error('共有の処理に失敗しました:', error);
  //     alert('送信に失敗しました。もう一度お試しください。');
  //   }
  // };  

  const handleBackToCreate = () => {
    router.push('/invoice/create');
  };

  if (!isInitialized) {
    return (
      <div className="loading-screen">
        <p className="loading-screen__text">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <p className="error-screen__text">エラーが発生しました: {error.message}</p>
      </div>
    );
  }

  if (!invoiceImageUrl) {
    return (
      <div className="loading-screen">
        <p className="loading-screen__text">作成中...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="invoice-heading">この請求書が相手に送信されます</div>
      <div className="preview-container">
        <div className="invoice-caption">完成した請求書:</div>
        <div className="invoice-box">
          <img src={invoiceImageUrl} alt="Invoice Preview" className="invoice-image" />
        </div>
        <div className="invoice-button-container">
          <button onClick={handleBackToCreate} className="back-button">
            作成画面に戻る
          </button>
          <button 
            onClick={handleSendToFriend} 
            className="send-button"
            disabled={!isInitialized}
          >
            友達に送信
          </button>
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