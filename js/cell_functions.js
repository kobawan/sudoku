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
//CHANGE MODE

function changeCellMode(){ //input
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

//END CHANGE MODE/**

function inputError(){
    if(this.readOnly != true && pencilbutton.className == "buttonTemplate2off") {
        var filterInput = parseInt(this.value);
        if (isNaN(filterInput) == true) {
            this.value = this.defaultValue;
        }
    }
}