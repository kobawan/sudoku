import {
  Page,
  ActionWithPayload,
  AppThunk,
  GameConfig,
  GamePhase,
  User,
  RequestError,
} from "../../../consts";
import { Game } from "../../../generator/generator";
import { MenuSection } from "../../menu-content/types";
import { registerUser, getUser, saveGame } from "./requests";
import { getCurrentGame, getUserId } from "./selectors";
import { initialState } from "../../game-page/ducks/reducer";
import { getGameState } from "../../game-page/ducks/selectors";
import { setGameState, updateGamePhase } from "../../game-page/ducks/actions";
import {
  setSessionStorageKey,
  SessionStorageKeys,
} from "../../../utils/sessionStorage";

export const SET_PAGE = "@app/SET_PAGE";
export const SET_CURRENT_GAME = "@app/SET_CURRENT_GAME";
export const SET_LOBBY_IS_LOADING = "@app/SET_LOBBY_IS_LOADING";
export const SET_LOBBY_HAS_ERROR = "@app/SET_LOBBY_HAS_ERROR";
export const SET_LOBBY_MENU_SECTION = "@app/SET_LOBBY_MENU_SECTION";
export const SET_ERROR = "@app/SET_ERROR";
export const REMOVE_ERROR = "@app/REMOVE_ERROR";
export const SET_USER = "@app/SET_USER";

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

export type SetErrorAction = ActionWithPayload<typeof SET_ERROR, RequestError>;
export const setError = (payload: Error | RequestError): SetErrorAction => {
  return {
    type: SET_ERROR,
    payload,
  };
};

export type RemoveErrorAction = ActionWithPayload<
  typeof REMOVE_ERROR,
  Pick<RequestError, "message">
>;
export const removeError = (
  payload: Pick<RequestError, "message">
): RemoveErrorAction => ({
  type: REMOVE_ERROR,
  payload,
});

export type SetUserAction = ActionWithPayload<typeof SET_USER, User>;
export const setUser = (payload: User) => ({
  type: SET_USER,
  payload,
});

// THUNKS
export const loginUser = (
  username: string,
  password: string,
  isNewUser: boolean,
  showFormError: (msg: string) => void
): AppThunk => async dispatch => {
  try {
    const { data } = isNewUser
      ? await registerUser(username, password)
      : await getUser(username, password);

    if (data.type === "fail") {
      throw { ...data, status };
    }

    const { gameConfig, gameState, _id: id } = data.user;

    if (gameConfig && gameState) {
      dispatch(setCurrentGame(gameConfig));
      dispatch(
        setGameState({
          ...gameState,
          cellProps: JSON.parse(gameState.cellProps),
        })
      );
    }

    dispatch(setUser({ id, username }));
    setSessionStorageKey(SessionStorageKeys.UserId, id);
  } catch (error) {
    if (error.isValidationError) {
      showFormError(error.message);
    } else {
      dispatch(setError(error));
      dispatch(setLobbyHasError(true));
    }
  }
};

export const startNewGame = (props: GameConfig): AppThunk => async (
  dispatch,
  getState
) => {
  dispatch(setLobbyIsLoading(true));
  const id = getUserId(getState());

  if (!id) {
    console.error("Cannot save game. User is not logged in");
    return;
  }

  const game = new Game(props);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { shuffle, ...config } = game;

  try {
    const { data, status } = await saveGame({
      config,
      state: {
        ...initialState,
        cellProps: JSON.stringify(initialState.cellProps),
      },
      id,
    });
    if (data.type === "fail") {
      throw { ...data, status };
    }

    dispatch(setCurrentGame(game));
    dispatch(updateGamePhase(GamePhase.New));
    dispatch(setLobbyIsLoading(false));
    dispatch(setPage(Page.Game));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLobbyIsLoading(false));
    dispatch(setLobbyHasError(true));
  }
};

export const continueGame = (): AppThunk => dispatch => {
  dispatch(setPage(Page.Game));
};

export const save = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const game = getCurrentGame(state);
  const gameState = getGameState(state);
  const id = getUserId(state);

  if (!game || !id) {
    console.error(
      `Cannot save game. ${
        !game ? "There is no ongoing game to save" : "User is not logged in"
      }`
    );
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { shuffle, ...config } = game;

  try {
    const { data, status } = await saveGame({
      config,
      state: {
        ...gameState,
        cellProps: JSON.stringify(gameState.cellProps),
      },
      id,
    });
    if (data.type === "fail") {
      throw { ...data, status };
    }
  } catch (error) {
    dispatch(setError(error));
  }
};
