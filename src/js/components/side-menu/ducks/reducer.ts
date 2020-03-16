import { Reducer } from "redux";
import { ToggleSideMenuAction, TOGGLE_SIDE_MENU } from "./actions";
import {
  SET_CURRENT_GAME,
  SetCurrentGameAction,
} from "../../app/ducks/actions";
import {
  ResetGameToolsAction,
  RESET_GAME_TOOLS,
} from "../../game-page/ducks/actions";

interface State {
  isOpen: boolean;
}

type Actions =
  | ToggleSideMenuAction
  | SetCurrentGameAction
  | ResetGameToolsAction;

const initialState: State = {
  isOpen: false,
};

export const sideMenuReducer: Reducer<State, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case TOGGLE_SIDE_MENU:
      return { ...state, isOpen: !state.isOpen };
    case RESET_GAME_TOOLS:
      return {
        ...state,
        isOpen: false,
      };
    case SET_CURRENT_GAME:
      return initialState;
    default:
      return state;
  }
};
