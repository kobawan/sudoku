import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { LobbyPage } from "../lobby-page/LobbyPage";
import { GamePage } from "../game-page/GamePage";
import { Page } from "../../consts";
import { getPage, getCurrentGame, getLobbyIsLoading } from "./ducks/selectors";
import { setPage } from "./ducks/actions";
import { Popup } from "../popup/Popup";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPage = useSelector(getPage);
  const currentGame = useSelector(getCurrentGame);
  const isLoading = useSelector(getLobbyIsLoading);

  const isLobby = selectedPage === Page.Menu;
  const returnToLobby = useCallback(() => {
    dispatch(setPage(Page.Menu));
  }, []);

  return (
    <>
      <LobbyPage hidden={!isLobby} />
      {!isLoading && currentGame && !isLobby && (
        <GamePage game={currentGame} returnToLobby={returnToLobby} />
      )}
      <Popup />
    </>
  );
};
