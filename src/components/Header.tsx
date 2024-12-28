"use client";

import { useEffect, useState } from 'react';
import { useLiff } from '@/context/LiffProvider';
import liff from '@line/liff';

interface Profile {
  name: string;
  picture: string;
}

export default function Header() {
  const [profile, setProfile] = useState<Profile>({ name: '', picture: '' });
  const { isLoggedIn, isInitialized } = useLiff();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const liffProfile = await liff.getProfile();
        setProfile({
          name: liffProfile.displayName,
          picture: liffProfile.pictureUrl || ''
        });
      } catch (error) {
        console.error('プロフィールの取得に失敗しました:', error);
      }
    };

    if (isInitialized && isLoggedIn) {
      fetchProfile();
    }
  }, [isInitialized, isLoggedIn]);

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