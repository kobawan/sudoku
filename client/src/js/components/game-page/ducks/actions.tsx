import { ActionWithPayload, TableCellsMap, AppThunk, CellCoordinates, CellMode, CellProps } from "../../../consts";
import { Action } from "redux";
import { Game } from "../../../generator";
import { getDuplicates } from "../../../game/gameTable";
import { getCurrentGame } from "../../app/ducks/selectors";
import {
  hasInvalidEndgameCells,
  getNewCellProps,
  getEndgameCellProps,
  canAutomaticallyUpdateNotesCells,
  resetCellStatus
} from "../helpers";
import { GameState } from "./reducer";
import { getCellProps, getCellMode } from "./selectors";
import { removeDuplicateNotesCells } from "../../../game/gameNotesCells";
import { removeDuplicates } from "../../../utils/generalUtils";
import { showWinPopup, showCheckPopup } from "../../popup/ducks/actions";
import { toggleSideMenu } from "../../side-menu/ducks/actions";

export const TOGGLE_CELL_MODE = "@game/TOGGLE_CELL_MODE";
export const SET_CELL_PROPS = "@game/SET_CELL_PROPS";
export const RESET_GAME_TOOLS = "@game/RESET_GAME_TOOLS";
export const HIGHLIGHT_CELLS = "@game/HIGHLIGHT_CELLS";
export const SET_GAME_STATE = "@game/SET_GAME_STATE";
export const SET_CELL_VALUE = "@game/SET_CELL_VALUE";

export type ToggleCellModeAction = Action<typeof TOGGLE_CELL_MODE>;
export const toggleCellMode = (): ToggleCellModeAction => ({
  type: TOGGLE_CELL_MODE,
});

export type SetCellPropsAction = ActionWithPayload<typeof SET_CELL_PROPS, TableCellsMap>;
export const setCellProps = (payload: TableCellsMap): SetCellPropsAction => ({
  type: SET_CELL_PROPS,
  payload,
});

export type ResetGameToolsAction = Action<typeof RESET_GAME_TOOLS>;
export const resetGameTools = (): ResetGameToolsAction => ({
  type: RESET_GAME_TOOLS,
});

export type HighLightCellsAction = ActionWithPayload<typeof HIGHLIGHT_CELLS, CellProps>;
export const highLightCells = (payload: CellProps): HighLightCellsAction => ({
  type: HIGHLIGHT_CELLS,
  payload,
});

export type SetGameStateAction = ActionWithPayload<typeof SET_GAME_STATE, GameState>;
export const setGameState = (payload: GameState): SetGameStateAction => ({
  type: SET_GAME_STATE,
  payload,
});

export type SetCellValueAction = ActionWithPayload<typeof SET_CELL_VALUE, { pos: number, value: number }>;
export const setCellValue = (payload: { pos: number, value: number }): SetCellValueAction => ({
  type: SET_CELL_VALUE,
  payload,
});

export const updateGameState = (gameState: GameState): AppThunk => (dispatch, getState) => {
  const game = getCurrentGame(getState());
  const cellProps = getCellProps(getState());

  if (gameState === GameState.New && game) {
    dispatch(setCellProps(getNewCellProps(game.mask)));
    dispatch(resetGameTools());
  } else if (gameState === GameState.GameOver && game) {
    dispatch(setCellProps(getEndgameCellProps(game.matrix, cellProps)));
    dispatch(resetGameTools());
  } else if (gameState === GameState.Win) {
    dispatch(resetGameTools());
    showWinPopup(dispatch);
  }

  dispatch(setGameState(gameState));
};

export const checkForWin = (): AppThunk => (dispatch, getState) => {
  const game = getCurrentGame(getState()) as Game;
  const cellProps = getCellProps(getState());

  // Finds pencil mode cell duplicates from rows, cols and grids
  const duplicates = getDuplicates(
    cellProps,
    game.gameType,
    game.ratio,
  );

  const hasInvalidCells = hasInvalidEndgameCells(cellProps);

  // displays win message if conditions are met
  if (duplicates.length === 0 && !hasInvalidCells) {
    dispatch(updateGameState(GameState.Win));
  } else {
    dispatch(toggleSideMenu());
    showCheckPopup(dispatch, !!duplicates.length);
  }
};

export const updatePencilCells = (): AppThunk => (dispatch, getState) => {
  const game = getCurrentGame(getState()) as Game;
  const cellProps = getCellProps(getState());

  // Finds pencil mode cell duplicates from rows, cols and grids
  const duplicates = getDuplicates(
    cellProps,
    game.gameType,
    game.ratio,
  );

  // Resets highlights and updates errors if enabled in settings
  const newCellProps = resetCellStatus(cellProps, duplicates);
  if (newCellProps) {
    dispatch(setCellProps(newCellProps));
  }

  const hasInvalidCells = hasInvalidEndgameCells(cellProps);

  // displays win message if conditions are met
  if (duplicates.length === 0 && !hasInvalidCells) {
    dispatch(updateGameState(GameState.Win));
  }
};

export const updateNotesCells = (coor: CellCoordinates): AppThunk => (dispatch, getState) => {
  const state = getState();
  const game = getCurrentGame(state) as Game;
  const cellProps = getCellProps(state);
  const cellMode = getCellMode(state);

  const pos = coor.x * game.gameType + coor.y;
  const props = cellProps[pos];

  if (!canAutomaticallyUpdateNotesCells({ cellMode, selectedCell: props })) {
    return;
  }

  const newCellProps = removeDuplicateNotesCells(
    game.gameType,
    game.ratio,
    cellProps,
    props,
    coor,
  );

  if (!newCellProps) {
    return;
  }

  dispatch(setCellProps(newCellProps));
};

export const updateCellValue = (pos: number, value: string): AppThunk => (dispatch, getState) => {
  if (value === "") {
    dispatch(setCellValue({ pos, value: 0 }));
    return;
  }

  if (value.match(/^[1-9]+$/g)) {
    const cellMode = getCellMode(getState());
    let newValue: number;

    if (cellMode === CellMode.Pencil) {
      newValue = +value || 0;
    } else {
      const notes = removeDuplicates(value
        .split("")
        .map(val => +val)
        .sort()
      ).join("");
      newValue = +notes || 0;
    }

    dispatch(setCellValue({ pos, value: newValue }));
    return;
  }
};
