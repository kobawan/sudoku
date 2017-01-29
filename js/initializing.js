//GLOBAL VALUES
document.getElementById("startWrapper").style.display = "inline-block";

var resumeButton = document.getElementById("resumeButton");
var starteasybutton = document.getElementById("startButton1");
var startmediumbutton = document.getElementById("startButton2");
var starthardbutton = document.getElementById("startButton3");
var statsButton = document.getElementById("statsButton");
var settingsButton = document.getElementById("settingsButton");
var ruleButton = document.getElementById("ruleButton");
var aboutButton = document.getElementById("aboutButton");

var arrowLeftButton = document.getElementById("arrowLeftButton");
var arrowRightButton = document.getElementById("arrowRightButton");

var sudokuTable = document.getElementById("sudoku");
var pencilbutton = document.getElementById("sideButton1");
var notesbutton = document.getElementById("sideButton2");
var returnButton = document.getElementById("returnButton");
var resetbutton = document.getElementById('button1');
var checkbutton = document.getElementById('button2');
var solvebutton = document.getElementById('button3');
var slideButton = document.getElementById('slideButton');
var okbutton = document.getElementById('okButton');

var inputId; // array of id names of textareas
var inputObj = []; // array of id's of textareas
for (var i=1; i<=81; i++){
	inputId = "input" + i;
    inputObj[i-1] = document.getElementById(inputId);
}

var easy = 4;
var medium = 5;
var hard = 6;

//END VALUES
//EVENT LISTENERS

resumeButton.addEventListener('click', resumeGame, false);
starteasybutton.addEventListener('click', function(){createPuzzle(easy);}, false);
startmediumbutton.addEventListener('click', function(){createPuzzle(medium);}, false);
starthardbutton.addEventListener('click', function(){createPuzzle(hard);}, false);

statsButton.addEventListener('click', function(){showContent("stats");}, false);
settingsButton.addEventListener('click', function(){showContent("settings");}, false);
ruleButton.addEventListener('click', function(){showContent("rule");}, false);
aboutButton.addEventListener('click', function(){showContent("about");}, false);

arrowLeftButton.addEventListener('click', function(){moveSection("left");}, false);
arrowRightButton.addEventListener('click', function(){moveSection("right");}, false);

pencilbutton.addEventListener('click', function(){cellMode("togglepencil");}, false);
notesbutton.addEventListener('click', function(){cellMode("togglenotes");}, false);

returnButton.addEventListener('click', changePage, false);
resetbutton.addEventListener('click', reset, false);
checkbutton.addEventListener('click', check, false);
solvebutton.addEventListener('click', solve, false);
slideButton.addEventListener('click', slideMenu, false);
okbutton.addEventListener('click', disableMessage, false);

for (var j = 0; j < inputObj.length; j++) {
    inputObj[j].addEventListener('blur', updateArrays, false);
    inputObj[j].addEventListener('focus', updateArrays, false);
    inputObj[j].addEventListener('keyup', updateArrays, false);

    inputObj[j].addEventListener('keyup', arrowKeys, false); //use arrow keys to move from cell to cell
    inputObj[j].addEventListener('focus', selectValue, false); //selects cell values
    inputObj[j].addEventListener('input', changeCellMode, false); //changed clicked cell into according style
    inputObj[j].addEventListener('input', inputError, false); //removes unwanted values

	inputObj[j].addEventListener('focus', highlight, false); //finds cells with same values as clicked cell and highlights them
    inputObj[j].addEventListener('keyup', findDuplicates, false); //shows in-game error for same number
    inputObj[j].addEventListener('blur', resetCellMode, false); //update cell styles every time textarea loses focus

    inputObj[j].addEventListener('keyup', removeNotes, false); //removes notes from column, row and grid where the pencil value was inserted

    inputObj[j].addEventListener('keyup', win, false); // automatic win message
}

//END EVENT LISTENERS