// 'use client';

// import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
// import liff, { Liff } from '@line/liff';

// type LiffContextType = {
//   liff: Liff | null;
//   isLoggedIn: boolean;
//   isInitialized: boolean;
//   error: Error | null;
// };

// const initialContext: LiffContextType = {
//   liff: null,
//   isLoggedIn: false,
//   isInitialized: false,
//   error: null,
// };

// const LiffContext = createContext<LiffContextType>(initialContext);

// type LiffProviderProps = {
//   children: ReactNode;
// };

// export const LiffProvider: React.FC<LiffProviderProps> = ({ children }) => {
//   const [state, setState] = useState<LiffContextType>(initialContext);

//   useEffect(() => {
//     const initializeLiff = async () => {
//       try {
//         const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
//         if (!liffId) {
//           throw new Error('LIFF ID is required');
//         }

//         await liff.init({ liffId });

//         // Check if running in LINE app
//         if (!liff.isInClient()) {
//           throw new Error('このアプリはLINE内でのみ使用できます');
//         }

//         setState({
//           liff,
//           isLoggedIn: liff.isLoggedIn(),
//           isInitialized: true,
//           error: null,
//         });
//       } catch (error) {
//         setState(prev => ({
//           ...prev,
//           error: error instanceof Error ? error : new Error('LIFF initialization failed'),
//           isInitialized: true,
//         }));
//       }
//     };

//     if (!state.isInitialized) {
//       initializeLiff();
//     }
//   }, []);

//   return (
//     <LiffContext.Provider value={state}>
//       {children}
//     </LiffContext.Provider>
//   );
// };

// export const useLiff = () => {
//   const context = useContext(LiffContext);
//   if (context === undefined) {
//     throw new Error('useLiff must be used within a LiffProvider');
//   }
//   return context;
// };

















"use client";

import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import liff, { Liff } from '@line/liff';

type LiffContextType = {
  liff: Liff | null;
  isLoggedIn: boolean;
  isInitialized: boolean;
  error: Error | null;
  getAccessToken: () => string | null;
};

const initialContext: LiffContextType = {
  liff: null,
  isLoggedIn: false,
  isInitialized: false,
  error: null,
  getAccessToken: () => null,
};

const LiffContext = createContext<LiffContextType>(initialContext);

export const LiffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<Omit<LiffContextType, 'getAccessToken'>>(initialContext);

  const getAccessToken = () => {
    if (!state.liff || !state.isInitialized || !state.isLoggedIn) {
      return null;
    }
    return state.liff.getAccessToken();
  };

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
        if (!liffId) {
          throw new Error('LIFF IDが必要です');
        }

        await liff.init({ liffId });

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
          error: error instanceof Error ? error : new Error('LIFF初期化に失敗しました'),
          isInitialized: true,
        }));
      }
    };

    if (!state.isInitialized) {
      initializeLiff();
    }
  }, []);

  const contextValue = {
    ...state,
    getAccessToken,
  };

  return (
    <LiffContext.Provider value={contextValue}>
      {children}
    </LiffContext.Provider>
  );
};

export const useLiff = () => {
  const context = useContext(LiffContext);
  if (context === undefined) {
    throw new Error('useLiffはLiffProvider内で使用する必要があります');
  }
  return context;
};