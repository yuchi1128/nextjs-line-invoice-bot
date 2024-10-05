"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import liff from '@line/liff';

export default function CreateInvoice() {
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [hankoImageUrl, setHankoImageUrl] = useState('');
  const router = useRouter();


  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

    if (!liffId) {
      console.error('LIFF ID is missing');
      return;
    }

    liff
      .init({ liffId })
      .then(() => {
        if (liff.isLoggedIn()) {
          const idToken = liff.getDecodedIDToken();
          generateHankoImage(idToken?.picture ?? '');
        } else {
          router.push('/');
        }
      })
      .catch((error) => {
        console.log('LIFF initialization failed', error);
      });
  }, []);

  const generateHankoImage = async (profileImageUrl: string) => {
    try {
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
      console.error('Failed to generate hanko image:', error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  function handleCreateInvoice() {
    if (!amount || !dueDate || !message || !recipient) {
      alert('金額、支払い期限、メッセージ、送り先を入力してください');
      return;
    }

    const issueDate = getCurrentDate();

    const invoiceImageUrl = `https://nextjs-line-invoice-bot.vercel.app/api/og/invoice?amount=${amount}&dueDate=${dueDate}&issueDate=${issueDate}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(recipient)}&hankoImage=${encodeURIComponent(hankoImageUrl)}`;

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
  }

  return (
    <div className="create-invoice">
      <h1>請求書の作成</h1>
      <div className="create-invoice__form">
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
        <button className="create-invoice__button button--primary" onClick={handleCreateInvoice}>
          請求書作成
        </button>
      </div>
    </div>
  );
}