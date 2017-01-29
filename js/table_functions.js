//HIGHLIGHT FUNCTION

function highlight(){
    var numObj = this;
    var numValue = numObj.value;
    var numClass = [];
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

function findDuplicates() {
    showDuplicates(pencilRow);
    showDuplicates(pencilCol);
    showDuplicates(pencilGrid);
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
}

//END SHOW DUPLICATES FUNCTION
//BLUR FUNCTION

function resetCellMode(){
	for (var i = 0; i < inputObj.length; i++) {
        if (inputObj[i].value != inputObj[i].defaultValue && inputObj[i].maxLength == 1) {
            if (inputObj[i].readOnly == true) {
                if (inputObj[i].classList.contains("errorReadOnly") || inputObj[i].classList.contains("highlightErrorReadOnly")) {
                    inputObj[i].setAttribute("class", "errorReadOnly");
                }
                else inputObj[i].setAttribute("class", "readOnly");
            }
            else {
                if (inputObj[i].classList.contains("errorPencil") || inputObj[i].classList.contains("highlightErrorPencil")) {
                    inputObj[i].setAttribute("class", "errorPencil");
                }
                else inputObj[i].setAttribute("class", "pencil");
            }
        }
    }
}

//END BLUR FUNCTION