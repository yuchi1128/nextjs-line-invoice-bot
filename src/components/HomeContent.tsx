interface ErrorMessageProps {
  message: string;
}

export function LoadingScreen() {
  return (
    <div className="loading-screen">
      <p className="loading-screen__text">読み込み中...</p>
    </div>
  );
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <div>Error: {message}</div>;
}

function FeatureCards() {
  return (
    <div className="cardContainer">
      <div className="card">
        <h2>簡単作成</h2>
        <p>直感的なインターフェースで、数秒で請求書を作成できます。</p>
      </div>
      <div className="card">
        <h2>送信履歴</h2>
        <p>自分が送信した内容を履歴画面で確認できます。</p>
      </div>
      <div className="card">
        <h2>自分のハンコ</h2>
        <p>自分のLINEのプロフィール画像のハンコを請求書に載せられます。</p>
      </div>
    </div>
  );
}

export function HomeContent() {
  return (
    <main className="mainContent">
      <h1 className="title">請求書送信アプリへようこそ!</h1>
      <p className="description">
        簡単に素早く請求書を作成できます。下部のナビゲーションバーの
        <span className="highlight">紙飛行機アイコン</span>
        をタップして始めましょう。
      </p>
      <FeatureCards />
    </main>
  );
} 