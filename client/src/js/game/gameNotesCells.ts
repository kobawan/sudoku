import { removeDuplicates } from "../utils/generalUtils";
import {
    sortByRows,
    sortByCols,
    sortByGrids,
} from "../utils/arrayUtils";
import { CellMode, TableCellsMap, CellProps, CellCoordinates, GameType } from "../consts";

/**
 * Removes value from notes that match new pencil value
 */
export const updateNotesCells = (
    cellMode: CellMode,
    gameType: GameType,
    gameRatio: number,
    cellProps: TableCellsMap,
    selectedCell: CellProps,
    coor: CellCoordinates,
) => {
    if (
        cellMode === CellMode.Pencil
        && selectedCell.mode === CellMode.Pencil
        && selectedCell.value
    ) {
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
        const notesCellsGrids = sortByGrids(gameType, gameRatio, ({ arr, grid, pos }) => {
            if (cellProps[pos].mode === CellMode.Notes && cellProps[pos].value) {
                arr[grid].push(pos);
            }
        });
        const duplicates = removeDuplicates([
            ...notesCellsRows[coor.x],
            ...notesCellsCols[coor.y],
            ...notesCellsGrids[coor.grid],
        ]);

        // Removes numbers from notes that are related to selected cell
        if (duplicates.length !== 0) {
            const newCellProps: TableCellsMap = {};

            for (const key in cellProps) {
                let value = cellProps[key].value;

                if (duplicates.includes(parseInt(key))) {
                    const notes = `${cellProps[key].value}`
                        .split("")
                        .filter(val => `${selectedCell.value}` !== val)
                    ;
                    value = parseInt(notes.join("")) || 0;
                }

                newCellProps[key] = {
                    ...cellProps[key],
                    value,
                };
            }

            return newCellProps;
        }

        return undefined;
    }

    return undefined;
};
