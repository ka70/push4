import React from "react";
import Game from "./components/Game"; // 先ほどのGameコンポーネントをインポート

const App: React.FC = () => {
  // リセットボタンが押されたときの処理
  const handleReset = () => {
    console.log("Reset button clicked!");
    // リセット時に実行したい処理があればここに書く
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="bg-blue-600 text-white py-4 w-full shadow-lg">
        <h1 className="text-4xl font-bold text-center">Push4</h1>
      </header>
      <main className="flex-1 w-full flex flex-col items-center justify-center p-6">
        <Game onReset={handleReset} />
      </main>
      <footer className="bg-blue-600 text-white py-2 w-full text-center">
        <p>&copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
