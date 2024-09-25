// import { NextRequest } from "next/server";
// import { ImageResponse } from "@vercel/og";

// export const runtime = "edge";

// export function GET(req: NextRequest) {
//   if (req.method !== "GET") {
//     return new Response("Method Not Allowed", { status: 405 });
//   }

//   try {
//     const { searchParams } = new URL(req.url);

//     const title = "ご請求書";
//     const issueDate = searchParams.get("issueDate") || "";
//     const dueDate = searchParams.get("dueDate") || "";
//     const amount = searchParams.get("amount") || "";
//     const message = searchParams.get("message") || "";

//     return new ImageResponse(
//       (
//         <div
//           style={{
//             backgroundColor: "#fff",
//             height: "100%",
//             width: "100%",
//             display: "flex",
//             textAlign: "left",
//             alignItems: "center",
//             justifyContent: "center",
//             flexDirection: "column",
//             fontFamily: "Arial, sans-serif",
//           }}
//         >
//           <div
//             style={{
//               width: "100%",
//               maxWidth: "600px",
//               border: "1px solid #000",
//               padding: "20px",
//               boxSizing: "border-box",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <h1
//               style={{
//                 textAlign: "center",
//                 marginBottom: "20px",
//                 fontSize: "40px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               {title}
//             </h1>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", fontSize: "24px" }}>
//               <span>発行日:</span>
//               <div
//                 style={{
//                   border: "1px solid #000",
//                   padding: "5px",
//                   minWidth: "150px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {issueDate}
//               </div>
//             </div>
//             <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", fontSize: "24px" }}>
//               <span>期日:</span>
//               <div
//                 style={{
//                   border: "1px solid #000",
//                   padding: "5px",
//                   minWidth: "150px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 {dueDate}
//               </div>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 margin: "20px 0",
//                 fontSize: "30px",
//                 fontWeight: "bold",
//               }}
//             >
//               <span>ご請求金額</span>
//               <div
//                 style={{
//                   border: "1px solid #000",
//                   padding: "5px",
//                   minWidth: "150px",
//                   marginLeft: "10px",
//                   display: "flex",
//                 }}
//               >
//                 ¥{amount}
//               </div>
//             </div>
//             <div
//               style={{
//                 width: "100%",
//                 height: "100px",
//                 border: "1px solid #000",
//                 marginTop: "20px",
//                 padding: "10px",
//                 boxSizing: "border-box",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {message}
//             </div>
//           </div>
//         </div>
//       ),
//       {
//         width: 1200,
//         height: 630,
//       }
//     );
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       console.log(`${e.message}`);
//     } else {
//       console.log("An unknown error occurred");
//     }
//     return new Response("画像の生成に失敗しました", {
//       status: 500,
//     });
//   }  
// }





"use client"; 

import { useEffect, useState } from 'react';
import liff from '@line/liff';

interface Profile {
  name: string;
  picture: string;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile>({ name: '', picture: '' });
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    console.log('LIFF ID:', liffId);
    console.log('All env variables:', process.env);
  
    if (!liffId) {
      console.error('LIFF ID is missing');
      return;
    }
  
    liff
      .init({ liffId })
      .then(() => {
        if (liff.isLoggedIn()) {
          const idToken = liff.getDecodedIDToken();
          setProfile({ name: idToken?.name ?? '', picture: idToken?.picture ?? '' });
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.log('LIFF initialization failed', error);
      });
  }, []);

  const handleLogin = () => {
    liff.login();
  };

  const handleLogout = () => {
    liff.logout();
    location.reload();
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  function handleCreateInvoice() {
    if (!amount || !dueDate || !message) {
      alert('金額、期日、メッセージを入力してください');
      return;
    }

    const issueDate = getCurrentDate(); // 発行日を自動で取得

    // 動的な請求書画像のURLを生成
    const invoiceImageUrl = `https://nextjs-line-invoice-bot.vercel.app/api/og/invoice?amount=${amount}&dueDate=${dueDate}&issueDate=${issueDate}&message=${encodeURIComponent(message)}`;

    liff.shareTargetPicker([
      {
        type: "image",
        originalContentUrl: invoiceImageUrl, // 生成した画像URLを使う
        previewImageUrl: invoiceImageUrl,    // プレビュー画像としても使用
      }
    ]);
  }

  return (
    <div className="home">
      <h3 className="home__title">請求書送信BOT</h3>
      <div className="home__buttons">
        <hr style={{ width: '100%' }} />
        <div>
          {isLoggedIn ? (
            <>
              <img id="profile_img" width="100px" src={profile.picture} alt="Profile" />
              <h2 id="profile_string">こんにちは！{profile.name}さん！</h2>
            </>
          ) : (
            <h2 id="profile_string">ログインされていません。</h2>
          )}
        </div>
        <hr style={{ width: '100%' }} />
        {!isLoggedIn ? (
          <a id="login" className="home__buttons__button button--primary" onClick={handleLogin}>
            LINEでログイン
          </a>
        ) : (
          <a id="logout" className="home__buttons__button button--tertiary" onClick={handleLogout}>
            ログアウト
          </a>
        )}
        <hr style={{ width: '100%' }} />
        <div className="home__input">
          <h1>請求書の作成</h1>
          <label htmlFor="amount">金額:</label>
          <input
            type="number"
            id="amount"
            placeholder="金額を入力してください"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="due_date">期日:</label>
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
          <button id="create_invoice" className="home__buttons__button button--primary" onClick={handleCreateInvoice}>
            請求書作成
          </button>
        </div>
      </div>
    </div>
  );
}
