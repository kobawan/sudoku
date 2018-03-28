import { compose } from "./utils/generalUtils";
import { GameConfig, GameType } from "./consts";

export class Game {
    public readonly gameType: number;
    public readonly difficulty: number;
    public readonly ratio: number;
    public readonly matrix: number[] = []; // Array of result ordered by rows
    public readonly mask: number[][] = []; // 2d array of masked result ordered by grids
    private readonly shuffle: number;

    constructor (props: GameConfig) {
        this.gameType = props.type || GameType.Default;
        this.difficulty = props.difficulty;
        this.ratio = Math.sqrt(this.gameType);
        this.shuffle = props.shuffle || 60;
        const result = this.generate();
        this.matrix = result.matrix;
        this.mask = result.mask;
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
        let pos: number;
        let val: number;
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
        let rand1: number;
        let rand2: number;
        const newArr = arr.slice();
        for (let randomize = 0; randomize < this.shuffle; randomize++) {
            rand1 = Math.ceil(Math.random() * this.gameType);
            do {
                rand2 = Math.ceil(Math.random() * this.gameType);
            }
            while (rand1 === rand2); // as long as rand1 equals rand2 recalculate rand2

            for (let pos = 0; pos < newArr.length; pos++) {
                if (newArr[pos] === rand1) {
                    newArr[pos] = rand2;
                }
                else if (newArr[pos] === rand2) {
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
        let rand1: number;
        let rand2: number;
        let pos1: number;
        let pos2: number;
        let originalVal: number;
        const newArr = arr.slice();
        for (let randomize = 0; randomize < this.shuffle; randomize++) {
            rand1 = Math.floor(Math.random() * this.ratio);
            do {
                rand2 = Math.floor(Math.random() * this.ratio);
            }
            while (rand1 === rand2); // as long as rand1 equals rand2 recalculate rand2

            for (let pos = 0; pos < this.gameType; pos++) {
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
        let rand1: number;
        let rand2: number;
        let pos1: number;
        let pos2: number;
        let originalVal: number;
        const newArr = arr.slice();
        for (let randomize = 0; randomize < this.shuffle; randomize++) {
            rand1 = Math.floor(Math.random() * this.ratio);
            do {
                rand2 = Math.floor(Math.random() * this.ratio);
            }
            while (rand1 === rand2); // as long as rand1 equals rand2 recalculate rand2

            for (let pos = 0; pos < this.gameType; pos++) {
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
        let rand1: number;
        let rand2: number;
        let pos1: number;
        let pos2: number;
        let originalVal: number;
        const newArr = arr.slice();
        for (let randomize = 0; randomize < this.shuffle; randomize++) {
            rand1 = Math.floor(Math.random() * this.ratio);
            do {
                rand2 = Math.floor(Math.random() * this.ratio);
            }
            while (rand1 === rand2); // as long as rand1 equals rand2 recalculate rand2

            for (let pos = 0; pos < this.gameType; pos++) {
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
        let grid: number;
        let rowPos: number;
        let colPos: number;
        let pos: number;
        let rand: number;
        for (let rowGrid = 0; rowGrid < this.ratio; rowGrid++) {
            for (let colGrid = 0; colGrid < this.ratio; colGrid++) {
                arr.push([]);
                grid = rowGrid * this.ratio + colGrid;
                for (let row = 0; row < this.ratio; row++) {
                    rowPos = (row + rowGrid * this.ratio) * this.gameType;
                    for (let col = 0; col < this.ratio; col++) {
                        colPos = col + colGrid * this.ratio;
                        pos = rowPos + colPos;
                        arr[grid].push(matrix[pos]);
                    }
                }
                for (let dif = 0; dif < this.difficulty; dif++) {
                    do {
                        rand = Math.floor(Math.random() * this.gameType);
                    }
                    while (arr[grid][rand] === 0);
                    arr[grid][rand] = 0;
                }
            }
        }
        return arr;
    }

    private generate = () => {
        const matrix: number[] = compose(
            this.shuffleRowsInGrid,
            this.shuffleColumnsInGrid,
            this.shuffleColumns,
            this.shufflePairs,
        )(this.createTemplate());
        const mask = this.maskGame(matrix);

        return { matrix, mask };
    }
}
