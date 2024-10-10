// "use client";

// import { useState, useEffect } from 'react';
// import liff from '@line/liff';
// import Link from 'next/link';

// interface Invoice {
//   id: number;
//   recipient: string;
//   sentDate: Date;
//   amount: number;
//   isPaid: boolean;
// }

// const InvoiceHistory = () => {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);

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
//     } catch (error) {
//       console.error('請求書の取得に失敗しました', error);
//     }
//   };

//   return (
//     <div className="invoice-history">
//       <div className="invoice-history__card-container">
//         {invoices.map((invoice) => (
//           <div className="invoice-history__card" key={invoice.id}>
//             <div className="invoice-history__header">
//               <p className="invoice-history__date">{new Date(invoice.sentDate).toLocaleDateString()}</p>
//             </div>
//             <div className="invoice-history__content">
//               <h2>相手: {invoice.recipient}</h2>
//               <p>金額: {invoice.amount}円</p>
//               <p className={`invoice-history__status ${invoice.isPaid ? 'paid' : 'unpaid'}`}>
//                 {invoice.isPaid ? '精算済み' : '未精算'}
//               </p>
//               <Link href={`/record/${invoice.id}`}>
//                 <button className="invoice-history__details-button">詳細</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InvoiceHistory;








// import { useState, useEffect } from 'react';
// import liff from '@line/liff';
// import Link from 'next/link';

// interface Invoice {
//   id: number;
//   recipient: string;
//   sentDate: Date;
//   amount: number;
//   isPaid: boolean;
// }

// const InvoiceHistory = () => {
//   const [invoices, setInvoices] = useState<Invoice[]>([]);

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
//     } catch (error) {
//       console.error('請求書の取得に失敗しました', error);
//     }
//   };

//   return (
//     <div className="invoice-history">
//       <h1 className="invoice-history__title">請求書履歴</h1>
//       <div className="invoice-history__list">
//         {invoices.map((invoice) => (
//           <Link href={`/record/${invoice.id}`} key={invoice.id} className="invoice-card">
//             <div className="invoice-card__header">
//               <div className="invoice-card__date">
//                 <svg className="icon icon--blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
//               </div>
//               <div className={`invoice-card__status ${invoice.isPaid ? 'invoice-card__status--paid' : 'invoice-card__status--unpaid'}`}>
//                 {invoice.isPaid ? '精算済み' : '未精算'}
//               </div>
//             </div>
//             <div className="invoice-card__content">
//               <div>
//                 <div className="invoice-card__recipient">
//                   <svg className="icon icon--gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                   <h2 className="invoice-card__recipient-name">{invoice.recipient}</h2>
//                 </div>
//                 <div className="invoice-card__amount">
//                   <svg className="icon icon--gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <p className="invoice-card__amount-value">{invoice.amount.toLocaleString()}円</p>
//                 </div>
//               </div>
//               <svg className="icon icon--gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default InvoiceHistory;












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
      <h1 className="invoice-history__title">請求書履歴</h1>
      <div className="invoice-history__list">
        {invoices.map((invoice) => (
            <Link href={`/record/${invoice.id}`} key={invoice.id} className="invoice-card">
                <div className="invoice-card__header">
                    <div className="invoice-card__date">
                    <svg className="icon icon--blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(invoice.sentDate).toLocaleDateString()}</span>
                    </div>
                    <div className={`invoice-card__status ${invoice.isPaid ? 'invoice-card__status--paid' : 'invoice-card__status--unpaid'}`}>
                    {invoice.isPaid ? '精算済み' : '未精算'}
                    </div>
                </div>
                <div className="invoice-card__content">
                    <div className="invoice-card__info">
                    <div className="invoice-card__recipient">
                        <svg className="icon icon--gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h2 className="invoice-card__recipient-name">{invoice.recipient}</h2>
                    </div>
                    <div className="invoice-card__amount">
                        <svg className="icon icon--gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="invoice-card__amount-value">{invoice.amount.toLocaleString()}円</p>
                    </div>
                    </div>
                    <svg className="icon icon--gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                </Link>
        ))}
      </div>
    </div>
  );
};

export default InvoiceHistory;