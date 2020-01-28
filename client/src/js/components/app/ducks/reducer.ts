import { Reducer } from "redux";
import { Game } from "../../../generator";
import { Page } from "../../../consts";
import {
  SetPageAction,
  SetCurrentGameAction,
  SetLobbyHasErrorAction,
  SetLobbyIsLoadingAction,
  SET_CURRENT_GAME,
  SET_PAGE,
  SET_LOBBY_IS_LOADING,
  SET_LOBBY_HAS_ERROR,
} from "./actions";

interface State {
  page: Page;
  currentGame: Game | undefined;
  lobbyIsLoading: boolean;
  lobbyHasError: boolean;
}

type Actions = (
  SetPageAction
  | SetCurrentGameAction
  | SetLobbyHasErrorAction
  | SetLobbyIsLoadingAction
);

const initialState: State = {
  page: Page.Menu,
  currentGame: undefined,
  lobbyIsLoading: true,
  lobbyHasError: false,
};

export const appReducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, page: action.page };
    case SET_CURRENT_GAME:
      return { ...state, currentGame: action.game };
    case SET_LOBBY_HAS_ERROR:
      return { ...state, lobbyHasError: action.hasError };
    case SET_LOBBY_IS_LOADING:
      return { ...state, lobbyIsLoading: action.isLoading };
    default:
      return state;
  }
};
