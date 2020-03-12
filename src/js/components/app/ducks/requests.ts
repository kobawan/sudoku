import {
  REGISTER_USER,
  getUserEndpoint,
  SAVE_GAME,
  request,
} from "../../../utils/server";
import { UserData } from "../../../consts";
import { Game } from "../../../generator/generator";
import { getStorageKey, StorageKeys } from "../../../utils/localStorage";

interface ErrorResponse {
  message: string;
  status: number;
}

export const isErrorResponse = <D>(
  data: D | ErrorResponse
): data is ErrorResponse => {
  try {
    return (data as ErrorResponse).status !== undefined;
  } catch {
    return false;
  }
};

export const registerUser = () =>
  request.post<string | ErrorResponse>(REGISTER_USER);

export const getUser = (id: string) =>
  request.get<UserData | ErrorResponse>(getUserEndpoint(id));

export const saveGame = (config: Omit<Game, "shuffle">, state: string) =>
  request.post<null | ErrorResponse>(SAVE_GAME, {
    config,
    state,
    id: getStorageKey(StorageKeys.UserId),
  });
