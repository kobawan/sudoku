import { Reducer } from "redux";
import { CellMode, TableCellsMap } from "../../../consts";
import {
  ToggleCellModeAction,
  ToggleSideMenuAction,
  ShowPopupAction,
  SetCellPropsAction,
  TOGGLE_CELL_MODE,
  TOGGLE_SIDE_MENU,
  SHOW_POPUP,
  SET_CELL_PROPS,
  ResetGameToolsAction,
  RESET_GAME_TOOLS,
  HIDE_POPUP,
  HidePopupAction,
  SetGameStateAction,
  SET_GAME_STATE,
  HighLightCellsAction,
  HIGHLIGHT_CELLS,
  SetCellValueAction,
  SET_CELL_VALUE,
} from "./actions";
import { PopupProps } from "../../popup/Popup";
import { SET_CURRENT_GAME, SetCurrentGameAction } from "../../app/ducks/actions";
import { updateCellsCellMode, updateCellsHighlight } from "../helpers";
import { getStorageKey, StorageKeys } from "../../../utils/localStorage";

export enum GameState {
  New,
  Playing,
  Win,
  GameOver,
}

interface State {
  cellMode: CellMode;
  sideMenuIsOpen: boolean;
  popupProps: PopupProps;
  cellProps: TableCellsMap;
  gameState: GameState;
}

type Actions = (
  ToggleCellModeAction
  | ToggleSideMenuAction
  | ShowPopupAction
  | HidePopupAction
  | SetCellPropsAction
  | SetCurrentGameAction
  | ResetGameToolsAction
  | HighLightCellsAction
  | SetGameStateAction
  | SetCellValueAction
);

const initialState: State = {
  cellMode: CellMode.Pencil,
  sideMenuIsOpen: false,
  popupProps: {
      hidden: true,
  },
  cellProps: {},
  gameState: GameState.New,
};

export const gameReducer: Reducer<State, Actions> = (state = initialState, action) => {
  const { cellMode, cellProps } = state;
  switch (action.type) {
    case TOGGLE_CELL_MODE:
      const newCellMode = cellMode === CellMode.Pencil ? CellMode.Notes : CellMode.Pencil;
      return {
        ...state,
        cellMode: newCellMode,
        cellProps: updateCellsCellMode(cellProps, newCellMode),
      };
    case HIGHLIGHT_CELLS:
      const disableHighlighting = getStorageKey(StorageKeys.DisableHighlighting);
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
          }
        }
      };
    case TOGGLE_SIDE_MENU:
      return { ...state, sideMenuIsOpen: !state.sideMenuIsOpen };
    case SHOW_POPUP:
      return {
        ...state,
        sideMenuIsOpen: false,
        popupProps: {
          ...action.payload,
          hidden: false,
        },
      };
    case HIDE_POPUP:
      return {
        ...state,
        popupProps: {
          ...state.popupProps,
          hidden: true,
        }
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
        sideMenuIsOpen: false,
        popupProps: {
          ...state.popupProps,
          hidden: true,
        },
      };
    case SET_CURRENT_GAME:
      return initialState;
    default:
      return state;
  }
};
