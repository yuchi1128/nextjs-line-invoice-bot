// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Navigation from '@/app/components/Navigation';
// import { Calendar, User, DollarSign, ChevronRight } from 'lucide-react';
// import { useLiff } from '@/app/context/LiffProvider';

// interface Invoice {
//   id: number;
//   recipient: string;
//   sentDate: Date;
//   amount: number;
//   isPaid: boolean;
// }

// const InvoiceHistory = () => {
  
//   // const [invoices, setInvoices] = useState<Invoice[]>([]);
//   // const [loading, setLoading] = useState(true);
//   // const { liff, isLoggedIn, isInitialized, error } = useLiff();

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     if (isInitialized && isLoggedIn && liff) {
//   //       try {
//   //         const profile = await liff.getProfile();
//   //         await fetchInvoices(profile.userId);
//   //       } catch (error) {
//   //         console.error('プロフィールの取得に失敗しました', error);
//   //       }
//   //     }
//   //   };

//   //   fetchData();
//   // }, [isInitialized, isLoggedIn, liff]);

//   const [invoices, setInvoices] = useState<Invoice[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { isLoggedIn, isInitialized, getAccessToken } = useLiff();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (isInitialized && isLoggedIn) {
//         try {
//           const accessToken = getAccessToken();
//           if (!accessToken) {
//             throw new Error('アクセストークンが取得できません');
//           }

//           const profileResponse = await fetch('/api/user/profile', {
//             headers: {
//               'Authorization': `Bearer ${accessToken}`
//             }
//           });

//           if (!profileResponse.ok) {
//             throw new Error('プロフィールの取得に失敗しました');
//           }

//           const profile = await profileResponse.json();
//           await fetchInvoices(profile.userId);
//         } catch (error) {
//           console.error('プロフィールの取得に失敗しました', error);
//         }
//       }
//     };

//     fetchData();
//   }, [isInitialized, isLoggedIn, getAccessToken]);

//   const fetchInvoices = async (userId: string) => {
//     try {
//       const response = await fetch(`/api/invoices?userId=${userId}`);
//       const data = await response.json();
//       setInvoices(data);
//     } catch (error) {
//       console.error('請求書の取得に失敗しました', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isInitialized || loading) {
//     return (
//       <div className="loading-screen">
//         <p className="loading-screen__text">読み込み中...</p>
//       </div>
//     );
//   }

//   // if (error) {
//   //   return (
//   //     <div className="error-screen">
//   //       <p className="error-screen__text">エラーが発生しました: {error.message}</p>
//   //     </div>
//   //   );
//   // }

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100">
//       <main className="flex-grow pt-10 p-4">
//         <div className="space-y-5 max-w-sm mx-auto">
//           {invoices.length === 0 ? (
//             <div className="text-center text-gray-500 py-8">
//               請求書の履歴はありません
//             </div>
//           ) : (
//             invoices.map((invoice) => (
//               <Link href={`/record/${invoice.id}`} key={invoice.id} className="block">
//                 <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
//                   <div className="flex justify-between items-center p-2 border-b border-gray-200 h-12"> 
//                     <div className="flex items-center space-x-2 ml-4">
//                       <Calendar className="w-4 h-4 text-gray-500" />
//                       <span className="text-sm text-gray-600">
//                         {new Date(invoice.sentDate).toLocaleDateString()}
//                       </span>
//                     </div>
//                     <div className={`px-3 py-1 rounded-full text-sm font-medium mr-4 ${
//                       invoice.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                     }`}>
//                       {invoice.isPaid ? '精算済み' : '未精算'}
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center p-6 h-20">
//                     <div className="flex items-center space-x-6">
//                       <div className="flex items-center space-x-2">
//                         <User className="w-6 h-6 text-gray-500" />
//                         <h2 className="text-2xl font-bold">{invoice.recipient}</h2>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <DollarSign className="w-6 h-6 text-gray-500" />
//                         <p className="text-2xl font-bold">{invoice.amount.toLocaleString()}円</p>
//                       </div>
//                     </div>
//                     <ChevronRight className="w-6 h-6 text-gray-400" /> 
//                   </div>
//                 </div>
//               </Link>
//             ))
//           )}
//         </div>
//       </main>
//       <Navigation />
//     </div>
//   );
// };

// export default InvoiceHistory;











"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { Calendar, User, DollarSign, ChevronRight } from 'lucide-react';
import { useLiff } from '@/app/context/LiffProvider';
import { useLoading } from '@/app/context/LoadingProvider';

interface Invoice {
  id: number;
  recipient: string;
  sentDate: Date;
  amount: number;
  isPaid: boolean;
}

const InvoiceHistory = () => {
  const { isInitialized, isLoggedIn } = useLiff();
  const { setIsLoading } = useLoading();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { getAccessToken } = useLiff();

  useEffect(() => {
    setIsLoading(!isInitialized || loading);
  }, [isInitialized, loading, setIsLoading]);

  useEffect(() => {
    const fetchData = async () => {
      if (isInitialized && isLoggedIn) {
        try {
          const accessToken = getAccessToken();
          if (!accessToken) {
            throw new Error('アクセストークンが取得できません');
          }

          const profileResponse = await fetch('/api/user/profile', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          if (!profileResponse.ok) {
            throw new Error('プロフィールの取得に失敗しました');
          }

          const profile = await profileResponse.json();
          await fetchInvoices(profile.userId);
        } catch (error) {
          console.error('プロフィールの取得に失敗しました', error);
        }
      }
    };

    fetchData();
  }, [isInitialized, isLoggedIn, getAccessToken]);

  const fetchInvoices = async (userId: string) => {
    try {
      const response = await fetch(`/api/invoices?userId=${userId}`);
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('請求書の取得に失敗しました', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isInitialized || loading) {
    return (
      <div className="loading-screen">
        <p className="loading-screen__text">読み込み中...</p>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="error-screen">
  //       <p className="error-screen__text">エラーが発生しました: {error.message}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow pt-10 p-4">
        <div className="space-y-5 max-w-sm mx-auto">
          {invoices.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              請求書の履歴はありません
            </div>
          ) : (
            invoices.map((invoice) => (
              <Link href={`/record/${invoice.id}`} key={invoice.id} className="block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                  <div className="flex justify-between items-center p-2 border-b border-gray-200 h-12"> 
                    <div className="flex items-center space-x-2 ml-4">
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
                  <div className="flex justify-between items-center p-6 h-20">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <User className="w-6 h-6 text-gray-500" />
                        <h2 className="text-2xl font-bold">{invoice.recipient}</h2>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-6 h-6 text-gray-500" />
                        <p className="text-2xl font-bold">{invoice.amount.toLocaleString()}円</p>
                      </div>
                    </div>
                    <ChevronRight className="w-6 h-6 text-gray-400" /> 
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default InvoiceHistory;