// "use client";

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Image from 'next/image';
// import liff from '@line/liff';
// import Header from '../../components/Header';
// import Navigation from '../../components/Navigation';

// export default function PreviewInvoice() {
//   const [invoiceImageUrl, setInvoiceImageUrl] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     if (router.isReady) {
//       const { amount, dueDate, issueDate, message, recipient, hankoImageUrl } = router.query;

//       // 型を適切に処理する関数
//       const ensureString = (value: string | string[] | undefined): string => {
//         if (Array.isArray(value)) return value[0] || '';
//         return value || '';
//       };

//       const url = `https://nextjs-line-invoice-bot.vercel.app/api/og/invoice?amount=${ensureString(amount)}&dueDate=${ensureString(dueDate)}&issueDate=${ensureString(issueDate)}&message=${encodeURIComponent(ensureString(message))}&recipient=${encodeURIComponent(ensureString(recipient))}&hankoImage=${encodeURIComponent(ensureString(hankoImageUrl))}`;
//       setInvoiceImageUrl(url);
//     }
//   }, [router.isReady, router.query]);

//   const handleSendInvoice = () => {
//     liff.shareTargetPicker([
//       {
//         type: "text",
//         text: "下記の内容にて請求書をお送りいたしますので、ご確認ください。",
//       },
//       {
//         type: "image",
//         originalContentUrl: invoiceImageUrl,
//         previewImageUrl: invoiceImageUrl,
//       },
//       {
//         type: 'text',
//         text: 'このメッセージは請求書送信BOTから送信されています。\nhttps://lin.ee/qeZlCxi',
//       },
//     ]);
//   };

//   return (
//     <div className="app">
//       <Header />
//       <main className="main-content">
//         <h1>請求書プレビュー</h1>
//         <div className="preview-container">
//           {invoiceImageUrl && (
//             <Image
//               src={invoiceImageUrl}
//               alt="請求書プレビュー"
//               width={500}
//               height={700}
//               layout="responsive"
//             />
//           )}
//         </div>
//         <button className="send-invoice-button" onClick={handleSendInvoice}>
//           友達に送信
//         </button>
//       </main>
//       <Navigation />
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import liff from '@line/liff';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

export default function SendInvoice() {
  const [invoiceImageUrl, setInvoiceImageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const amount = searchParams.get('amount') || '';
      const dueDate = searchParams.get('dueDate') || '';
      const issueDate = searchParams.get('issueDate') || '';
      const message = searchParams.get('message') || '';
      const recipient = searchParams.get('recipient') || '';
      const hankoImageUrl = searchParams.get('hankoImageUrl') || '';

      const url = `https://nextjs-line-invoice-bot.vercel.app/api/og/invoice?amount=${amount}&dueDate=${dueDate}&issueDate=${issueDate}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(recipient)}&hankoImage=${encodeURIComponent(hankoImageUrl)}`;
      setInvoiceImageUrl(url);
    }
  }, []);

  const handleSendInvoice = () => {
    if (typeof window !== 'undefined' && liff) {
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
          text: 'このメッセージは請求書送信BOTから送信されています。\nhttps://lin.ee/qeZlCxi',
        },
      ]);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h1>請求書プレビュー</h1>
        <div className="preview-container">
          {invoiceImageUrl && (
            <Image
              src={invoiceImageUrl}
              alt="請求書プレビュー"
              width={500}
              height={700}
              layout="responsive"
            />
          )}
        </div>
        <button className="send-invoice-button" onClick={handleSendInvoice}>
          友達に送信
        </button>
      </main>
      <Navigation />
    </div>
  );
}