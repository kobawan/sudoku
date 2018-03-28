import * as React from "react";

import "./mainMenu.less";

import { mapPropsToMenuButtons, MenuButtonProps } from "../buttons/Button";
import { getGame, initGame } from "../../game/game";
import { changePage } from "../../utils/visibilityUtils";
import { GameDifficulty } from "../../consts";

export interface MainMenuProps {
    rightColumn: MenuButtonProps[];
}

export class MainMenu extends React.PureComponent<MainMenuProps> {
    public render () {
        const game = getGame(true);
        const leftColumn: MenuButtonProps[] = [
            {
                value: "Resume",
                disabled: game === undefined,
                onClick: () => game ? changePage(game) : undefined,
            },
            {
                value: "Easy",
                onClick: () => initGame({ difficulty: GameDifficulty.Easy }),
            },
            {
                value: "Medium",
                onClick: () => initGame({ difficulty: GameDifficulty.Medium }),
            },
            {
                value: "Hard",
                onClick: () => initGame({ difficulty: GameDifficulty.Hard }),
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
