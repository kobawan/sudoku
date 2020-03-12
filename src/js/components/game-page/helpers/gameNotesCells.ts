import { removeDuplicates } from "../../../utils/generalUtils";
import { sortByRows, sortByCols, sortByGrids } from "../../../utils/arrayUtils";
import {
  CellMode,
  TableCellsMap,
  CellCoordinates,
  GameType,
  CellProps,
} from "../../../consts";

const getDuplicateNotesCells = (
  gameType: GameType,
  gameRatio: number,
  cellProps: TableCellsMap,
  coor: CellCoordinates
) => {
  const notesCellsRows = sortByRows(gameType, ({ arr, row, pos }) => {
    if (cellProps[pos].mode === CellMode.Notes && cellProps[pos].value) {
      arr[row].push(pos);
    }
  });
  const notesCellsCols = sortByCols(gameType, ({ arr, col, pos }) => {
    if (cellProps[pos].mode === CellMode.Notes && cellProps[pos].value) {
      arr[col].push(pos);
    }
  });
  const notesCellsGrids = sortByGrids(
    gameType,
    gameRatio,
    ({ arr, grid, pos }) => {
      if (cellProps[pos].mode === CellMode.Notes && cellProps[pos].value) {
        arr[grid].push(pos);
      }
    }
  );
  return removeDuplicates([
    ...notesCellsRows[coor.x],
    ...notesCellsCols[coor.y],
    ...notesCellsGrids[coor.grid],
  ]);
};

/**
 * Removes value from notes that match new pencil value
 */
export const removeDuplicateNotesCells = (
  gameType: GameType,
  gameRatio: number,
  cellProps: TableCellsMap,
  selectedCell: CellProps,
  coor: CellCoordinates
) => {
  const duplicates = getDuplicateNotesCells(
    gameType,
    gameRatio,
    cellProps,
    coor
  );
  if (!duplicates.length) {
    return undefined;
  }

  // Removes numbers from notes that are related to selected cell
  const newCellProps: TableCellsMap = {};

  for (const key in cellProps) {
    if (cellProps.hasOwnProperty(key)) {
      const props = cellProps[key];
      let value = props.value;

      if (duplicates.includes(+key)) {
        const notes = `${value}`
          .split("")
          .filter(val => `${selectedCell.value}` !== val)
          .join("");
        value = +notes || 0;
      }

      newCellProps[key] = {
        ...props,
        value,
      };
    }
  }

  return newCellProps;
};
