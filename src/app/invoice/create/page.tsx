// "use client";

// import { useState, useEffect } from 'react';
// import liff from '@line/liff';
// import Header from '../../components/Header';
// import Navigation from '../../components/Navigation';
// import { useRouter } from 'next/navigation';

// export default function CreateInvoice() {
//   const [amount, setAmount] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [message, setMessage] = useState('');
//   const [recipient, setRecipient] = useState('');
//   const [hankoImageUrl, setHankoImageUrl] = useState('');
//   const [isCreating, setIsCreating] = useState(false);
//   const [isRedirecting, setIsRedirecting] = useState(false);
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
//         if (liff.isLoggedIn()) {
//           generateHankoImage();
//         } else {
//           liff.login();
//         }
//       })
//       .catch((error) => {
//         console.log('LIFF初期化に失敗しました', error);
//       });
//   }, []);

//   const generateHankoImage = async () => {
//     try {
//       const idToken = liff.getDecodedIDToken();
//       const profileImageUrl = idToken?.picture ?? '';
//       const response = await fetch('https://nextjs-line-invoice-bot.vercel.app/api/hanko', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ profileImageUrl }),
//       });
//       const data = await response.json();
//       setHankoImageUrl(data.imageUrl);
//     } catch (error) {
//       console.error('ハンコ画像の生成に失敗しました:', error);
//     }
//   };

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   async function handleCreateInvoice() {
//     if (!amount || !dueDate || !message || !recipient) {
//       alert('金額、支払い期限、メッセージ、送り先を入力してください');
//       return;
//     }

//     setIsCreating(true);

//     const issueDate = getCurrentDate();
//     const invoiceImageUrl = `https://nextjs-line-invoice-bot.vercel.app/api/og/invoice?amount=${amount}&dueDate=${dueDate}&issueDate=${issueDate}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(recipient)}&hankoImage=${encodeURIComponent(hankoImageUrl)}`;

//     try {
//       const profile = await liff.getProfile();
//       const invoiceData = {
//         userId: profile.userId,
//         recipient: recipient,
//         amount: parseInt(amount),
//         dueDate: new Date(dueDate),
//         message: message,
//       };

//       const response = await fetch('/api/invoices', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(invoiceData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create invoice');
//       }

//       setIsRedirecting(true);
//       router.push(`/invoice/send?invoiceImageUrl=${encodeURIComponent(invoiceImageUrl)}`);
//     } catch (error) {
//       console.error('Failed to create invoice:', error);
//       alert('請求書の作成に失敗しました。もう一度お試しください。');
//       setIsCreating(false);
//       setIsRedirecting(false);
//     }
//   }

//   if (isCreating || isRedirecting) return (
//     <div className="loading-screen">
//       <p className="loading-screen__text">作成中...</p>
//     </div>
//   );

//   return (
//     <div className="app">
//       <Header />
//       <main className="main-content">
//         <div className="home__input">
//           <h1>請求書の作成</h1>
//           <label htmlFor="recipient">送り先:</label>
//           <input
//             type="text"
//             id="recipient"
//             placeholder="送る相手の名前を入力してください"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//           />
//           <label htmlFor="amount">金額:</label>
//           <input
//             type="number"
//             id="amount"
//             placeholder="金額を入力してください"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <label htmlFor="due_date">支払い期限:</label>
//           <input
//             type="date"
//             id="due_date"
//             placeholder="期日を入力してください"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//           />
//           <label htmlFor="message">メッセージ:</label>
//           <textarea
//             id="message"
//             placeholder="メッセージを入力してください"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button 
//             className="create-invoice-button" 
//             onClick={handleCreateInvoice}
//             disabled={isCreating || isRedirecting}
//           >
//             この内容で請求書を作成
//           </button>
//         </div>
//       </main>
//       <Navigation />
//     </div>
//   );
// }





//add
"use client";

import { useState, useEffect } from 'react';
import liff from '@line/liff';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import { useRouter } from 'next/navigation';

export default function CreateInvoice() {
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [hankoImageUrl, setHankoImageUrl] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  //   if (!liffId) {
  //     console.error('LIFF IDが見つかりません');
  //     return;
  //   }

  //   liff
  //     .init({ liffId })
  //     .then(() => {
  //       if (liff.isLoggedIn()) {
  //         generateHankoImage();
  //       } else {
  //         liff.login();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('LIFF初期化に失敗しました', error);
  //     });
  // }, []);

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID as string; // 型アサーションでstring型を明示

    if (!liffId) {
      console.error('LIFF IDが見つかりません');
      return;
    }
  
    async function initializeLiff() {
      try {
        await liff.init({ liffId });
        if (liff.isLoggedIn()) {
          await mapUserIds(); // ここで mapUserIds を呼び出す
          generateHankoImage();
        } else {
          liff.login();
        }
      } catch (error) {
        console.log('LIFF初期化に失敗しました', error);
      }
    }
  
    // async function mapUserIds() {
    //   const liffProfile = await liff.getProfile();
    //   const userId = liffProfile.userId;
    //   console.log('LIFF User ID:', userId);
    
    //   if (userId) {
    //     try {
    //       const response = await fetch('/api/mapUserIds', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ liffUserId: userId, webhookUserId: userId }),
    //       });
    //       const result = await response.json();
    //       console.log('Mapping result:', result);
    //     } catch (error) {
    //       console.error('Failed to map user IDs:', error);
    //     }
    //   }
    // }

    async function mapUserIds() {
      const liffProfile = await liff.getProfile();
      const liffUserId = liffProfile.userId;
      console.log('LIFF User ID:', liffUserId);
    
      if (liffUserId) {
        try {
          const response = await fetch('/api/mapUserIds', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ liffUserId: liffUserId }),
          });
          const result = await response.json();
          console.log('Mapping result:', result);
        } catch (error) {
          console.error('Failed to map user ID:', error);
        }
      }
    }
  
    initializeLiff();
  }, []);

  const generateHankoImage = async () => {
    try {
      const idToken = liff.getDecodedIDToken();
      const profileImageUrl = idToken?.picture ?? '';
      const response = await fetch('https://nextjs-line-invoice-bot.vercel.app/api/hanko', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileImageUrl }),
      });
      const data = await response.json();
      setHankoImageUrl(data.imageUrl);
    } catch (error) {
      console.error('ハンコ画像の生成に失敗しました:', error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  async function handleCreateInvoice() {
    if (!amount || !dueDate || !message || !recipient) {
      alert('金額、支払い期限、メッセージ、送り先を入力してください');
      return;
    }

    setIsCreating(true);

    const issueDate = getCurrentDate();
    const invoiceImageUrl = `https://nextjs-line-invoice-bot.vercel.app/api/og/invoice?amount=${amount}&dueDate=${dueDate}&issueDate=${issueDate}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(recipient)}&hankoImage=${encodeURIComponent(hankoImageUrl)}`;

    try {
      const profile = await liff.getProfile();
      const invoiceData = {
        userId: profile.userId,
        recipient: recipient,
        amount: parseInt(amount),
        dueDate: new Date(dueDate),
        message: message,
      };

      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }

      setIsRedirecting(true);
      router.push(`/invoice/send?invoiceImageUrl=${encodeURIComponent(invoiceImageUrl)}`);
    } catch (error) {
      console.error('Failed to create invoice:', error);
      alert('請求書の作成に失敗しました。もう一度お試しください。');
      setIsCreating(false);
      setIsRedirecting(false);
    }
  }

  if (isCreating || isRedirecting) return (
    <div className="loading-screen">
      <p className="loading-screen__text">作成中...</p>
    </div>
  );

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="home__input">
          <h1>請求書の作成</h1>
          <label htmlFor="recipient">送り先:</label>
          <input
            type="text"
            id="recipient"
            placeholder="送る相手の名前を入力してください"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <label htmlFor="amount">金額:</label>
          <input
            type="number"
            id="amount"
            placeholder="金額を入力してください"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="due_date">支払い期限:</label>
          <input
            type="date"
            id="due_date"
            placeholder="期日を入力してください"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <label htmlFor="message">メッセージ:</label>
          <textarea
            id="message"
            placeholder="メッセージを入力してください"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            className="create-invoice-button" 
            onClick={handleCreateInvoice}
            disabled={isCreating || isRedirecting}
          >
            この内容で請求書を作成
          </button>
        </div>
      </main>
      <Navigation />
    </div>
  );
}