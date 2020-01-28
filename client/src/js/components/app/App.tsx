import React, { useEffect, useCallback } from "react";
import axios from "axios";

import { LobbyPage } from "../lobby-page/LobbyPage";
import { GamePage } from "../game-page/GamePage";
import { UserData, serverEndpoint } from "../../consts";
import { getStorageKey, StorageKeys, setStorageKey } from "../../utils/localStorage";
import { Page } from "../../consts";
import { useSelector, useDispatch } from "react-redux";
import { getPage, getCurrentGame } from "./ducks/selectors";
import { setPage, setCurrentGame, setLobbyIsLoading, setLobbyHasError } from "./ducks/actions";

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



export const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPage = useSelector(getPage);
  const currentGame = useSelector(getCurrentGame);

  const isLobby = selectedPage === Page.Menu;
  const returnToLobby = useCallback(() => {
    dispatch(setPage(Page.Menu));
  }, []);

  useEffect(() => {
    const id = getStorageKey(StorageKeys.UserId) as string;
    const handleNewUser = async () => {
      const res = await registerUser();
      dispatch(setLobbyIsLoading(false));
      if (res instanceof Error) {
        dispatch(setLobbyHasError(true));
        return;
      }
      setStorageKey(StorageKeys.UserId, res);
    };
    const handlePreviousUser = async () => {
      const res = await getUser(id);
      dispatch(setLobbyIsLoading(false));
      if (res instanceof Error) {
        dispatch(setLobbyHasError(true));
        return;
      }
      dispatch(setCurrentGame(res.game.config));
    };

    dispatch(setLobbyIsLoading(true));
    if (!id) {
      handleNewUser();
      return;
    }
    handlePreviousUser();
  }, []);

  return <>
    <LobbyPage
      hidden={!isLobby}
    />
    {currentGame && (
      <GamePage
        hidden={isLobby}
        game={currentGame}
        returnToLobby={returnToLobby}
      />
    )}
  </>;
};
