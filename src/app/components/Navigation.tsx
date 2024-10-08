// import Link from 'next/link';
// import { FaHome, FaPaperPlane } from 'react-icons/fa';

// export default function Navigation() {
//   return (
//     <nav className="navigation">
//       <Link href="/" className="nav-item">
//         <FaHome />
//         <span>ホーム</span>
//       </Link>
//       <Link href="/invoice/create" className="nav-item">
//         <FaPaperPlane />
//         <span>請求書作成</span>
//       </Link>
//     </nav>
//   );
// }



import Link from 'next/link';
import { FaHome, FaPaperPlane, FaTimes } from 'react-icons/fa';
import liff from '@line/liff';

export default function Navigation() {
  const closeApp = () => {
    if (liff.isInClient()) {
      liff.closeWindow();
    } else {
      alert('LIFF アプリではありません');
    }
  };

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
      <div className="nav-item" onClick={closeApp} style={{ cursor: 'pointer' }}>
        <FaTimes />
        <span>アプリを閉じる</span>
      </div>
    </nav>
  );
}
