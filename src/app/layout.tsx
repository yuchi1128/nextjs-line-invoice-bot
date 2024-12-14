import './globals.css';
import { LiffProvider } from './context/LiffProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LiffProvider>
          {children}
        </LiffProvider>
      </body>
    </html>
  );
}