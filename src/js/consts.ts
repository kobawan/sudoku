export const GameConfig = {
    DIFFICULTY: {
        EASY: 4,
        MEDIUM: 5,
        HARD: 6
    },
    TYPE: {
        DEFAULT: 9
    },
    SHUFFLE: 60,
};

export enum CellClassType {
    READONLY = "readOnly",
    PENCIL = "pencil",
    NOTES = "notes",
    HIGHLIGHT = "highlight",
    ERROR = "error",
};

export enum CellMode {
    Pencil,
    Notes,
};
