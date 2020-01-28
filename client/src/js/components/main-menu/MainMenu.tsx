import React, { useCallback } from "react";
import axios from "axios";
import { spinnerSvg } from "../svg/Icons";

import "./mainMenu.less";

import { mapPropsToMenuButtons, MenuButtonProps } from "../buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { getLobbyIsLoading, getLobbyHasError, getHasCurrentGame } from "../app/ducks/selectors";
import { GameConfig, Page, serverEndpoint, GameDifficulty } from "../../consts";
import { Game } from "../../generator";
import { setLobbyIsLoading, setLobbyHasError, setCurrentGame, setPage, setLobbyMenuSection } from "../app/ducks/actions";
import { getStorageKey, StorageKeys } from "../../utils/localStorage";
import { MenuSection } from "../menu-content/types";

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

const menuSectionButtons = [
  MenuSection.Stats,
  MenuSection.Settings,
  MenuSection.Rules,
  MenuSection.About,
];

export const MainMenu: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLobbyIsLoading);
  const hasError = useSelector(getLobbyHasError);
  const hasCurrentGame = useSelector(getHasCurrentGame);

  const generateGame = useCallback(async (props: GameConfig) => {
    const newGame = new Game(props);

    dispatch(setLobbyIsLoading(true));
    const res = await saveNewGame(newGame);
    if (!res) {
      dispatch(setLobbyIsLoading(false));
      dispatch(setLobbyHasError(true));
      return;
    }
    dispatch(setCurrentGame(newGame));
    dispatch(setLobbyIsLoading(false));
    dispatch(setPage(Page.Game));
  }, []);

  const leftColumn: MenuButtonProps[] = [
    {
      value: "Resume",
      disabled: !hasCurrentGame,
      onClick: hasCurrentGame ? () => dispatch(setPage(Page.Game)) : () => {},
    },
    {
      value: "Easy",
      onClick: () => generateGame({ difficulty: GameDifficulty.Easy }),
    },
    {
      value: "Medium",
      onClick: () => generateGame({ difficulty: GameDifficulty.Medium }),
    },
    {
      value: "Hard",
      onClick: () => generateGame({ difficulty: GameDifficulty.Hard }),
    },
  ];

  const rightColumn: MenuButtonProps[] = menuSectionButtons.map((section: MenuSection) => ({
    value: section,
    onClick: () => dispatch(setLobbyMenuSection(section)),
  }));

  return (
    <>
      <h1 className="menu-logo">Sudoku</h1>
      <div className="column-container">
        {hasError && (
          <h3>An error has occurred :(<br></br>Please refresh the page!</h3>
        )}
        {isLoading && !hasError && (
          <div className="loading">
            {spinnerSvg}
          </div>
        )}
        {!isLoading && !hasError && (
          <>
            <div className="column">
              {mapPropsToMenuButtons(leftColumn)}
            </div>
            <div className="column">
              {mapPropsToMenuButtons(rightColumn)}
            </div>
          </>
        )}
      </div>
      <span>
        <a
          href="https://github.com/kobawan"
          target="_blank"
          rel="noopener noreferrer"
        >
          @kobawan
        </a>
      </span>
    </>
  );
};
