import { Action, Middleware } from "redux";
import { ThunkAction, ThunkMiddleware } from "redux-thunk";
import { RootState } from "./ducks/store";

export enum Page {
  Game,
  Menu,
}

export enum GameDifficulty {
  Easy = 4,
  Medium = 5,
  Hard = 6,
}

export enum GameType {
  Default = 9,
}

export interface GameConfig {
  difficulty: GameDifficulty;
  type?: GameType;
  shuffle?: number;
}

export enum CellMode {
  Pencil = "pencil",
  Notes = "notes",
  ReadOnly = "readOnly",
}

export enum GamePhase {
  New,
  Playing,
  Win,
  GameOver,
}

export interface CellProps {
  mode: CellMode;
  withHighlight: boolean;
  withError: boolean;
  value: number;
}

export interface TableCellsMap {
  [key: number]: CellProps;
}

export interface CellCoordinates {
  x: number;
  y: number;
  grid: number;
}

export interface User {
  username: string;
  id: string;
}

export interface RequestError {
  message: string;
  status?: number;
  isValidationError?: boolean;
}

export interface ActionWithPayload<T, P> extends Action<T> {
  payload: P;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppMiddleware = Middleware<{}, RootState>;

export type AppThunkMiddleware = ThunkMiddleware<RootState>;
