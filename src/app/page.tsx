"use client";

import Navigation from '@/components/Navigation';
import { LoadingScreen, ErrorMessage, HomeContent } from '@/components/HomeContent';
import { useLiff } from '@/context/LiffProvider';
import Header from '@/components/Header';

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
      <Header />
      <HomeContent />
      <Navigation />
    </div>
  );
}