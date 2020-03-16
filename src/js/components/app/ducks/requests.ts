import {
  USER_ENDPOINT,
  SAVE_GAME_ENDPOINT,
  request,
} from "../../../utils/server";
import { UserData } from "../../../consts";
import { Game } from "../../../generator/generator";
import { getStorageKey, StorageKeys } from "../../../utils/localStorage";

export interface ErrorResponse {
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
  request.post<string | ErrorResponse>(USER_ENDPOINT);

export const getUser = (id: string) =>
  request.get<UserData | ErrorResponse>(`${USER_ENDPOINT}/${id}`);

export const saveGame = (config: Omit<Game, "shuffle">, state: string) =>
  request.post<null | ErrorResponse>(SAVE_GAME_ENDPOINT, {
    config,
    state,
    id: getStorageKey(StorageKeys.UserId),
  });
