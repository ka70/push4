// ボード状態とプレイヤーを受け取って、コンピューターがボールを落とす列を返す
export const decideComputerMove = (
  columns: number[][],
  currentPlayer: number
): number => {
  // 0-3のランダム
  return Math.floor(Math.random() * 4);
};
