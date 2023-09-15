import { Reducer } from "redux";
import {
  ShowPopupAction,
  SHOW_POPUP,
  HIDE_POPUP,
  HidePopupAction,
} from "./actions";
import { PopupProps } from "../Popup";
import {
  SET_CURRENT_GAME,
  SetCurrentGameAction,
} from "../../app/ducks/actions";
import {
  ResetGameToolsAction,
  RESET_GAME_TOOLS,
} from "../../game-page/ducks/actions";

type State = PopupProps;

type Actions =
  | ShowPopupAction
  | HidePopupAction
  | SetCurrentGameAction
  | ResetGameToolsAction;

const initialState: State = {
  hidden: true,
};

export const popupReducer: Reducer<State, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SHOW_POPUP:
      return {
        ...action.payload,
        hidden: false,
      };
    case HIDE_POPUP:
      return {
        ...state,
        hidden: true,
      };
    case RESET_GAME_TOOLS:
      return {
        ...state,
        hidden: true,
      };
    case SET_CURRENT_GAME:
      return initialState;
    default:
      return state;
  }
};
