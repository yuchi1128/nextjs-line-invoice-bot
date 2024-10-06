"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import liff from '@line/liff';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';

export default function CreateInvoice() {
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [hankoImageUrl, setHankoImageUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return; // サーバーサイドでの実行を防ぐ

    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

    if (!liffId) {
      console.error('LIFF IDが見つかりません');
      return;
    }

    liff
      .init({ liffId })
      .then(() => {
        if (liff.isLoggedIn()) {
          generateHankoImage();
        } else {
          liff.login();
        }
      })
      .catch((error) => {
        console.log('LIFF初期化に失敗しました', error);
      });
  }, []);

  const generateHankoImage = async () => {
    try {
      const idToken = liff.getDecodedIDToken();
      const profileImageUrl = idToken?.picture ?? '';
      const response = await fetch('/api/hanko', {
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

  const handlePreview = () => {
    if (!amount || !dueDate || !message || !recipient) {
      alert('金額、支払い期限、メッセージ、送り先を入力してください');
      return;
    }

    const issueDate = new Date().toISOString().split('T')[0];
    const invoiceData = {
      amount,
      dueDate,
      issueDate,
      message,
      recipient,
      hankoImageUrl,
    };

    // クライアントサイドでのみ実行
    if (typeof window !== 'undefined') {
      router.push({
        pathname: '/invoice/send',
        query: invoiceData,
      });
    }
  };

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
          <button className="preview-invoice-button" onClick={handlePreview}>
            プレビュー
          </button>
        </div>
      </main>
      <Navigation />
    </div>
  );
}
