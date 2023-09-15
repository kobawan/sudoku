import React, { useCallback, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";

import "./sideMenu.scss";

import { MenuButtonProps, MenuButton } from "../buttons/Button";
import { menuSvg } from "../svg/Icons";
import { checkForWin } from "../game-page/ducks/actions";
import { showResetPopup, showSolvePopup } from "../popup/ducks/actions";
import { getSideMenuIsOpen } from "./ducks/selectors";
import { toggleSideMenu } from "./ducks/actions";
import { save } from "../app/ducks/actions";

interface SideMenuProps {
  returnToLobby: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ returnToLobby }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(getSideMenuIsOpen);
  const toggleMenu = useCallback(() => dispatch(toggleSideMenu()), [dispatch]);

  const sideMenuButtons: MenuButtonProps[] = [
    {
      // FIXME: Hide this button when screen is smaller
      value: "Return",
      onClick: () => {},
    },
    {
      value: "Reset",
      onClick: () => showResetPopup(dispatch),
    },
    {
      value: "Check",
      onClick: () => dispatch(checkForWin()),
    },
    {
      value: "Solve",
      onClick: () => showSolvePopup(dispatch),
    },
    {
      value: "Save",
      onClick: () => dispatch(save()),
    },
    {
      value: "Quit",
      onClick: returnToLobby,
    },
  ];

  return (
    <div className={cx("side-menu-container", isOpen ? "opened" : "hidden")}>
      <div className="side-menu-overlay" onClick={toggleMenu} />
      <div className="side-menu">
        <div className="menu">
          <h1 className="side-menu-logo">Sudokuuu</h1>
          <div className="buttons-wrapper">
            {sideMenuButtons.map((props, index) => (
              <MenuButton
                {...props}
                onClick={(e: MouseEvent) => {
                  toggleMenu();
                  props.onClick(e);
                }}
                key={index}
                hidden={!isOpen}
              />
            ))}
          </div>
          <span>
            <a
              href="https://github.com/kobawan"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
            >
              @kobawan
            </a>
          </span>
        </div>
        <button
          className={cx("side-menu-button", isOpen && "opened")}
          onClick={toggleMenu}
        >
          {menuSvg}
        </button>
      </div>
    </div>
  );
};
