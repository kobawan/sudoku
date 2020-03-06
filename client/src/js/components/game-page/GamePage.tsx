import React, { useEffect } from "react";
import cx from "classnames";

import "./gamePage.less";

import { SideMenu } from "../side-menu/SideMenu";
import { Game } from "../../generator";
import { SudokuTable } from "../sudoku-table/SudokuTable";
import { Slider } from "../slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import { getCellProps } from "./ducks/selectors";
import { resetGameTools, updateGameState } from "./ducks/actions";
import { GameState } from "./ducks/reducer";

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
  const cellProps = useSelector(getCellProps);

  useEffect(() => {
    dispatch(updateGameState(GameState.New));
  }, []);

  useEffect(() => {
    dispatch(resetGameTools());
  }, [hidden]);

  return (
    <div className={cx("game", hidden && "hidden")}>
      <SideMenu returnToLobby={returnToLobby} />
      <div className="game-wrapper">
        <SudokuTable cellState={cellProps} gameType={game.gameType} />
        <Slider />
      </div>
    </div>
  );
};
