import * as React from "react";

import {
	changePage,
	Page,
} from "../../utils/visibilityUtils";
import {
    reset,
    check,
    solve,
} from "../../game/gameButtons";

import "./sideMenu.less";

export class SideMenu extends React.PureComponent {
    constructor (props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            hidden: true,
        };
    }

    render () {
        const menuClasses = [
            "menu",
            this.state.hidden ? "hidden" : null,
        ].join(" ");

        return (
            <div className="side-menu">
                <div className={menuClasses}>
                    <svg className="side-menu-logo">
                        <text>Sudoku</text>
                    </svg>
                    <div className="buttons-wrapper">
                        <input
                            type="button"
                            value="Return"
                            className="menu-button"
                            onClick={this.returnToLobby}
                        />
                        <input type="button" value="Reset" className="menu-button" onClick={reset}/>
                        <input type="button" value="Check" className="menu-button" onClick={check}/>
                        <input type="button" value="Solve" className="menu-button" onClick={solve}/>
                        <input type="button" value="Undo" className="menu-button"/>
                        <input type="button" value="Redo" className="menu-button"/>
                    </div>
                    <span>
                        <a href="https://github.com/kobawan">
                            @kobawan
                        </a>
                    </span>
                </div>
                <input type="button" className="close-button" onClick={this.toggleMenu} />
            </div>
        );
    }

    returnToLobby () {
        changePage(Page.Menu);
    }

    toggleMenu () {
        this.setState({ hidden: !this.state.hidden });
    }
}
