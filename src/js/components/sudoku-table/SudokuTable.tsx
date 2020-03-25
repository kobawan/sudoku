import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import "./sudokuTable.less";

import { Cell } from "../sudoku-cell/Cell";
import { TableCellsMap, GameType } from "../../consts";
import { useOutsideClickHandle } from "../../utils/useOutsideClickHandle";
import { resetHighLightCells } from "../game-page/ducks/actions";

export interface SudokuTableProps {
  cellState: TableCellsMap;
  gameType: GameType;
}

export const SudokuTable: React.FC<SudokuTableProps> = ({
  gameType,
  cellState,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLTableElement | null>(null);
  const dispatchReset = useCallback(() => {
    dispatch(resetHighLightCells());
  }, [dispatch]);
  useOutsideClickHandle(ref, dispatchReset);

  const getTable = useCallback(() => {
    const rows: JSX.Element[] = [];
    for (let row = 0; row < gameType; row++) {
      const cols: JSX.Element[] = [];
      for (let col = 0; col < gameType; col++) {
        const props = cellState[row * gameType + col];
        cols.push(
          <td key={col}>
            <Cell {...props} />
          </td>
        );
      }
      rows.push(<tr key={row}>{cols}</tr>);
    }

    return rows;
  }, [gameType, cellState]);

  return (
    <table ref={ref} className="sudoku" id="SudokuTable">
      <tbody>{getTable()}</tbody>
    </table>
  );
};
