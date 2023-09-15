import { removeDuplicates } from "../../../utils/generalUtils";
import { sortByRows, sortByCols, sortByGrids } from "../../../utils/arrayUtils";
import { CellMode, TableCellsMap, GameType } from "../../../consts";

/**
 * Finds pencil mode cell duplicates from rows, cols and grids
 */
export const getDuplicates = (
  cellProps: TableCellsMap,
  gameType: GameType,
  gameRatio: number
) => {
  const pencilCellsRows = sortByRows(gameType, ({ arr, row, pos }) => {
    if (cellProps[pos].mode !== CellMode.Notes && cellProps[pos].value) {
      arr[row].push(pos);
    }
  });
  const pencilCellsCols = sortByCols(gameType, ({ arr, col, pos }) => {
    if (cellProps[pos].mode !== CellMode.Notes && cellProps[pos].value) {
      arr[col].push(pos);
    }
  });
  const pencilCellsGrids = sortByGrids(
    gameType,
    gameRatio,
    ({ arr, grid, pos }) => {
      if (cellProps[pos].mode !== CellMode.Notes && cellProps[pos].value) {
        arr[grid].push(pos);
      }
    }
  );
  const duplicates = removeDuplicates(
    findDuplicates(
      pencilCellsRows,
      pencilCellsCols,
      pencilCellsGrids,
      cellProps
    )
  );

  return duplicates;
};

/**
 * Finds all occuring duplicates and returns array of their cell positions
 */
const findDuplicates = (
  rows: number[][],
  cols: number[][],
  grids: number[][],
  cellProps: TableCellsMap
) => {
  const arr: number[][] = [...rows, ...cols, ...grids];
  const duplicates: number[] = [];
  for (let outer = 0; outer < arr.length; outer++) {
    for (let inner = 0; inner < arr[outer].length; inner++) {
      for (let pos = 1; pos < arr[outer].length - inner; pos++) {
        const currentPos = arr[outer][inner];
        const nextPos = arr[outer][inner + pos];
        if (cellProps[currentPos].value === cellProps[nextPos].value) {
          duplicates.push(currentPos);
          duplicates.push(nextPos);
        }
      }
    }
  }
  return duplicates;
};
