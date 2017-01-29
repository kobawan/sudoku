//VALUES

var start = "005082740700040038090000050978004000302070016006200400000301205200450370053020860";
var solution = "635182749721549638894736152978614523342875916516293487487361295269458371153927864";

var inputNumber = []; // array of ID's of textareas
for (var i=1; i<=81; i++){
	inputNumber[i-1] = "input" + i;
}

//END VALUES
//EVENT LISTENERS

document.getElementById('sideButton1').addEventListener('click', function(){ //pencil button
	cellMode(sideButton1);
}, false);
document.getElementById('sideButton2').addEventListener('click', function(){ //notes button
	cellMode(sideButton2);
}, false);
document.getElementById('startButton1').addEventListener('click', startButton, false);
document.getElementById('startButton2').addEventListener('click', startButton, false);
document.getElementById('startButton3').addEventListener('click', startButton, false);
document.getElementById('button1').addEventListener('click', reset, false);
document.getElementById('button2').addEventListener('click', check, false);
document.getElementById('button3').addEventListener('click', solve, false);
document.getElementById('okButton').addEventListener('click', disableMessage, false);

for (var i = 0; i < inputNumber.length; i++) {
	var inputNumber2 = document.getElementById(inputNumber[i]);
	
	inputNumber2.addEventListener('focus', selectValue, false); //selects cell values	
	inputNumber2.addEventListener('click', highlight, false); //finds cells with same values as clicked cell and highlights them
	inputNumber2.addEventListener('input', changeMode, false); //changed clicked cell into according style
	inputNumber2.addEventListener('keyup', arrowKeys, false); //use arrow keys to move from cell to cell
	inputNumber2.addEventListener('keyup', notesPosition, false); //filters notes
	inputNumber2.addEventListener('keyup', inGame, false); // shows in-game error, automatic win/wrong message
	inputNumber2.addEventListener('keyup', showDuplicates, false); //shows in-game error for same number
	inputNumber2.addEventListener('blur', updateStyle, false); //update cell styles every time textarea loses focus, gives input error
	inputNumber2.addEventListener('blur', removeNotes, false); //removes notes from column, row and grid where the pencil value was inserted
}

//END EVENT LISTENERS