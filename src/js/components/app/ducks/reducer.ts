import { Reducer } from "redux";
import { Game } from "../../../generator";
import { Page } from "../../../consts";
import {
  SetPageAction,
  SetCurrentGameAction,
  SetLobbyHasErrorAction,
  SetLobbyIsLoadingAction,
  SetLobbyMenuSectionAction,
  SET_CURRENT_GAME,
  SET_PAGE,
  SET_LOBBY_IS_LOADING,
  SET_LOBBY_HAS_ERROR,
  SET_LOBBY_MENU_SECTION,
} from "./actions";
import { MenuSection } from "../../menu-content/types";

interface State {
  page: Page;
  currentGame: Game | undefined;
  lobbyIsLoading: boolean;
  lobbyHasError: boolean;
  lobbyMenuSection: MenuSection | undefined;
}

type Actions = (
  SetPageAction
  | SetCurrentGameAction
  | SetLobbyHasErrorAction
  | SetLobbyIsLoadingAction
  | SetLobbyMenuSectionAction
);

const initialState: State = {
  page: Page.Menu,
  currentGame: undefined,
  lobbyIsLoading: true,
  lobbyHasError: false,
  lobbyMenuSection: undefined,
};

export const appReducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_CURRENT_GAME:
      return { ...state, currentGame: action.payload };
    case SET_LOBBY_HAS_ERROR:
      return { ...state, lobbyHasError: action.payload };
    case SET_LOBBY_IS_LOADING:
      return { ...state, lobbyIsLoading: action.payload };
    case SET_LOBBY_MENU_SECTION:
      return { ...state, lobbyMenuSection: action.payload };
    default:
      return state;
  }
};
