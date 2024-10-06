//コンポーネント分割
import { useEffect, useState } from 'react';
import liff from '@line/liff';

interface Profile {
  name: string;
  picture: string;
}

export default function Header() {
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
          fetchUserProfile();
        } else {
          liff.login();
        }
      })
      .catch((error) => {
        console.log('LIFF initialization failed', error);
      });
  }, []);

  const fetchUserProfile = async () => {
    try {
      const idToken = liff.getDecodedIDToken();
      setProfile({ name: idToken?.name ?? '', picture: idToken?.picture ?? '' });
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  return (
    <header className="header">
      <div className="profile-container">
        <img className="profile-image" src={profile.picture} alt="プロフィール" />
        <span className="profile-name">{profile.name}さん</span>
      </div>
    </header>
  );
}



