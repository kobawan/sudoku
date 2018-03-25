import * as React from "react";
import ReactDOM from "react-dom";

import { GamePage } from "../game/game-page/GamePage.jsx";
import { getGame } from "../game/game";

import { LobbyPage } from "../lobby/lobby-page/LobbyPage.jsx";

/**
 * Mounts game page with given props
 * @param { hidden: boolean, game: Game } props
 */
export const mountGamePage = (props) => {
    ReactDOM.render(
        <GamePage {...props} />,
        document.getElementById("gamePage")
    );
};

/**
 * Unmounts game page. Needed for when a new game starts.
 */
export const unmountGamePage = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("gamePage"));
};

/**
 * Mounts lobby page
 */
export const mountLobbyPage = () => {
    ReactDOM.render(
        <LobbyPage />,
        document.getElementById("lobbyPage")
    );
};

/**
 * Unmounts lobby page
 */
export const unmountLobbyPage = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("lobbyPage"));
};

export const Page = {
    Game: 0,
    Menu: 1,
};

/**
 * Toggles page between game and menu
 * @param {Page} page
 */
export const changePage = (page = Page.Game) => {
    if(page === Page.Game) {
        unmountLobbyPage();
        mountGamePage({ game: getGame() });
    }
    else if (page === Page.Menu) {
        mountLobbyPage();
        mountGamePage({ hidden: true });
    }
};
