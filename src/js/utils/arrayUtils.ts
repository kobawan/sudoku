import { Game } from "../generator";

export interface RowValues<ArrayType = HTMLTextAreaElement> {
    row: number;
    pos: number;
    arr: ArrayType[][];
}

/**
 * Iterates through each cell row-wise and calls callback function for each cell.
 * Returns array from callback.
 */
export const sortByRows = <ArrayType = HTMLTextAreaElement>(
    game: Game,
    callback: (values: RowValues<ArrayType>) => void,
) => {
    let pos: number;
    let values: RowValues<ArrayType>;
    const arr: ArrayType[][] = [];
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

export interface ColumnValues<ArrayType = HTMLTextAreaElement> {
    col: number;
    pos: number;
    arr: ArrayType[][];
}

/**
 * Iterates through each cell column-wise and calls callback function for each cell.
 * Returns array from callback.
 */
export const sortByCols = <ArrayType = HTMLTextAreaElement>(
    game: Game,
    callback: (values: ColumnValues<ArrayType>) => void,
) => {
    let pos: number;
    let values: ColumnValues<ArrayType>;
    const arr: ArrayType[][] = [];
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

export interface GridValues<ArrayType = HTMLTextAreaElement> {
    row: number;
    col: number;
    grid: number;
    pos: number;
    arr: ArrayType[][];
}

/**
 * Iterates through each cell grid-wise and calls callback function for each cell.
 * Returns array from callback.
 */
export const sortByGrids = <ArrayType = HTMLTextAreaElement>(
    game: Game,
    callback: (values: GridValues<ArrayType>) => void,
) => {
    let grid: number;
    let rowPos: number;
    let colPos: number;
    let pos: number;
    let values: GridValues<ArrayType>;
    const arr: ArrayType[][] = [];
    // rows of grids in table
    for (let rowGrid = 0; rowGrid < game.ratio; rowGrid++) {
        // columns of grids in table
        for (let colGrid = 0; colGrid < game.ratio; colGrid++) {
            // grid number horizontally
            grid = rowGrid * game.ratio + colGrid;
            arr.push([]);
            // row per grid
            for (let row = 0; row < game.ratio; row++) {
                // position of first column in each grid
                rowPos = (row + rowGrid * game.ratio) * game.gameType;
                // column per grid
                for (let col = 0; col < game.ratio; col++) {
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
