import { RootState } from "../../../store";
import { GameState } from "./reducer";

export const getCellMode = (state: RootState) => state.game.cellMode;
export const getSideMenuIsOpen = (state: RootState) => state.game.sideMenuIsOpen;
export const getPopupProps = (state: RootState) => state.game.popupProps;
export const getCellProps = (state: RootState) => state.game.cellProps;
export const getGameState = (state: RootState) => state.game.gameState;
export const areCellsDisabled = (state: RootState) => {
  return [GameState.Win, GameState.GameOver].includes(getGameState(state));
};
