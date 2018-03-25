import * as React from "react";

import { mapPropsToMenuButtons } from "../buttons/Button.jsx";

import "./sideMenu.less";

/**
 * @param { hidden: boolean, onClick: Function, buttons: object[] }
 */
export class SideMenu extends React.PureComponent {
    render () {
        const menuClasses = [
            "menu",
            this.props.hidden ? "hidden" : null,
        ].join(" ");

        return (
            <div className="side-menu">
                <div className={menuClasses}>
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
                <input type="button" className="close-button" onClick={this.props.onClick} />
            </div>
        );
    }
}
