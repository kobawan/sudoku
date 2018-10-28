import * as React from "react";
import { graphql, compose, QueryResult } from "react-apollo";

import { LobbyPage } from "./lobby/lobby-page/LobbyPage";
import { GamePage } from "./game/game-page/GamePage";
import { Game } from "./generator";
import { GameConfig, UserData, GameData } from "./consts";
import { getStorageKey, StorageKeys, setStorageKey } from "./utils/localStorage";
import { ADD_USER, GET_USER } from "./queries/queries";

export enum Page {
    Game,
    Menu,
}

export interface AppState {
    selectedPage: Page;
    currentGame?: Game;
}

export interface AppProps {
	addUser: (options: { variables: GameData }) => Promise<{ data: { addUser: { id: string }}}>;
	userData: QueryResult<UserData, { id: string }> & UserData;
}

export class App extends React.Component<AppProps, AppState> {
    public state: AppState = {
        selectedPage: Page.Menu,
        currentGame: undefined,
	};

	public componentDidMount() {
		this.updateCurrentGame();
	}

	public componentDidUpdate(prevProps: AppProps) {
		if (prevProps.userData.loading !== this.props.userData.loading) {
			this.updateCurrentGame();
		}
	}

    public render () {
		const isLobby = this.state.selectedPage === Page.Menu;

		return <>
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
        </>;
	}

	private updateCurrentGame = () => {
		const { loading, user } = this.props.userData;

		if (!loading && user) {
			this.setState({
				currentGame: JSON.parse(user.game.config) as Game,
			});
		}

	}

    private generateGame = async (props: GameConfig) => {
		const newGame = new Game(props);
		try {
			const { data: { addUser: { id } } } = await this.props.addUser({
				variables: {
					config: JSON.stringify(newGame),
					state: "",
				}
			});
			setStorageKey(StorageKeys.UserId, id);
		} catch {}

        this.setState({
            currentGame: newGame,
            selectedPage: Page.Game,
        });
    }

    private togglePage = () => {
        this.setState({
            selectedPage: this.state.selectedPage === Page.Menu ? Page.Game : Page.Menu,
        });
    }
}

// TODO Add typing for compose!
export const AppQueried = compose(
	graphql(ADD_USER, { name: "addUser" }),
	graphql(GET_USER, {
		name: "userData",
		options: () => ({
			variables: { id: getStorageKey(StorageKeys.UserId) },
		})
	}),
)(App);
