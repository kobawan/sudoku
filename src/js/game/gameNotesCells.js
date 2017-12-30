import {
	isPencilCell,
	isNotesCell,
	isReadOnlyCell,
	isPencilModeSelected,
	isEmptyCell,
} from "./helpers";
import { getGame } from "./game";
import { removeDuplicates, inputEl } from "../utils/generalUtils";
import {
	sortByRows,
	sortByCols,
	sortByGrids,
} from "../utils/arrayUtils";

/**
 * Returns coordinates of selected cell
 * @param {object} game current game
 * @param {*} cell selected cell
 */
const findCoordinates = (game, cell) => {
	const coorRow = cell.parentNode.parentNode.rowIndex;
	const coorCol = cell.parentNode.cellIndex;
	let coorGrid;
	sortByGrids(game, (values) => {
		const { grid, pos } = values;
		if(cell === inputEl[pos]) {
			coorGrid = grid;
			return;
		}
	});
	return { x: coorRow, y: coorCol, grid: coorGrid };
};

/**
 * Removes numbers from notes that are related to selected cell
 * @param {*} selectedCell selected cell
 * @param {array} arr array of arranged cells
 * @param {number} coor row, col, or grid of changed selected cell
 */
const removeNotesDup = (selectedCell, arr, coor) => {
	if(arr[coor].length !== 0) {
		let pos;
		arr[coor].forEach( cell => {
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
 */
export const updateNotesCells = () => {
	const cell = event.target;
	// Removes note duplicates when new pencil value is added
	if (
		isPencilModeSelected() &&
		isPencilCell(cell) &&
		!isReadOnlyCell(cell) &&
		!isEmptyCell(cell)
	) { // pencil mode and selected cell is pencil with value
		const game = getGame();
		const coor = findCoordinates(game, cell);
		const notesCellsRows = sortByRows(game, (values) => {
			const { arr, row, pos } = values;
			if(isNotesCell(inputEl[pos]) && !isEmptyCell(inputEl[pos])) {
				arr[row].push(inputEl[pos]);
			}
		});
		const notesCellsCols = sortByCols(game, (values) => {
			const { arr, col, pos } = values;
			if(isNotesCell(inputEl[pos]) && !isEmptyCell(inputEl[pos])) {
				arr[col].push(inputEl[pos]);
			}
		});
		const notesCellsGrids = sortByGrids(game, (values) => {
			const { arr, grid, pos } = values;
			if(isNotesCell(inputEl[pos]) && !isEmptyCell(inputEl[pos])) {
				arr[grid].push(inputEl[pos]);
			}
		});
		removeNotesDup(cell, notesCellsRows, coor.x);
		removeNotesDup(cell, notesCellsCols, coor.y);
		removeNotesDup(cell, notesCellsGrids, coor.grid);
	}
	// filters and sorts notes cell when new note value is added
	if (!isPencilModeSelected() && isNotesCell(cell)) { // notes mode and selected cell is notes
		const notes = cell.value
			.split("")
			.map(val => parseInt(val))
			.filter(val => !!val)
			.sort()
		;
		const result = removeDuplicates(notes).join("");
		cell.value = result;
	}
};
