import { removeDuplicates } from "../utils/generalUtils";
import { isEmptyCell, isPencilCell, isNotesCell } from "./helpers";
import { sortByRows, sortByCols, sortByGrids } from "../utils/arrayUtils";
import { CellClassType } from "../consts";

/**
 * Highlights pencil cells that have same value
 * @param {NodeListOf<HTMLTextAreaElement>} cells
 */
export const highlight = (cells) => {
    cells.forEach(cell => cell.classList.remove(CellClassType.HIGHLIGHT));

    const selectedCell = event.target;
    //skip selected empty cells and notes cells
    if (!isEmptyCell(selectedCell) && isPencilCell(selectedCell)) {
        cells.forEach(cell => {
            //only pencil cells that match selected cell's value should be highlighted
            if (isPencilCell(cell) && selectedCell.value === cell.value) {
                cell.classList.add(CellClassType.HIGHLIGHT);
            }
        });
    }
};

/**
 * Finds pencil mode cell duplicates from rows, cols and grids
 * @param {NodeListOf<HTMLTextAreaElement>} cells
 * @param {object} game
 */
export const showDuplicates = (cells, game) => {
    cells.forEach(cell => cell.classList.remove(CellClassType.HIGHLIGHT, CellClassType.ERROR));

    const pencilCellsRows = sortByRows(game, ({ arr, row, pos }) => {
        if(isPencilCell(cells[pos]) && !isEmptyCell(cells[pos])) {
            arr[row].push(cells[pos]);
        }
    });
    const pencilCellsCols = sortByCols(game, ({ arr, col, pos }) => {
        if(isPencilCell(cells[pos]) && !isEmptyCell(cells[pos])) {
            arr[col].push(cells[pos]);
        }
    });
    const pencilCellsGrids = sortByGrids(game, ({ arr, grid, pos }) => {
        if(isPencilCell(cells[pos]) && !isEmptyCell(cells[pos])) {
            arr[grid].push(cells[pos]);
        }
    });
    const duplicates = removeDuplicates(getDuplicates(
        pencilCellsRows,
        pencilCellsCols,
        pencilCellsGrids
    ));

    duplicates.forEach(cell => cell.classList.add(CellClassType.ERROR));
    return duplicates;
};

/**
 * Finds all occuring duplicates and returns array of their cells
 * @param {HTMLTextAreaElement[][]} rows array of not empty pencil cells in rows
 * @param {HTMLTextAreaElement[][]} cols array of not empty pencil cells in cols
 * @param {HTMLTextAreaElement[][]} grids array of not empty pencil cells in grids
 */
const getDuplicates = (rows, cols, grids) => {
    const arr = [].concat(rows, cols, grids);
    let duplicates = [];
    for (let outer = 0; outer < arr.length; outer++) {
        for (let inner = 0; inner < arr[outer].length; inner++) {
            for (let pos = 1; pos < arr[outer].length - inner; pos++) {
                const nextPos = inner + pos;
                if (arr[outer][inner].value === arr[outer][nextPos].value) {
                    duplicates.push(arr[outer][inner]);
                    duplicates.push(arr[outer][nextPos]);
                }
            }
        }
    }
    return duplicates;
};

/**
 * Checks for in-game errors and if game is complete and correct
 * @param {NodeListOf<HTMLTextAreaElement>} cells
 * @param {object} game
 */
export const checkForWin = (cells, game) => {
    const duplicates = showDuplicates(cells, game);
    const invalidCells = Array.from(cells).filter(
        cell => isNotesCell(cell) || isEmptyCell(cell)
    );
    return duplicates.length === 0 && invalidCells.length === 0;
};
