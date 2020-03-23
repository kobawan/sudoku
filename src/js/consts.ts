import { Action, Middleware } from "redux";
import { Game } from "./generator/generator";
import { ThunkAction } from "redux-thunk";
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

export interface GameData {
  config: Game;
  state: string;
}

export interface UserData {
  _id: string;
  game?: GameData;
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