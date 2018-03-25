import { isPencilCell } from "./helpers";
import { CellClassType, CellMode } from "../consts";

/**
 * Key up event to move cells using arrows
 */
export const arrowKeys = (event: KeyboardEvent) => (sudokuTable: HTMLTableElement) => {
    const selectedCell = event.target as HTMLTextAreaElement;
    const tableCell = selectedCell.parentElement as HTMLTableDataCellElement;
    const tableColumn = tableCell.parentElement as HTMLTableRowElement;
    let coorRow = tableColumn.rowIndex;
    let coorCol = tableCell.cellIndex;
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
    const nextCell = sudokuTable.rows[coorRow].cells[coorCol].children[0] as HTMLTextAreaElement;
    nextCell.focus();
};

/**
 * Selects clicked value. Gets triggered on cell focus
 */
export const selectValue = (event: FocusEvent) => (cellMode: CellMode) => {
    const cell = event.target as HTMLTextAreaElement;;
    if (
        (cellMode === CellMode.Notes && isPencilCell(cell)) // should not select notes in notes mode
        || cellMode === CellMode.Pencil
    ) {
        cell.select();
    }
};

/**
 * Changes cell mode of selected cell on input event
 */
export const changeSelectedCellMode = (event: Event) => (cellMode: CellMode) => {
    const cell = event.target as HTMLTextAreaElement;
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
 */
export const filterInvalidInput = (event: Event) => (cellMode: CellMode) => {
    const cell = event.target as HTMLTextAreaElement;
    if (cellMode === CellMode.Pencil) {
        const filterInput = parseInt(cell.value);
        if (!filterInput || filterInput === 0) {
            // TODO disable invalid inputs alltogether
            cell.value = cell.defaultValue;
        }
    }
};
