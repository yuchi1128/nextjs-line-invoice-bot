import './globals.css';
import { LiffProvider } from '@/context/LiffProvider';
import Header from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LiffProvider>
          <Header />
          {children}
        </LiffProvider>
      </body>
    </html>
  );
}