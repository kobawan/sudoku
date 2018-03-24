import {
	isPencilCell,
	isReadOnlyCell,
	isPencilModeSelected,
} from "./helpers";
import { CellType } from "../consts";

/**
 * Key up event to move cells using arrows
 */
export const arrowKeys = () => {
	// TODO highlight readonly cells instead of skipping over them
	const sudokuTable = document.querySelector(".game .sudoku");
	let coorRow = event.target.parentNode.parentNode.rowIndex;
	let coorCol = event.target.parentNode.cellIndex;
	const key = event.keyCode;
	switch(key) {
	case 37: // left arrow
		coorCol == 0 ? coorCol = 8 : coorCol--;
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly) {
			coorCol == 0 ? coorCol = 8 : coorCol--;
		}
		break;
	case 38: // up arrow
		coorRow == 0 ? coorRow = 8 : coorRow--;
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly) {
			coorRow == 0 ? coorRow = 8 : coorRow--;
		}
		break;
	case 39: // right arrow
		coorCol == 8 ? coorCol = 0 : coorCol++;
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly) {
			coorCol == 8 ? coorCol = 0 : coorCol++;
		}
		break;
	case 40: // down arrow
		coorRow == 8 ? coorRow = 0 : coorRow++;
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly) {
			coorRow == 8 ? coorRow = 0 : coorRow++;
		}
		break;
	default:
		break;
	}
	sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
};

/**
 * Selects clicked value. Gets triggered on cell focus
 */
export const selectValue = () => {
	const cell = event.target;
	if (!isPencilModeSelected()) { //notes mode
		if (isPencilCell(cell) && !isReadOnlyCell(cell)) cell.select(); //select only pencil cell
	}
	else if (isPencilModeSelected()) { // pencil mode
		if (!isReadOnlyCell(cell)) cell.select(); //select pencil or notes cell
	}
};

/**
 * Changes cell mode of selected cell on input event
 */
export const changeSelectedCellMode = () => {
	const cell = event.target;
	if (isPencilModeSelected() && !isReadOnlyCell(cell)) { // pencil mode
		cell.maxLength = 1;
		cell.setAttribute("class", CellType.PENCIL);
	}
	else if (!isPencilModeSelected() && !isReadOnlyCell(cell)) { //notes mode
		cell.maxLength = 9;
		cell.setAttribute("class", CellType.NOTES);
	}
};

/**
 * Resets cell if invalid value is detected, for pencil mode.
 * Gets triggered on input.
 */
export const filterInvalidInput = () => {
	const cell = event.target;
	if(isPencilModeSelected() && !isReadOnlyCell(cell)) {
		const filterInput = parseInt(cell.value);
		if (!filterInput || filterInput === 0) {
			// TODO throw error for invalid value instead
			cell.value = cell.defaultValue;
		}
	}
};
