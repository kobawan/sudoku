import {
  SAVE_GAME_ENDPOINT,
  request,
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  USER_ENDPOINT,
} from "../../../utils/server";
import { Game } from "../../../generator/generator";
import { State } from "../../game-page/ducks/reducer";
import { CellMode, GamePhase } from "../../../consts";

interface ErrorResponse {
  type: "fail";
  message: string;
  isValidationError?: boolean;
}

export interface UserData {
  _id: string;
  username: string;
  gameConfig: Game | null;
  gameState: {
    cellMode: CellMode;
    cellProps: string;
    gamePhase: GamePhase;
  } | null;
}

interface SuccessResponse {
  type: "success";
}

type Response<D = {}> = ErrorResponse | (SuccessResponse & D);

export const registerUser = (username: string, password: string) =>
  request.post<Response<{ user: UserData }>>(REGISTER_ENDPOINT, {
    username,
    password,
  });

export const getUser = (username: string, password: string) =>
  request.post<Response<{ user: UserData }>>(LOGIN_ENDPOINT, {
    username,
    password,
  });

export const getUserFromId = (id: string) =>
  request.get<Response<{ user: UserData }>>(`${USER_ENDPOINT}/${id}`);

export const saveGame = (body: {
  config: Omit<Game, "shuffle">;
  state: Omit<State, "cellProps"> & { cellProps: string };
  id: string;
}) => request.post<Response>(SAVE_GAME_ENDPOINT, body);
