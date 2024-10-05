import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}





// import './globals.css';
// import Header from './components/Header';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="ja">
//       <body>
//         <Header />
//         {children}
//       </body>
//     </html>
//   );
// }
