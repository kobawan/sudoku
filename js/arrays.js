var pencilRowValue = [], pencilColValue = [], pencilRowId = [], pencilColId = [], pencilGridValue = [], pencilGridId = [];
var notesRowValue = [], notesColValue = [], notesRowId = [], notesColId = [], notesGridValue = [], notesGridId = [];

function getArrays(arrayval,arrayid,type,mode){
    var len = 9;
    arrayval.length = 0;
    arrayid.length = 0;
    if (type == "row" || type == "col"){
        for(var row1=0; row1<len; row1++){
            arrayval.push([]);
            arrayid.push([]);
            for(var col1=0; col1<len; col1++){
                if(type == "row"){
                    var cellsObj = sudokuTable.rows[row1].cells[col1].children[0];
                }
                else if(type == "col"){
                    var cellsObj = sudokuTable.rows[col1].cells[row1].children[0];
                }
                if (cellsObj.value != cellsObj.defaultValue){
                    if(mode=="pencil"){
                        if (cellsObj.maxLength == 1){
                            arrayval[row1].push(cellsObj.value);
                            arrayid[row1].push(cellsObj.id);
                        }
                    }
                    else if(mode=="notes"){
                        if (cellsObj.maxLength == 9){
                            arrayval[row1].push(cellsObj.value);
                            arrayid[row1].push(cellsObj.id);
                        }
                    }
                }
            }
        }
    }
    else if(type == "grid"){
        for(var rowtable=0; rowtable<7; rowtable+=3){ // 3 rows of grids
            for(var arrgroup=rowtable, coltable=0; arrgroup<3+rowtable, coltable<7; arrgroup++, coltable+=3){ //3 cols of grids
                arrayval.push([]);
                arrayid.push([]);
                for(var rowgrid=0; rowgrid<3; rowgrid++){ //3 rows in grid
                    var row2 = rowgrid + rowtable; //rows in table
                    for(var colgrid=0; colgrid<3; colgrid++){ //3 cols in grid
                        var col2 = colgrid + coltable; //cols in table
                        var cellsObj = sudokuTable.rows[row2].cells[col2].children[0];
                        if (cellsObj.value != cellsObj.defaultValue){
                            if(mode=="pencil"){
                                if (cellsObj.maxLength == 1){
                                    arrayval[arrgroup].push(cellsObj.value);
                                    arrayid[arrgroup].push(cellsObj.id);
                                }
                            }
                            else if(mode=="notes"){
                                if (cellsObj.maxLength == 9){
                                    arrayval[arrgroup].push(cellsObj.value);
                                    arrayid[arrgroup].push(cellsObj.id);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function updateArrays(){
    getArrays(pencilRowValue,pencilRowId,"row","pencil");
    getArrays(pencilColValue,pencilColId,"col","pencil");
    getArrays(pencilGridValue,pencilGridId,"grid","pencil");
    getArrays(notesRowValue,notesRowId,"row","notes");
    getArrays(notesColValue,notesColId,"col","notes");
    getArrays(notesGridValue,notesGridId,"grid","notes");
}