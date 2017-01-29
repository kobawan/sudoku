//GLOBAL VALUES
var solution = "635182749721549638894736152978614523342875916516293487487361295269458371153927864";

var sudokuTable = document.getElementById("sudoku");
var pencilbutton = document.getElementById("sideButton1");
var notesbutton = document.getElementById("sideButton2");
var starteasybutton = document.getElementById("startButton1");
var startmediumbutton = document.getElementById("startButton2");
var starthardbutton = document.getElementById("startButton3");
var resetbutton = document.getElementById('button1');
var checkbutton = document.getElementById('button2');
var solvebutton = document.getElementById('button3');

var inputId = []; // array of id names of textareas
var inputObj = []; // array of id's of textareas
for (var i=1; i<=81; i++){
	inputId[i-1] = "input" + i;
    inputObj[i-1] = document.getElementById(inputId[i-1]);
}

var easy = 4;
var medium = 5;
var hard = 6;

//END VALUES
//EVENT LISTENERS

starteasybutton.addEventListener('click', function(){createPuzzle(easy);}, false);
startmediumbutton.addEventListener('click', function(){createPuzzle(medium);}, false);
starthardbutton.addEventListener('click', function(){createPuzzle(hard);}, false);

pencilbutton.addEventListener('click', function(){cellMode("sideButton1");}, false);
notesbutton.addEventListener('click', function(){cellMode("sideButton2");}, false);

resetbutton.addEventListener('click', reset, false);
checkbutton.addEventListener('click', check, false);
solvebutton.addEventListener('click', solve, false);
document.getElementById('okButton').addEventListener('click', disableMessage, false);

for (var j = 0; j < inputObj.length; j++) {
    inputObj[j].addEventListener('blur', updateArrays, false);
    inputObj[j].addEventListener('focus', updateArrays, false);
    inputObj[j].addEventListener('keyup', updateArrays, false);

	inputObj[j].addEventListener('focus', selectValue, false); //selects cell values
	inputObj[j].addEventListener('click', highlight, false); //finds cells with same values as clicked cell and highlights them
	inputObj[j].addEventListener('input', changeMode, false); //changed clicked cell into according style
	inputObj[j].addEventListener('keyup', arrowKeys, false); //use arrow keys to move from cell to cell
	inputObj[j].addEventListener('keyup', notesPosition, false); //filters notes
	inputObj[j].addEventListener('keyup', inGame, false); // shows in-game error, automatic win/wrong message
	inputObj[j].addEventListener('keyup', showDuplicates, false); //shows in-game error for same number
	inputObj[j].addEventListener('blur', updateStyle, false); //update cell styles every time textarea loses focus, gives input error
	inputObj[j].addEventListener('keyup', removeNotes, false); //removes notes from column, row and grid where the pencil value was inserted
}

//END EVENT LISTENERS