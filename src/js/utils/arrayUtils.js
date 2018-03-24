/**
 * Iterates through each cell row-wise and calls callback function for each cell.
 * Returns array from callback.
 * @param {object} game current game information
 * @param {function} callback callback function for each cell
 */
export const sortByRows = (game, callback) => {
	let pos, values, arr = [];
	for (let row = 0; row < game.gameType; row++) {
		arr.push([]);
		for (let col = 0; col < game.gameType; col++) {
			pos = row * game.gameType + col;
			values = { row, pos, arr };
			callback(values);
		}
	}
	return arr;
};

/**
 * Iterates through each cell column-wise and calls callback function for each cell.
 * Returns array from callback.
 * @param {object} game current game information
 * @param {function} callback callback function for each cell
 */
export const sortByCols = (game, callback) => {
	let pos, values, arr = [];
	for (let col = 0; col < game.gameType; col++) {
		arr.push([]);
		for (let row = 0; row < game.gameType; row++) {
			pos = col + game.gameType * row;
			values = { col, pos, arr };
			callback(values);
		}
	}
	return arr;
};

/**
 * Iterates through each cell grid-wise and calls callback function for each cell.
 * Returns array from callback.
 * @param {object} game - Current game information
 * @param {function} callback - callback function for each cell
 */
export const sortByGrids = (game, callback) => {
	let grid, rowPos, colPos, pos, values, arr = [];
	// rows of grids in table
	for(let rowGrid=0; rowGrid<game.ratio; rowGrid++) {
		// columns of grids in table
		for(let colGrid=0; colGrid<game.ratio; colGrid++) {
			// grid number horizontally
			grid = rowGrid * game.ratio + colGrid;
			arr.push([]);
			// row per grid
			for(let row=0; row<game.ratio; row++) {
				// position of first column in each grid
				rowPos = (row + rowGrid * game.ratio) * game.gameType;
				// column per grid
				for(let col=0; col<game.ratio; col++) {
					// increment of column per grid and rows of grids
					colPos = col + colGrid * game.ratio;
					// final position
					pos = rowPos + colPos;
					values = { row, col, grid, pos, arr };
					callback(values);
				}
			}
		}
	}
	return arr;
};
