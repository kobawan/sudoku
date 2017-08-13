import { pencilbutton, sudokuTable } from "./initializing";

//ARROW KEYS FUNCTION

const arrowKeys = () => {
	let coorRow = this.parentNode.parentNode.rowIndex; //row
	let coorCol = this.parentNode.cellIndex; //column
	if(event.keyCode == 39) { //right arrow
		if(coorCol == 8) coorCol = 0;
		else coorCol++;
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly) {
			if(coorCol == 8) coorCol = 0;
			else coorCol++;
		}
		sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
	}
	else if(event.keyCode == 37) { //left arrow
		if(coorCol == 0) coorCol = 8;
		else coorCol--;
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly) {
			if(coorCol == 0) coorCol = 8;
			else coorCol--;
		}
		sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
	}
	else if(event.keyCode == 40) { //down arrow
		if(coorRow == 8) coorRow = 0;
		else coorRow++;
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly) {
			if(coorRow == 8) coorRow = 0;
			else coorRow++;
		}
		sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
	}
	else if(event.keyCode == 38) { //up arrow
		if(coorRow == 0) coorRow = 8;
		else coorRow--;
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly) {
			if(coorRow == 0) coorRow = 8;
			else coorRow--;
		}
		sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
	}
};

//END ARROW KEYS FUNCTION
//SELECT MODE

const selectValue = () => { //focus
	if (pencilbutton.className == "buttonTemplate2on") { //notes mode
		if (this.maxLength == 1 && this.readOnly === false) this.select(); //pencil cell
	}
	else if (pencilbutton.className == "buttonTemplate2off") { // pencil mode
		if (this.maxLength == 9) this.select(); //notes cell
		if (this.maxLength == 1 && this.readOnly === false) this.select(); //pencil cell
	}
};

//END SELECT MODE
//CHANGE MODE

const changeCellMode = () => { //input
	if (pencilbutton.className == "buttonTemplate2off") { // pencil mode
		if(this.readOnly == true) {
			this.setAttribute("class", "readOnly");
		}
		else{
			this.maxLength = 1;
			this.setAttribute("class", "pencil");
		}
	}
	else if (pencilbutton.className == "buttonTemplate2on") { //notes mode
		if(this.readOnly == true) {
			this.setAttribute("class", "readOnly");
		}
		else{
			this.maxLength = 9;
			this.setAttribute("class", "notes");
		}
	}
};

//END CHANGE MODE/**

const inputError = () => {
	if(this.readOnly != true && pencilbutton.className == "buttonTemplate2off") {
		const filterInput = parseInt(this.value);
		if (isNaN(filterInput) == true) {
			this.value = this.defaultValue;
		}
	}
};

export {
	arrowKeys,
	selectValue,
	changeCellMode,
	inputError
};
