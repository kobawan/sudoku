import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import "./sudokuTable.scss";

import { Cell } from "../sudoku-cell/Cell";
import { GameType } from "../../consts";
import { useOutsideClickHandle } from "../../utils/useOutsideClickHandle";
import { resetHighLightCells } from "../game-page/ducks/actions";

export interface SudokuTableProps {
  gameType: GameType;
  gameRatio: number;
}

export const SudokuTable: React.FC<SudokuTableProps> = ({
  gameType,
  gameRatio,
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
        const id = row * gameType + col;
        const grid =
          Math.floor(row / gameRatio) * gameRatio + Math.floor(col / gameRatio);
        cols.push(
          <td key={col}>
            <Cell pos={id} col={col} row={row} grid={grid} />
          </td>
        );
      }
      rows.push(<tr key={row}>{cols}</tr>);
    }

    return rows;
  }, [gameType, gameRatio]);

  return (
    <table ref={ref} className="sudoku" id="SudokuTable">
      <tbody>{getTable()}</tbody>
    </table>
  );
};
