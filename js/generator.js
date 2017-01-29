Array.prototype.clear = function() {
    var i = this.length;
    while (i--) {
        this[i] = 0;
    }
};

var matrix = [];
var mask = [];

function shuffle(matrix) {
    for (var x = 0; x < 9; x++) {
        for (var z = 0; z < 9; z++) {
            matrix[x * 9 + z] = (x * 3 + Math.floor(x / 3) + z) % 9 + 1;
        }
    }
    //shuffle values
    for(var j = 0; j < 77; j++) { //to randomize values as different as possible from previous puzzle
        var n1 = Math.ceil(Math.random() * 9);
        var n2;
        do {
            n2 = Math.ceil(Math.random() * 9);
        }
        while (n1 == n2); //to make sure n1 does not equal n2

        for (var row1 = 0; row1 < 9; row1++) {
            for (var col1 = 0; col1 < 9; col1++) {
                if (matrix[row1 * 9 + col1] == n1)
                    matrix[row1 * 9 + col1] = n2;
                else if (matrix[row1 * 9 + col1] == n2)
                    matrix[row1 * 9 + col1] = n1;
            }
        }
    }
    //shuffle columns of grids
    for (var s = 0; s < 42; s++) {
        var s1 = Math.floor(Math.random() * 3);
        var s2 = Math.floor(Math.random() * 3);

        for(var row2 = 0; row2 < 9; row2++) {
            var tmp1 = this.matrix[row2 * 9 + (s1 * 3 + s % 3)];
            this.matrix[row2 * 9 + (s1 * 3 + s % 3)] = this.matrix[row2 * 9 + (s2 * 3 + s % 3)];
            this.matrix[row2 * 9 + (s2 * 3 + s % 3)] = tmp1;
        }
    }
    //shuffle columns inside a column of grids
    for (var y = 0; y < 42; y++) {
        var c1 = Math.floor(Math.random() * 3);
        var c2 = Math.floor(Math.random() * 3);

        for(var row3 = 0; row3 < 9; row3++) {
            var tmp2 = this.matrix[row3 * 9 + (y % 3 * 3 + c1)];
            this.matrix[row3 * 9 + (y % 3 * 3 + c1)] = this.matrix[row3 * 9 + (y % 3 * 3 + c2)];
            this.matrix[row3 * 9 + (y % 3 * 3 + c2)] = tmp2;
        }
    }
    //shuffle rows inside a row of grids
    for (var r = 0; r < 42; r++) {
        var r1 = Math.floor(Math.random() * 3);
        var r2 = Math.floor(Math.random() * 3);

        for(var col2 = 0; col2 < 9; col2++) {
            var tmp3 = this.matrix[(r % 3 * 3 + r1) * 9 + col2];
            this.matrix[(r % 3 * 3 + r1) * 9 + col2] = this.matrix[(r % 3 * 3 + r2) * 9 + col2];
            this.matrix[(r % 3 * 3 + r2) * 9 + col2] = tmp3;
        }
    }
}

function maskGame(matrix, level) {
    var odds;

    for(var rowtable=0; rowtable<7; rowtable+=3){ // 3 rows of grids
        for(var arrgroup=rowtable, coltable=0; arrgroup<3+rowtable, coltable<7; arrgroup++, coltable+=3){ //3 cols of grids
            mask.push([]);
            for(var rowgrid=0; rowgrid<3; rowgrid++){ //3 rows in grid
                var row2 = rowgrid + rowtable; //rows in table
                for(var colgrid=0; colgrid<3; colgrid++){ //3 cols in grid
                    var col2 = colgrid + coltable; //cols in table
                    var tmp = (row2*9) + col2;
                    mask[arrgroup].push(matrix[tmp]);
                }
            }
            for (var w = 0; w < level; w++) {
                do {
                    odds = Math.floor(Math.random() * 9);
                }
                while (mask[arrgroup][odds] == 0);
                mask[arrgroup][odds] = 0;
            }
        }
    }
}

function beginPuzzle(mask){
    var pos;
    var counter = 0;
    for(var rowtable=0; rowtable<7; rowtable+=3) { // 3 rows of grids
        for (var arrgroup = rowtable, coltable = 0; arrgroup < 3 + rowtable, coltable < 7; arrgroup++, coltable += 3) { //3 cols of grids
            for (var rowgrid = 0; rowgrid < 3; rowgrid++) { //3 rows in grid
                var row2 = rowgrid + rowtable; //rows in table
                for (var colgrid = 0; colgrid < 3; colgrid++) { //3 cols in grid
                    var col2 = colgrid + coltable; //cols in table
                    pos = ((row2 * 9) + col2);
                    counter = colgrid + (rowgrid * 3);
                    if(mask[arrgroup][counter] == 0){
                        inputObj[pos].value = inputObj[pos].defaultValue;
                    }
                    else{
                        inputObj[pos].value = mask[arrgroup][counter];
                        inputObj[pos].readOnly = true;
                        inputObj[pos].maxLength = 1;
                        inputObj[pos].setAttribute("class", "readOnly");
                    }
                }
            }
            counter = 0;
        }
    }
}

function changePage(){
    if(document.getElementById("startWrapper").style.display == "inline-block"){
        document.getElementById("startWrapper").style.display = "none";
        document.getElementById("tables").style.display = "block";
        document.getElementById("sideButtons").style.display = "block";
        document.getElementById("sideMenu").style.display = "block";
        document.getElementById("sideMenuWrapper").style.display = "block";
    }
    else{
        document.getElementById("startWrapper").style.display = "inline-block";
        document.getElementById("tables").style.display = "none";
        document.getElementById("sideButtons").style.display = "none";
        document.getElementById("sideMenu").style.display = "none";
        document.getElementById("sideMenuWrapper").style.display = "none";
    }
}

function createPuzzle(level){
    matrix = [];
    mask = [];
    for (var i=0; i<=80; i++){
        inputObj[i].value = inputObj[i].defaultValue;
    }
    updateArrays();
    cellMode("togglepencil");
    shuffle(matrix);
    maskGame(matrix, level);
    beginPuzzle(mask);
    changePage();
}