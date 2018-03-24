import * as React from "react";

import "./sideMenu.less";

/**
 * @param { hidden: boolean, onClick: Function, children: any }
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
                        {this.props.children}
                    </div>
                    <span>
                        <a href="https://github.com/kobawan">
                            @kobawan
                        </a>
                    </span>
                </div>
                <input type="button" className="close-button" onClick={this.props.onClick} />
            </div>
        );
    }
}
