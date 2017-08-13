import { showContent, moveSection } from "./menubutton_functions";
import { removeNotes } from "./notes_functions";
import { highlight, findDuplicates, resetCellMode } from "./table_functions";
import { arrowKeys, selectValue, changeCellMode, inputError } from "./cell_functions";
import { changePage, createPuzzle } from "./generator";
import { updateArrays } from "./arrays";
import {
	disableMessage,
	cellMode,
	reset,
	solve,
	win,
	check,
	slideMenu,
	resumeGame
} from "./ingamebutton_functions";

//GLOBAL VALUES
document.getElementById("startWrapper").style.display = "inline-block";

const resumeButton = document.getElementById("resumeButton");
const starteasybutton = document.getElementById("startButton1");
const startmediumbutton = document.getElementById("startButton2");
const starthardbutton = document.getElementById("startButton3");
const statsButton = document.getElementById("statsButton");
const settingsButton = document.getElementById("settingsButton");
const ruleButton = document.getElementById("ruleButton");
const aboutButton = document.getElementById("aboutButton");

export const arrowLeftButton = document.getElementById("arrowLeftButton");
export const arrowRightButton = document.getElementById("arrowRightButton");

export const sudokuTable = document.getElementById("sudoku");
export const pencilbutton = document.getElementById("sideButton1");
export const notesbutton = document.getElementById("sideButton2");
const returnButton = document.getElementById("returnButton");
const resetbutton = document.getElementById("button1");
const checkbutton = document.getElementById("button2");
const solvebutton = document.getElementById("button3");
const slideButton = document.getElementById("slideButton");
const okbutton = document.getElementById("okButton");

const getInputElements = () => {
	const inputElements = []; // array of ids of textareas
	for (let i=1; i<=81; i++) {
		inputElements[i-1] = document.getElementById("input" + i);
	}
	return inputElements;
};
export const inputEl = getInputElements();

const easy = 4;
const medium = 5;
const hard = 6;

//END VALUES
//EVENT LISTENERS

resumeButton.addEventListener("click", resumeGame, false);
starteasybutton.addEventListener("click", () => createPuzzle(easy), false);
startmediumbutton.addEventListener("click", () => createPuzzle(medium), false);
starthardbutton.addEventListener("click", () => createPuzzle(hard), false);

statsButton.addEventListener("click", () => showContent("stats"), false);
settingsButton.addEventListener("click", () => showContent("settings"), false);
ruleButton.addEventListener("click", () => showContent("rule"), false);
aboutButton.addEventListener("click", () => showContent("about"), false);

arrowLeftButton.addEventListener("click", () => moveSection("left"), false);
arrowRightButton.addEventListener("click", () => moveSection("right"), false);

pencilbutton.addEventListener("click", () => cellMode("togglepencil"), false);
notesbutton.addEventListener("click", () => cellMode("togglenotes"), false);

returnButton.addEventListener("click", changePage, false);
resetbutton.addEventListener("click", reset, false);
checkbutton.addEventListener("click", check, false);
solvebutton.addEventListener("click", solve, false);
slideButton.addEventListener("click", slideMenu, false);
okbutton.addEventListener("click", disableMessage, false);

for (let j = 0; j < inputEl.length; j++) {
	inputEl[j].addEventListener("blur", updateArrays, false);
	inputEl[j].addEventListener("focus", updateArrays, false);
	inputEl[j].addEventListener("keyup", updateArrays, false);

	//use arrow keys to move from cell to cell
	inputEl[j].addEventListener("keyup", arrowKeys, false);
	//selects cell values
	inputEl[j].addEventListener("focus", selectValue, false);
	//changed clicked cell into according style
	inputEl[j].addEventListener("input", changeCellMode, false);
	//removes unwanted values
	inputEl[j].addEventListener("input", inputError, false);

	//finds cells with same values as clicked cell and highlights them
	inputEl[j].addEventListener("focus", highlight, false);
	//shows in-game error for same number
	inputEl[j].addEventListener("keyup", findDuplicates, false);
	//update cell styles every time textarea loses focus
	inputEl[j].addEventListener("blur", resetCellMode, false);

	//removes notes from column, row and grid where the pencil value was inserted
	inputEl[j].addEventListener("keyup", removeNotes, false);

	// automatic win message
	inputEl[j].addEventListener("keyup", win, false);
}

//END EVENT LISTENERS
