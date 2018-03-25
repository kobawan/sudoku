import { compose } from "./utils/generalUtils";
import { GameConfig } from "./consts";

export default class {
    public gameType: number;
    public difficulty: number;
    public ratio: number;
    public matrix: number[] = []; // Array of result ordered by rows
    public mask: number[][] = []; // 2d array of masked result ordered by grids

    constructor (gameType: number, difficulty: number) {
        this.gameType = gameType;
        this.difficulty = difficulty;
        this.ratio = Math.sqrt(gameType);
        this.generate();
    }
    /*
     * Creates array ordered by row with values:
     * 123|456|789
     * 456|789|123
     * 789|123|456
     * ---|---|---
     * 234|567|891
     * 567|891|234
     * 891|234|567
     * ---|---|---
     * 345|678|912
     * 678|912|345
     * 912|345|678
     */
    private createTemplate = () => {
        const gameTemplate: number[] = [];
        let pos: number, val: number;
        for (let row = 0; row < this.gameType; row++) {
            for (let col = 0; col < this.gameType; col++) {
                /**
                 * row * this.ratio = amount to skip each row. increments of row per grid size
                 * Math.floor(row / this.ratio) = amount to skip each grid-row. increments of 1 per grid-row
                 * col = column number to iterate
                 * % this.gameType + 1 = divisible by 9, and add 1
                 */
                val = (row * this.ratio + Math.floor(row / this.ratio) + col) % this.gameType + 1;
                pos = row * this.gameType + col;
                gameTemplate[pos] = val;
            }
        }
        return gameTemplate;
    }

    /*
     * Replaces values in temp from rand1-to-rand2 and rand2-to-rand1
     * and creates random combos of rand1 and rand2 to switch places
     */
    private shufflePairs = (arr: number[]) => {
        let rand1: number, rand2: number;
        const newArr = arr.slice();
        for(let randomize = 0; randomize < GameConfig.SHUFFLE; randomize++) {
            rand1 = Math.ceil(Math.random() * this.gameType);
            do {
                rand2 = Math.ceil(Math.random() * this.gameType);
            }
            while (rand1 == rand2); // as long as rand1 equals rand2 recalculate rand2

            for (let pos = 0; pos < newArr.length; pos++) {
                if (newArr[pos] == rand1) {
                    newArr[pos] = rand2;
                }
                else if (newArr[pos] == rand2) {
                    newArr[pos] = rand1;
                }
            }
        }
        return newArr;
    }

    /*
     * Replaces columns from rand1-to-rand2 and rand2-to-rand1
     * and creates random combos of rand1 and rand2 to switch places
     */
    private shuffleColumns = (arr: number[]) => {
        let rand1: number, rand2: number, pos1: number, pos2: number, originalVal: number;
        const newArr = arr.slice();
        for(let randomize = 0; randomize < GameConfig.SHUFFLE; randomize++) {
            rand1 = Math.floor(Math.random() * this.ratio);
            do {
                rand2 = Math.floor(Math.random() * this.ratio);
            }
            while (rand1 == rand2); // as long as rand1 equals rand2 recalculate rand2

            for(let pos = 0; pos < this.gameType; pos++) {
                /**
                 * pos * this.gameType = pos of value in col, iterates through column
                 * rand1 * this.ratio = picks first column from random grid
                 * randomize % this.ratio = adds to picked column by iterating through divisibles of ratio
                 */
                pos1 = pos * this.gameType + (rand1 * this.ratio + randomize % this.ratio);
                pos2 = pos * this.gameType + (rand2 * this.ratio + randomize % this.ratio);
                originalVal = newArr[pos1];
                newArr[pos1] = newArr[pos2];
                newArr[pos2] = originalVal;
            }
        }
        return newArr;
    }

    /*
     * Replaces columns inside grids from rand1-to-rand2 and rand2-to-rand1
     * and creates random combos of rand1 and rand2 to switch places
     */
    private shuffleColumnsInGrid = (arr: number[]) => {
        let rand1: number, rand2: number, pos1: number, pos2: number, originalVal: number;
        const newArr = arr.slice();
        for (let randomize = 0; randomize < GameConfig.SHUFFLE; randomize++) {
            rand1 = Math.floor(Math.random() * this.ratio);
            do {
                rand2 = Math.floor(Math.random() * this.ratio);
            }
            while (rand1 == rand2); // as long as rand1 equals rand2 recalculate rand2

            for(let pos = 0; pos < this.gameType; pos++) {
                /**
                 * pos * this.gameType = pos of value in col, iterates through column
                 * randomize % this.ratio * this.ratio = iterates first column of each grid
                 * rand1 = picks which column in grid to shuffle
                 */
                pos1 = pos * this.gameType + (randomize % this.ratio * this.ratio + rand1);
                pos2 = pos * this.gameType + (randomize % this.ratio * this.ratio + rand2);
                originalVal = newArr[pos1];
                newArr[pos1] = newArr[pos2];
                newArr[pos2] = originalVal;
            }
        }
        return newArr;
    }

    private shuffleRowsInGrid = (arr: number[]) => {
        let rand1: number, rand2: number, pos1: number, pos2: number, originalVal: number;
        const newArr = arr.slice();
        for (let randomize = 0; randomize < GameConfig.SHUFFLE; randomize++) {
            rand1 = Math.floor(Math.random() * this.ratio);
            do {
                rand2 = Math.floor(Math.random() * this.ratio);
            }
            while (rand1 == rand2); // as long as rand1 equals rand2 recalculate rand2

            for(let pos = 0; pos < this.gameType; pos++) {
                /**
                 * pos = pos of value in first row, iterates through row
                 * this.gameType = moves pos to first value in picked row
                 * randomize % this.ratio * this.ratio = picks first row from random grid
                 * rand1 = adds to picked row by iterating through divisibles of ratio
                 */
                pos1 = pos + this.gameType * (randomize % this.ratio * this.ratio + rand1);
                pos2 = pos + this.gameType * (randomize % this.ratio * this.ratio + rand2);
                originalVal = newArr[pos1];
                newArr[pos1] = newArr[pos2];
                newArr[pos2] = originalVal;
            }
        }
        return newArr;
    }

    private maskGame = (matrix: number[]) => {
        const arr: number[][] = [];
        let grid: number, rowPos: number, colPos: number, pos: number, rand: number;
        for(let rowGrid=0; rowGrid<this.ratio; rowGrid++) {
            for(let colGrid=0; colGrid<this.ratio; colGrid++) {
                arr.push([]);
                grid = rowGrid * this.ratio + colGrid;
                for(let row=0; row<this.ratio; row++) {
                    rowPos = (row + rowGrid * this.ratio) * this.gameType;
                    for(let col=0; col<this.ratio; col++) {
                        colPos = col + colGrid * this.ratio;
                        pos = rowPos + colPos;
                        arr[grid].push(matrix[pos]);
                    }
                }
                for (let dif = 0; dif < this.difficulty; dif++) {
                    do {
                        rand = Math.floor(Math.random() * this.gameType);
                    }
                    while (arr[grid][rand] == 0);
                    arr[grid][rand] = 0;
                }
            }
        }
        return arr;
    }

    private generate = () => {
        const template = this.createTemplate();
        this.matrix = compose(
            this.shuffleRowsInGrid.bind(this),
            this.shuffleColumnsInGrid.bind(this),
            this.shuffleColumns.bind(this),
            this.shufflePairs.bind(this)
        )(template);

        this.mask = this.maskGame(this.matrix);
    }
}

