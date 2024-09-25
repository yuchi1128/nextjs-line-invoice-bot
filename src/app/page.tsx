// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="https://nextjs.org/icons/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="https://nextjs.org/icons/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="https://nextjs.org/icons/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }





// export default function Home() {
//   return (
//     <main>
//       <h1>テストページ</h1>
//     </main>
//   )
// }





// app/page.tsx
"use client"; 

import { useEffect, useState } from 'react';
import liff from '@line/liff';

interface Profile {
  name: string;
  picture: string;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile>({ name: '', picture: '' }); // 空の文字列を初期値に設定
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

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

  function handleCreateInvoice() {
    if (!amount || !dueDate) {
      alert('金額と期日を入力してください');
      return;
    }
  
    const invoiceMessage = `請求書送信BOTより請求書が送られました。\n金額: ${amount}円\n期日: ${dueDate}`;
  
    liff.shareTargetPicker([
      {
        type: "text",
        text: invoiceMessage,
      },
      {
        type: "image",
        originalContentUrl: "http://localhost:3000/api/og/invoice?issueDate=2023-09-25&dueDate=2023-10-01&amount=50000&message=%E3%81%8A%E6%94%AF%E6%89%95%E3%81%84%E3%82%88%E3%82%8D%E3%81%97%E3%81%8F%E3%81%8A%E9%A1%98%E3%81%84%E3%81%97%E3%81%BE%E3%81%99%E3%80%82",
        previewImageUrl: "http://localhost:3000/api/og/invoice?issueDate=2023-09-25&dueDate=2023-10-01&amount=50000&message=%E3%81%8A%E6%94%AF%E6%89%95%E3%81%84%E3%82%88%E3%82%8D%E3%81%97%E3%81%8F%E3%81%8A%E9%A1%98%E3%81%84%E3%81%97%E3%81%BE%E3%81%99%E3%80%82",
      },
      // {
      //   type: "image",
      //   originalContentUrl: "https://thumb.ac-illust.com/f0/f0de180fce970dd84d499eae59e4f3a0_t.jpeg",
      //   previewImageUrl: "https://thumb.ac-illust.com/f0/f0de180fce970dd84d499eae59e4f3a0_t.jpeg",
      // },
      {
        type: "text",
        text: `金額: ${amount}円\n期日: ${dueDate}`,
      },
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
            Login with LINE
          </a>
        ) : (
          <a id="logout" className="home__buttons__button button--tertiary" onClick={handleLogout}>
            Logout
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
          <button id="create_invoice" className="home__buttons__button button--primary" onClick={handleCreateInvoice}>
            請求書作成
          </button>
        </div>
      </div>
    </div>
  );
  
}
