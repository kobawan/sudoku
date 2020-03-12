import axios from "axios";
import {
  Page,
  UserData,
  ActionWithPayload,
  AppThunk,
  GameConfig,
} from "../../../consts";
import { Game } from "../../../generator/generator";
import { MenuSection } from "../../menu-content/types";
import {
  setStorageKey,
  StorageKeys,
  getStorageKey,
} from "../../../utils/localStorage";
import {
  REGISTER_USER,
  getUserEndpoint,
  SAVE_GAME,
} from "../../../utils/server";

export const SET_PAGE = "@app/SET_PAGE";
export const SET_CURRENT_GAME = "@app/SET_CURRENT_GAME";
export const SET_LOBBY_IS_LOADING = "@app/SET_LOBBY_IS_LOADING";
export const SET_LOBBY_HAS_ERROR = "@app/SET_LOBBY_HAS_ERROR";
export const SET_LOBBY_MENU_SECTION = "@app/SET_LOBBY_MENU_SECTION";

export type SetPageAction = ActionWithPayload<typeof SET_PAGE, Page>;
export const setPage = (payload: Page): SetPageAction => ({
  type: SET_PAGE,
  payload,
});

export type SetCurrentGameAction = ActionWithPayload<
  typeof SET_CURRENT_GAME,
  Game
>;
export const setCurrentGame = (payload: Game): SetCurrentGameAction => ({
  type: SET_CURRENT_GAME,
  payload,
});

export type SetLobbyIsLoadingAction = ActionWithPayload<
  typeof SET_LOBBY_IS_LOADING,
  boolean
>;
export const setLobbyIsLoading = (
  payload: boolean
): SetLobbyIsLoadingAction => ({
  type: SET_LOBBY_IS_LOADING,
  payload,
});

export type SetLobbyHasErrorAction = ActionWithPayload<
  typeof SET_LOBBY_HAS_ERROR,
  boolean
>;
export const setLobbyHasError = (payload: boolean): SetLobbyHasErrorAction => ({
  type: SET_LOBBY_HAS_ERROR,
  payload,
});

export type SetLobbyMenuSectionAction = ActionWithPayload<
  typeof SET_LOBBY_MENU_SECTION,
  MenuSection | undefined
>;
export const setLobbyMenuSection = (
  payload?: MenuSection
): SetLobbyMenuSectionAction => ({
  type: SET_LOBBY_MENU_SECTION,
  payload,
});

interface ErrorResponse {
  message: string;
  status: number;
}

const isErrorResponse = <D>(data: D | ErrorResponse): data is ErrorResponse => {
  return (data as ErrorResponse).status !== undefined;
};

// THUNKS
export const handleNewUser = (): AppThunk => async dispatch => {
  dispatch(setLobbyIsLoading(true));

  try {
    const { data } = await axios.post<string | ErrorResponse>(REGISTER_USER);
    if (isErrorResponse(data)) {
      throw data;
    }
    dispatch(setLobbyIsLoading(false));
    setStorageKey(StorageKeys.UserId, data);
  } catch (error) {
    dispatch(setLobbyIsLoading(false));
    dispatch(setLobbyHasError(true));
  }
};

export const handleCurrentUser = (id: string): AppThunk => async dispatch => {
  dispatch(setLobbyIsLoading(true));

  try {
    const { data } = await axios.get<UserData | ErrorResponse>(
      getUserEndpoint(id)
    );
    if (isErrorResponse(data)) {
      throw data;
    }
    dispatch(setLobbyIsLoading(false));
    dispatch(setCurrentGame(data.game.config));
  } catch (error) {
    dispatch(setLobbyIsLoading(false));
    dispatch(setLobbyHasError(true));
  }
};

export const startNewGame = (props: GameConfig): AppThunk => async dispatch => {
  dispatch(setLobbyIsLoading(true));
  const game = new Game(props);

  try {
    // TODO: Also record state
    const { data } = await axios.post<null | ErrorResponse>(SAVE_GAME, {
      config: game,
      state: "",
      id: getStorageKey(StorageKeys.UserId),
    });

    if (isErrorResponse(data)) {
      throw data;
    }

    dispatch(setCurrentGame(game));
    dispatch(setLobbyIsLoading(false));
    dispatch(setPage(Page.Game));
  } catch (error) {
    dispatch(setLobbyIsLoading(false));
    dispatch(setLobbyHasError(true));
  }
};
