"use client";

import { useEffect, useState } from 'react';
import liff from '@line/liff';

interface Profile {
  name: string;
  picture: string;
}

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile>({ name: '', picture: '' });

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

  return (
    <header>
      <h3 className="home__title">請求書送信BOT</h3>
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
      {!isLoggedIn && (
        <div>
          <hr style={{ width: '100%' }} />
          <div>
            <a id="login" className="home__buttons__button button--primary" onClick={handleLogin}>
              LINEでログイン
            </a>
          </div>
        </div>
      )}
      <hr style={{ width: '100%' }} />
    </header>
  );
}