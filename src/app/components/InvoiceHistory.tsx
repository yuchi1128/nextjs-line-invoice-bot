// import { useState, useEffect } from 'react';
// import liff from '@line/liff';
// import Link from 'next/link';
// import Header from '@/app/components/Header';
// import Navigation from '@/app/components/Navigation';

// interface Invoice {
//   id: number;
//   recipient: string;
//   sentDate: Date;
//   amount: number;
//   isPaid: boolean;
// }

// const InvoiceHistory = () => {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initLiff = async () => {
//       try {
//         await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
//         if (liff.isLoggedIn()) {
//           const profile = await liff.getProfile();
//           fetchInvoices(profile.userId);
//         } else {
//           liff.login();
//         }
//       } catch (error) {
//         console.error('LIFF初期化に失敗しました', error);
//       }
//     };

//     initLiff();
//   }, []);

//   const fetchInvoices = async (userId: string) => {
//     try {
//       const response = await fetch(`/api/invoices?userId=${userId}`);
//       const data = await response.json();
//       setInvoices(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('請求書の取得に失敗しました', error);
//       setLoading(false);
//     }
//   };

//   if (loading) return (
//     <div className="loading-screen">
//       <p className="loading-screen__text">読み込み中...</p>
//     </div>
//   );

//   return (
//     <>
//         <Header />
//         <div className="invoice-history">
//           <div className="invoice-history__list">
//             {invoices.map((invoice) => (
//                 <Link href={`/record/${invoice.id}`} key={invoice.id} className="invoice-card">
//                 <div className="invoice-card__header">
//                   <div className="invoice-card__date">
//                     <svg className="icon icon--blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
//                   </div>
//                   <div className={`invoice-card__status ${invoice.isPaid ? 'invoice-card__status--paid' : 'invoice-card__status--unpaid'}`}>
//                     {invoice.isPaid ? '精算済み' : '未精算'}
//                   </div>
//                 </div>
//                 <div className="invoice-card__content">
//                   <div>
//                     <div className="invoice-card__recipient">
//                       <svg className="icon icon--gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                       </svg>
//                       <h2 className="invoice-card__recipient-name">{invoice.recipient}</h2>
//                     </div>
//                     <div className="invoice-card__amount">
//                       <svg className="icon icon--gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                       <p className="invoice-card__amount-value">{invoice.amount.toLocaleString()}円</p>
//                     </div>
//                   </div>
//                   <svg className="icon icon--gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//         <Navigation />
//     </>
//   );
// };

// export default InvoiceHistory;








// import { useState, useEffect } from 'react';
// import liff from '@line/liff';
// import Link from 'next/link';
// import Header from '@/app/components/Header';
// import Navigation from '@/app/components/Navigation';

// interface Invoice {
//   id: number;
//   recipient: string;
//   sentDate: Date;
//   amount: number;
//   isPaid: boolean;
// }

// const InvoiceHistory = () => {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initLiff = async () => {
//       try {
//         await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
//         if (liff.isLoggedIn()) {
//           const profile = await liff.getProfile();
//           fetchInvoices(profile.userId);
//         } else {
//           liff.login();
//         }
//       } catch (error) {
//         console.error('LIFF初期化に失敗しました', error);
//       }
//     };

//     initLiff();
//   }, []);

//   const fetchInvoices = async (userId: string) => {
//     try {
//       const response = await fetch(`/api/invoices?userId=${userId}`);
//       const data = await response.json();
//       setInvoices(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('請求書の取得に失敗しました', error);
//       setLoading(false);
//     }
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <p className="text-xl font-semibold text-gray-600">読み込み中...</p>
//     </div>
//   );

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Header />
//       <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">請求書履歴</h1>
//         <div className="space-y-4">
//           {invoices.map((invoice) => (
//             <Link href={`/record/${invoice.id}`} key={invoice.id}>
//               <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
//                 <div className="p-4">
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center text-sm text-gray-600">
//                       <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                       </svg>
//                       <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
//                     </div>
//                     <span className={`px-2 py-1 text-xs font-semibold rounded ${invoice.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                       {invoice.isPaid ? '精算済み' : '未精算'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <div className="flex items-center mb-1">
//                         <svg className="w-4 h-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                         </svg>
//                         <h2 className="text-lg font-semibold text-gray-900">{invoice.recipient}</h2>
//                       </div>
//                       <div className="flex items-center text-gray-700">
//                         <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         <p className="font-medium">{invoice.amount.toLocaleString()}円</p>
//                       </div>
//                     </div>
//                     <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//       <Navigation />
//     </div>
//   );
// };

// export default InvoiceHistory;







// import { useState, useEffect } from 'react';
// import liff from '@line/liff';
// import Link from 'next/link';
// import Header from '@/app/components/Header';
// import Navigation from '@/app/components/Navigation';

// interface Invoice {
//   id: number;
//   recipient: string;
//   sentDate: Date;
//   amount: number;
//   isPaid: boolean;
// }

// const InvoiceHistory = () => {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const initLiff = async () => {
//       try {
//         await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
//         if (liff.isLoggedIn()) {
//           const profile = await liff.getProfile();
//           fetchInvoices(profile.userId);
//         } else {
//           liff.login();
//         }
//       } catch (error) {
//         console.error('LIFF初期化に失敗しました', error);
//       }
//     };

//     initLiff();
//   }, []);

//   const fetchInvoices = async (userId: string) => {
//     try {
//       const response = await fetch(`/api/invoices?userId=${userId}`);
//       const data = await response.json();
//       setInvoices(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('請求書の取得に失敗しました', error);
//       setLoading(false);
//     }
//   };

//   if (loading) return (
//     <div>
//       <p>読み込み中...</p>
//     </div>
//   );

//   return (
//     <>
//       <Header />
//       <div>
//         <div>
//           {invoices.map((invoice) => (
//             <Link href={`/record/${invoice.id}`} key={invoice.id}>
//               <div>
//                 <div>
//                   <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
//                 </div>
//                 <div>
//                   {invoice.isPaid ? '精算済み' : '未精算'}
//                 </div>
//               </div>
//               <div>
//                 <div>
//                   <div>
//                     <h2>{invoice.recipient}</h2>
//                   </div>
//                   <div>
//                     <p>{invoice.amount.toLocaleString()}円</p>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//       <Navigation />
//     </>
//   );
// };

// export default InvoiceHistory;








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

  if (loading) return <div className="p-4">読み込み中...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow p-4">
        <div className="space-y-5 max-w-sm mx-auto"> {/* カード幅調整 */}
          {invoices.map((invoice) => (
            <Link href={`/record/${invoice.id}`} key={invoice.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                {/* 上段: 日付は左、精算状態は右に配置 */}
                <div className="flex justify-between items-center p-2 border-b border-gray-200 h-12"> 
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(invoice.sentDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
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

