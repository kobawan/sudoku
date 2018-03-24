import {
    isPencilCell,
    isNotesCell,
    isEmptyCell,
} from "./helpers";
import { removeDuplicates } from "../utils/generalUtils";
import {
    sortByRows,
    sortByCols,
    sortByGrids,
} from "../utils/arrayUtils";
import { CellMode } from "../consts";

/**
 * Returns coordinates of selected cell
 * @param {object} game current game
 * @param {EventTarget} selectedCell
 * @param {NodeListOf<HTMLTextAreaElement>} cells
 */
const findCoordinates = (game, selectedCell, cells) => {
    const coorRow = selectedCell.parentNode.parentNode.rowIndex;
    const coorCol = selectedCell.parentNode.cellIndex;
    let coorGrid;
    sortByGrids(game, ({ grid, pos }) => {
        if(selectedCell === cells[pos]) {
            coorGrid = grid;
            return;
        }
    });
    return { x: coorRow, y: coorCol, grid: coorGrid };
};

/**
 * Removes numbers from notes that are related to selected cell
 * @param {EventTarget} selectedCell
 * @param {HTMLTextAreaElement[]} arr array of row, col, or grid of changed selected cell
 */
const removeNotesDup = (selectedCell, arr) => {
    if(arr.length !== 0) {
        let pos;
        arr.forEach(cell => {
            pos = cell.value.indexOf(selectedCell.value);
            if(pos !== -1) {
                cell.value =
                    cell.value.substr(0, pos) + cell.value.substr(pos + 1, cell.value.length);
            }
        });
    }
};

/**
 * Removes value from notes if new pencil value has been inputted and
 * Filters notes if game is in notes mode
 * @param {CellMode} cellMode
 * @param {object} game
 * @param {NodeListOf<HTMLTextAreaElement>} cells
 */
export const updateNotesCells = (cellMode, game, cells) => {
    const selectedCell = event.target;
    // Removes note duplicates when new pencil value is added
    if (
        cellMode === CellMode.Pencil
        && isPencilCell(selectedCell)
        && !isEmptyCell(selectedCell)
    ) { // pencil mode and selected cell is pencil with value
        const coor = findCoordinates(game, selectedCell, cells);
        const notesCellsRows = sortByRows(game, ({ arr, row, pos }) => {
            if(isNotesCell(cells[pos]) && !isEmptyCell(cells[pos])) {
                arr[row].push(cells[pos]);
            }
        });
        const notesCellsCols = sortByCols(game, ({ arr, col, pos }) => {
            if(isNotesCell(cells[pos]) && !isEmptyCell(cells[pos])) {
                arr[col].push(cells[pos]);
            }
        });
        const notesCellsGrids = sortByGrids(game, ({ arr, grid, pos }) => {
            if(isNotesCell(cells[pos]) && !isEmptyCell(cells[pos])) {
                arr[grid].push(cells[pos]);
            }
        });
        const duplicates = removeDuplicates([].concat(
            notesCellsRows[coor.x],
            notesCellsCols[coor.y],
            notesCellsGrids[coor.grid]
        ));
        removeNotesDup(selectedCell, duplicates);
    }
    // filters and sorts notes cell when new note value is added
    if (
        cellMode === CellMode.Notes && isNotesCell(selectedCell)
    ) { // notes mode and selected cell is notes
        const notes = selectedCell.value
            .split("")
            .map(val => parseInt(val))
            .filter(val => !!val)
            .sort()
        ;
        selectedCell.value = removeDuplicates(notes).join("");
    }
};
