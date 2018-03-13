import { getGame, assignValues } from "./game";
import { inputEl, resetCells, removeDuplicates } from "../utils/generalUtils";
import { sortByGrids } from "../utils/arrayUtils";
import { isEmptyCell } from "./helpers";
import { CellType } from "../consts";
import { enableMessagePopup } from "../utils/visibilityUtils";
import { findDuplicates } from "./gameTable";

export const Mode = {
	Pencil: 0,
	Notes: 1,
};

/**
 * Toggles between pencil and notes button. Toggles pencil mode by default.
 * Only affects empty cells.
 * @param {Mode} buttonMode - choose to toggle pencil or notes
 */
export const toggleCellMode = (buttonMode = Mode.Pencil) => {
	if (buttonMode === Mode.Pencil) {
		document.querySelector("input[value=Pencil]").classList.add("selected");
		document.querySelector("input[value=Notes]").classList.remove("selected");
		inputEl.filter(
			cell => isEmptyCell(cell)
		).forEach(
			cell => {
				cell.maxLength = 1;
				cell.setAttribute("class", CellType.PENCIL);
			}
		);
	}
	else if (buttonMode === Mode.Notes) {
		document.querySelector("input[value=Pencil]").classList.remove("selected");
		document.querySelector("input[value=Notes]").classList.add("selected");
		inputEl.filter(
			cell => isEmptyCell(cell)
		).forEach(
			cell => {
				cell.maxLength = 9;
				cell.setAttribute("class", CellType.NOTES);
			}
		);
	}
};

/**
 * Click handler for reset button. Resets game to start and sets cell mode to pencil
 */
export const reset = () => {
	const x = confirm("Are you sure you want to reset?");
	// TODO reset only non readonly cells
	if (x) {
		resetCells();
		toggleCellMode();
		sortByGrids(getGame(), assignValues);
	}
};

/**
 * Click handler for solve button. Auto-completes the game.
 */
export const solve = () => {
	const x = confirm("Are you sure you want to solve?");
	if (x) {
		const game = getGame();
		resetCells();
		toggleCellMode();
		sortByGrids(game, assignValues);
		inputEl.forEach((cell, index) => cell.value = game.matrix[index]);
		enableMessagePopup("Correct!<br />You have won the game!");
	}
};

/**
 * Checks for duplicate cells and shows custom message with coordinates of cells
 */
export const check = () => {
	const duplicates = findDuplicates();
	const wrongCells = [];
	if(duplicates.length !== 0) {
		const filteredDup = removeDuplicates(duplicates);
		filteredDup.forEach(cell => {
			const row = cell.parentNode.parentNode.rowIndex + 1; // row as coordinate
			const alphabet = "ABCDEFGHI";
			let col = alphabet[cell.parentNode.cellIndex]; //column as letter
			wrongCells.push(col + row);
		});
	}
	const text = wrongCells.length > 0
		? "Cells " + wrongCells + " are incorrect."
		: "Correct so far!";
	enableMessagePopup(text);
};
