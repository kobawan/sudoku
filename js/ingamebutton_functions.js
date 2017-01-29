//CELL MODE

function cellMode(buttonMode) {
	for (var i = 0; i < inputObj.length; i++) {
		if (buttonMode == "togglepencil"){ //pencil mode
			pencilbutton.setAttribute("class", "buttonTemplate2off");
			notesbutton.setAttribute("class", "buttonTemplate2on");
			if (inputObj[i].value == inputObj[i].defaultValue){ //only for empty cells
				inputObj[i].maxLength = 1;
				inputObj[i].setAttribute("class", "pencil");
			}
		}
		else if (buttonMode == "togglenotes"){ //notes mode
			pencilbutton.setAttribute("class", "buttonTemplate2on");
			notesbutton.setAttribute("class", "buttonTemplate2off");
			if (inputObj[i].value == inputObj[i].defaultValue){ //only for empty cells
				inputObj[i].maxLength = 9;
				inputObj[i].setAttribute("class", "notes");
			}
		}
	}
}

//END CELL MODE
//RESET BUTTON

function reset(){
	var x = confirm("Are you sure you want to reset?");
	if (x == true){
		for(var i=0; i<81; i++){
			inputObj[i].value = inputObj[i].defaultValue;
		}
        cellMode("togglepencil");
		beginPuzzle(mask);
	}
}

//END RESET BUTTON
//SOLVE BUTTON

function solve(){
	var x = confirm("Are you sure you want to solve?");
	if (x == true){
		cellMode("togglepencil");
		enableMessage("Correct!<br>You have won the game!");
		for (var i = 0; i < 81; i++) {
			inputObj[i].value = matrix[i];
		}
	}
}

//END SOLVE BUTTON
//IN-GAME FUNCTION

function win(){
	var condition = 0;
    for (var i=0; i<81; i++){
        if(inputObj[i].classList.contains("errorPencil") != true || inputObj[i].classList.contains("highlightErrorPencil") != true){
        	if(inputObj[i].classList.contains("errorReadOnly") != true || inputObj[i].classList.contains("highlightReadOnly") != true){
        		if(inputObj[i].value == inputObj[i].defaultValue){
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
	if(condition == 0){
        enableMessage("Correct!<br>You have won the game!");
	}
}

//END IN-GAME FUNCTION
//CHECK BUTTON

function check() {
    var wrongCells = [];
	if(rowDup.length != 0 || colDup.length != 0 || gridDup.length != 0){
		var tmp = rowDup.concat(colDup,gridDup);
		var allDup = removeDuplicates(tmp);
		for(var i=0; i<allDup.length; i++){
            var row = allDup[i].parentNode.parentNode.rowIndex; // row
            var col = allDup[i].parentNode.cellIndex; //column
            for(var a=0; a<9; a++){
                var alphabet = "ABCDEFGHI";
                if (col == a){
                    col = alphabet[a]; //assign letter to column
					break;
				}
            }
            wrongCells.push(col + (row+1));
        }
	}
	if (wrongCells.length > 0){  //if values are not same as solution so far
		enableMessage("Cells " + wrongCells + " are incorrect.");
	}
	else enableMessage("Correct so far!"); //if values are same as solution so far
}

//END CHECK BUTTON
//ENABLE MESSAGE

function enableMessage(text){
	document.getElementById("answerMessage").style.display = "block";
	document.getElementById("coorX").style.display = "block";
	document.getElementById("coorY").style.display = "block";			
	document.getElementById("tables").style.width = "429px";
	document.getElementById("tables").style.height = "429px";
	document.getElementById("tables").style.padding = "0px";
	document.getElementById("inputAnswer").innerHTML = text;
}

//END ENABLE MESSAGE
//DISABLE MESSAGE

function disableMessage(){
	document.getElementById("answerMessage").style.display = "none";
	document.getElementById("coorX").style.display = "none";
	document.getElementById("coorY").style.display = "none";
	document.getElementById("tables").style.width = "347px";
	document.getElementById("tables").style.height = "347px";
	document.getElementById("tables").style.padding = "41px";
}

//END DISABLE MESSAGE

function slideMenu(){
    var sideMenu = document.getElementById("sideMenuWrapper");
    if(sideMenu.style.display == "block"){
        sideMenu.style.display = "none";
    }
    else sideMenu.style.display = "block";
}

function resumeGame(){
    if(matrix.length >= 1){
        document.getElementById("startWrapper").style.display = "none";
        document.getElementById("tables").style.display = "block";
        document.getElementById("sideButtons").style.display = "block";
        document.getElementById("sideMenu").style.display = "block";
        document.getElementById("sideMenuWrapper").style.display = "block";
    }
}