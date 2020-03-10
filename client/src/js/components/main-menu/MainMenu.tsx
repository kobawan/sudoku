import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./mainMenu.less";

import { spinnerSvg } from "../svg/Icons";
import { mapPropsToMenuButtons, MenuButtonProps } from "../buttons/Button";
import {
  getLobbyIsLoading,
  getLobbyHasError,
  getHasCurrentGame,
} from "../app/ducks/selectors";
import { GameConfig, Page, GameDifficulty } from "../../consts";
import {
  setPage,
  setLobbyMenuSection,
  startNewGame,
} from "../app/ducks/actions";
import { MenuSection } from "../menu-content/types";

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

  const generateGame = useCallback((props: GameConfig) => {
    dispatch(startNewGame(props));
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

  const rightColumn: MenuButtonProps[] = menuSectionButtons.map(
    (section: MenuSection) => ({
      value: section,
      onClick: () => dispatch(setLobbyMenuSection(section)),
    })
  );

  return (
    <>
      <h1 className="menu-logo">Sudoku</h1>
      <div className="column-container">
        {hasError && (
          <h3>
            An error has occurred :(<br></br>Please refresh the page!
          </h3>
        )}
        {isLoading && !hasError && <div className="loading">{spinnerSvg}</div>}
        {!isLoading && !hasError && (
          <>
            <div className="column">{mapPropsToMenuButtons(leftColumn)}</div>
            <div className="column">{mapPropsToMenuButtons(rightColumn)}</div>
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
