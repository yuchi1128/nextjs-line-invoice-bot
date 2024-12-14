// "use client";

// import { useEffect } from 'react';
// import liff from '@line/liff';
// import Header from './components/Header';
// import Navigation from './components/Navigation';
// import { LiffProvider } from './context/LiffProvider';

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
//     <LiffProvider>
//       <div className="container">
//         <Header />
//         <main className="mainContent">
//         <h1 className="title">請求書送信アプリへようこそ!</h1>
//         <p className="description">
//           簡単に素早く請求書を作成できます。下部のナビゲーションバーの
//           <span className="highlight">紙飛行機アイコン</span>
//           をタップして始めましょう。
//         </p>
//         <div className="cardContainer">
//           <div className="card">
//             <h2>簡単作成</h2>
//             <p>直感的なインターフェースで、数秒で請求書を作成できます。</p>
//           </div>
//           <div className="card">
//             <h2>送信履歴</h2>
//             <p>自分が送信した内容を履歴画面で確認できます。</p>
//           </div>
//           <div className="card">
//             <h2>自分のハンコ</h2>
//             <p>自分のLINEのプロフィール画像のハンコを請求書に載せられます。</p>
//           </div>
//         </div>
//         </main>
//         <Navigation />
//       </div>
//     </LiffProvider>
//   );
// }







"use client";

import Header from './components/Header';
import Navigation from './components/Navigation';
import { useLiff } from './context/LiffProvider';

export default function Home() {
  const { isInitialized, error } = useLiff();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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