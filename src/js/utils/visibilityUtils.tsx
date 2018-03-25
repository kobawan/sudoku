import * as React from "react";
import * as ReactDOM from "react-dom";

import { GamePage, GamePageProps } from "../game/game-page/GamePage";
import Game from "../generator";

import { LobbyPage } from "../lobby/lobby-page/LobbyPage";

/**
 * Mounts game page with given props
 */
export const mountGamePage = (props: GamePageProps) => {
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

export enum Page {
    Game,
    Menu,
};

/**
 * Toggles page between game and menu
 */
export const changePage = (game: Game, page = Page.Game) => {
    if(page === Page.Game) {
        unmountLobbyPage();
        mountGamePage({ game });
    }
    else if (page === Page.Menu) {
        mountLobbyPage();
        mountGamePage({ game, hidden: true });
    }
};
