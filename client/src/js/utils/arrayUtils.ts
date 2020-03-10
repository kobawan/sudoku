import { GameType } from "../consts";

export interface RowValues<ArrayType> {
  row: number;
  pos: number;
  arr: ArrayType[][];
}

/**
 * Iterates through each cell row-wise and calls callback function for each cell.
 * Returns array from callback.
 */
export const sortByRows = <ArrayType = number>(
  gameType: GameType,
  callback: (values: RowValues<ArrayType>) => void
) => {
  let pos: number;
  let values: RowValues<ArrayType>;
  const arr: ArrayType[][] = [];
  for (let row = 0; row < gameType; row++) {
    arr.push([]);
    for (let col = 0; col < gameType; col++) {
      pos = row * gameType + col;
      values = { row, pos, arr };
      callback(values);
    }
  }
  return arr;
};

export interface ColumnValues<ArrayType> {
  col: number;
  pos: number;
  arr: ArrayType[][];
}

/**
 * Iterates through each cell column-wise and calls callback function for each cell.
 * Returns array from callback.
 */
export const sortByCols = <ArrayType = number>(
  gameType: GameType,
  callback: (values: ColumnValues<ArrayType>) => void
) => {
  let pos: number;
  let values: ColumnValues<ArrayType>;
  const arr: ArrayType[][] = [];
  for (let col = 0; col < gameType; col++) {
    arr.push([]);
    for (let row = 0; row < gameType; row++) {
      pos = col + gameType * row;
      values = { col, pos, arr };
      callback(values);
    }
  }
  return arr;
};

export interface GridValues<ArrayType> {
  row: number;
  col: number;
  grid: number;
  pos: number;
  arr: ArrayType[][];
}

/**
 * Iterates through each cell grid-wise and calls callback function for each cell.
 * Returns array from callback.
 * TODO improve function with one from generator
 */
export const sortByGrids = <ArrayType = number>(
  gameType: GameType,
  gameRatio: number,
  callback: (values: GridValues<ArrayType>) => void
) => {
  let grid: number;
  let rowPos: number;
  let colPos: number;
  let pos: number;
  let values: GridValues<ArrayType>;
  const arr: ArrayType[][] = [];
  // rows of grids in table
  for (let rowGrid = 0; rowGrid < gameRatio; rowGrid++) {
    // columns of grids in table
    for (let colGrid = 0; colGrid < gameRatio; colGrid++) {
      // grid number horizontally
      grid = rowGrid * gameRatio + colGrid;
      arr.push([]);
      // row per grid
      for (let row = 0; row < gameRatio; row++) {
        // position of first column in each grid
        rowPos = (row + rowGrid * gameRatio) * gameType;
        // column per grid
        for (let col = 0; col < gameRatio; col++) {
          // increment of column per grid and rows of grids
          colPos = col + colGrid * gameRatio;
          // final position
          pos = rowPos + colPos;
          values = { row, col, grid, pos, arr };
          callback(values);
        }
      }
    }
  }
  return arr;
};
