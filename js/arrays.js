import { sudokuTable } from "./initializing";

let pencilRow = [], pencilCol = [], pencilGrid = [];
let notesRow = [], notesCol = [], notesGrid = [];

const getArrays = (arr,type,mode) => {
	const len = 9;
	let cellsObj;
	arr.length = 0;
	if (type == "row" || type == "col") {
		for(let row1=0; row1<len; row1++) {
			arr.push([]);
			for(let col1=0; col1<len; col1++) {
				if(type == "row") {
					cellsObj = sudokuTable.rows[row1].cells[col1].children[0];
				}
				else if(type == "col") {
					cellsObj = sudokuTable.rows[col1].cells[row1].children[0];
				}
				if (cellsObj.value != cellsObj.defaultValue) {
					if(mode=="pencil") {
						if (cellsObj.maxLength == 1) {
							arr[row1].push(cellsObj);
						}
					}
					else if(mode=="notes") {
						if (cellsObj.maxLength == 9) {
							arr[row1].push(cellsObj);
						}
					}
				}
			}
		}
	}
	else if(type == "grid") {
		for(let rowtable=0; rowtable<7; rowtable+=3) { // 3 rows of grids
			for(
				let arrgroup=rowtable, coltable=0;
				arrgroup<3+rowtable, coltable<7;
				arrgroup++, coltable+=3
			) { //3 cols of grids
				arr.push([]);
				for(let rowgrid=0; rowgrid<3; rowgrid++) { //3 rows in grid
					const row2 = rowgrid + rowtable; //rows in table
					for(let colgrid=0; colgrid<3; colgrid++) { //3 cols in grid
						const col2 = colgrid + coltable; //cols in table
						cellsObj = sudokuTable.rows[row2].cells[col2].children[0];
						if (cellsObj.value != cellsObj.defaultValue) {
							if(mode=="pencil") {
								if (cellsObj.maxLength == 1) {
									arr[arrgroup].push(cellsObj);
								}
							}
							else if(mode=="notes") {
								if (cellsObj.maxLength == 9) {
									arr[arrgroup].push(cellsObj);
								}
							}
						}
					}
				}
			}
		}
	}
};

const updateArrays = () => {
	getArrays(pencilRow,"row","pencil");
	getArrays(pencilCol,"col","pencil");
	getArrays(pencilGrid,"grid","pencil");
	getArrays(notesRow,"row","notes");
	getArrays(notesCol,"col","notes");
	getArrays(notesGrid,"grid","notes");
};

export {
	updateArrays
};
