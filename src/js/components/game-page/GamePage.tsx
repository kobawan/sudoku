import React from "react";
import cx from "classnames";
import { useSelector } from "react-redux";

import "./gamePage.less";

import { SideMenu } from "../side-menu/SideMenu";
import { Game } from "../../generator/generator";
import { SudokuTable } from "../sudoku-table/SudokuTable";
import { Slider } from "../slider/Slider";
import { getCellProps } from "./ducks/selectors";

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
  const cellProps = useSelector(getCellProps);

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
