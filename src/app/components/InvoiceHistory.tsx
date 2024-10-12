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











import { useState, useEffect } from 'react';
import liff from '@line/liff';
import Link from 'next/link';
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
    <div className="loading-screen flex items-center justify-center min-h-screen">
      <p className="loading-screen__text text-gray-700 text-lg">読み込み中...</p>
    </div>
  );

  return (
    <>
      <Header />
      <div className="invoice-history max-w-md mx-auto p-4">
        <div className="invoice-history__list space-y-4">
          {invoices.map((invoice) => (
            <Link href={`/record/${invoice.id}`} key={invoice.id} className="invoice-card bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div className="invoice-card__header flex justify-between items-center text-sm text-gray-500">
                <div className="invoice-card__date flex items-center space-x-2">
                  <svg className="icon icon--blue w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
                </div>
                <div className={`invoice-card__status ${invoice.isPaid ? 'text-green-500' : 'text-red-500'}`}>
                  {invoice.isPaid ? '精算済み' : '未精算'}
                </div>
              </div>
              <div className="invoice-card__content mt-4">
                <div className="invoice-card__recipient flex items-center space-x-2 text-lg font-semibold text-gray-700">
                  <svg className="icon icon--gray w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h2>{invoice.recipient}</h2>
                </div>
                <div className="invoice-card__amount flex items-center space-x-2 text-lg text-gray-700 mt-2">
                  <svg className="icon icon--gray w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>{invoice.amount.toLocaleString()}円</p>
                </div>
              </div>
              <svg className="icon icon--gray w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
      <Navigation />
    </>
  );
};

export default InvoiceHistory;
