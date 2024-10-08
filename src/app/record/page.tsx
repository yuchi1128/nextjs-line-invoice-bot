//src/app/record/page.tsx
"use client";

import React from 'react'
import InvoiceHistory from '@/app/components/InvoiceHistory';
import Header from '@/app/components/Header';
import Navigation from '@/app/components/Navigation';
// import Navigation from '@/app/components/Navigation';

const Record = () => {
  return (
    <div className='app'>
        <Header />
        <InvoiceHistory />
        <Navigation />
    </div>
  )
}

export default Record