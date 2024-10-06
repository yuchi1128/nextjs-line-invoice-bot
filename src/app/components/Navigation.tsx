//請求書作成画面を違うページに
import Link from 'next/link';
import { FaHome, FaPaperPlane } from 'react-icons/fa';

export default function Navigation() {
  return (
    <nav className="navigation">
      <Link href="/" className="nav-item">
        <FaHome />
        <span>ホーム</span>
      </Link>
      <Link href="/invoice/create" className="nav-item">
        <FaPaperPlane />
        <span>請求書作成</span>
      </Link>
    </nav>
  );
}