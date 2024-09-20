import React from "react";
import Game from "./components/Game"; // 先ほどのGameコンポーネントをインポート

const App: React.FC = () => {
  // リセットボタンが押されたときの処理
  const handleReset = () => {
    console.log("Reset button clicked!");
    // リセット時に実行したい処理があればここに書く
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </header>
      <main>
        <Game onReset={handleReset} />
      </main>
    </div>
  );
};

export default App;
