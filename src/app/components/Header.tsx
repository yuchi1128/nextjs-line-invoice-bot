"use client";

import { useEffect, useState } from 'react';
import { useLiff } from '@/app/context/LiffProvider';

interface Profile {
  name: string;
  picture: string;
}

export default function Header() {
  const [profile, setProfile] = useState<Profile>({ name: '', picture: '' });
  const { liff, isLoggedIn, isInitialized } = useLiff();

  useEffect(() => {
    if (isInitialized && isLoggedIn && liff) {
      fetchUserProfile();
    }
  }, [isInitialized, isLoggedIn, liff]);

  const fetchUserProfile = async () => {
    try {
      const idToken = liff?.getDecodedIDToken();
      if (idToken) {
        setProfile({ 
          name: idToken.name ?? '', 
          picture: idToken.picture ?? '' 
        });
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

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