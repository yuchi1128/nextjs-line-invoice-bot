// 'use client'

// import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
// import liff, { Liff } from '@line/liff'

// type LiffProviderProps = {
//   children: ReactNode;
// };

// const LiffContext = createContext<Liff | null>(null)

// export const LiffProvider: React.FC<LiffProviderProps> = ({ children }) => {
//   const [liffObject, setLiffObject] = useState<Liff | null>(null)

//   useEffect(() => {
//     liff
//       .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! })
//       .then(() => {
//         setLiffObject(liff)
//         // ブラウザでのテストのみ
//         // if (!liff.isLoggedIn()) {
//         //   liff.login()
//         // }
//       }).then(() => {
//         if (!liff.isInClient()) {
//           alert('LINEアプリで開いてください')
//           setLiffObject(null)
//           liff.closeWindow()
//           return
//         }
//       })
//       .catch((err: any) => {
//         console.log(err)
//       })
//   }, [])


//   return (
//     <LiffContext.Provider value={liffObject}>
//       {children}
//     </LiffContext.Provider>
//   )
// }

// export const useLiff = () => {
//   return useContext(LiffContext);
// }






'use client';

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import liff, { Liff } from '@line/liff';

type LiffContextType = {
  liff: Liff | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  error: Error | null;
};

const initialContext: LiffContextType = {
  liff: null,
  isLoggedIn: false,
  isInitialized: false,
  error: null,
};

const LiffContext = createContext<LiffContextType>(initialContext);

type LiffProviderProps = {
  children: ReactNode;
};

export const LiffProvider: React.FC<LiffProviderProps> = ({ children }) => {
  const [state, setState] = useState<LiffContextType>(initialContext);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          throw new Error('LIFF ID is required');
        }

        await liff.init({ liffId });

        // Check if running in LINE app
        if (!liff.isInClient()) {
          throw new Error('このアプリはLINE内でのみ使用できます');
        }

        setState({
          liff,
          isLoggedIn: liff.isLoggedIn(),
          isInitialized: true,
          error: null,
        });
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error : new Error('LIFF initialization failed'),
          isInitialized: true,
        }));
      }
    };

    if (!state.isInitialized) {
      initializeLiff();
    }
  }, []);

  return (
    <LiffContext.Provider value={state}>
      {children}
    </LiffContext.Provider>
  );
};

export const useLiff = () => {
  const context = useContext(LiffContext);
  if (context === undefined) {
    throw new Error('useLiff must be used within a LiffProvider');
  }
  return context;
};