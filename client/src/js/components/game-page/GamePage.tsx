import React, { useEffect } from "react";
import cx from "classnames";

import "./gamePage.less";

import { SideMenu } from "../side-menu/SideMenu";
import { MenuButtonProps } from "../buttons/Button";
import { Game } from "../../generator";
import { SudokuTable } from "../sudoku-table/SudokuTable";
import { Slider } from "../slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { getCellMode, getSideMenuIsOpen, getCellProps } from "./ducks/selectors";
import { selectCellContent } from "./helpers";
import {
  resetGameTools,
  toggleSideMenu,
  toggleCellMode,
  updateGameState,
  checkForWin,
  highLightCells,
  updateNotesCells,
  updatePencilCells,
  updateCellValue,
} from "./ducks/actions";
import { GameState } from "./ducks/reducer";
import { findCoordinates, arrowKeys, getCellPosFromElement } from "../../game/gameCells";
import { showResetPopup, showSolvePopup } from "../popup/ducks/actions";

export interface GamePageProps {
  hidden: boolean;
  game: Game;
  returnToLobby: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({
  hidden,
  game,
  returnToLobby,
}) => {
  const dispatch = useDispatch();
  const cellMode = useSelector(getCellMode);
  const isSideMenuOpen = useSelector(getSideMenuIsOpen);
  const cellProps = useSelector(getCellProps);

  useEffect(() => {
    dispatch(updateGameState(GameState.New));
  }, []);

  useEffect(() => {
    dispatch(resetGameTools());
  }, [hidden]);

  const sideMenuButtons: MenuButtonProps[] = [
    {
      value: "Return",
      onClick: returnToLobby,
    },
    {
      value: "Reset",
      onClick: () => showResetPopup(dispatch),
    },
    {
      value: "Check",
      onClick: () => dispatch(checkForWin()),
    },
    {
      value: "Solve",
      onClick: () => showSolvePopup(dispatch),
    },
  ];

  const onSelect = (e: React.FocusEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLTextAreaElement>) => {
    const cell = e.target as HTMLTextAreaElement;
    const pos = getCellPosFromElement({ game, cell });
    const props = cellProps[pos];
    selectCellContent({ cell, props, cellMode });
    dispatch(highLightCells(props));
  };

  const onKeyup = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const cell = e.target as HTMLTextAreaElement;
    const coor = findCoordinates(game.ratio, cell);

    // removes notes from column, row and grid where the pencil value was inserted, if enabled in settings
    dispatch(updateNotesCells(findCoordinates(game.ratio, cell)));

    // resets highlights, shows cell errors if enabled in settings and checks if game is solved
    dispatch(updatePencilCells());

    // use arrow keys to move from cell to cell
    arrowKeys(e.keyCode, coor);
  };

  const onInput = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const cell = e.target as HTMLTextAreaElement;
    const pos = getCellPosFromElement({ game, cell });

    // Filters invalid inputs updates cell with new value and mode
    dispatch(updateCellValue(pos, cell.value));
  };

  return (
    <div className={cx("game", hidden && "hidden")}>
      <SideMenu
        hidden={(!isSideMenuOpen)}
        onClick={() => dispatch(toggleSideMenu())}
        buttons={sideMenuButtons}
      />

      <div className="game-wrapper">
        <SudokuTable
          cellState={cellProps}
          gameType={game.gameType}
          onFocus={onSelect}
          onClick={onSelect}
          onKeyup={onKeyup}
          onInput={onInput}
        />
        <Slider onClick={() => dispatch(toggleCellMode())} />
      </div>
    </div>
  );
};
