import * as React from "react";
import { spinnerSvg } from "../svg/Icons";

import "./mainMenu.less";

import { mapPropsToMenuButtons, MenuButtonProps } from "../buttons/Button";

export interface MainMenuProps {
  leftColumn: MenuButtonProps[];
  rightColumn: MenuButtonProps[];
  isLoading: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  leftColumn,
  rightColumn,
  isLoading,
}) => {
  return (
    <>
      <h1 className="menu-logo">Sudoku</h1>
      <div className="column-container">
        {isLoading
          ? (
            <div className="loading">
              {spinnerSvg}
            </div>
          ) : (
            <>
              <div className="column">
                {mapPropsToMenuButtons(leftColumn)}
              </div>
              <div className="column">
                {mapPropsToMenuButtons(rightColumn)}
              </div>
            </>
          )
        }
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
