import * as React from "react";

import "./mainMenu.less";
import { mapPropsToMenuButtons } from "../buttons/Button.jsx";
import { getGame, initGame } from "../../game/game";
import { changePage } from "../../utils/visibilityUtils";
import { GameConfig } from "../../consts";

/**
 * @param { rightColumn: object[] }
 */
export class MainMenu extends React.PureComponent {
    render () {
        const game = getGame(true);
        const leftColumn = [
            {
                value: "Resume",
                disabled: game === undefined,
                onClick: () => game ? changePage() : undefined,
            },
            {
                value: "Easy",
                onClick: () => initGame(GameConfig.DIFFICULTY.EASY),
            },
            {
                value: "Medium",
                onClick: () => initGame(GameConfig.DIFFICULTY.MEDIUM),
            },
            {
                value: "Hard",
                onClick: () => initGame(GameConfig.DIFFICULTY.HARD),
            },
        ];

        return (
            <React.Fragment>
                <svg xmlns="http://www.w3.org/2000/svg" className="menu-logo">
                    <text>Sudoku</text>
                </svg>
                <div className="column-container">
                    <div className="column">
                        {mapPropsToMenuButtons(leftColumn)}
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
