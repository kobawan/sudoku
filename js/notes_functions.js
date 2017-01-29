var coorRow, coorCol, coorGrid;
function findCoordinates(cell){
    coorRow = cell.parentNode.parentNode.rowIndex; //row
    coorCol = cell.parentNode.cellIndex; //column
    for (var j = 0; j < pencilGrid.length; j++){  //find grid number
        for (var i = 0; i < pencilGrid[j].length; i++) {
            if (pencilGrid[j][i].id == cell.id) {
                coorGrid = j;
            }
        }
    }
}

function removePencilNotesDup(cell,arr,coor){ //remove notes for row, col and grid
    if(arr[coor].length != 0){ //group is not empty
        for (var i = 0; i < arr[coor].length; i++) { //go through group of notes
            var notesString = arr[coor][i].value;
            if(notesString.indexOf(cell.value) != -1){ // notes array contains same value as numValue
                var pos = notesString.indexOf(cell.value);
                notesString = notesString.substr(0,pos) + notesString.substr(pos+1, notesString.length);
                arr[coor][i].value = notesString;
            }
        }
    }
}

function removeNotesDup(arr) {
    if (arr.length!=1){
        for (var j = 0; j < arr.length; j++){
            for (var k = 1; k < arr.length - j; k++) {
                if (arr[j] == arr[j+k]) {
                    arr.splice(j+k,1);
                }
            }
        }
    }
    return arr;
}

function removeNotes(){
    if (pencilbutton.className == "buttonTemplate2off"){ // pencil mode
        if (this.maxLength == 1 && this.readOnly === false){ //pencil cell
            if (this.value != this.defaultValue){ //skip empty cells
                findCoordinates(this);
                removePencilNotesDup(this,notesRow,coorRow);
                removePencilNotesDup(this,notesCol,coorCol);
                removePencilNotesDup(this,notesGrid,coorGrid);
            }
        }
    }
    if (notesbutton.className == "buttonTemplate2off") { // notes mode
        if (this.value != this.defaultValue && this.maxLength == 9){ // only for notes cells
            var val = this.value;
            var noteArray = val.split(""); // array for notes in the cell
            for(var i=0; i<noteArray.length; i++){
                noteArray[i]= Number(noteArray[i]);
            }
            var tmp = noteArray.sort(); // sort the numbers
            var tmp1 = removeNotesDup(tmp); //remove duplicates
            var tmp2 = tmp1.filter(Boolean); //remove false values
            var tmp3 = tmp2.filter(Number); //keep only numbers
            this.value = tmp3.join(""); //put the notes array back into cell without commas
        }
    }
}