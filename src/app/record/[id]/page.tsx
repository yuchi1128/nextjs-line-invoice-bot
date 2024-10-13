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
      <p className="text-lg font-semibold">読み込み中...</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">請求書詳細</h1>
          <div className="space-y-4">
            <p><strong>送信相手:</strong> {invoice.recipient}</p>
            <p><strong>送信日:</strong> {new Date(invoice.sentDate).toLocaleDateString()}</p>
            <p><strong>支払い期限:</strong> {new Date(invoice.dueDate).toLocaleDateString()}</p>
            <p><strong>金額:</strong> {invoice.amount.toLocaleString()}円</p>
            <p><strong>メッセージ:</strong> {invoice.message}</p>
            <div>
              <strong>状態:</strong>
              <button
                className={`ml-4 px-4 py-2 rounded-full font-semibold ${
                  invoice.isPaid
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
                onClick={togglePaidStatus}
              >
                {invoice.isPaid ? '精算済み' : '未精算'}
              </button>
            </div>
            <Link href="/record" className="inline-block mt-6 text-blue-500 hover:underline">
              一覧画面に戻る
            </Link>
          </div>
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default InvoiceDetail;
