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
import { registerUser, getUser, getUserFromId, UserData } from "./requests";
import { getCurrentGame, getUserId } from "./selectors";
import { initialState } from "../../game-page/ducks/reducer";
import { getGameState } from "../../game-page/ducks/selectors";
import { setGameState, updateGamePhase } from "../../game-page/ducks/actions";
import {
  setSessionStorageKey,
  SessionStorageKeys,
  getSessionStorageKey,
} from "../../../utils/sessionStorage";
import { setFormError } from "../../login-form/ducks/actions";
import { saveToDatabaseOrStorage } from "../../../utils/saveToDatabaseOrStorage";
import { getStorageKey, LocalStorageKeys } from "../../../utils/localStorage";
import { SavedGame } from "./requests";

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
const initLoggedInUserInfo = (user: UserData): AppThunk => dispatch => {
  const { gameConfig, gameState, username, _id: id } = user;

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
};

const initGuestUserInfo = ({
  config,
  state,
}: SavedGame): AppThunk => dispatch => {
  if (config && state) {
    dispatch(setCurrentGame(config));
    dispatch(
      setGameState({
        ...state,
        cellProps: JSON.parse(state.cellProps),
      })
    );
  }
};

export const findUser = (): AppThunk => async dispatch => {
  dispatch(setLobbyIsLoading(true));

  const userId = getSessionStorageKey(SessionStorageKeys.UserId);
  const storageGame = getStorageKey(LocalStorageKeys.CurrentGame) as
    | SavedGame
    | undefined;

  try {
    if (userId) {
      const { data, status } = await getUserFromId(userId);

      if (data.type === "fail") {
        throw { ...data, status };
      }
      dispatch(initLoggedInUserInfo(data.user));
    } else if (storageGame) {
      dispatch(initGuestUserInfo(storageGame));
    }

    dispatch(setLobbyIsLoading(false));
  } catch (error) {
    dispatch(setError(error));
    setSessionStorageKey(SessionStorageKeys.UserId, "");
    dispatch(setLobbyIsLoading(false));
  }
};

export const loginUser = (
  username: string,
  password: string,
  isNewUser: boolean
): AppThunk => async dispatch => {
  try {
    const { data, status } = isNewUser
      ? await registerUser(username, password)
      : await getUser(username, password);

    if (data.type === "fail") {
      throw { ...data, status };
    }

    dispatch(initLoggedInUserInfo(data.user));
    setSessionStorageKey(SessionStorageKeys.UserId, data.user._id);
  } catch (error) {
    if (error.isValidationError) {
      dispatch(setFormError(error.message));
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
  const userId = getUserId(getState());

  const config = new Game(props);

  try {
    await saveToDatabaseOrStorage(
      {
        config,
        state: {
          ...initialState,
          cellProps: JSON.stringify(initialState.cellProps),
        },
      },
      userId
    );

    dispatch(setCurrentGame(config));
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
  const config = getCurrentGame(state);
  const gameState = getGameState(state);
  const userId = getUserId(state);

  if (!config) {
    console.error(`Cannot save game. There is no ongoing game to save`);
    return;
  }

  try {
    await saveToDatabaseOrStorage(
      {
        config,
        state: {
          ...gameState,
          cellProps: JSON.stringify(gameState.cellProps),
        },
      },
      userId
    );
  } catch (error) {
    dispatch(setError(error));
  }
};
