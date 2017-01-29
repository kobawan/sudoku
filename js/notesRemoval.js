var coorRow, coorCol, coorGrid;
function findCoordinates(cell,arrGridVal){
    coorRow = cell.parentNode.parentNode.rowIndex; //row
    coorCol = cell.parentNode.cellIndex; //column
    coorGrid; //grid
    for (var j = 0; j < arrGridVal.length; j++){  //find grid number
        for (var i = 0; i < arrGridVal[j].length; i++) {
            if (arrGridVal[j][i] == cell.value) {
                coorGrid = j;
            }
        }
    }
}

function removeValues(cell,arrVal,arrId,coor){ //remove notes for row, col and grid
    if(arrVal[coor].length != 0){ //group is not empty
        for (var i = 0; i < arrVal[coor].length; i++) { //go through group of notes
            var notesString = arrVal[coor][i];
            if(notesString.indexOf(cell.value) != -1){ // notes array contains same value as numValue
                var pos = notesString.indexOf(cell.value);
                notesString = notesString.substr(0,pos) + notesString.substr(pos+1, notesString.length);
                document.getElementById(arrId[coor][i]).value = notesString;
            }
        }
    }
}

function removeNotes(){
    if (pencilbutton.className == "buttonTemplate2off"){ // pencil mode
        if (this.maxLength == 1 && this.readOnly === false){ //pencil cell
            if (this.value != this.defaultValue){ //skip empty cells
                findCoordinates(this,notesGridValue);
                removeValues(this,notesRowValue,notesRowId,coorRow);
                removeValues(this,notesColValue,notesColId,coorCol);
                removeValues(this,notesGridValue,notesGridId,coorGrid);
            }
        }
    }
}