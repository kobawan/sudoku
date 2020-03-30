import React, { useCallback, MouseEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";

import "./sideMenu.less";

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
  const toggleMenu = useCallback(() => dispatch(toggleSideMenu()), []);

  const sideMenuButtons: MenuButtonProps[] = [
    {
      value: "Return",
      onClick: returnToLobby,
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
  ];

  return (
    <div className={cx("side-menu-container", isOpen ? "opened" : "hidden")}>
      <div className="side-menu-overlay" onClick={toggleMenu} />
      <div className="side-menu">
        <div className="menu">
          <svg className="side-menu-logo">
            <text>Sudoku</text>
          </svg>
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
        <button className="side-menu-button" onClick={toggleMenu}>
          {menuSvg}
        </button>
      </div>
    </div>
  );
};
