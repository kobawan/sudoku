// COMBOS PENCIL FUNCTION

function updatePencil(){
	var arrRowValue = [], arrColValue = [], arrRowId = [], arrColId = [], arrSol = [], arrGridValue = [], arrGridId = [];
	var len = 9, arrlen = 0;
	var puzzle = document.getElementById("sudoku");
	for(var x=0; x<len; x++){
		arrRowValue.push([]);
		arrRowId.push([]);
		arrSol.push([]);
		arrColValue.push([]);
		arrColId.push([]);
		for(var y=0; y<len; y++){ 
			var inputNumber2 = puzzle.rows[x].cells[y].children[0]; //arrays in rows
			if (inputNumber2.maxLength == 1){ //skip notes
				if (inputNumber2.value >= 1 && inputNumber2.value <= 9){  //skip empty cells
					arrRowValue[x].push(inputNumber2.value); //input values 
					arrRowId[x].push(inputNumber2.id); //input ids
					arrSol[x].push(solution.substring((9*x)+y, (9*x)+(y+1))); //input solutions
					arrlen++; //length of array
				}
			}
			var inputNumber3 = puzzle.rows[y].cells[x].children[0]; //arrays in columns
			if (inputNumber3.maxLength == 1){ //skip notes
				if (inputNumber3.value >= 1 && inputNumber3.value <= 9){ //skip empty cells
					arrColValue[x].push(inputNumber3.value); //input values
					arrColId[x].push(inputNumber3.id); //input ids
				}
			}
		}
	}
	//arrays in grid
	for(var j=0; j<7; j+=3){ // 3 rows of squares	
		for(var x=0+j, b=0; x<3+j, b<7; x++, b+=3){ //3 squares
			arrGridValue.push([]);
			arrGridId.push([]);
			for(var i=0; i<7; i+=3){ //3 rows in square
				var a = (i/3) + j; //rows in table
				for(var y=0+i, c=0; y<3+i, c<3; y++, c++){ //3 cells
					var d = c + b; //cells in grid
					var inputNumber4 = puzzle.rows[a].cells[d].children[0];			
					if (inputNumber4.maxLength == 1){ //skip notes
						if (inputNumber4.value >= 1 && inputNumber4.value <= 9){  //skip empty cells
							arrGridValue[x].push(inputNumber4.value);
							arrGridId[x].push(inputNumber4.id);
						}
					}
				}
			}
		}
	}
	return [arrRowValue, arrRowId, arrColValue, arrColId, arrGridValue, arrGridId, arrlen, arrSol];
}

//END COMBOS PENCIL FUNCTION
// COMBOS NOTES FUNCTION

function combosNotes(){
	var arrRowValue = [], arrColValue = [], arrRowId = [], arrColId = [], arrGridValue = [], arrGridId = [];
	var len = 9;
	var puzzle = document.getElementById("sudoku");
	for(var x=0; x<len; x++){
		arrRowValue.push([]);
		arrRowId.push([]);
		arrColValue.push([]);
		arrColId.push([]);
		for(var y=0; y<len; y++){ 
			var inputNumber2 = puzzle.rows[x].cells[y].children[0]; //arrays in rows
			if (inputNumber2.maxLength == 9){ //skip pencil
				if (!(inputNumber2.value == inputNumber2.defaultValue)){  //skip empty cells
					arrRowValue[x].push(inputNumber2.value); //input values 
					arrRowId[x].push(inputNumber2.id); //input ids
				}
			}
			var inputNumber3 = puzzle.rows[y].cells[x].children[0]; //arrays in columns
			if (inputNumber3.maxLength == 9){ //skip pencil
				if (!(inputNumber3.value == inputNumber3.defaultValue)){ //skip empty cells
					arrColValue[x].push(inputNumber3.value); //input values
					arrColId[x].push(inputNumber3.id); //input ids
				}
			}
		}
	}
	//arrays in grid
	for(var j=0; j<7; j+=3){ // 3 rows of squares	
		for(var x=0+j, b=0; x<3+j, b<7; x++, b+=3){ //3 squares
			arrGridValue.push([]);
			arrGridId.push([]);
			for(var i=0; i<7; i+=3){ //3 rows in square
				var a = (i/3) + j; //rows in table
				for(var y=0+i, c=0; y<3+i, c<3; y++, c++){ //3 cells
					var d = c + b;
					var inputNumber2 = puzzle.rows[a].cells[d].children[0];			
					if (inputNumber2.maxLength == 9){ //skip pencil
						if (!(inputNumber2.value == inputNumber2.defaultValue)){  //skip empty cells
							arrGridValue[x].push(inputNumber2.value);
							arrGridId[x].push(inputNumber2.id);
						}
					}
				}
			}
		}
	}
	return [arrRowValue, arrColValue, arrRowId, arrColId, arrGridValue, arrGridId];
}

//END COMBOS NOTES FUNCTION
//REMOVE NOTES FUNCTION

function removeNotes(){
	var numObj = this;
	var numId = this.id;
	var numValue = this.value;
	var comboArr = updatePencil();
	var arrGridIdPencil = comboArr[5];
	var comboArr2 = combosNotes();
	var arrRowNotes = comboArr2[0];
	var arrColNotes = comboArr2[1];
	var arrRowIdNotes = comboArr2[2];
	var arrColIdNotes = comboArr2[3];
	var arrGridNotes = comboArr2[4];
	var arrGridIdNotes = comboArr2[5];		
	if (sideButton1.className == "buttonTemplate2off"){ // pencil mode
		if (numObj.maxLength == 1 && numObj.readOnly === false){ //pencil cell
			if (numObj.value >= 1 && numObj.value <= 9){ //skip empty cells
				var coorRow = numObj.parentNode.parentNode.rowIndex; //row
				var coorCol = numObj.parentNode.cellIndex; //column
				var coorGrid; //grid
				for (var j = 0; j < arrGridIdPencil.length; j++){  //find grid number
					for (var i = 0; i < arrGridIdPencil[j].length; i++) {
						if (arrGridIdPencil[j][i] == numId) {         
							coorGrid = j;
						}
					}
				}
				removeNotes2(numValue,arrRowNotes,arrRowIdNotes,coorRow);
				removeNotes2(numValue,arrColNotes,arrColIdNotes,coorCol);
				removeNotes2(numValue,arrGridNotes,arrGridIdNotes,coorGrid);
			}
		}
	}
}

function removeNotes2(objValue,arrVal,arrId,coor){ //remove notes for row, col and grid
	if(!(arrVal[coor].length == 0)){ //group is not empty
		for (var i = 0; i < arrVal[coor].length; i++) { //go through group of notes
			var arrNotes = arrVal[coor][i];
			if(!(arrNotes.indexOf(objValue) == -1)){ // notes array contains same value as numValue
				var pos = arrNotes.indexOf(objValue);
				arrNotes = arrNotes.substr(0,pos) + arrNotes.substr(pos+1, arrNotes.length);	
				document.getElementById(arrId[coor][i]).value = arrNotes;
			}
		}
	}
}

//END REMOVE NOTES FUNCTION
//IN-GAME FUNCTION

function inGame(){
	var comboArr = updatePencil();
	var arrlen = comboArr[6];
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
}

//END IN-GAME FUNCTION
//CHANGE MODE

function changeMode(){ //input
	var numObj = this;
	if (sideButton1.className == "buttonTemplate2off"){ // pencil mode
		if(numObj.readOnly == true){
			numObj.setAttribute("class", "readOnly");
		}
		else{
			numObj.maxLength = 1;
			numObj.setAttribute("class", "pencil");
		}
	}
	else if (sideButton1.className == "buttonTemplate2on"){ //notes mode
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
	if (sideButton1.className == "buttonTemplate2on"){ //notes mode
		if (numObj.maxLength == 1 && numObj.readOnly === false) numObj.select(); //pencil cell
	}
	else if (sideButton1.className == "buttonTemplate2off"){ // pencil mode
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
	for (var i = 0; i < inputNumber.length; i++) {
		var inputNumber2 = document.getElementById(inputNumber[i]);
		// EMPTY CELLS
		if (inputNumber2.value == inputNumber2.defaultValue){ //allow to move from empty spaces
			if (sideButton1.className == "buttonTemplate2off"){ //if pencil button is active
				inputNumber2.setAttribute("class", "pencil");
			}
			else if (sideButton1.className == "buttonTemplate2on"){ //if notes button is active
				inputNumber2.setAttribute("class", "notes");
			}
		}
		//NON-EMPTY CELLS
		else{
			//PENCIL CELLS
			if(inputNumber2.maxLength == 1){	
				// READONLY CELLS	
				if(inputNumber2.readOnly == true){
					inputNumber2.setAttribute("class", "readOnly");
				}
				//PENCIL CELLS
				else if (inputNumber2.value >=1 && inputNumber2.value <=9){
					inputNumber2.setAttribute("class", "pencil");
				}
				//PENCIL ERROR
				else{
					inputNumber2.value = inputNumber2.defaultValue;
					inputNumber2.setAttribute("class", "pencil");
					enableMessage("Sorry, you can only use numbers from 1 to 9.");
				}
			}
			//NOTES CELLS
			else if(inputNumber2.maxLength == 9){
				inputNumber2.setAttribute("class", "notes");
			}
			//ERROR
			else console.log("Error in updateStyle() function. No category found for cell: " + inputNumber2);
		}
	}
	if (arrRowDup.length > 0){
		for (var i = 0; i < arrRowDup.length; i++) {
			var dup = document.getElementById(arrRowDup[i]);
			if(dup.readOnly) dup.setAttribute("class", "error2");
			else dup.setAttribute("class", "error1");
		}
	}
	if (arrColDup.length > 0){
		for (var i = 0; i < arrColDup.length; i++) {
			var dup = document.getElementById(arrColDup[i]);
			if(dup.readOnly) dup.setAttribute("class", "error2");
			else dup.setAttribute("class", "error1");
		}
	}
	if (arrGridDup.length > 0){
		for (var i = 0; i < arrGridDup.length; i++) {
			var dup = document.getElementById(arrGridDup[i]);
			if(dup.readOnly) dup.setAttribute("class", "error2");
			else dup.setAttribute("class", "error1");
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
			for (var i = 0; i < inputNumber.length; i++) {
				var inputNumber2 = document.getElementById(inputNumber[i]);
				if (inputNumber2.maxLength == 1){ //skip notes
					if (numValue == inputNumber2.value){
						numClass.push(inputNumber[i]); //push cell ids with same values to numClass
					}
				}
			}
			for (var i = 0; i < numClass.length; i++) {
				var numClass2 = document.getElementById(numClass[i]);
				if(numClass2.className === "error1" || numClass2.className === "error2" || numClass2.className === "highlight2"){
					numClass2.setAttribute("class", "highlight2");
				}
				else numClass2.setAttribute("class", "highlight1");
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
	for (var i = 0; i < duplicates.length; i++) {
		var dup = document.getElementById(duplicates[i]);
		if(dup.readOnly) dup.setAttribute("class", "error2");
		else dup.setAttribute("class", "error1");
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
	var puzzle = document.getElementById("sudoku");
	var coorRow = numObj.parentNode.parentNode.rowIndex; //row
	var coorCol = numObj.parentNode.cellIndex; //column
	if(event.keyCode == 39){ //right arrow
		if(coorCol == 8) coorCol = 0;
		else coorCol++;		
		while(puzzle.rows[coorRow].cells[coorCol].children[0].readOnly){
			if(coorCol == 8) coorCol = 0;
			else coorCol++;
		}
		puzzle.rows[coorRow].cells[coorCol].children[0].focus();
	}
	else if(event.keyCode == 37){ //left arrow
		if(coorCol == 0) coorCol = 8;
		else coorCol--;		
		while(puzzle.rows[coorRow].cells[coorCol].children[0].readOnly){
			if(coorCol == 0) coorCol = 8;
			else coorCol--;
		}
		puzzle.rows[coorRow].cells[coorCol].children[0].focus();
	}
	else if(event.keyCode == 40){ //down arrow
		if(coorRow == 8) coorRow = 0;
		else coorRow++;		
		while(puzzle.rows[coorRow].cells[coorCol].children[0].readOnly){
			if(coorRow == 8) coorRow = 0;
			else coorRow++;
		}
		puzzle.rows[coorRow].cells[coorCol].children[0].focus();
	}
	else if(event.keyCode == 38){ //up arrow
		if(coorRow == 0) coorRow = 8;
		else coorRow--;		
		while(puzzle.rows[coorRow].cells[coorCol].children[0].readOnly){
			if(coorRow == 0) coorRow = 8;
			else coorRow--;
		}
		puzzle.rows[coorRow].cells[coorCol].children[0].focus();
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
				if (arrRowValue[j][i] == arrSol[j][i]) continue; //if cell is same as solution 
				else {
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