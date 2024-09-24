import React, { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { decideComputerMove } from "./QLPlayer";
import checkWinner from "./checkWinner";

const COLUMN_COUNT = 4;
const ROW_COUNT = 4;

interface GameProps {
  onReset: () => void;
}

const Game: React.FC<GameProps> = ({ onReset }) => {
  // 各列の状態を管理する。初期状態は4列の配列で、各行が空の状態（0）。
  const [columns, setColumns] = useState<number[][]>(
    Array(COLUMN_COUNT)
      .fill([])
      .map(() => Array(ROW_COUNT).fill(0))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1); // 先手（1）と後手（-1）の切り替え
  const [winner, setWinner] = useState<number | null>(null); // 勝者の管理

  // ボールを落とす関数
  const dropBall = (colIndex: number) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const col = [...newColumns[colIndex]];

      // 上からボールを追加し、既存のボールを下にシフトする
      col.unshift(currentPlayer); // 新しいボールを列の上に追加
      if (col.length > ROW_COUNT) {
        col.pop(); // 5行目以降のボールを削除
      }
      newColumns[colIndex] = col;

      return newColumns;
    });

    // ボールを落とした後に勝敗を判定
    const result = checkWinner(columns);
    if (result !== null) {
      setWinner(result); // 勝者または引き分けを設定
    }
    // 次のプレイヤーに切り替える
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? -1 : 1));
  };

  // コンピューターの手番
  const computerTurn = () => {
    const aiMove = decideComputerMove(columns); // AIが選んだ列
    dropBall(aiMove); // AIが決めた列にボールを落とす
  };

  // コンピューターのターンを自動で行う
  useEffect(() => {
    if (currentPlayer === -1) {
      setTimeout(() => {
        computerTurn(); // コンピューターのターンを進める
      }, 1000); // 1秒待ってからコンピュータのターンを実行
    }
  }, [currentPlayer, computerTurn]); // currentPlayerが変わったらコンピューターのターンを実行

  // ポップアップを表示するuseEffect
  useEffect(() => {
    if (winner !== null) {
      if (winner === 1) {
        alert("you wins!");
      } else if (winner === -1) {
        alert("you lose...");
      } else if (winner === 2) {
        alert("It's a draw!");
      }
    }
  }, [winner]); // winnerが変わったときに発動

  // リセット関数
  const resetGame = () => {
    setColumns(
      Array(COLUMN_COUNT)
        .fill([])
        .map(() => Array(ROW_COUNT).fill(0))
    );
    setCurrentPlayer(1); // 先手に戻す
    setWinner(null); // 勝者をリセット
    onReset(); // 親に通知（必要なら）
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {Array.from({ length: COLUMN_COUNT }, (_, colIndex) => (
          <div key={colIndex} className="mx-7 text-center">
            <MdKeyboardDoubleArrowDown
              onClick={() => {
                if (currentPlayer === 1) {
                  dropBall(colIndex);
                }
              }}
              className={`cursor-pointer text-5xl transition-colors duration-300 text-black hover:text-blue-500`}
              style={{
                cursor:
                  currentPlayer === 1 && winner === null
                    ? "pointer"
                    : "not-allowed",
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col mx-1">
            {Array.from({ length: ROW_COUNT }, (_, rowIndex) => (
              <div key={rowIndex} className="cell">
                {col[rowIndex] === 1 ? (
                  <span className="text-5xl">×</span>
                ) : col[rowIndex] === -1 ? (
                  <span className="text-5xl">○</span>
                ) : (
                  " "
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Reset Game
      </button>
    </div>
  );
};

export default Game;
