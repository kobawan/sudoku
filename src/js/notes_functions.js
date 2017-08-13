import { pencilbutton, notesbutton } from "./initializing";

const findCoordinates = (cell) => {
	const coorRow = cell.parentNode.parentNode.rowIndex; //row
	const coorCol = cell.parentNode.cellIndex; //column
	for (let j = 0; j < pencilGrid.length; j++) { //find grid number
		for (let i = 0; i < pencilGrid[j].length; i++) {
			if (pencilGrid[j][i].id == cell.id) {
				const coorGrid = j;

				return [coorRow, coorCol,coorGrid];
			}
		}
	}
};

const removePencilNotesDup = (cell,arr,coor) => { //remove notes for row, col and grid
	if(arr[coor].length != 0) { //group is not empty
		for (let i = 0; i < arr[coor].length; i++) { //go through group of notes
			let notesString = arr[coor][i].value;
			// notes array contains same value as numValue
			if(notesString.indexOf(cell.value) != -1) {
				const pos = notesString.indexOf(cell.value);
				notesString = notesString.substr(0,pos) + notesString.substr(pos+1, notesString.length);
				arr[coor][i].value = notesString;
			}
		}
	}
};

const removeDuplicates = (arr) => {
	if (arr.length!=1) {
		for (let j = 0; j < arr.length; j++) {
			for (let k = 1; k < arr.length - j; k++) {
				if (arr[j] == arr[j+k]) {
					arr.splice(j+k,1);
				}
			}
		}
	}
	return arr;
};

const removeNotes = () => {
	if (pencilbutton.className == "buttonTemplate2off") { // pencil mode
		if (this.maxLength == 1 && this.readOnly === false) { //pencil cell
			if (this.value != this.defaultValue) { //skip empty cells
				const coordinates = findCoordinates(this);
				removePencilNotesDup(this,notesRow,coordinates[0]);
				removePencilNotesDup(this,notesCol,coordinates[1]);
				removePencilNotesDup(this,notesGrid,coordinates[2]);
			}
		}
	}
	if (notesbutton.className == "buttonTemplate2off") { // notes mode
		if (this.value != this.defaultValue && this.maxLength == 9) { // only for notes cells
			const val = this.value;
			const noteArray = val.split(""); // array for notes in the cell
			for(let i=0; i<noteArray.length; i++) {
				noteArray[i]= Number(noteArray[i]);
			}
			const tmp = noteArray.sort(); // sort the numbers
			const tmp1 = removeDuplicates(tmp); //remove duplicates
			const tmp2 = tmp1.filter(Boolean); //remove false values
			const tmp3 = tmp2.filter(Number); //keep only numbers
			this.value = tmp3.join(""); //put the notes array back into cell without commas
		}
	}
};

export {
	removeDuplicates,
	removeNotes
};
