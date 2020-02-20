import { Action } from "redux";
import { Game } from "./generator";
import { ThunkAction } from "redux-thunk";
import { RootState } from "./store";

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
    onFocus: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    onKeyup: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onClick: (event: React.MouseEvent<HTMLTextAreaElement>) => void;
    onInput: (event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
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
  game: GameData;
}

// TODO: add production endpoint for server
export const serverEndpoint = process.env.NODE_ENV === "development" ? "http://localhost:4000" : "";

export interface ActionWithPayload<T, P> extends Action<T> {
  payload: P;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
