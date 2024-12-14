// import './globals.css';
// import { LiffProvider } from './context/LiffProvider';
// import Header from './components/Header';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <LiffProvider>
//           <Header />
//           {children}
//         </LiffProvider>
//       </body>
//     </html>
//   );
// }






import './globals.css';
import { LiffProvider } from './context/LiffProvider';
import { LoadingProvider } from './context/LoadingProvider';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>
          <LiffProvider>
            <Header />
            <LoadingScreen />
            {children}
          </LiffProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}