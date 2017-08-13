import { inputEl } from "./initializing";

let rowDup = [];
let colDup = [];
let gridDup = [];
let cellHigh = [];

//HIGHLIGHT FUNCTION

const highlight = () => {
	cellHigh.clear();
	if (this.value >=1 && this.value <=9) { //skip empty cells
		if (this.maxLength == 1) { //skip notes
			for (let i = 0; i < inputEl.length; i++) {
				if (inputEl[i].maxLength == 1) { //skip notes
					if (this.value == inputEl[i].value) {
						cellHigh.push(inputEl[i]); //push cell ids with same values to cellHigh
					}
				}
			}
			for (let j = 0; j < cellHigh.length; j++) {
				if(cellHigh[j].readOnly == true) {
					if (
						cellHigh[j].classList.contains("errorReadOnly") == true ||
						cellHigh[j].classList.contains("highlightErrorReadOnly") == true
					) {
						cellHigh[j].setAttribute("class", "highlightErrorReadOnly");
					}
					else{
						cellHigh[j].setAttribute("class", "highlightReadOnly");
					}
				}
				else if (cellHigh[j].readOnly == false) {
					if (
						cellHigh[j].classList.contains("errorPencil") == true ||
						cellHigh[j].classList.contains("highlightErrorPencil") == true
					) {
						cellHigh[j].setAttribute("class", "highlightErrorPencil");
					}
					else{
						cellHigh[j].setAttribute("class", "highlightPencil");
					}
				}
			}
		}
	}
};

//END HIGHLIGHT FUNCTION
// SHOW DUPLICATES FUNCTION

const findDuplicates = () => {
	rowDup.clear();
	colDup.clear();
	gridDup.clear();
	rowDup = showDuplicates(pencilRow);
	colDup = showDuplicates(pencilCol);
	gridDup = showDuplicates(pencilGrid);
};

const showDuplicates = (arr) => {
	const duplicates = [];
	for (let j = 0; j < arr.length; j++) {
		for (let i = 0; i < arr[j].length; i++) {
			for (let k = 1; k < arr[j].length - i; k++) {
				const n = i + k;
				if (arr[j][i].value == arr[j][n].value) {
					duplicates.push(arr[j][i]);
					duplicates.push(arr[j][n]);
				}
			}
		}
	}
	for (let m = 0; m < duplicates.length; m++) {
		const dup = duplicates[m];
		if(dup.classList.contains("readOnly")) {
			dup.setAttribute("class", "errorReadOnly");
		}
		else if (dup.classList.contains("pencil")) {
			dup.setAttribute("class", "errorPencil");
		}
		else if (dup.classList.contains("highlightPencil")) {
			dup.setAttribute("class", "highlightErrorPencil");
		}
		else if (dup.classList.contains("highlightReadOnly")) {
			dup.setAttribute("class", "highlightErrorReadOnly");
		}
	}
	return duplicates;
};

//END SHOW DUPLICATES FUNCTION
//BLUR FUNCTION

const resetCellMode = () => {
	for (let i = 0; i < inputEl.length; i++) {
		if (inputEl[i].value != inputEl[i].defaultValue && inputEl[i].maxLength == 1) {
			if (inputEl[i].readOnly == true) {
				if (
					inputEl[i].classList.contains("errorReadOnly") ||
					inputEl[i].classList.contains("highlightErrorReadOnly")
				) {
					if(
						rowDup.indexOf(inputEl[i]) != -1 ||
						colDup.indexOf(inputEl[i]) != -1 ||
						gridDup.indexOf(inputEl[i]) != -1
					) {
						inputEl[i].setAttribute("class", "errorReadOnly");
					}
					else inputEl[i].setAttribute("class", "readOnly");
				}
				else inputEl[i].setAttribute("class", "readOnly");
			}
			else {
				if (
					inputEl[i].classList.contains("errorPencil") ||
					inputEl[i].classList.contains("highlightErrorPencil")
				) {
					if(
						rowDup.indexOf(inputEl[i]) != -1 ||
						colDup.indexOf(inputEl[i]) != -1 ||
						gridDup.indexOf(inputEl[i]) != -1
					) {
						inputEl[i].setAttribute("class", "errorPencil");
					}
					else inputEl[i].setAttribute("class", "pencil");
				}
				else inputEl[i].setAttribute("class", "pencil");
			}
		}
	}
};

//END BLUR FUNCTION

export {
	highlight,
	findDuplicates,
	resetCellMode
};