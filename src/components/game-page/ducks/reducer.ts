import { Reducer } from "redux";
import { CellMode, TableCellsMap, GamePhase } from "../../../consts";
import {
  ToggleCellModeAction,
  SetCellPropsAction,
  TOGGLE_CELL_MODE,
  SET_CELL_PROPS,
  ResetGameToolsAction,
  RESET_GAME_TOOLS,
  SetGamePhaseAction,
  SET_GAME_PHASE,
  HighLightCellsAction,
  HIGHLIGHT_CELLS,
  SetCellValueAction,
  SET_CELL_VALUE,
  SetGameStateAction,
  SET_GAME_STATE,
  RESET_HIGHLIGHT_CELLS,
  ResetHighLightCellsAction,
  RESET_ERROR_CELLS,
  ResetErrorCellsAction,
} from "./actions";
import {
  SET_CURRENT_GAME,
  SetCurrentGameAction,
} from "../../app/ducks/actions";
import {
  updateCellsCellMode,
  updateCellsHighlight,
  resetCellsHighlight,
  resetCellsError,
} from "../helpers/helpers";
import { getStorageKey, LocalStorageKeys } from "../../../utils/localStorage";

export interface State {
  cellMode: CellMode;
  cellProps: TableCellsMap;
  gamePhase: GamePhase;
}

type Actions =
  | ToggleCellModeAction
  | SetCellPropsAction
  | SetCurrentGameAction
  | ResetGameToolsAction
  | HighLightCellsAction
  | SetGamePhaseAction
  | SetCellValueAction
  | SetGameStateAction
  | ResetHighLightCellsAction
  | ResetErrorCellsAction;

export const initialState: State = {
  cellMode: CellMode.Pencil,
  cellProps: {},
  gamePhase: GamePhase.New,
};

export const gameReducer: Reducer<State, Actions> = (
  state = initialState,
  action
) => {
  const { cellMode, cellProps } = state;

  // ATTENTION: New actions added to reducer should also be added to save middleware
  switch (action.type) {
    case TOGGLE_CELL_MODE: {
      const newCellMode =
        cellMode === CellMode.Pencil ? CellMode.Notes : CellMode.Pencil;
      return {
        ...state,
        cellMode: newCellMode,
        cellProps: updateCellsCellMode(cellProps, newCellMode),
      };
    }
    case HIGHLIGHT_CELLS: {
      const disableHighlighting = getStorageKey(
        LocalStorageKeys.DisableHighlighting
      );
      if (disableHighlighting) {
        return state;
      }

      return {
        ...state,
        cellProps: updateCellsHighlight(cellProps, action.payload),
      };
    }
    case RESET_HIGHLIGHT_CELLS: {
      return {
        ...state,
        cellProps: resetCellsHighlight(cellProps),
      };
    }
    case RESET_ERROR_CELLS: {
      return {
        ...state,
        cellProps: resetCellsError(cellProps),
      };
    }
    case SET_CELL_VALUE: {
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
    }
    case SET_GAME_PHASE: {
      return {
        ...state,
        gamePhase: action.payload,
      };
    }
    case SET_CELL_PROPS: {
      return {
        ...state,
        cellProps: action.payload,
      };
    }
    case RESET_GAME_TOOLS: {
      return {
        ...state,
        cellMode: CellMode.Pencil,
      };
    }
    case SET_GAME_STATE: {
      return action.payload;
    }
    case SET_CURRENT_GAME: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
