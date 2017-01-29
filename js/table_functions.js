var rowDup = [];
var colDup = [];
var gridDup = [];
var cellHigh = [];

//HIGHLIGHT FUNCTION

function highlight(){
    var numObj = this;
    var numValue = numObj.value;
    cellHigh.clear();
    if (numValue >=1 && numValue <=9){ //skip empty cells
        if (numObj.maxLength == 1){ //skip notes
            for (var i = 0; i < inputObj.length; i++) {
                if (inputObj[i].maxLength == 1){ //skip notes
                    if (numValue == inputObj[i].value){
                        cellHigh.push(inputObj[i]); //push cell ids with same values to cellHigh
                    }
                }
            }
            for (var j = 0; j < cellHigh.length; j++) {
                if(cellHigh[j].readOnly == true){
                    if(cellHigh[j].classList.contains("errorReadOnly") == true || cellHigh[j].classList.contains("highlightErrorReadOnly") == true){
                        cellHigh[j].setAttribute("class", "highlightErrorReadOnly");
                    }
                    else{
                        cellHigh[j].setAttribute("class", "highlightReadOnly");
                    }
                }
                else if(cellHigh[j].readOnly == false){
                    if(cellHigh[j].classList.contains("errorPencil") == true || cellHigh[j].classList.contains("highlightErrorPencil") == true){
                        cellHigh[j].setAttribute("class", "highlightErrorPencil");
                    }
                    else{
                        cellHigh[j].setAttribute("class", "highlightPencil");
                    }
                }
            }
        }
    }
}

//END HIGHLIGHT FUNCTION
// SHOW DUPLICATES FUNCTION

function findDuplicates() {
    rowDup.clear();
    colDup.clear();
    gridDup.clear();
    rowDup = showDuplicates(pencilRow);
    colDup = showDuplicates(pencilCol);
    gridDup = showDuplicates(pencilGrid);
}

function showDuplicates(arr) {
    var duplicates = [];
    for (var j = 0; j < arr.length; j++){
        for (var i = 0; i < arr[j].length; i++) {
            for (var k = 1; k < arr[j].length - i; k++) {
                var n = i + k;
                if (arr[j][i].value == arr[j][n].value) {
                    duplicates.push(arr[j][i]);
                    duplicates.push(arr[j][n]);
                }
            }
        }
    }
    for (var m = 0; m < duplicates.length; m++) {
        var dup = duplicates[m];
        if(dup.classList.contains("readOnly")) dup.setAttribute("class", "errorReadOnly");
        else if (dup.classList.contains("pencil"))dup.setAttribute("class", "errorPencil");
        else if (dup.classList.contains("highlightPencil"))dup.setAttribute("class", "highlightErrorPencil");
        else if (dup.classList.contains("highlightReadOnly"))dup.setAttribute("class", "highlightErrorReadOnly");

    }
    return duplicates;
}

//END SHOW DUPLICATES FUNCTION
//BLUR FUNCTION

function resetCellMode(){
	for (var i = 0; i < inputObj.length; i++) {
        if (inputObj[i].value != inputObj[i].defaultValue && inputObj[i].maxLength == 1) {
            if (inputObj[i].readOnly == true) {
                if (inputObj[i].classList.contains("errorReadOnly") || inputObj[i].classList.contains("highlightErrorReadOnly")) {
                    if(rowDup.indexOf(inputObj[i]) != -1 || colDup.indexOf(inputObj[i]) != -1 || gridDup.indexOf(inputObj[i]) != -1){
                        inputObj[i].setAttribute("class", "errorReadOnly");
                    }
                    else inputObj[i].setAttribute("class", "readOnly");
                }
                else inputObj[i].setAttribute("class", "readOnly");
            }
            else {
                if (inputObj[i].classList.contains("errorPencil") || inputObj[i].classList.contains("highlightErrorPencil")) {
                    if(rowDup.indexOf(inputObj[i]) != -1 || colDup.indexOf(inputObj[i]) != -1 || gridDup.indexOf(inputObj[i]) != -1){
                        inputObj[i].setAttribute("class", "errorPencil");
                    }
                    else inputObj[i].setAttribute("class", "pencil");
                }
                else inputObj[i].setAttribute("class", "pencil");
            }
        }
    }
}

//END BLUR FUNCTION