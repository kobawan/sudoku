import * as React from "react";

import "./sideMenu.less";

import { mapPropsToMenuButtons, MenuButtonProps } from "../buttons/Button";

export interface SideMenuProps {
    hidden: boolean;
    onClick: () => void;
    buttons: MenuButtonProps[];
}

export class SideMenu extends React.PureComponent<SideMenuProps> {
    public render () {
        const sideMenuClasses = [
            "side-menu",
            this.props.hidden ? "hidden" : null,
        ].join(" ");

        return (
            <div className={sideMenuClasses}>
                <div className="menu">
                    <svg className="side-menu-logo">
                        <text>Sudoku</text>
                    </svg>
                    <div className="buttons-wrapper">
                        {mapPropsToMenuButtons(this.props.buttons)}
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
                </div>
                <div className="close-button" onClick={this.props.onClick} />
            </div>
        );
    }
}
