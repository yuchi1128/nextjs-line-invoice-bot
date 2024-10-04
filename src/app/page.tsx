// "use client";

// import { useEffect, useState } from 'react';
// import liff from '@line/liff';

// interface Profile {
//   name: string;
//   picture: string;
// }

// export default function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profile, setProfile] = useState<Profile>({ name: '', picture: '' });
//   const [amount, setAmount] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [message, setMessage] = useState('');
//   const [recipient, setRecipient] = useState('');

//   useEffect(() => {
//     const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
//     console.log('LIFF ID:', liffId);
//     console.log('All env variables:', process.env);

//     if (!liffId) {
//       console.error('LIFF ID is missing');
//       return;
//     }

//     liff
//       .init({ liffId })
//       .then(() => {
//         if (liff.isLoggedIn()) {
//           const idToken = liff.getDecodedIDToken();
//           setProfile({ name: idToken?.name ?? '', picture: idToken?.picture ?? '' });
//           setIsLoggedIn(true);
//         }
//       })
//       .catch((error) => {
//         console.log('LIFF initialization failed', error);
//       });
//   }, []);

//   const handleLogin = () => {
//     liff.login();
//   };

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   function handleCreateInvoice() {
//     if (!amount || !dueDate || !message || !recipient) {
//       alert('金額、支払い期限、メッセージ、送り先を入力してください');
//       return;
//     }

//     const issueDate = getCurrentDate();

//     const invoiceImageUrl = `https://nextjs-line-invoice-bot.vercel.app/api/og/invoice?amount=${amount}&dueDate=${dueDate}&issueDate=${issueDate}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(recipient)}`;

//     liff.shareTargetPicker([
//       {
//         type: "text",
//         text: "下記の内容にて請求書をお送りいたしますので、ご確認ください。",
//       },
//       {
//         type: "image",
//         originalContentUrl: invoiceImageUrl, 
//         previewImageUrl: invoiceImageUrl,
//       },
//       {
//         type: 'text',
//         text: `このメッセージは請求書送信BOTから送信されています。\nhttps://lin.ee/qeZlCxi`,
//       },
//     ]);
//   }

//   return (
//     <div className="home">
//       <h3 className="home__title">請求書送信BOT</h3>
//       <div className="home__buttons">

//         <hr style={{ width: '100%' }} />
//           <div>
//             {isLoggedIn ? (
//               <>
//                 <img id="profile_img" width="100px" src={profile.picture} alt="Profile" />
//                 <h2 id="profile_string">こんにちは！{profile.name}さん！</h2>
//               </>
//             ) : (
//               <h2 id="profile_string">ログインされていません。</h2>
//             )}
//           </div>
//           {!isLoggedIn ? (
//             <div>
//               <hr style={{ width: '100%' }} />
//               <div>
//                 <a id="login" className="home__buttons__button button--primary" onClick={handleLogin}>
//                   LINEでログイン
//                 </a>
//               </div>
//             </div>
//           ) : (
//             <div></div>
//           )}
//           <hr style={{ width: '100%' }} />

//         <div className="home__input">
//           <h1>請求書の作成</h1>
//           <label htmlFor="recipient">送り先:</label>
//           <input
//             type="text"
//             id="recipient"
//             placeholder="送る相手の名前を入力してください"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//           />
//           <label htmlFor="amount">金額:</label>
//           <input
//             type="number"
//             id="amount"
//             placeholder="金額を入力してください"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <label htmlFor="due_date">支払い期限:</label>
//           <input
//             type="date"
//             id="due_date"
//             placeholder="期日を入力してください"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//           />
//           <label htmlFor="message">メッセージ:</label>
//           <textarea
//             id="message"
//             placeholder="メッセージを入力してください"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button id="create_invoice" className="home__buttons__button button--primary" onClick={handleCreateInvoice}>
//             請求書作成
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }










// "use client";

// import { useEffect, useState } from 'react';
// import liff from '@line/liff';

// interface Profile {
//   name: string;
//   picture: string;
// }

// export default function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profile, setProfile] = useState<Profile>({ name: '', picture: '' });
//   const [amount, setAmount] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [message, setMessage] = useState('');
//   const [recipient, setRecipient] = useState('');
//   const [hankoImage, setHankoImage] = useState<string | null>(null);

//   useEffect(() => {
//     const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
//     console.log('LIFF ID:', liffId);
//     console.log('All env variables:', process.env);

//     if (!liffId) {
//       console.error('LIFF ID is missing');
//       return;
//     }

//     liff
//       .init({ liffId })
//       .then(() => {
//         if (liff.isLoggedIn()) {
//           const idToken = liff.getDecodedIDToken();
//           setProfile({ name: idToken?.name ?? '', picture: idToken?.picture ?? '' });
//           setIsLoggedIn(true);
//         }
//       })
//       .catch((error) => {
//         console.log('LIFF initialization failed', error);
//       });

//       const fetchHankoImage = async (profileImageUrl: string) => {
//         try {
//           const response = await fetch('/api/create-hanko', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ profileImageUrl }),
//           });
//           const data = await response.json();
//           setHankoImage(data.hankoImage);
//         } catch (error) {
//           console.error('Error creating hanko:', error);
//         }
//       };
  
//       if (liff.isLoggedIn()) {
//         liff.getProfile().then((profile) => {
//           setProfile({ name: profile.displayName, picture: profile.pictureUrl ?? '' });
//           setIsLoggedIn(true);
//           if (profile.pictureUrl) {
//             fetchHankoImage(profile.pictureUrl);
//           }
//         });
//       }
//   }, []);

//   const handleLogin = () => {
//     liff.login();
//   };

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   function handleCreateInvoice() {
//     if (!amount || !dueDate || !message || !recipient) {
//       alert('金額、支払い期限、メッセージ、送り先を入力してください');
//       return;
//     }

//     const issueDate = getCurrentDate();

//     const invoiceImageUrl = `/api/og/invoice?amount=${amount}&dueDate=${dueDate}&issueDate=${issueDate}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(recipient)}&hankoImage=${encodeURIComponent(hankoImage ?? '')}`;

//     liff.shareTargetPicker([
//       {
//         type: "text",
//         text: "下記の内容にて請求書をお送りいたしますので、ご確認ください。",
//       },
//       {
//         type: "image",
//         originalContentUrl: invoiceImageUrl, 
//         previewImageUrl: invoiceImageUrl,
//       },
//       {
//         type: 'text',
//         text: `このメッセージは請求書送信BOTから送信されています。\nhttps://lin.ee/qeZlCxi`,
//       },
//     ]);
//   }

//   return (
//     <div className="home">
//       <h3 className="home__title">請求書送信BOT</h3>
//       <div className="home__buttons">

//         <hr style={{ width: '100%' }} />
//           <div>
//             {isLoggedIn ? (
//               <>
//                 <img id="profile_img" width="100px" src={profile.picture} alt="Profile" />
//                 <h2 id="profile_string">こんにちは！{profile.name}さん！</h2>
//               </>
//             ) : (
//               <h2 id="profile_string">ログインされていません。</h2>
//             )}
//           </div>
//           {!isLoggedIn ? (
//             <div>
//               <hr style={{ width: '100%' }} />
//               <div>
//                 <a id="login" className="home__buttons__button button--primary" onClick={handleLogin}>
//                   LINEでログイン
//                 </a>
//               </div>
//             </div>
//           ) : (
//             <div></div>
//           )}
//           <hr style={{ width: '100%' }} />

//         <div className="home__input">
//           <h1>請求書の作成</h1>
//           <label htmlFor="recipient">送り先:</label>
//           <input
//             type="text"
//             id="recipient"
//             placeholder="送る相手の名前を入力してください"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//           />
//           <label htmlFor="amount">金額:</label>
//           <input
//             type="number"
//             id="amount"
//             placeholder="金額を入力してください"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <label htmlFor="due_date">支払い期限:</label>
//           <input
//             type="date"
//             id="due_date"
//             placeholder="期日を入力してください"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//           />
//           <label htmlFor="message">メッセージ:</label>
//           <textarea
//             id="message"
//             placeholder="メッセージを入力してください"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button id="create_invoice" className="home__buttons__button button--primary" onClick={handleCreateInvoice}>
//             請求書作成
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }










// "use client";

// import { useEffect, useState } from 'react';
// import liff from '@line/liff';

// interface Profile {
//   name: string;
//   picture: string;
// }

// export default function Home() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [profile, setProfile] = useState<Profile>({ name: '', picture: '' });
//   const [amount, setAmount] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [message, setMessage] = useState('');
//   const [recipient, setRecipient] = useState('');
//   const [hankoImage, setHankoImage] = useState<string | null>(null);

//   useEffect(() => {
//     const initLiff = async () => {
//       const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
//       console.log('LIFF ID:', liffId);

//       if (!liffId) {
//         console.error('LIFF ID is missing');
//         return;
//       }

//       try {
//         await liff.init({ liffId });
//         console.log('LIFF initialization succeeded');

//         if (liff.isLoggedIn()) {
//           const profile = await liff.getProfile();
//           setProfile({ name: profile.displayName, picture: profile.pictureUrl ?? '' });
//           setIsLoggedIn(true);

//           if (profile.pictureUrl) {
//             await fetchHankoImage(profile.pictureUrl);
//           }
//         }
//       } catch (error) {
//         console.error('LIFF initialization failed', error);
//       }
//     };

//     initLiff();
//   }, []);

//   const fetchHankoImage = async (profileImageUrl: string) => {
//     try {
//       const response = await fetch('/api/hanko', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ profileImageUrl }),
//       });
//       const data = await response.json();
//       setHankoImage(data.hankoImage);
//     } catch (error) {
//       console.error('Error creating hanko:', error);
//     }
//   };

//   const handleLogin = () => {
//     if (!liff.isLoggedIn()) {
//       liff.login();
//     }
//   };

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const handleCreateInvoice = () => {
//     if (!amount || !dueDate || !message || !recipient) {
//       alert('金額、支払い期限、メッセージ、送り先を入力してください');
//       return;
//     }

//     const issueDate = getCurrentDate();

//     const invoiceImageUrl = `/api/og/invoice?amount=${amount}&dueDate=${dueDate}&issueDate=${issueDate}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(recipient)}&hankoImage=${encodeURIComponent(hankoImage ?? '')}`;

//     liff.shareTargetPicker([
//       {
//         type: "text",
//         text: "下記の内容にて請求書をお送りいたしますので、ご確認ください。",
//       },
//       {
//         type: "image",
//         originalContentUrl: invoiceImageUrl,
//         previewImageUrl: invoiceImageUrl,
//       },
//       {
//         type: 'text',
//         text: `このメッセージは請求書送信BOTから送信されています。\nhttps://lin.ee/qeZlCxi`,
//       },
//     ]);
//   };

//   return (
//     <div className="home">
//       <h3 className="home__title">請求書送信BOT</h3>
//       <div className="home__buttons">
//         <hr style={{ width: '100%' }} />
//         <div>
//           {isLoggedIn ? (
//             <>
//               <img id="profile_img" width="100px" src={profile.picture} alt="Profile" />
//               <h2 id="profile_string">こんにちは！{profile.name}さん！</h2>
//             </>
//           ) : (
//             <h2 id="profile_string">ログインされていません。</h2>
//           )}
//         </div>
//         {!isLoggedIn && (
//           <div>
//             <hr style={{ width: '100%' }} />
//             <div>
//               <a id="login" className="home__buttons__button button--primary" onClick={handleLogin}>
//                 LINEでログイン
//               </a>
//             </div>
//           </div>
//         )}
//         <hr style={{ width: '100%' }} />

//         <div className="home__input">
//           <h1>請求書の作成</h1>
//           <label htmlFor="recipient">送り先:</label>
//           <input
//             type="text"
//             id="recipient"
//             placeholder="送る相手の名前を入力してください"
//             value={recipient}
//             onChange={(e) => setRecipient(e.target.value)}
//           />
//           <label htmlFor="amount">金額:</label>
//           <input
//             type="number"
//             id="amount"
//             placeholder="金額を入力してください"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <label htmlFor="due_date">支払い期限:</label>
//           <input
//             type="date"
//             id="due_date"
//             placeholder="期日を入力してください"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//           />
//           <label htmlFor="message">メッセージ:</label>
//           <textarea
//             id="message"
//             placeholder="メッセージを入力してください"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button id="create_invoice" className="home__buttons__button button--primary" onClick={handleCreateInvoice}>
//             請求書作成
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

import { useEffect, useState } from 'react';
import liff from '@line/liff';

interface Profile {
  name: string;
  picture: string;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile>({ name: '', picture: '' });
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [hankoImage, setHankoImage] = useState('');

  useEffect(() => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    console.log('LIFF ID:', liffId);
    console.log('All env variables:', process.env);

    if (!liffId) {
      console.error('LIFF ID is missing');
      return;
    }

    liff
      .init({ liffId })
      .then(() => {
        if (liff.isLoggedIn()) {
          const idToken = liff.getDecodedIDToken();
          const profilePicture = idToken?.picture ?? '';
          setProfile({ name: idToken?.name ?? '', picture: profilePicture });
          setIsLoggedIn(true);
          
          // ハンコ画像の生成
          if (profilePicture) {
            generateHanko(profilePicture);
          }
        }
      })
      .catch((error) => {
        console.log('LIFF initialization failed', error);
      });
  }, []);

  const handleLogin = () => {
    liff.login();
  };

  const generateHanko = async (profileImageUrl: string) => {
    try {
      const response = await fetch('/api/hanko', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profileImageUrl }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate hanko');
      }
      
      const data = await response.json();
      setHankoImage(data.hankoImage);
    } catch (error) {
      console.error('Error generating hanko:', error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  function handleCreateInvoice() {
    if (!amount || !dueDate || !message || !recipient) {
      alert('金額、支払い期限、メッセージ、送り先を入力してください');
      return;
    }

    const issueDate = getCurrentDate();

    const invoiceImageUrl = `/api/og/invoice?amount=${amount}&dueDate=${dueDate}&issueDate=${issueDate}&message=${encodeURIComponent(message)}&recipient=${encodeURIComponent(recipient)}&hankoImage=${encodeURIComponent(hankoImage)}`;

    console.log('Sending invoice with URL:', invoiceImageUrl);

    liff.shareTargetPicker([
      {
        type: "text",
        text: "下記の内容にて請求書をお送りいたしますので、ご確認ください。",
      },
      {
        type: "image",
        originalContentUrl: invoiceImageUrl, 
        previewImageUrl: invoiceImageUrl,
      },
      {
        type: 'text',
        text: `このメッセージは請求書送信BOTから送信されています。\nhttps://lin.ee/qeZlCxi`,
      },
    ]);
  }

  return (
    <div className="home">
      <h3 className="home__title">請求書送信BOT</h3>
      <div className="home__buttons">

        <hr style={{ width: '100%' }} />
          <div>
            {isLoggedIn ? (
              <>
                <img id="profile_img" width="100px" src={profile.picture} alt="Profile" />
                <h2 id="profile_string">こんにちは！{profile.name}さん！</h2>
              </>
            ) : (
              <h2 id="profile_string">ログインされていません。</h2>
            )}
          </div>
          {!isLoggedIn ? (
            <div>
              <hr style={{ width: '100%' }} />
              <div>
                <a id="login" className="home__buttons__button button--primary" onClick={handleLogin}>
                  LINEでログイン
                </a>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <hr style={{ width: '100%' }} />

        <div className="home__input">
          <h1>請求書の作成</h1>
          <label htmlFor="recipient">送り先:</label>
          <input
            type="text"
            id="recipient"
            placeholder="送る相手の名前を入力してください"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <label htmlFor="amount">金額:</label>
          <input
            type="number"
            id="amount"
            placeholder="金額を入力してください"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="due_date">支払い期限:</label>
          <input
            type="date"
            id="due_date"
            placeholder="期日を入力してください"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <label htmlFor="message">メッセージ:</label>
          <textarea
            id="message"
            placeholder="メッセージを入力してください"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button id="create_invoice" className="home__buttons__button button--primary" onClick={handleCreateInvoice}>
            請求書作成
          </button>
        </div>
      </div>
    </div>
  );
}