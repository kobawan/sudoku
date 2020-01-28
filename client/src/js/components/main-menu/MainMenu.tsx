import * as React from "react";
import { spinnerSvg } from "../svg/Icons";

import "./mainMenu.less";

import { mapPropsToMenuButtons, MenuButtonProps } from "../buttons/Button";

export interface MainMenuProps {
  leftColumn: MenuButtonProps[];
  rightColumn: MenuButtonProps[];
  isLoading: boolean;
  hasError: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  leftColumn,
  rightColumn,
  isLoading,
  hasError,
}) => {
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
