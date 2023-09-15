import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";

import "./mainMenu.scss";

import {
  LinkButton,
  mapPropsToMenuButtons,
  MenuButtonProps,
} from "../buttons/Button";
import { getHasCurrentGame, isUserLoggedIn } from "../app/ducks/selectors";
import { GameConfig, GameDifficulty } from "../../consts";
import {
  setLobbyMenuSection,
  startNewGame,
  continueGame,
} from "../app/ducks/actions";
import { MenuSection } from "../menu-content/types";
import { openForm } from "../login-form/ducks/actions";
import { logout } from "../../utils/logout";

const menuSectionButtons = [
  MenuSection.Settings,
  MenuSection.Stats,
  MenuSection.Rules,
  MenuSection.About,
];

// TODO: Re-enable once backend is back online
const isLoginRegisterEnabled = false;

export const MainMenu: React.FC = () => {
  const dispatch = useDispatch();
  const hasCurrentGame = useSelector(getHasCurrentGame);
  const isLoggedIn = useSelector(isUserLoggedIn);

  const showLogin = () => {
    dispatch(openForm("Login"));
  };
  const showRegister = () => {
    dispatch(openForm("Register"));
  };
  const generateGame = useCallback(
    (props: GameConfig) => {
      dispatch(startNewGame(props));
    },
    [dispatch]
  );

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
    <>
      <div className="column-container">
        <div className="column">{mapPropsToMenuButtons(leftColumn)}</div>
        <div className="column">{mapPropsToMenuButtons(rightColumn)}</div>
      </div>
      {isLoginRegisterEnabled && (
        <div className={cx("column-container", "login-btns")}>
          {isLoggedIn ? (
            <LinkButton value="Logout" onClick={logout} />
          ) : (
            <>
              <LinkButton value="Login" textAlign="right" onClick={showLogin} />
              <span className={"separator"}>/</span>
              <LinkButton
                value="Sign Up"
                textAlign="left"
                onClick={showRegister}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};
