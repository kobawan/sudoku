import { isPencilCell } from "./helpers";
import { CellClassType, CellMode } from "../consts";

/**
 * Key up event to move cells using arrows
 * @param {Element} sudokuTable
 */
export const arrowKeys = (sudokuTable) => {
    let coorRow = event.target.parentNode.parentNode.rowIndex;
    let coorCol = event.target.parentNode.cellIndex;
    switch(event.keyCode) {
        case 37: // left arrow
            coorCol == 0 ? coorCol = 8 : coorCol--;
            break;
        case 38: // up arrow
            coorRow == 0 ? coorRow = 8 : coorRow--;
            break;
        case 39: // right arrow
            coorCol == 8 ? coorCol = 0 : coorCol++;
            break;
        case 40: // down arrow
            coorRow == 8 ? coorRow = 0 : coorRow++;
            break;
        default:
            break;
    }
    sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
};

/**
 * Selects clicked value. Gets triggered on cell focus
 * @param {CellMode} cellMode
 */
export const selectValue = (cellMode) => {
    const cell = event.target;
    if (
        (cellMode === CellMode.Notes && isPencilCell(cell)) // should not select notes in notes mode
        || cellMode === CellMode.Pencil
    ) {
        cell.select();
    }
};

/**
 * Changes cell mode of selected cell on input event
 * @param {CellMode} cellMode
 */
export const changeSelectedCellMode = (cellMode) => {
    const cell = event.target;
    if (cellMode === CellMode.Pencil) {
        cell.maxLength = 1;
        cell.className = CellClassType.PENCIL;
    }
    else if (cellMode === CellMode.Notes) {
        cell.maxLength = 9;
        cell.className = CellClassType.NOTES;
    }
};

/**
 * Resets cell if invalid value is detected, for pencil mode.
 * Gets triggered on input.
 * @param {CellMode} cellMode
 */
export const filterInvalidInput = (cellMode) => {
    const cell = event.target;
    if (cellMode === CellMode.Pencil) {
        const filterInput = parseInt(cell.value);
        if (!filterInput || filterInput === 0) {
            // TODO disable invalid inputs alltogether
            cell.value = cell.defaultValue;
        }
    }
};
