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
  for (let row = 0; row < ROW_COUNT; row++) {
    let count_x = 0;
    let count_o = 0;
    for (let col = 0; col < COLUMN_COUNT; col++) {
      const player = columns[col][row];
      if (player === PLAYER_X) {
        count_x++;
        count_o = 0;
      } else if (player === PLAYER_O) {
        count_o++;
        count_x = 0;
      } else {
        count_x = 0;
        count_o = 0;
      }

      if (count_x === 4) return PLAYER_X;
      if (count_o === 4) return PLAYER_O;
    }
  }
  return null;
};

// 縦の勝者をチェック
const checkWinnerVertical = (columns: number[][]): number | null => {
  for (let col = 0; col < COLUMN_COUNT; col++) {
    let count_x = 0;
    let count_o = 0;
    for (let row = 0; row < ROW_COUNT; row++) {
      const player = columns[col][row];
      if (player === PLAYER_X) {
        count_x++;
        count_o = 0;
      } else if (player === PLAYER_O) {
        count_o++;
        count_x = 0;
      } else {
        count_x = 0;
        count_o = 0;
      }

      if (count_x === 4) return PLAYER_X;
      if (count_o === 4) return PLAYER_O;
    }
  }
  return null;
};

// 斜め（両方向）の勝者をチェック
const checkWinnerSkew = (columns: number[][]): number | null => {
  const skew_winners = new Set<number>();

  // 右下がり斜め
  for (let col = 0; col <= COLUMN_COUNT - 4; col++) {
    for (let row = 0; row <= ROW_COUNT - 4; row++) {
      const sum =
        columns[col][row] +
        columns[col + 1][row + 1] +
        columns[col + 2][row + 2] +
        columns[col + 3][row + 3];
      if (sum === 4 * PLAYER_X) skew_winners.add(PLAYER_X);
      if (sum === 4 * PLAYER_O) skew_winners.add(PLAYER_O);
    }
  }

  // 左下がり斜め
  for (let col = 3; col < COLUMN_COUNT; col++) {
    for (let row = 0; row <= ROW_COUNT - 4; row++) {
      const sum =
        columns[col][row] +
        columns[col - 1][row + 1] +
        columns[col - 2][row + 2] +
        columns[col - 3][row + 3];
      if (sum === 4 * PLAYER_X) skew_winners.add(PLAYER_X);
      if (sum === 4 * PLAYER_O) skew_winners.add(PLAYER_O);
    }
  }

  if (skew_winners.size === 1) {
    return Array.from(skew_winners)[0]; // 1人の勝者がいる場合
  } else if (skew_winners.size > 1) {
    return DRAW; // 複数の勝者がいる場合は引き分け
  }

  return null; // 勝者がいない場合
};

export default checkWinner;
