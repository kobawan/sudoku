import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import "./cell.less";

import { CellMode } from "../../consts";
import { arrowKeys, selectCellContent } from "./helpers";
import {
  highLightCells,
  updateNotesCells,
  updatePencilCells,
  updateCellValue,
} from "../game-page/ducks/actions";
import {
  getCellMode,
  areCellsDisabled,
  getCellPropsById,
} from "../game-page/ducks/selectors";

interface CellComponentProps {
  pos: number;
  col: number;
  row: number;
  grid: number;
}

export const Cell: React.FC<CellComponentProps> = ({ pos, col, row, grid }) => {
  const dispatch = useDispatch();
  const cellMode = useSelector(getCellMode);
  const currentCellProps = useSelector(getCellPropsById(pos));
  const isDisabled = useSelector(areCellsDisabled);
  const { mode, value, withError, withHighlight } = currentCellProps;

  const onSelect = (
    e:
      | React.FocusEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLTextAreaElement>
  ) => {
    const cell = e.target as HTMLTextAreaElement;
    selectCellContent({ cell, props: currentCellProps, cellMode });
    dispatch(highLightCells(currentCellProps));
  };

  const onKeyup: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
    const coor = { x: row, y: col, grid };

    // removes notes from column, row and grid where the pencil value was inserted, if enabled in settings
    dispatch(updateNotesCells(coor));

    // resets highlights, shows cell errors if enabled in settings and checks if game is solved
    dispatch(updatePencilCells());

    // use arrow keys to move from cell to cell
    arrowKeys(e.keyCode, coor);
  };

  const onInput: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    const cell = e.target as HTMLTextAreaElement;

    // Filters invalid inputs updates cell with new value and mode
    dispatch(updateCellValue(pos, cell.value));
  };

  return (
    <textarea
      id={`cell-${pos}`}
      tabIndex={-1}
      readOnly={mode === CellMode.ReadOnly || isDisabled}
      maxLength={mode !== CellMode.Notes ? 1 : 9}
      rows={1}
      cols={1}
      value={value || ""}
      className={cx(
        mode,
        isDisabled && "disabled",
        withError && mode !== CellMode.Notes && "error",
        withHighlight && mode !== CellMode.Notes && "highlight"
      )}
      onKeyUp={!isDisabled ? onKeyup : undefined}
      onFocus={!isDisabled ? onSelect : undefined}
      onClick={!isDisabled ? onSelect : undefined}
      onChange={!isDisabled && mode !== CellMode.ReadOnly ? onInput : undefined}
    />
  );
};
