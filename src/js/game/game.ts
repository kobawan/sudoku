import { mountGamePage, unmountGamePage, unmountLobbyPage } from "../utils/visibilityUtils";
import { Game } from "../generator";
import { GameConfig } from "../consts";

let game: Game | undefined = undefined;

/**
 * Initializes game and sets game singleton. Changes page when game is initialized.
 */
export const initGame = (props: GameConfig) => {
    game = new Game(props);

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
