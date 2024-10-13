// "use client";

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '../../components/Header';
// import Navigation from '@/app/components/Navigation';
// import Link from 'next/link';
// interface Invoice {
//   id: number;
//   recipient: string;
//   sentDate: Date;
//   dueDate: Date;
//   amount: number;
//   message: string;
//   isPaid: boolean;
// }

// const InvoiceDetail = () => {
//   const [invoice, setInvoice] = useState<Invoice | null>(null);
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       fetchInvoice(id as string);
//     }
//   }, [id]);

//   const fetchInvoice = async (invoiceId: string) => {
//     try {
//       const response = await fetch(`/api/invoices/${invoiceId}`);
//       const data = await response.json();
//       setInvoice(data);
//     } catch (error) {
//       console.error('請求書の取得に失敗しました', error);
//     }
//   };

//   const togglePaidStatus = async () => {
//     if (!invoice) return;
//     try {
//       await fetch(`/api/invoices/${invoice.id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ isPaid: !invoice.isPaid }),
//       });
//       fetchInvoice(id as string);
//     } catch (error) {
//       console.error('請求書の状態更新に失敗しました', error);
//     }
//   };

//   if (!invoice) return (
//     <div className="loading-screen">
//       <p className="loading-screen__text">読み込み中...</p>
//     </div>
//   );

//   return (
//     <div>
//       <Header />
//       <div className="invoice-detail">
//         <h1 className="invoice-detail__title">請求書詳細</h1>
//         <div className="invoice-detail__content">
//           <p><strong>送信相手:</strong> {invoice.recipient}</p>
//           <p><strong>送信日:</strong> {new Date(invoice.sentDate).toLocaleDateString()}</p>
//           <p><strong>支払い期限:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
//           <p><strong>金額:</strong> {invoice.amount}円</p>
//           <p><strong>メッセージ:</strong> {invoice.message}</p>
//           <p><strong>状態:</strong>
//             <button
//               className={`invoice-detail__status-button ${invoice.isPaid ? 'paid' : 'unpaid'}`}
//               onClick={togglePaidStatus}
//             >
//               {invoice.isPaid ? '精算済み' : '未精算'}
//             </button>
//           </p>
//           <Link href="/record" className="invoice-detail__back-button">
//             一覧画面に戻る
//           </Link>
//         </div>
//       </div>
//       <Navigation />
//     </div>
//   );
// };

// export default InvoiceDetail;











"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Navigation from '@/app/components/Navigation';
import Link from 'next/link';

interface Invoice {
  id: number;
  recipient: string;
  sentDate: Date;
  dueDate: Date;
  amount: number;
  message: string;
  isPaid: boolean;
}

const InvoiceDetail = () => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchInvoice(id as string);
    }
  }, [id]);

  const fetchInvoice = async (invoiceId: string) => {
    try {
      const response = await fetch(`/api/invoices/${invoiceId}`);
      const data = await response.json();
      setInvoice(data);
    } catch (error) {
      console.error('請求書の取得に失敗しました', error);
    }
  };

  const togglePaidStatus = async () => {
    if (!invoice) return;
    try {
      await fetch(`/api/invoices/${invoice.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPaid: !invoice.isPaid }),
      });
      fetchInvoice(id as string);
    } catch (error) {
      console.error('請求書の状態更新に失敗しました', error);
    }
  };

  if (!invoice) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-semibold text-gray-600">読み込み中...</p>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">請求書詳細</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-700"><span className="font-semibold">送信相手:</span> {invoice.recipient}</p>
            <p className="text-gray-700"><span className="font-semibold">送信日:</span> {new Date(invoice.sentDate).toLocaleDateString()}</p>
            <p className="text-gray-700"><span className="font-semibold">支払い期限:</span> {new Date(invoice.dueDate).toLocaleDateString()}</p>
            <p className="text-gray-700"><span className="font-semibold">金額:</span> {invoice.amount.toLocaleString()}円</p>
          </div>
          <p className="text-gray-700 mt-4"><span className="font-semibold">メッセージ:</span> {invoice.message}</p>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-gray-700"><span className="font-semibold">状態:</span></p>
            <button 
              onClick={togglePaidStatus}
              className={`px-4 py-2 rounded-full font-semibold ${
                invoice.isPaid 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              } transition duration-300 ease-in-out`}
            >
              {invoice.isPaid ? '精算済み' : '未精算'}
            </button>
          </div>
          <Link href="/record" className="inline-block mt-8 text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
            ← 一覧画面に戻る
          </Link>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default InvoiceDetail;