import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./mainMenu.less";

import { mapPropsToMenuButtons, MenuButtonProps } from "../buttons/Button";
import { getHasCurrentGame } from "../app/ducks/selectors";
import { GameConfig, GameDifficulty } from "../../consts";
import {
  setLobbyMenuSection,
  startNewGame,
  continueGame,
} from "../app/ducks/actions";
import { MenuSection } from "../menu-content/types";

const menuSectionButtons = [
  MenuSection.Settings,
  MenuSection.Stats,
  MenuSection.Rules,
  MenuSection.About,
];

export const MainMenu: React.FC = () => {
  const dispatch = useDispatch();
  const hasCurrentGame = useSelector(getHasCurrentGame);

  const generateGame = useCallback((props: GameConfig) => {
    dispatch(startNewGame(props));
  }, []);

  const leftColumn: MenuButtonProps[] = [
    {
      value: "Resume",
      disabled: !hasCurrentGame,
      onClick: hasCurrentGame ? () => dispatch(continueGame()) : () => {},
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
    <div className="column-container">
      <div className="column">{mapPropsToMenuButtons(leftColumn)}</div>
      <div className="column">{mapPropsToMenuButtons(rightColumn)}</div>
    </div>
  );
};
