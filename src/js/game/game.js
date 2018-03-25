import { mountGamePage, unmountGamePage, unmountLobbyPage } from "../utils/visibilityUtils";
import Game from "../Generator";
import { GameConfig } from "../consts";

let game = undefined;

/**
 * Initializes game and sets game singleton. Changes page when game is initialized.
 * @param {GameConfig.DIFFICULTY} difficulty difficulty of sudoku
 * @param {GameConfig.TYPE} gameType size of sudoku
 */
export const initGame = (difficulty, gameType = GameConfig.TYPE.DEFAULT) => {
    game = new Game(gameType, difficulty);

    unmountGamePage();
    unmountLobbyPage();
    mountGamePage({ game });
};

/**
 * Gets initialized game. If no game has been initialized it throws error.
 */
export const getGame = (isFromLobby = false) => {
    if (!game && !isFromLobby) {
        throw new Error("Game is not initialized. Please start a new game.");
    }
    return game;
};
