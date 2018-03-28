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

export enum CellClassType {
    READONLY = "readOnly",
    PENCIL = "pencil",
    NOTES = "notes",
    HIGHLIGHT = "highlight",
    ERROR = "error",
}

export enum CellMode {
    Pencil,
    Notes,
}
