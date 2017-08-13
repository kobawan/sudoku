import { inputEl } from "./initializing";
import { updateArrays } from "./arrays";
import { cellMode } from "./ingamebutton_functions";

Array.prototype.clear = () => {
	let i = this.length;
	while (i--) {
		this[i] = 0;
	}
};

let matrix = [];
let mask = [];

//to randomize values as different as possible from previous puzzle
const shuffle = (matrix) => {
	for (let x = 0; x < 9; x++) {
		for (let z = 0; z < 9; z++) {
			matrix[x * 9 + z] = (x * 3 + Math.floor(x / 3) + z) % 9 + 1;
		}
	}
	//shuffle values
	for(let j = 0; j < 77; j++) {
		const n1 = Math.ceil(Math.random() * 9);
		let n2;
		do {
			n2 = Math.ceil(Math.random() * 9);
		}
		while (n1 == n2); //to make sure n1 does not equal n2

		for (let row1 = 0; row1 < 9; row1++) {
			for (let col1 = 0; col1 < 9; col1++) {
				if (matrix[row1 * 9 + col1] == n1)
					matrix[row1 * 9 + col1] = n2;
				else if (matrix[row1 * 9 + col1] == n2)
					matrix[row1 * 9 + col1] = n1;
			}
		}
	}
	//shuffle columns of grids
	for (let s = 0; s < 42; s++) {
		const s1 = Math.floor(Math.random() * 3);
		const s2 = Math.floor(Math.random() * 3);

		for(let row2 = 0; row2 < 9; row2++) {
			const tmp1 = this.matrix[row2 * 9 + (s1 * 3 + s % 3)];
			this.matrix[row2 * 9 + (s1 * 3 + s % 3)] = this.matrix[row2 * 9 + (s2 * 3 + s % 3)];
			this.matrix[row2 * 9 + (s2 * 3 + s % 3)] = tmp1;
		}
	}
	//shuffle columns inside a column of grids
	for (let y = 0; y < 42; y++) {
		const c1 = Math.floor(Math.random() * 3);
		const c2 = Math.floor(Math.random() * 3);

		for(let row3 = 0; row3 < 9; row3++) {
			const tmp2 = this.matrix[row3 * 9 + (y % 3 * 3 + c1)];
			this.matrix[row3 * 9 + (y % 3 * 3 + c1)] = this.matrix[row3 * 9 + (y % 3 * 3 + c2)];
			this.matrix[row3 * 9 + (y % 3 * 3 + c2)] = tmp2;
		}
	}
	//shuffle rows inside a row of grids
	for (let r = 0; r < 42; r++) {
		const r1 = Math.floor(Math.random() * 3);
		const r2 = Math.floor(Math.random() * 3);

		for(let col2 = 0; col2 < 9; col2++) {
			const tmp3 = this.matrix[(r % 3 * 3 + r1) * 9 + col2];
			this.matrix[(r % 3 * 3 + r1) * 9 + col2] = this.matrix[(r % 3 * 3 + r2) * 9 + col2];
			this.matrix[(r % 3 * 3 + r2) * 9 + col2] = tmp3;
		}
	}
};

const maskGame = (matrix, level) => {
	let odds;

	for(let rowtable=0; rowtable<7; rowtable+=3) { // 3 rows of grids
		for(
			let arrgroup=rowtable, coltable=0;
			arrgroup<3+rowtable, coltable<7;
			arrgroup++, coltable+=3
		) { //3 cols of grids
			mask.push([]);
			for(let rowgrid=0; rowgrid<3; rowgrid++) { //3 rows in grid
				const row2 = rowgrid + rowtable; //rows in table
				for(let colgrid=0; colgrid<3; colgrid++) { //3 cols in grid
					const col2 = colgrid + coltable; //cols in table
					const tmp = (row2*9) + col2;
					mask[arrgroup].push(matrix[tmp]);
				}
			}
			for (let w = 0; w < level; w++) {
				do {
					odds = Math.floor(Math.random() * 9);
				}
				while (mask[arrgroup][odds] == 0);
				mask[arrgroup][odds] = 0;
			}
		}
	}
};

const beginPuzzle = (mask) => {
	let pos;
	let counter = 0;
	for (let rowtable=0; rowtable<7; rowtable+=3) { // 3 rows of grids
		for (
			let arrgroup = rowtable, coltable = 0;
			arrgroup < 3 + rowtable, coltable < 7;
			arrgroup++, coltable += 3
		) { //3 cols of grids
			for (let rowgrid = 0; rowgrid < 3; rowgrid++) { //3 rows in grid
				const row2 = rowgrid + rowtable; //rows in table
				for (let colgrid = 0; colgrid < 3; colgrid++) { //3 cols in grid
					const col2 = colgrid + coltable; //cols in table
					pos = ((row2 * 9) + col2);
					counter = colgrid + (rowgrid * 3);
					if(mask[arrgroup][counter] == 0) {
						inputEl[pos].value = inputEl[pos].defaultValue;
					}
					else{
						inputEl[pos].value = mask[arrgroup][counter];
						inputEl[pos].readOnly = true;
						inputEl[pos].maxLength = 1;
						inputEl[pos].setAttribute("class", "readOnly");
					}
				}
			}
			counter = 0;
		}
	}
};

const changePage = () => {
	if(document.getElementById("startWrapper").style.display == "inline-block") {
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
};

const createPuzzle = (level) => {
	matrix = [];
	mask = [];
	for (let i=0; i<=80; i++) {
		inputEl[i].value = inputEl[i].defaultValue;
		inputEl[i].readOnly = false;
	}
	updateArrays();
	cellMode("togglepencil");
	shuffle(matrix);
	maskGame(matrix, level);
	beginPuzzle(mask);
	changePage();
};

export {
	beginPuzzle,
	changePage,
	createPuzzle
};
