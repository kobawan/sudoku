import { inputEl } from "../utils/generalUtils";
import { isEmptyCell, isPencilCell, isNotesCell } from "./helpers";
import { getGame } from "./game";
import { sortByRows, sortByCols, sortByGrids } from "../utils/arrayUtils";
import { enableMessagePopup } from "../utils/visibilityUtils";

/**
 * Highlights pencil cells that have same value
 */
export const highlight = () => {
	inputEl.forEach(cell => cell.classList.remove("highlight"));
	const selectedCell = event.target;
	//skip selected empty cells and notes cells
	if (!isEmptyCell(selectedCell) && isPencilCell(selectedCell)) {
		inputEl.filter(cell => {
			//only pencil cells that match selected cell's value should be highlighted
			return isPencilCell(cell) && (selectedCell.value == cell.value);
		}).forEach(cell => {
			cell.classList.add("highlight");
		});
	}
};

/**
 * Finds pencil mode cell duplicates from rows, cols and grids
 */
export const findDuplicates = () => {
	inputEl.forEach(cell => cell.classList.remove("highlight", "error"));
	const game = getGame();
	const pencilCellsRows = sortByRows(game, (values) => {
		const { arr, row, pos } = values;
		if(isPencilCell(inputEl[pos]) && !isEmptyCell(inputEl[pos])) {
			arr[row].push(inputEl[pos]);
		}
	});
	const pencilCellsCols = sortByCols(game, (values) => {
		const { arr, col, pos } = values;
		if(isPencilCell(inputEl[pos]) && !isEmptyCell(inputEl[pos])) {
			arr[col].push(inputEl[pos]);
		}
	});
	const pencilCellsGrids = sortByGrids(game, (values) => {
		const { arr, grid, pos } = values;
		if(isPencilCell(inputEl[pos]) && !isEmptyCell(inputEl[pos])) {
			arr[grid].push(inputEl[pos]);
		}
	});

	const dupRows = showDuplicates(pencilCellsRows);
	const dupCols = showDuplicates(pencilCellsCols);
	const dupGrids = showDuplicates(pencilCellsGrids);
	return dupRows.concat(dupCols, dupGrids);
};

const showDuplicates = (arr) => {
	let duplicates = [];
	for (let outer = 0; outer < arr.length; outer++) {
		for (let inner = 0; inner < arr[outer].length; inner++) {
			for (let pos = 1; pos < arr[outer].length - inner; pos++) {
				const nextPos = inner + pos;
				if (arr[outer][inner].value == arr[outer][nextPos].value) {
					duplicates.push(arr[outer][inner]);
					duplicates.push(arr[outer][nextPos]);
				}
			}
		}
	}
	duplicates.forEach(cell => cell.classList.add("error"));
	return duplicates;
};

/**
 * Checks if game is complete and correct and toggles win message
 */
export const win = () => {
	const duplicates = findDuplicates();
	const invalidCells = inputEl.filter(cell =>
		isNotesCell(cell) || isEmptyCell(cell)
	);
	if(duplicates.length === 0 && invalidCells.length === 0) {
		enableMessagePopup("Correct!<br>You have won the game!");
	}
};
