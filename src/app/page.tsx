//src/app/page.tsx
"use client";

import { useEffect } from 'react';
import liff from '@line/liff';
import Header from './components/Header';
import Navigation from './components/Navigation';

export default function Home() {
  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

    if (!liffId) {
      console.error('LIFF IDが見つかりません');
      return;
    }

    liff
      .init({ liffId })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      })
      .catch((error) => {
        console.log('LIFF初期化に失敗しました', error);
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <h1>請求書作成アプリへようこそ</h1>
        <p>請求書を作成するには、下部のナビゲーションバーの紙飛行機アイコンをタップしてください。</p>
      </main>
      <Navigation />
    </div>
  );
}