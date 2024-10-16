// //src/app/page.tsx
// "use client";

// import { useEffect } from 'react';
// import liff from '@line/liff';
// import Header from './components/Header';
// import Navigation from './components/Navigation';

// export default function Home() {
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
//   }, []);

//   return (
//     <div className="app">
//       <Header />
//       <main className="main-content">
//         <h1>請求書作成アプリへようこそ!!</h1>
//         <p>請求書を作成するには、下部のナビゲーションバーの紙飛行機アイコンをタップしてください。</p>
//       </main>
//       <Navigation />
//     </div>
//   );
// }




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
    <div className="container">
      <Header />
      <main className="mainContent">
        <h1 className="title">請求書送信アプリへようこそ!</h1>
        <p className="description">
          簡単に素早く請求書を作成できます。下部のナビゲーションバーの
          <span className="highlight">紙飛行機アイコン</span>
          をタップして始めましょう。
        </p>
        <div className="cardContainer">
          <div className="card">
            <h2>簡単作成</h2>
            <p>直感的なインターフェースで、数秒で請求書を作成できます。</p>
          </div>
          <div className="card">
            <h2>送信履歴</h2>
            <p>自分が送信した内容を履歴画面で確認できます。</p>
          </div>
          <div className="card">
            <h2>自分のハンコ</h2>
            <p>自分のLINEのプロフィール画像のハンコを請求書に載せられます。</p>
          </div>
        </div>
      </main>
      <Navigation />
    </div>
  );
}