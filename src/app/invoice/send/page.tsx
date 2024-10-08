//src/app/invoice/send/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import liff from '@line/liff';
import { useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
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


















// "use client";

// import { useState, useEffect, Suspense} from 'react';
// import { useSearchParams } from 'next/navigation';
// import liff from '@line/liff';
// import Header from '../../components/Header';
// import Navigation from '../../components/Navigation';
// import { useRouter } from 'next/navigation';

// function SendInvoice() {
//   const [invoiceImageUrl, setInvoiceImageUrl] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

//     if (!liffId) {
//       console.error('LIFF IDが見つかりません');
//       return;
//     }

//     liff
//       .init({ liffId })
//       .then(() => {
//         if (!liff.isLoggedIn()) {
//           liff.login();
//         }
//       })
//       .catch((error) => {
//         console.log('LIFF初期化に失敗しました', error);
//       });

//     const url = searchParams.get('invoiceImageUrl');
//     if (url) {
//       setInvoiceImageUrl(url);
//     }
//   }, [searchParams]);

//   const handleSendToFriend = async () => {
//     if (!invoiceImageUrl) {
//       console.error('請求書の画像URLが見つかりません');
//       return;
//     }
  
//     try {
//       await liff.shareTargetPicker([
//         {
//           type: "text",
//           text: "下記の内容にて請求書をお送りいたしますので、ご確認ください。",
//         },
//         {
//           type: "image",
//           originalContentUrl: invoiceImageUrl, 
//           previewImageUrl: invoiceImageUrl,
//         },
//         {
//           type: 'text',
//           text: `このメッセージは請求書送信BOTから送信されています。\nhttps://lin.ee/qeZlCxi`,
//         },
//       ]);

//       // データベースに保存
//       const profile = await liff.getProfile();
//       const invoiceData = {
//         userId: profile.userId,
//         recipient: searchParams.get('recipient') || '',
//         amount: parseInt(searchParams.get('amount') || '0'),
//         dueDate: searchParams.get('dueDate') ? new Date(searchParams.get('dueDate')!) : new Date(),
//         message: searchParams.get('message') || '',
//       };

//       const response = await fetch('/api/invoices', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(invoiceData),
//       });

//       if (!response.ok) {
//         throw new Error('請求書の保存に失敗しました');
//       }

//       console.log('請求書が正常に送信され、保存されました');
//     } catch (error) {
//       console.error('請求書の送信または保存に失敗しました', error);
//     }
//   };  

//   const handleBackToCreate = () => {
//     router.push('/invoice/create');
//   };

//   return (
//     <div className="app">
//       <Header />
//       <div className="invoice-heading">この請求書が相手に送信されます</div>
//       <div className="preview-container">
//         <div className="invoice-caption">完成した請求書:</div>
//         <div className="invoice-box">
//           <img src={invoiceImageUrl || ''} alt="Invoice Preview" className="invoice-image" />
//         </div>
//         <div className="invoice-button-container">
//           <button onClick={handleBackToCreate} className="back-button">作成画面に戻る</button>
//           <button onClick={handleSendToFriend} className="send-button">友達に送信</button>
//         </div>
//       </div>
//       <Navigation />
//     </div>
//   );
// }


// export default function Preview() {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <SendInvoice />
//     </Suspense>
//   );
// }