import * as React from "react";

import "./sudokuTable.less";

import { Cell } from "./Cell";
import { TableCellsMap, GameType, CellHandlerProps } from "../../consts";

export interface SudokuTableProps extends CellHandlerProps {
  cellState: TableCellsMap;
  gameType: GameType;
}

export const SudokuTable: React.FC<SudokuTableProps> = ({
  gameType,
  cellState,
  ...rest
}) => {
  const getTable = () => {
    const rows: JSX.Element[] = [];
    for (let row = 0; row < gameType; row++) {
      const cols: JSX.Element[] = [];
      for (let col = 0; col < gameType; col++) {
        const props = cellState[row * gameType + col];
        cols.push(<td key={col}><Cell {...props} {...rest} /></td>);
      }
      rows.push(<tr key={row}>{cols}</tr>);
    }

    return (
      <React.Fragment>
        {rows}
      </React.Fragment>
    );
  };

  return (
    <table className="sudoku" id="SudokuTable">
      <tbody>
        {getTable()}
      </tbody>
    </table>
  );
};
