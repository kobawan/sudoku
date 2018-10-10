import { CellCoordinates } from "../consts";

/**
 * Returns coordinates of selected cell
 */
export const findCoordinates = (gameRatio: number, selectedCell: HTMLTextAreaElement): CellCoordinates => {
    const tableCell = selectedCell.parentElement as HTMLTableDataCellElement;
    const tableRow = tableCell.parentElement as HTMLTableRowElement;
    const coorRow = tableRow.rowIndex;
    const coorCol = tableCell.cellIndex;
    const coorGrid =
        Math.floor(coorRow / gameRatio) * gameRatio + Math.floor(coorCol / gameRatio);
    return { x: coorRow, y: coorCol, grid: coorGrid };
};

/**
 * Key up event to move cells using arrows
 */
export const arrowKeys = (keyCode: number, coor: CellCoordinates) => {
    const sudokuTable = document.querySelector("#SudokuTable") as HTMLTableElement;
    let coorRow = coor.x;
    let coorCol = coor.y;

    switch (keyCode) {
    case 37: // left arrow
        coorCol === 0 ? coorCol = 8 : coorCol--;
        break;
    case 38: // up arrow
        coorRow === 0 ? coorRow = 8 : coorRow--;
        break;
    case 39: // right arrow
        coorCol === 8 ? coorCol = 0 : coorCol++;
        break;
    case 40: // down arrow
        coorRow === 8 ? coorRow = 0 : coorRow++;
        break;
    default:
        break;
    }

    const nextCell = sudokuTable.rows[coorRow].cells[coorCol].children[0] as HTMLTextAreaElement;
    nextCell.focus();
};
