import * as React from "react";

import "./mainMenu.less";

import { mapPropsToMenuButtons, MenuButtonProps } from "../buttons/Button";

export interface MainMenuProps {
    leftColumn: MenuButtonProps[];
    rightColumn: MenuButtonProps[];
}

export class MainMenu extends React.PureComponent<MainMenuProps> {
    public render () {
        return (
            <React.Fragment>
                <svg xmlns="http://www.w3.org/2000/svg" className="menu-logo">
                    <text>Sudoku</text>
                </svg>
                <div className="column-container">
                    <div className="column">
                        {mapPropsToMenuButtons(this.props.leftColumn)}
                    </div>
                    <div className="column">
                        {mapPropsToMenuButtons(this.props.rightColumn)}
                    </div>
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
            </React.Fragment>
        );
    }
}
