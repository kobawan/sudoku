//CELL MODE

function cellMode(buttonMode) {
	for (var i = 0; i < inputNumber.length; i++) {
		var inputNumber2 = document.getElementById(inputNumber[i]);
		if (buttonMode == sideButton1){ //pencil mode
			document.getElementById("sideButton1").setAttribute("class", "buttonTemplate2off");
			document.getElementById("sideButton2").setAttribute("class", "buttonTemplate2on");
			if (inputNumber2.value == inputNumber2.defaultValue){ //only for empty cells
				inputNumber2.maxLength = 1;
				inputNumber2.setAttribute("class", "pencil");
			}
		}
		else if (buttonMode == sideButton2){ //notes mode
			document.getElementById("sideButton1").setAttribute("class", "buttonTemplate2on");
			document.getElementById("sideButton2").setAttribute("class", "buttonTemplate2off");
			if (inputNumber2.value == inputNumber2.defaultValue){ //only for empty cells
				inputNumber2.maxLength = 9;
				inputNumber2.setAttribute("class", "notes");
			}
		}
	}
}

//END CELL MODE
//BEGIN FUNCTION 

function begin(){
	for (var i = 0; i < inputNumber.length; i++) {				
		var inputNumber2 = document.getElementById(inputNumber[i]); 
		var start2 = start[i];										
		if (start2 == "0") inputNumber2.value = "";
		else {
			inputNumber2.value = start2;
			inputNumber2.readOnly = true;
			inputNumber2.maxLength = 1;	
			inputNumber2.setAttribute("class", "readOnly");	
		}
	}
	cellMode(sideButton1);
}

//END BEGIN FUNCTION
//START ARRAY
/*function startArray(){
	var moves = []; //array of moves in objects
	for (var i = 0; i < inputNumber.length; i++) {
		var inputNumber2 = document.getElementById(inputNumber[i]);
		inputNumber2.addEventListener('input', saveMove, false);
	}
	
	function saveMove(){
	
		var num = this;
		
		function mode(){
			if(num.maxLength == 1){
				return "pencil";
			}
			else if(num.maxlength == 9){
				return "notes";
			}
			else return "error";
		}
		
		var numObj = {
			numID:this.id, 
			numValue:this.value, 
			numMode:mode()
		}; 
		
		moves.push(numObj);	
		
		//alert(numObj.numID + " : " + numObj.numValue + " : " + numObj.numMode);
		
	}
	
}*/
//END START ARRAY
//START BUTTON

function startButton(){
	begin();
	//startArray();
	document.getElementById("startWrapper").style.display = "none";
	document.getElementById("tables").style.display = "block";
	document.getElementById("buttons").style.display = "block";
	document.getElementById("sideButtons").style.display = "block";
	document.getElementById("sideMenu").style.display = "block";
}

//END START BUTTON
//RESET BUTTON

function reset(){
	var x = confirm("Are you sure you want to reset?");
	if (x == true) begin();
}

//END RESET BUTTON
//SOLVE BUTTON

function solve(){
	var x = confirm("Are you sure you want to solve?");
	if (x == true){
		cellMode(sideButton1);
		enableMessage("Correct!<br>You have won the game!");
		for (var i = 0; i < inputNumber.length; i++) {
			var inputNumber2 = document.getElementById(inputNumber[i]);
			inputNumber2.value = solution[i];
		}
	}
}

//END SOLVE BUTTON
//ENABLE MESSAGE

function enableMessage(text){
	document.getElementById("answerMessage").style.display = "block";
	document.getElementById("coorX").style.display = "block";
	document.getElementById("coorY").style.display = "block";			
	document.getElementById("tables").style.width = "429px";
	document.getElementById("tables").style.height = "429px";
	document.getElementById("tables").style.padding = "0px";
	document.getElementById("inputAnswer").innerHTML = text;
}

//END ENABLE MESSAGE
//DISABLE MESSAGE

function disableMessage(){
	document.getElementById("answerMessage").style.display = "none";
	document.getElementById("coorX").style.display = "none";
	document.getElementById("coorY").style.display = "none";
	document.getElementById("tables").style.width = "347px";
	document.getElementById("tables").style.height = "347px";
	document.getElementById("tables").style.padding = "41px";
}

//END DISABLE MESSAGE