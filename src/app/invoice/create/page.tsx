"use client";

import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { useRouter } from 'next/navigation';
import { useLiff } from '../../context/LiffProvider';

export default function CreateInvoice() {
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [hankoImageUrl, setHankoImageUrl] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const { liff, isLoggedIn, isInitialized, error } = useLiff();

  useEffect(() => {
    if (isInitialized && isLoggedIn && liff) {
      generateHankoImage();
    }
  }, [isInitialized, isLoggedIn]);

  const generateHankoImage = async () => {
    try {
      if (!liff) return;
      
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
    if (!liff || !isLoggedIn) {
      console.error('LIFFが初期化されていないか、ログインしていません');
      return;
    }

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

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isCreating || isRedirecting) return (
    <div className="loading-screen">
      <p className="loading-screen__text">作成中...</p>
    </div>
  );

  return (
    <div className="app">
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
            disabled={isCreating || isRedirecting || !isLoggedIn}
          >
            この内容で請求書を作成
          </button>
        </div>
      </main>
      <Navigation />
    </div>
  );
}