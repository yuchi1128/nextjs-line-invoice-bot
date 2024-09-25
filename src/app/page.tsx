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
        originalContentUrl: "https://thumb.ac-illust.com/f0/f0de180fce970dd84d499eae59e4f3a0_t.jpeg",
        previewImageUrl: "https://thumb.ac-illust.com/f0/f0de180fce970dd84d499eae59e4f3a0_t.jpeg",
      },
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
