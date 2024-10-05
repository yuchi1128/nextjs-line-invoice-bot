// import './globals.css';

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }





import './globals.css';
import Header from './components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <div className="home">
        <div className="home__buttons">
        <Header />
        <body>{children}</body>
        </div>
      </div>
    </html>
  );
}
