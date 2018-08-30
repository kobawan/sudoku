import * as React from "react";
import { LobbyPage } from "./lobby/lobby-page/LobbyPage";
import { GamePage } from "./game/game-page/GamePage";
import { Game } from "./generator";
import { GameConfig } from "./consts";

export enum Page {
    Game,
    Menu,
}

export interface AppState {
    selectedPage: Page;
    currentGame?: Game;
}

export class App extends React.Component<{}, AppState> {
    public state: AppState = {
        selectedPage: Page.Menu,
        currentGame: undefined,
    };

    public render () {
        const isLobby = this.state.selectedPage === Page.Menu;

        return (
            <>
                <LobbyPage
                    hidden={!isLobby}
                    hasCurrentGame={!!this.state.currentGame}
                    generateGame={this.generateGame}
                    returnToGame={this.togglePage}
                />
                {this.state.currentGame && (
                    <GamePage
                        hidden={isLobby}
                        game={this.state.currentGame}
                        returnToLobby={this.togglePage}
                    />
                )}
            </>
        );
    }

    private generateGame = (props: GameConfig) => {
        this.setState({
            currentGame: new Game(props),
            selectedPage: Page.Game,
        });
    }

    private togglePage = () => {
        this.setState({
            selectedPage: this.state.selectedPage === Page.Menu ? Page.Game : Page.Menu,
        });
    }
}
