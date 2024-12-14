"use client";

import { useLoading } from '../context/LoadingProvider';

export default function LoadingScreen() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <p className="loading-screen__text">読み込み中...</p>
    </div>
  );
} 