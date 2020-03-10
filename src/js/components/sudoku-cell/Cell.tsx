import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import "./cell.less";

import { CellMode, CellProps } from "../../consts";
import {
  getCellPosFromElement,
  findCoordinates,
  arrowKeys,
} from "../../game/gameCells";
import { selectCellContent } from "../game-page/helpers";
import {
  highLightCells,
  updateNotesCells,
  updatePencilCells,
  updateCellValue,
} from "../game-page/ducks/actions";
import {
  getCellMode,
  getCellProps,
  areCellsDisabled,
} from "../game-page/ducks/selectors";
import { getCurrentGame } from "../app/ducks/selectors";
import { Game } from "../../generator";

export const Cell: React.FC<CellProps> = ({
  mode,
  value,
  withError,
  withHighlight,
}) => {
  const dispatch = useDispatch();
  const cellMode = useSelector(getCellMode);
  const cellProps = useSelector(getCellProps);
  const game = useSelector(getCurrentGame) as Game;
  const isDisabled = useSelector(areCellsDisabled);

  const onSelect = (
    e:
      | React.FocusEvent<HTMLTextAreaElement>
      | React.MouseEvent<HTMLTextAreaElement>
  ) => {
    const cell = e.target as HTMLTextAreaElement;
    const pos = getCellPosFromElement({ game, cell });
    const props = cellProps[pos];
    selectCellContent({ cell, props, cellMode });
    dispatch(highLightCells(props));
  };

  const onKeyup: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
    const cell = e.target as HTMLTextAreaElement;
    const coor = findCoordinates(game.ratio, cell);

    // removes notes from column, row and grid where the pencil value was inserted, if enabled in settings
    dispatch(updateNotesCells(findCoordinates(game.ratio, cell)));

    // resets highlights, shows cell errors if enabled in settings and checks if game is solved
    dispatch(updatePencilCells());

    // use arrow keys to move from cell to cell
    arrowKeys(e.keyCode, coor);
  };

  const onInput: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
    const cell = e.target as HTMLTextAreaElement;
    const pos = getCellPosFromElement({ game, cell });

    // Filters invalid inputs updates cell with new value and mode
    dispatch(updateCellValue(pos, cell.value));
  };

  return (
    <textarea
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
