import { RootState } from "../../../ducks/store";
import { GamePhase } from "../../../consts";

export const getGameState = (state: RootState) => state.game;
export const getCellMode = (state: RootState) => state.game.cellMode;
export const getCellProps = (state: RootState) => state.game.cellProps;
export const getGamePhase = (state: RootState) => state.game.gamePhase;
export const areCellsDisabled = (state: RootState) => {
  return [GamePhase.Win, GamePhase.GameOver].includes(getGamePhase(state));
};
