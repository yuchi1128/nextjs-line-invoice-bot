"use client";

import { useState, useEffect } from 'react';
import liff from '@line/liff';
import Link from 'next/link';

interface Invoice {
  id: number;
  recipient: string;
  sentDate: Date;
  amount: number;
  isPaid: boolean;
}

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          fetchInvoices(profile.userId);
        } else {
          liff.login();
        }
      } catch (error) {
        console.error('LIFF初期化に失敗しました', error);
      }
    };

    initLiff();
  }, []);

  const fetchInvoices = async (userId: string) => {
    try {
      const response = await fetch(`/api/invoices?userId=${userId}`);
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('請求書の取得に失敗しました', error);
    }
  };

  return (
    <div className="invoice-history">
      <div className="invoice-history__card-container">
        {invoices.map((invoice) => (
          <div className="invoice-history__card" key={invoice.id}>
            <div className="invoice-history__header">
              <p className="invoice-history__date">{new Date(invoice.sentDate).toLocaleDateString()}</p>
            </div>
            <div className="invoice-history__content">
              <h2>相手: {invoice.recipient}</h2>
              <p>金額: {invoice.amount}円</p>
              <p className={`invoice-history__status ${invoice.isPaid ? 'paid' : 'unpaid'}`}>
                {invoice.isPaid ? '精算済み' : '未精算'}
              </p>
              <Link href={`/record/${invoice.id}`}>
                <button className="invoice-history__details-button">詳細</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceHistory;