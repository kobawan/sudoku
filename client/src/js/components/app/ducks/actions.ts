import { Action } from "redux";
import { Page } from "../../../consts";
import { Game } from "../../../generator";
import { MenuSection } from "../../menu-content/types";

export const SET_PAGE = "@app/SET_PAGE";
export const SET_CURRENT_GAME = "@app/SET_CURRENT_GAME";
export const SET_LOBBY_IS_LOADING = "@app/SET_LOBBY_IS_LOADING";
export const SET_LOBBY_HAS_ERROR = "@app/SET_LOBBY_HAS_ERROR";
export const SET_LOBBY_MENU_SECTION = "@app/SET_LOBBY_MENU_SECTION";

export interface SetPageAction extends Action<typeof SET_PAGE> {
  page: Page;
}

export const setPage = (page: Page): SetPageAction => ({
  type: SET_PAGE,
  page,
});

export interface SetCurrentGameAction extends Action<typeof SET_CURRENT_GAME> {
  game: Game;
}

export const setCurrentGame = (game: Game): SetCurrentGameAction => ({
  type: SET_CURRENT_GAME,
  game,
});

export interface SetLobbyIsLoadingAction extends Action<typeof SET_LOBBY_IS_LOADING> {
  isLoading: boolean;
}

export const setLobbyIsLoading = (isLoading: boolean): SetLobbyIsLoadingAction => ({
  type: SET_LOBBY_IS_LOADING,
  isLoading,
});

export interface SetLobbyHasErrorAction extends Action<typeof SET_LOBBY_HAS_ERROR> {
  hasError: boolean;
}

export const setLobbyHasError = (hasError: boolean): SetLobbyHasErrorAction => ({
  type: SET_LOBBY_HAS_ERROR,
  hasError,
});

export interface SetLobbyMenuSectionAction extends Action<typeof SET_LOBBY_MENU_SECTION> {
  section: MenuSection | undefined;
}

export const setLobbyMenuSection = (section?: MenuSection): SetLobbyMenuSectionAction => ({
  type: SET_LOBBY_MENU_SECTION,
  section,
});
