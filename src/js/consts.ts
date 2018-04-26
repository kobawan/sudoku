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
    Pencil,
    Notes,
    ReadOnly,
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

export type TableCellsMap = { [key: number]: CellProps };

export interface CellCoordinates {
    x: number;
    y: number;
    grid: number;
}
