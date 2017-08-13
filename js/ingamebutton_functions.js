import {
	inputEl,
	pencilbutton,
	notesbutton
} from "./initializing";
import { beginPuzzle } from "./generator";
import { removeDuplicates } from "./notes_functions";

//ENABLE MESSAGE

const enableMessage = (text) => {
	document.getElementById("answerMessage").style.display = "block";
	document.getElementById("coorX").style.display = "block";
	document.getElementById("coorY").style.display = "block";
	document.getElementById("tables").style.width = "429px";
	document.getElementById("tables").style.height = "429px";
	document.getElementById("tables").style.padding = "0px";
	document.getElementById("inputAnswer").innerHTML = text;
};

//END ENABLE MESSAGE
//DISABLE MESSAGE

const disableMessage = () => {
	document.getElementById("answerMessage").style.display = "none";
	document.getElementById("coorX").style.display = "none";
	document.getElementById("coorY").style.display = "none";
	document.getElementById("tables").style.width = "347px";
	document.getElementById("tables").style.height = "347px";
	document.getElementById("tables").style.padding = "41px";
};

//END DISABLE MESSAGE

//CELL MODE

const cellMode = (buttonMode) => {
	for (let i = 0; i < inputEl.length; i++) {
		if (buttonMode == "togglepencil") { //pencil mode
			pencilbutton.setAttribute("class", "buttonTemplate2off");
			notesbutton.setAttribute("class", "buttonTemplate2on");
			if (inputEl[i].value == inputEl[i].defaultValue) { //only for empty cells
				inputEl[i].maxLength = 1;
				inputEl[i].setAttribute("class", "pencil");
			}
		}
		else if (buttonMode == "togglenotes") { //notes mode
			pencilbutton.setAttribute("class", "buttonTemplate2on");
			notesbutton.setAttribute("class", "buttonTemplate2off");
			if (inputEl[i].value == inputEl[i].defaultValue) { //only for empty cells
				inputEl[i].maxLength = 9;
				inputEl[i].setAttribute("class", "notes");
			}
		}
	}
};

//END CELL MODE
//RESET BUTTON

const reset = () => {
	const x = confirm("Are you sure you want to reset?");
	if (x == true) {
		for(let i=0; i<81; i++) {
			inputEl[i].value = inputEl[i].defaultValue;
		}
		cellMode("togglepencil");
		beginPuzzle(mask);
	}
};

//END RESET BUTTON
//SOLVE BUTTON

const solve = () => {
	const x = confirm("Are you sure you want to solve?");
	if (x == true) {
		cellMode("togglepencil");
		enableMessage("Correct!<br>You have won the game!");
		for (let i = 0; i < 81; i++) {
			inputEl[i].value = matrix[i];
		}
	}
};

//END SOLVE BUTTON
//IN-GAME FUNCTION

const win = () => {
	let condition = 0;
	for (let i=0; i<81; i++) {
		if(
			inputEl[i].classList.contains("errorPencil") != true ||
			inputEl[i].classList.contains("highlightErrorPencil") != true
		) {
			if(
				inputEl[i].classList.contains("errorReadOnly") != true ||
				inputEl[i].classList.contains("highlightReadOnly") != true
			) {
				if(inputEl[i].value == inputEl[i].defaultValue) {
					condition = 1;
					break;
				}
			}
			else {
				condition = 1;
				break;
			}
		}
		else {
			condition = 1;
			break;
		}
	}
	if(condition == 0) {
		enableMessage("Correct!<br>You have won the game!");
	}
};

//END IN-GAME FUNCTION
//CHECK BUTTON

const check = () => {
	const wrongCells = [];
	if(rowDup.length != 0 || colDup.length != 0 || gridDup.length != 0) {
		const tmp = rowDup.concat(colDup,gridDup);
		const allDup = removeDuplicates(tmp);
		for(let i=0; i<allDup.length; i++) {
			const row = allDup[i].parentNode.parentNode.rowIndex; // row
			let col = allDup[i].parentNode.cellIndex; //column
			for(let a=0; a<9; a++) {
				const alphabet = "ABCDEFGHI";
				if (col == a) {
					col = alphabet[a]; //assign letter to column
					break;
				}
			}
			wrongCells.push(col + (row+1));
		}
	}
	if (wrongCells.length > 0) { //if values are not same as solution so far
		enableMessage("Cells " + wrongCells + " are incorrect.");
	}
	else enableMessage("Correct so far!"); //if values are same as solution so far
};

//END CHECK BUTTON

const slideMenu = () => {
	const sideMenu = document.getElementById("sideMenuWrapper");
	if(sideMenu.style.display == "block") {
		sideMenu.style.display = "none";
	}
	else sideMenu.style.display = "block";
};

const resumeGame = () => {
	if(matrix.length >= 1) {
		document.getElementById("startWrapper").style.display = "none";
		document.getElementById("tables").style.display = "block";
		document.getElementById("sideButtons").style.display = "block";
		document.getElementById("sideMenu").style.display = "block";
		document.getElementById("sideMenuWrapper").style.display = "block";
	}
};

export {
	disableMessage,
	cellMode,
	reset,
	solve,
	win,
	check,
	slideMenu,
	resumeGame
};
