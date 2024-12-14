"use client";

import { useEffect, useState } from 'react';
import { useLiff } from '@/app/context/LiffProvider';

interface Profile {
  name: string;
  picture: string;
}

export default function Header() {
  const [profile, setProfile] = useState<Profile>({ name: '', picture: '' });
  const { isLoggedIn, isInitialized, getAccessToken } = useLiff();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = getAccessToken();
        if (!accessToken) {
          throw new Error('アクセストークンが取得できません');
        }

        const response = await fetch('/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('プロフィールの取得に失敗しました');
        }

        const data = await response.json();
        setProfile({
          name: data.displayName,
          picture: data.pictureUrl
        });
      } catch (error) {
        console.error('プロフィールの取得に失敗しました:', error);
      }
    };

    if (isInitialized && isLoggedIn) {
      fetchProfile();
    }
  }, [isInitialized, isLoggedIn, getAccessToken]);

  return (
    <header className="header">
      <div className="profile-container">
        {profile.picture && (
          <img 
            className="profile-image" 
            src={profile.picture} 
            alt="プロフィール" 
          />
        )}
        <span className="profile-name">
          {profile.name ? `${profile.name}さん` : ''}
        </span>
      </div>
    </header>
  );
}