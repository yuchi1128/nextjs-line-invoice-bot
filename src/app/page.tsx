"use client";

import Navigation from '@/components/Navigation';
import { LoadingScreen, ErrorMessage, HomeContent } from '@/components/HomeContent';
import { useLiff } from '@/context/LiffProvider';

export default function Home() {
  const { isInitialized, error } = useLiff();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  return (
    <div className="container">
      <HomeContent />
      <Navigation />
    </div>
  );
}