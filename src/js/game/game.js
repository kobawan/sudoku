import { inputEl, resetCells } from "../utils/generalUtils";
import {
	changePage,
	Page,
	disableMessagePopup,
	toggleSideMenu,
} from "../utils/visibilityUtils";
import Game from "../Generator";
import { GameConfig, CellType } from "../consts";
import { sortByGrids } from "../utils/arrayUtils";
import {
	toggleCellMode,
	reset,
	solve,
	check,
	Mode,
} from "./gameButtons";
import {
	highlight,
	findDuplicates,
	win,
} from "./gameTable";
import {
	arrowKeys,
	selectValue,
	changeSelectedCellMode,
	filterInvalidInput,
} from "./gameCells";
import { updateNotesCells } from "./gameNotesCells";

/**
 * Assigns game values to corresponding cells
 * @param {object} values coordinates and game info
 */
export const assignValues = (values) => {
	if (values) {
		const counter = values.col + (values.row * values.game.ratio);
		const val = values.game.mask[values.grid][counter];
		if (val !== 0) {
			inputEl[values.pos].value = val;
			inputEl[values.pos].maxLength = 1;
			inputEl[values.pos].readOnly = true;
			inputEl[values.pos].setAttribute("class", CellType.READONLY);
		}
	}
};

let game = undefined;

/**
 * Initializes game and sets game singleton. Changes page when game is initialized.
 * @param {GameConfig.TYPE} gameType size of sudoku
 * @param {GameConfig.DIFFICULTY} difficulty difficulty of sudoku
 */
export const initGame = (
	gameType = GameConfig.TYPE.DEFAULT,
	difficulty = GameConfig.DIFFICULTY.EASY
) => {
	game = new Game(gameType, difficulty);
	resetCells();
	toggleCellMode();
	sortByGrids(game, assignValues);
	changePage();
};

/**
 * Gets initialized game. If no game has been initialized it throws error.
 */
export const getGame = () => {
	if (!game) {
		// TODO add behaviour for resume button for when game is not initialized
		throw new Error("Game is not initialized. Please start a new game.");
	}
	return game;
};

/**
 * Adds click event listeners to game buttons
 */
export const addGameButtonListeners = () => {
	document.querySelector(".game input[value=Return]").addEventListener("click",
		() => changePage(Page.Menu)
	);
	document.querySelector(".game input[value=Reset]").addEventListener("click", reset);
	document.querySelector(".game input[value=Check]").addEventListener("click", check);
	document.querySelector(".game input[value=Solve]").addEventListener("click", solve);
	document.querySelector("#side-menu-button").addEventListener("click", toggleSideMenu);

	document.querySelector(".game .message-popup #okButton").addEventListener("click",
		disableMessagePopup
	);

	document.querySelector("input[value=Pencil]").addEventListener(
		"click", () => toggleCellMode()
	);
	document.querySelector("input[value=Notes]").addEventListener(
		"click", () => toggleCellMode(Mode.Notes)
	);
};

export const addTableCellListeners = () => {
	// TODO add event listeners only to relevant cells
	inputEl.forEach(cell => {
		// Only for non readonly cells
		//use arrow keys to move from cell to cell
		cell.addEventListener("keyup", arrowKeys);
		//selects cell values
		cell.addEventListener("focus", selectValue);
		//changed clicked cell into according style
		cell.addEventListener("input", changeSelectedCellMode);
		//removes invalid values
		cell.addEventListener("input", filterInvalidInput);

		//finds cells with same values as clicked cell and highlights them
		cell.addEventListener("focus", highlight);
		//shows in-game error for same number
		cell.addEventListener("keyup", findDuplicates);

		//removes notes from column, row and grid where the pencil value was inserted
		//and filters invalid values
		cell.addEventListener("keyup", updateNotesCells);

		// TODO join this function with findDuplicates
		// automatic win message
		cell.addEventListener("keyup", win);
	});
};
