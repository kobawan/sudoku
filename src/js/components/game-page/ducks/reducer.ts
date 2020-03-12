import { Reducer } from "redux";
import { CellMode, TableCellsMap } from "../../../consts";
import {
  ToggleCellModeAction,
  SetCellPropsAction,
  TOGGLE_CELL_MODE,
  SET_CELL_PROPS,
  ResetGameToolsAction,
  RESET_GAME_TOOLS,
  SetGameStateAction,
  SET_GAME_STATE,
  HighLightCellsAction,
  HIGHLIGHT_CELLS,
  SetCellValueAction,
  SET_CELL_VALUE,
} from "./actions";
import {
  SET_CURRENT_GAME,
  SetCurrentGameAction,
} from "../../app/ducks/actions";
import { updateCellsCellMode, updateCellsHighlight } from "../helpers/helpers";
import { getStorageKey, StorageKeys } from "../../../utils/localStorage";

export enum GameState {
  New,
  Playing,
  Win,
  GameOver,
}

interface State {
  cellMode: CellMode;
  cellProps: TableCellsMap;
  gameState: GameState;
}

type Actions =
  | ToggleCellModeAction
  | SetCellPropsAction
  | SetCurrentGameAction
  | ResetGameToolsAction
  | HighLightCellsAction
  | SetGameStateAction
  | SetCellValueAction;

const initialState: State = {
  cellMode: CellMode.Pencil,
  cellProps: {},
  gameState: GameState.New,
};

export const gameReducer: Reducer<State, Actions> = (
  state = initialState,
  action
) => {
  const { cellMode, cellProps } = state;
  switch (action.type) {
    case TOGGLE_CELL_MODE:
      const newCellMode =
        cellMode === CellMode.Pencil ? CellMode.Notes : CellMode.Pencil;
      return {
        ...state,
        cellMode: newCellMode,
        cellProps: updateCellsCellMode(cellProps, newCellMode),
      };
    case HIGHLIGHT_CELLS:
      const disableHighlighting = getStorageKey(
        StorageKeys.DisableHighlighting
      );
      if (disableHighlighting) {
        return state;
      }

      return {
        ...state,
        cellProps: updateCellsHighlight(cellProps, action.payload),
      };
    case SET_CELL_VALUE:
      const { pos, value } = action.payload;
      const props = state.cellProps[pos];

      return {
        ...state,
        cellProps: {
          ...state.cellProps,
          [pos]: {
            ...props,
            value,
            mode: state.cellMode,
          },
        },
      };
    case SET_GAME_STATE:
      return {
        ...state,
        gameState: action.payload,
      };
    case SET_CELL_PROPS:
      return {
        ...state,
        cellProps: action.payload,
      };
    case RESET_GAME_TOOLS:
      return {
        ...state,
        cellMode: CellMode.Pencil,
      };
    case SET_CURRENT_GAME:
      return initialState;
    default:
      return state;
  }
};
