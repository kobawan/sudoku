import { removeDuplicates } from "../utils/generalUtils";
import { sortByRows, sortByCols, sortByGrids } from "../utils/arrayUtils";
import { CellMode, TableCellsMap, CellProps, GameType } from "../consts";

/**
 * Highlights pencil cells that have same value
 */
export const highlight = (cellProps: TableCellsMap, selectedCell: CellProps) => {
  const newCellProps: TableCellsMap = {};
  const shouldHighlight = !!selectedCell.value && selectedCell.mode !== CellMode.Notes;

  for (const key in cellProps) {
    if (cellProps.hasOwnProperty(key)) {
      const matchesValue = cellProps[key].mode !== CellMode.Notes && selectedCell.value === cellProps[key].value;
      newCellProps[key] = {
        ...cellProps[key],
        withHighlight: shouldHighlight && matchesValue,
      };
    }
  }

  return newCellProps;
};

/**
 * Finds pencil mode cell duplicates from rows, cols and grids
 */
export const showDuplicates = (
  cellProps: TableCellsMap,
  gameType: GameType,
  gameRatio: number,
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
  const pencilCellsGrids = sortByGrids(gameType, gameRatio, ({ arr, grid, pos }) => {
    if (cellProps[pos].mode !== CellMode.Notes && cellProps[pos].value) {
      arr[grid].push(pos);
    }
  });
  const duplicates = removeDuplicates(getDuplicates(
    pencilCellsRows,
    pencilCellsCols,
    pencilCellsGrids,
    cellProps,
  ));

  return duplicates;
};

/**
 * Finds all occuring duplicates and returns array of their cell positions
 */
const getDuplicates = (
  rows: number[][],
  cols: number[][],
  grids: number[][],
  cellProps: TableCellsMap,
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
