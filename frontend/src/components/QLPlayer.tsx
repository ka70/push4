import QTable from "./ql_vs_ql.json";

// 型定義を追加
type QTableType = {
  [key: string]: number; // 文字列キーに対するnumber型の値
};

const qTable: QTableType = QTable; // JSONを型定義に適合させる

// 行列の転置を行う関数
const transpose = (matrix: number[][]): number[][] => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

// Qテーブルに基づいて次の手を選択する関数
export const decideMove = (board: number[][]): number => {
  // Qテーブルに基づいて行動を選択
  const actionWithMaxQ = getBestAction(board);

  // QTableに存在しない場合はランダムに行動を選択
  if (actionWithMaxQ === null) {
    return Math.floor(Math.random() * 4); // 0-3のランダムな値を返す
  }

  return actionWithMaxQ;
};

// Qテーブルから最もQ値が高い行動を選択する関数
const getBestAction = (state: number[][]): number | null => {
  const stateKey = formatStateKey(state); // 修正ポイント: フォーマット関数を使用
  const actions = [0, 1, 2, 3]; // 行動の候補 (0-3)

  // 各行動に対するQ値を取得し、最大値を持つ行動を選択
  const qs = actions.map((action) => getQ(stateKey, action));
  const maxQ = Math.max(...qs);

  // 最大Q値を持つ行動を選択
  const bestActions = actions.filter((_, i) => qs[i] === maxQ);

  // 複数の最大Q値がある場合はその中からランダムに行動を選択
  return bestActions.length > 0
    ? bestActions[Math.floor(Math.random() * bestActions.length)] // 複数の最大Q値がある場合はランダムに選択
    : null;
};

// 状態を QTable のキー形式にフォーマットする関数
const formatStateKey = (state: number[][]): string => {
  // 状態を "(1, 0, 0, ..., 0)" 形式にフォーマットする
  const flatState = state.flat(); // 二次元配列を一次元配列に変換
  return `(${flatState.join(", ")})`; // カンマで連結してタプル形式の文字列を作成
};

// QテーブルからQ値を取得
const getQ = (stateKey: string, action: number): number => {
  const key = `(${stateKey}, ${action})`; // 状態とアクションを連結
  return qTable[key] || 0; // Qテーブルにない場合は0を返す
};

// ボード状態とプレイヤーを受け取って、コンピューターがボールを落とす列を返す関数コンポーネント
export const decideComputerMove = (columns: number[][]): number => {
  // columnsを[列][行]から[行][列]に変換
  const transposedColumns = transpose(columns);

  // 転置後のボード状態でQテーブルに基づき行動を決定
  return decideMove(transposedColumns);
};
