import * as React from "react";

import "./sideMenu.less";

import { mapPropsToMenuButtons, MenuButtonProps } from "../buttons/Button";
import { menuSvg } from "../svg/Icons";

export interface SideMenuProps {
    hidden: boolean;
    onClick: () => void;
    buttons: MenuButtonProps[];
}

export class SideMenu extends React.PureComponent<SideMenuProps> {
    public render () {
        const hidden = this.props.hidden ? "hidden" : "opened";

        return (
            <div className={`side-menu-overlay ${hidden}`}>
                <div className="side-menu">
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
                    <div
                        className="side-menu-button"
                        onClick={this.props.onClick}
                    >
                        {menuSvg}
                    </div>
                </div>
            </div>
        );
    }
}
