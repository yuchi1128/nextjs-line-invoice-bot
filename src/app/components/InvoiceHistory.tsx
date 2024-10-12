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

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <Header />
// //       <main className="container mx-auto px-2 py-4">
// //         <h1 className="text-2xl font-bold text-gray-800 mb-4 px-2">請求書履歴</h1>
// //         <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
// //           {invoices.map((invoice) => (
// //             <Link href={`/record/${invoice.id}`} key={invoice.id}>
// //               <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
// //                 <div className="p-3">
// //                   <div className="flex justify-between items-center mb-2">
// //                     <div className="flex items-center text-xs text-gray-600">
// //                       <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
// //                       </svg>
// //                       <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
// //                     </div>
// //                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${invoice.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
// //                       {invoice.isPaid ? '精算済み' : '未精算'}
// //                     </span>
// //                   </div>
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center">
// //                       <svg className="w-4 h-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
// //                       </svg>
// //                       <h2 className="text-sm font-semibold text-gray-800">{invoice.recipient}</h2>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <svg className="w-4 h-4 mr-1 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
// //                       </svg>
// //                       <p className="text-base font-bold text-gray-700">{invoice.amount.toLocaleString()}円</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </Link>
// //           ))}
// //         </div>
// //       </main>
// //       <Navigation />
// //     </div>
// //   );

// return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
//       <main className="container mx-auto px-4 py-6 mb-16">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">請求書履歴</h1>
//         <div className="space-y-4">
//           {invoices.map((invoice) => (
//             <div key={invoice.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
//               <div className="p-4">
//                 <div className="flex justify-between items-center mb-3">
//                   <div className="flex items-center text-sm text-gray-600">
//                     <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
//                   </div>
//                   <span className={`px-3 py-1 rounded-full text-sm font-semibold ${invoice.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                     {invoice.isPaid ? '精算済み' : '未精算'}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <svg className="w-5 h-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                     <h2 className="text-lg font-semibold text-gray-800">{invoice.recipient}</h2>
//                   </div>
//                 </div>
//                 <div className="mt-3 flex items-center justify-end">
//                   <svg className="w-5 h-5 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="text-xl font-bold text-gray-700">{invoice.amount.toLocaleString()}円</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//       <Navigation />
//     </div>
//   );
// };

// export default InvoiceHistory;






import { useState, useEffect } from 'react';
import liff from '@line/liff';
// import Link from 'next/link';
import Header from '@/app/components/Header';
import Navigation from '@/app/components/Navigation';

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

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-xl font-semibold text-gray-600">読み込み中...</p>
    </div>
  );

  return (
    // <div className="flex flex-col min-h-screen bg-gray-100">
    //   <Header />
    //   <main className="flex-grow p-4">
    //     <h1 className="text-2xl font-bold mb-6 text-gray-800">請求書履歴</h1>
    //     <div className="space-y-4">
    //       {invoices.map((invoice) => (
    //         <Link href={`/record/${invoice.id}`} key={invoice.id}>
    //           <div className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105">
    //             <div className="flex justify-between items-center mb-2">
    //               <div className="flex items-center text-sm text-gray-600">
    //                 <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    //                 </svg>
    //                 <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
    //               </div>
    //               <span className={`px-2 py-1 text-xs font-semibold rounded ${invoice.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
    //                 {invoice.isPaid ? '精算済み' : '未精算'}
    //               </span>
    //             </div>
    //             <div className="flex justify-between items-center">
    //               <div>
    //                 <h2 className="text-lg font-semibold text-gray-800">{invoice.recipient}</h2>
    //                 <p className="text-xl font-bold text-blue-600">{invoice.amount.toLocaleString()}円</p>
    //               </div>
    //               <svg className="w-6 h-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    //               </svg>
    //             </div>
    //           </div>
    //         </Link>
    //       ))}
    //     </div>
    //   </main>
    //   <Navigation />
    // </div>

    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
  <Header />
  <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
    <h2 className="text-lg font-bold mb-4">請求書履歴</h2>
    {loading ? (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700">読み込み中...</p>
      </div>
    ) : (
      invoices.map((invoice) => (
        <div key={invoice.id} className="mb-4 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between text-sm text-gray-500">
            <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
            <span className={invoice.isPaid ? "text-green-500" : "text-red-500"}>
              {invoice.isPaid ? "精算済み" : "未精算"}
            </span>
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-bold text-gray-800">{invoice.recipient}</h3>
            <p className="text-sm text-gray-700">{invoice.amount.toLocaleString()}円</p>
          </div>
        </div>
      ))
    )}
  </div>
  <Navigation/>
</div>

  );
};

export default InvoiceHistory;