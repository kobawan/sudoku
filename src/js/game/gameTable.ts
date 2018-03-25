import { removeDuplicates } from "../utils/generalUtils";
import { isEmptyCell, isPencilCell, isNotesCell } from "./helpers";
import { sortByRows, sortByCols, sortByGrids } from "../utils/arrayUtils";
import { CellClassType } from "../consts";
import Game from "../generator";

/**
 * Highlights pencil cells that have same value
 */
export const highlight = (event: FocusEvent) => (cells: NodeListOf<HTMLTextAreaElement>) => {
    cells.forEach(cell => cell.classList.remove(CellClassType.HIGHLIGHT));

    const selectedCell = event.target as HTMLTextAreaElement;
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
 */
export const showDuplicates = (cells: NodeListOf<HTMLTextAreaElement>, game: Game) => {
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
 */
const getDuplicates = (
    rows: HTMLTextAreaElement[][],
    cols: HTMLTextAreaElement[][],
    grids: HTMLTextAreaElement[][]
) => {
    const arr: HTMLTextAreaElement[][] = [...rows, ...cols, ...grids];
    let duplicates: HTMLTextAreaElement[] = [];
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
 */
export const checkForWin = (cells: NodeListOf<HTMLTextAreaElement>, game: Game) => {
    const duplicates = showDuplicates(cells, game);
    const invalidCells = Array.from(cells).filter(
        cell => isNotesCell(cell) || isEmptyCell(cell)
    );
    return duplicates.length === 0 && invalidCells.length === 0;
};
