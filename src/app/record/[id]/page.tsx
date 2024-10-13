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
      <p className="text-3xl font-semibold text-gray-600">読み込み中...</p>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen text-xl">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">請求書詳細</h1>
        <div className="bg-white shadow-lg rounded-lg p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-gray-700 text-2xl"><span className="font-semibold">送信相手:</span> {invoice.recipient}</p>
            <p className="text-gray-700 text-2xl"><span className="font-semibold">送信日:</span> {new Date(invoice.sentDate).toLocaleDateString()}</p>
            <p className="text-gray-700 text-2xl"><span className="font-semibold">支払い期限:</span> {new Date(invoice.dueDate).toLocaleDateString()}</p>
            <p className="text-gray-700 text-2xl"><span className="font-semibold">金額:</span> {invoice.amount.toLocaleString()}円</p>
          </div>
          <p className="text-gray-700 mt-8 text-2xl"><span className="font-semibold">メッセージ:</span> {invoice.message}</p>
          <div className="mt-10">
            <p className="text-2xl font-semibold mb-4">精算状態:</p>
            <div className="flex items-center space-x-6">
              <button 
                onClick={togglePaidStatus}
                className={`px-8 py-4 rounded-full text-2xl font-bold transition duration-300 ease-in-out ${
                  invoice.isPaid 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {invoice.isPaid ? '精算済み' : '未精算'}
              </button>
              <p className="text-gray-600 text-xl">クリックして状態を切り替え</p>
            </div>
          </div>
          <Link href="/record" className="inline-block mt-12 text-2xl text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out">
            ← 一覧画面に戻る
          </Link>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default InvoiceDetail;