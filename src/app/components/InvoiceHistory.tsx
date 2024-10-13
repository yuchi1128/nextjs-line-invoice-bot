import React, { useState, useEffect } from 'react';
import liff from '@line/liff';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Navigation from '@/app/components/Navigation';
import { Calendar, User, DollarSign, ChevronRight } from 'lucide-react';

interface Invoice {
  id: number;
  recipient: string;
  sentDate: Date;
  amount: number;
  isPaid: boolean;
}

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.error('請求書の取得に失敗しました', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <p className="loading-screen__text">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow pt-8 p-4">
        <div className="space-y-5 max-w-sm mx-auto"> {/* カード幅調整 */}
          {invoices.map((invoice) => (
            <Link href={`/record/${invoice.id}`} key={invoice.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                {/* 上段: 日にちと精算状態を中央寄りに配置 */}
                <div className="flex justify-between items-center p-2 border-b border-gray-200 h-12"> 
                  <div className="flex items-center space-x-2 ml-4"> {/* 左寄りに少しだけ寄せる */}
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(invoice.sentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium mr-4 ${
                    invoice.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {invoice.isPaid ? '精算済み' : '未精算'}
                  </div>
                </div>
                {/* 下段: 相手の名前、金額、矢印 */}
                <div className="flex justify-between items-center p-6 h-20"> {/* 下段の縦幅を長く */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <User className="w-6 h-6 text-gray-500" />
                      <h2 className="text-2xl font-bold">{invoice.recipient}</h2> {/* 名前を大きく */}
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-6 h-6 text-gray-500" />
                      <p className="text-2xl font-bold">{invoice.amount.toLocaleString()}円</p> {/* 金額を大きく */}
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" /> {/* 右端に矢印 */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default InvoiceHistory;

