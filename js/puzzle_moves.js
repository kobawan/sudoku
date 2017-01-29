var inputNumber = []; // array of ID's of textareas
var moves = []; //array of moves in objects

for (var i=1; i<=81; i++){
	inputNumber[i-1] = "input" + i;
}

document.getElementById('startButton1').addEventListener('click', startArray, false);
document.getElementById('startButton2').addEventListener('click', startArray, false);
document.getElementById('startButton3').addEventListener('click', startArray, false);



function startArray(){
	
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
	
}

