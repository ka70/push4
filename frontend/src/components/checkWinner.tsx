const COLUMN_COUNT = 4;
const ROW_COUNT = 4;

const PLAYER_X = 1;
const PLAYER_O = -1;
const DRAW = 2;

export const checkWinner = (columns: number[][]): number | null => {
  const horizontal_winner = checkWinnerHorizontal(columns);
  const vertical_winner = checkWinnerVertical(columns);
  const skew_winner = checkWinnerSkew(columns);

  const winners = new Set<number>();

  if (horizontal_winner) {
    winners.add(horizontal_winner);
  }
  if (vertical_winner) {
    winners.add(vertical_winner);
  }
  if (skew_winner) {
    winners.add(skew_winner);
  }

  if (winners.size > 1) {
    return DRAW; // 複数の勝者がいる場合は引き分け
  } else if (winners.size === 1) {
    return Array.from(winners)[0]; // 1人の勝者がいる場合はそのプレイヤー
  } else {
    return null; // まだ勝者がいない場合はnullを返す
  }
};

// 横の勝者をチェック
const checkWinnerHorizontal = (columns: number[][]): number | null => {
  const rows = [];
  for (let row = 0; row < ROW_COUNT; row++) {
    const line = [];
    for (let col = 0; col < COLUMN_COUNT; col++) {
      line.push(columns[col][row]);
    }
    rows.push(line);
  }
  return checkConnected(rows);
};

// 縦の勝者をチェック
const checkWinnerVertical = (columns: number[][]): number | null => {
  return checkConnected(columns); // columns自体が縦の列を表す
};

// 斜め（両方向）の勝者をチェック
const checkWinnerSkew = (columns: number[][]): number | null => {
  const skews = [];

  // 右下がり斜め
  for (let col = 0; col <= COLUMN_COUNT - 4; col++) {
    for (let row = 0; row <= ROW_COUNT - 4; row++) {
      skews.push([
        columns[col][row],
        columns[col + 1][row + 1],
        columns[col + 2][row + 2],
        columns[col + 3][row + 3],
      ]);
    }
  }

  // 左下がり斜め
  for (let col = 3; col < COLUMN_COUNT; col++) {
    for (let row = 0; row <= ROW_COUNT - 4; row++) {
      skews.push([
        columns[col][row],
        columns[col - 1][row + 1],
        columns[col - 2][row + 2],
        columns[col - 3][row + 3],
      ]);
    }
  }

  return checkConnected(skews);
};

// コマの連続をチェックする関数
const checkConnected = (lists: number[][]): number | null => {
  const winners = new Set<number>(); // 勝者を格納するセット

  for (const lst of lists) {
    let count_x = 0; // PLAYER_X の連続数をカウント
    let count_o = 0; // PLAYER_O の連続数をカウント

    for (const player of lst) {
      if (player === PLAYER_X) {
        count_x++;
        count_o = 0; // PLAYER_O の連続カウントはリセット
      } else if (player === PLAYER_O) {
        count_o++;
        count_x = 0; // PLAYER_X の連続カウントはリセット
      } else {
        count_x = 0;
        count_o = 0;
      }

      // 4つ揃った場合
      if (count_x === 4) {
        winners.add(PLAYER_X);
      }
      if (count_o === 4) {
        winners.add(PLAYER_O);
      }
    }
  }

  if (winners.size === 1) {
    return Array.from(winners)[0]; // 1人の勝者がいる場合
  } else if (winners.size > 1) {
    return DRAW; // 複数の勝者がいる場合は引き分け
  }

  return null; // 勝者がいない場合
};

export default checkWinner;
