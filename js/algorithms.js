//IN-GAME FUNCTION

function inGame(){
	var showDup = showDuplicates();
	var arrRowDup = showDup[0];
	var arrColDup = showDup[1];
	var arrGridDup = showDup[2];
	for (var i=0; i<9; i++){
        if (pencilRowValue.length == 9 && pencilRowValue[i].length == 9){ //If all cells have values
            if (arrRowDup.length == 0 && arrColDup.length == 0 && arrGridDup.length == 0){ //no colliding values
                enableMessage("Correct!<br>You have won the game!");
            }
            else enableMessage("Incorrect!<br>Click check button for hint."); //colliding values
        }
	}
}

//END IN-GAME FUNCTION
//CHANGE MODE

function changeMode(){ //input
	var numObj = this;
	if (pencilbutton.className == "buttonTemplate2off"){ // pencil mode
		if(numObj.readOnly == true){
			numObj.setAttribute("class", "readOnly");
		}
		else{
			numObj.maxLength = 1;
			numObj.setAttribute("class", "pencil");
		}
	}
	else if (pencilbutton.className == "buttonTemplate2on"){ //notes mode
		if(numObj.readOnly == true){
			numObj.setAttribute("class", "readOnly");
		}
		else{
			numObj.maxLength = 9;
			numObj.setAttribute("class", "notes");
		}
	}
}

//END CHANGE MODE
//SELECT MODE

function selectValue(){ //focus
	var numObj = this;
	if (pencilbutton.className == "buttonTemplate2on"){ //notes mode
		if (numObj.maxLength == 1 && numObj.readOnly === false) numObj.select(); //pencil cell
	}
	else if (pencilbutton.className == "buttonTemplate2off"){ // pencil mode
		if (numObj.maxLength == 9) numObj.select(); //notes cell
		if (numObj.maxLength == 1 && numObj.readOnly === false) numObj.select(); //pencil cell
	}
}

//END SELECT MODE
//BLUR FUNCTION

function updateStyle(){
	var showDup = showDuplicates();	
	var arrRowDup = showDup[0];
	var arrColDup = showDup[1];
	var arrGridDup = showDup[2];
	for (var i = 0; i < inputObj.length; i++) {
		// EMPTY CELLS
		if (inputObj[i].value == inputObj[i].defaultValue){ //allow to move from empty spaces
			if (pencilbutton.className == "buttonTemplate2off"){ //if pencil button is active
				inputObj[i].setAttribute("class", "pencil");
			}
			else if (pencilbutton.className == "buttonTemplate2on"){ //if notes button is active
				inputObj[i].setAttribute("class", "notes");
			}
		}
		//NON-EMPTY CELLS
		else{
			//PENCIL CELLS
			if(inputObj[i].maxLength == 1){
				// READONLY CELLS	
				if(inputObj[i].readOnly == true){
					inputObj[i].setAttribute("class", "readOnly");
				}
				//PENCIL CELLS
				else if (inputObj[i].value >=1 && inputObj[i].value <=9){
					inputObj[i].setAttribute("class", "pencil");
				}
				//PENCIL ERROR
				else{
					inputObj[i].value = inputObj[i].defaultValue;
					inputObj[i].setAttribute("class", "pencil");
					enableMessage("Sorry, you can only use numbers from 1 to 9.");
				}
			}
			//NOTES CELLS
			else if(inputObj[i].maxLength == 9){
				inputObj[i].setAttribute("class", "notes");
			}
			//ERROR
			else console.log("Error in updateStyle() function. No category found for cell: " + inputObj[i].id);
		}
	}
	if (arrRowDup.length > 0){
		for (var j = 0; j < arrRowDup.length; j++) {
			var dup1 = document.getElementById(arrRowDup[j]);
			if(dup1.readOnly) dup1.setAttribute("class", "errorReadOnly");
			else dup1.setAttribute("class", "errorPencil");
		}
	}
	if (arrColDup.length > 0){
		for (var l = 0; l < arrColDup.length; l++) {
			var dup2 = document.getElementById(arrColDup[l]);
			if(dup2.readOnly) dup2.setAttribute("class", "errorReadOnly");
			else dup2.setAttribute("class", "errorPencil");
		}
	}
	if (arrGridDup.length > 0){
		for (var m = 0; m < arrGridDup.length; m++) {
			var dup3 = document.getElementById(arrGridDup[m]);
			if(dup3.readOnly) dup3.setAttribute("class", "errorReadOnly");
			else dup3.setAttribute("class", "errorPencil");
		}
	}
}

//END BLUR FUNCTION
//HIGHLIGHT FUNCTION

function highlight(){
	var numClass = [];
	var numObj = this;
	var numValue = numObj.value;
	if (numValue >=1 && numValue <=9){ //skip empty cells
		if (numObj.maxLength == 1){ //skip notes
			for (var i = 0; i < inputObj.length; i++) {
				if (inputObj[i].maxLength == 1){ //skip notes
					if (numValue == inputObj[i].value){
						numClass.push(inputObj[i]); //push cell ids with same values to numClass
					}
				}
			}
			for (var j = 0; j < numClass.length; j++) {
				if(numClass[j].readOnly == true){
					if(numClass[j].classList.contains("errorReadOnly") == true || numClass[j].classList.contains("highlightErrorReadOnly") == true){
						numClass[j].setAttribute("class", "highlightErrorReadOnly");
					}
					else{
						numClass[j].setAttribute("class", "highlightReadOnly");
					}
				}
				else if(numClass[j].readOnly == false){
					if(numClass[j].classList.contains("errorPencil") == true || numClass[j].classList.contains("highlightErrorPencil") == true){
						numClass[j].setAttribute("class", "highlightErrorPencil");
					}
					else{
						numClass[j].setAttribute("class", "highlightPencil");
					} 
				}
			}
		}			
	}			
}

//END HIGHLIGHT FUNCTION
// SHOW DUPLICATES FUNCTION

function showDuplicates() {
	var comboArr = updatePencil();
	var arrRowValue = comboArr[0];
	var arrRowId = comboArr[1];
	var arrColValue = comboArr[2];
	var arrColId = comboArr[3];
	var arrGridValue = comboArr[4];
	var arrGridId = comboArr[5];
	
	var arrRowDup = findDuplicates(arrRowValue, arrRowId);
	var arrColDup = findDuplicates(arrColValue, arrColId);
	var arrGridDup = findDuplicates(arrGridValue, arrGridId);
	
	return [arrRowDup, arrColDup, arrGridDup];
}

function findDuplicates(arrValue, arrId) {
	var duplicates = [];
	for (var j = 0; j < arrValue.length; j++){
		for (var i = 0; i < arrValue[j].length; i++) {
			for (var k = 1; k <= arrValue[j].length - i; k++) {
				if (arrValue[j][i] == arrValue[j][i + k]) {         
					duplicates.push(arrId[j][i]);
					duplicates.push(arrId[j][i + k]);
				}
			}
		}
	}
	for (var m = 0; m < duplicates.length; m++) {
		var dup = document.getElementById(duplicates[m]);
		if(dup.readOnly) dup.setAttribute("class", "errorReadOnly");
		else dup.setAttribute("class", "errorPencil");
	}
	return duplicates;
}

//END SHOW DUPLICATES FUNCTION
//NOTES POSITION FUNCTION

function notesPosition(){
	var numObj = this;
	var numValue = numObj.value;
	if (!(numValue == numObj.defaultValue) && numObj.maxLength == 9){ // only for notes cells
		var noteArray = []; // array for notes in the cell
		for (var i = 0; i < numValue.length; i++) {
			noteArray[i] = numValue[i];
		}
		noteArray.sort(); // sort the numbers
		var noteArray2 = removeDuplicates(noteArray); //remove duplicates
		var noteArray3 = noteArray2.filter(Boolean); //remove false values
		var noteArray4 = noteArray3.filter(Number); //keep only numbers
		numObj.value = noteArray4.join(""); //put the notes array back into cell without commas
	}
}

function removeDuplicates(arr) {
	var i, out=[], obj={};
	for (i=0; i<arr.length; i++) {
		obj[arr[i]]=0;
	}
	for (i in obj) {
		out.push(i);
	}
	return out;
}

//END NOTES POSITION FUNCTION
//ARROW KEYS FUNCTION

function arrowKeys(){
	var numObj = this;
	var coorRow = numObj.parentNode.parentNode.rowIndex; //row
	var coorCol = numObj.parentNode.cellIndex; //column
	if(event.keyCode == 39){ //right arrow
		if(coorCol == 8) coorCol = 0;
		else coorCol++;		
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly){
			if(coorCol == 8) coorCol = 0;
			else coorCol++;
		}
		sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
	}
	else if(event.keyCode == 37){ //left arrow
		if(coorCol == 0) coorCol = 8;
		else coorCol--;		
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly){
			if(coorCol == 0) coorCol = 8;
			else coorCol--;
		}
		sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
	}
	else if(event.keyCode == 40){ //down arrow
		if(coorRow == 8) coorRow = 0;
		else coorRow++;		
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly){
			if(coorRow == 8) coorRow = 0;
			else coorRow++;
		}
		sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
	}
	else if(event.keyCode == 38){ //up arrow
		if(coorRow == 0) coorRow = 8;
		else coorRow--;		
		while(sudokuTable.rows[coorRow].cells[coorCol].children[0].readOnly){
			if(coorRow == 0) coorRow = 8;
			else coorRow--;
		}
		sudokuTable.rows[coorRow].cells[coorCol].children[0].focus();
	}
}

//END ARROW KEYS FUNCTION
//CHECK BUTTON

function check() {
	var comboArr = updatePencil();
	var arrRowValue = comboArr[0];
	var arrRowId = comboArr[1];
	var arrlen = comboArr[6];
	var arrSol = comboArr[7];
	var showDup = showDuplicates();	
	var arrRowDup = showDup[0];
	var arrColDup = showDup[1];
	var arrGridDup = showDup[2];
	if (arrlen == 81){ //If all cells have values
		if (arrRowDup.length == 0 && arrColDup.length == 0 && arrGridDup.length == 0){ //no colliding values
			enableMessage("Correct!<br>You have won the game!");
		}
		else enableMessage("Incorrect!<br>Click check button for hint."); //colliding values
	}
	else { //Not all cells have values
		var wrongCells = [];
		for (var j = 0; j < arrRowValue.length; j++){
			for (var i = 0; i < arrRowValue[j].length; i++) {
				if (arrRowValue[j][i] != arrSol[j][i]) { //if cell is not same as solution
					var coorId = document.getElementById(arrRowId[j][i]);
					var coorRow = coorId.parentNode.parentNode.rowIndex; // row
					var coorCol = coorId.parentNode.cellIndex; //column
					for(var a=0; a<9; a++){
						var alphabet = "ABCDEFGHI";
						if (coorCol == a) coorCol = alphabet[a]; //assign letter to column
					}
					wrongCells.push("Cell " + coorCol + (coorRow+1) + " should be " + arrSol[j][i]);					
				}
			}
		}
		if (wrongCells.length > 0){  //if values are not same as solution so far
			enableMessage("Incorrect!<br>" + wrongCells.join("<br>"));
		}
		else enableMessage("Correct so far!"); //if values are same as solution so far
	}
}

//END CHECK BUTTON