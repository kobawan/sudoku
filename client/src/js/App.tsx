import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import { LobbyPage } from "./lobby/lobby-page/LobbyPage";
import { GamePage } from "./game/game-page/GamePage";
import { Game } from "./generator";
import { GameConfig, UserData, serverEndpoint } from "./consts";
import { getStorageKey, StorageKeys, setStorageKey } from "./utils/localStorage";

export enum Page {
  Game,
  Menu,
}

const getUser = async (id: string): Promise<UserData | Error> => {
  try {
    const { data } = await axios.get<UserData | Error>(`${serverEndpoint}/user/${id}`);
    if (data instanceof Error) {
      throw data;
    }
    return data;
  } catch (error) {
    return error;
  }
};

const registerUser = async (): Promise<string | Error> => {
  try {
    const { data } = await axios.get<string | Error>(`${serverEndpoint}/registerUser`);
    if (data instanceof Error) {
      throw data;
    }
    return data;
  } catch (error) {
    return error;
  }
};

const saveNewGame = async (game: Game): Promise<boolean> => {
  try {
    // TODO: Also record state
    const { data } = await axios.post(`${serverEndpoint}/saveGame`, {
      config: game,
      state: "",
      id: getStorageKey(StorageKeys.UserId),
    });

    if (data instanceof Error) {
      throw data;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const App: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState(Page.Menu);
  const [currentGame, setCurrentGame] = useState<Game | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const isLobby = selectedPage === Page.Menu;
  const togglePage = useCallback(() => {
    setSelectedPage(isLobby ? Page.Game : Page.Menu);
  }, [isLobby]);

  const generateGame = useCallback(async (props: GameConfig) => {
    const newGame = new Game(props);

    setLoading(true);
    const res = await saveNewGame(newGame);
    if (!res) {
      setLoading(false);
      setError(true);
      return;
    }
    setCurrentGame(newGame);
    setLoading(false);
    setSelectedPage(Page.Game);
  }, []);

  useEffect(() => {
    const id = getStorageKey(StorageKeys.UserId) as string;
    const handleNewUser = async () => {
      const res = await registerUser();
      setLoading(false);
      if (res instanceof Error) {
        setError(true);
        return;
      }
      setStorageKey(StorageKeys.UserId, res);
    };
    const handlePreviousUser = async () => {
      const res = await getUser(id);
      setLoading(false);
      if (res instanceof Error) {
        setError(true);
        return;
      }
      setCurrentGame(res.game.config);
    };

    setLoading(true);
    if (!id) {
      handleNewUser();
      return;
    }
    handlePreviousUser();
  }, []);

  if (error) {
    return <h3 style={{ color: "red" }}>A wild error has appeared, please refresh!</h3>;
  }
  if (loading) {
    return <h3>Loading...</h3>;
  }

  return <>
    <LobbyPage
      hidden={!isLobby}
      hasCurrentGame={!!currentGame}
      generateGame={generateGame}
      returnToGame={togglePage}
    />
    {currentGame && (
      <GamePage
        hidden={isLobby}
        game={currentGame}
        returnToLobby={togglePage}
      />
    )}
  </>;
};
