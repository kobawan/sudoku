import { toggleContent, mountGamePage, unmountGamePage } from "../utils/visibilityUtils";
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
    document.querySelector(".lobby").classList.add("hidden");
    toggleContent();
    mountGamePage({ game });
};

/**
 * Gets initialized game. If no game has been initialized it throws error.
 */
export const getGame = () => {
    if (!game) {
        // TODO add behaviour for resume button for when game is not initialized
        throw new Error("Game is not initialized. Please start a new game.");
    }
    return game;
};
