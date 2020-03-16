import { Reducer } from "redux";
import { Game } from "../../../generator/generator";
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
  SetErrorAction,
  RemoveErrorAction,
  SET_ERROR,
  REMOVE_ERROR,
} from "./actions";
import { MenuSection } from "../../menu-content/types";
import { ErrorResponse } from "./requests";

interface State {
  page: Page;
  currentGame: Game | undefined;
  lobbyIsLoading: boolean;
  lobbyHasError: boolean;
  lobbyMenuSection: MenuSection | undefined;
  errors: ErrorResponse[];
}

type Actions =
  | SetPageAction
  | SetCurrentGameAction
  | SetLobbyHasErrorAction
  | SetLobbyIsLoadingAction
  | SetLobbyMenuSectionAction
  | SetErrorAction
  | RemoveErrorAction;

const initialState: State = {
  page: Page.Menu,
  currentGame: undefined,
  lobbyIsLoading: true,
  lobbyHasError: false,
  lobbyMenuSection: undefined,
  errors: [],
};

export const appReducer: Reducer<State, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_PAGE: {
      return { ...state, page: action.payload };
    }
    case SET_CURRENT_GAME: {
      return { ...state, currentGame: action.payload };
    }
    case SET_LOBBY_HAS_ERROR: {
      return { ...state, lobbyHasError: action.payload };
    }
    case SET_LOBBY_IS_LOADING: {
      return { ...state, lobbyIsLoading: action.payload };
    }
    case SET_LOBBY_MENU_SECTION: {
      return { ...state, lobbyMenuSection: action.payload };
    }
    case SET_ERROR: {
      return {
        ...state,
        errors: [
          action.payload,
          ...state.errors.filter(
            error => error.message !== action.payload.message
          ),
        ],
      };
    }
    case REMOVE_ERROR: {
      return {
        ...state,
        errors: state.errors.filter(
          error => error.message !== action.payload.message
        ),
      };
    }
    default: {
      return state;
    }
  }
};
