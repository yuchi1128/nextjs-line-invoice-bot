"use client";

import { useState, useEffect } from 'react';
import liff from '@line/liff';

interface Invoice {
  id: number;
  recipient: string;
  sentDate: Date;
  dueDate: Date;
  amount: number;
  message: string;
  isPaid: boolean;
}

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
        if (liff.isLoggedIn()) {
          const profile = await liff.getProfile();
          setUserId(profile.userId);
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

  const togglePaidStatus = async (id: number) => {
    try {
      await fetch(`/api/invoices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPaid: !invoices.find(inv => inv.id === id)?.isPaid }),
      });
      fetchInvoices(userId!);
    } catch (error) {
      console.error('請求書の状態更新に失敗しました', error);
    }
  };

  const deleteInvoice = async (id: number) => {
    try {
      await fetch(`/api/invoices/${id}`, { method: 'DELETE' });
      fetchInvoices(userId!);
    } catch (error) {
      console.error('請求書の削除に失敗しました', error);
    }
  };

//   return (
//     <div>
//       <h1>請求書履歴</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>送信相手</th>
//             <th>送信日</th>
//             <th>支払い期限</th>
//             <th>金額</th>
//             <th>メッセージ</th>
//             <th>状態</th>
//             <th>操作</th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoices.map((invoice) => (
//             <tr key={invoice.id}>
//               <td>{invoice.recipient}</td>
//               <td>{new Date(invoice.sentDate).toLocaleDateString()}</td>
//               <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
//               <td>{invoice.amount}円</td>
//               <td>{invoice.message}</td>
//               <td>
//                 <button onClick={() => togglePaidStatus(invoice.id)}>
//                   {invoice.isPaid ? '清算済み' : '未清算'}
//                 </button>
//               </td>
//               <td>
//                 <button onClick={() => deleteInvoice(invoice.id)}>削除</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
    return (
        <div className="invoice-history">
        <h1 className="invoice-history__title">請求書履歴</h1>
        <div className="invoice-history__table-container">
            <table className="invoice-history__table">
            <thead>
                <tr>
                <th>送信相手</th>
                <th>送信日</th>
                <th>支払い期限</th>
                <th>金額</th>
                <th>メッセージ</th>
                <th>状態</th>
                <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice) => (
                <tr key={invoice.id}>
                    <td>{invoice.recipient}</td>
                    <td>{new Date(invoice.sentDate).toLocaleDateString()}</td>
                    <td>{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td>{invoice.amount}円</td>
                    <td>{invoice.message}</td>
                    <td>
                    <button 
                        className={`invoice-history__status-button ${invoice.isPaid ? 'paid' : 'unpaid'}`}
                        onClick={() => togglePaidStatus(invoice.id)}
                    >
                        {invoice.isPaid ? '清算済み' : '未清算'}
                    </button>
                    </td>
                    <td>
                    <button 
                        className="invoice-history__delete-button"
                        onClick={() => deleteInvoice(invoice.id)}
                    >
                        削除
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};


export default InvoiceHistory;