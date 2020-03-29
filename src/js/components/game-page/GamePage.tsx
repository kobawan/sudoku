import React from "react";
import cx from "classnames";

import "./gamePage.less";

import { SideMenu } from "../side-menu/SideMenu";
import { Game } from "../../generator/generator";
import { SudokuTable } from "../sudoku-table/SudokuTable";
import { Slider } from "../slider/Slider";

export interface GamePageProps {
  game: Game;
  returnToLobby: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({ game, returnToLobby }) => {
  return (
    <div className={cx("game")}>
      <SideMenu returnToLobby={returnToLobby} />
      <div className="game-wrapper">
        <SudokuTable gameType={game.gameType} />
        <Slider />
      </div>
    </div>
  );
};
