import * as React from "react";

import { GameButton, GameButtonSize } from "../buttons/Button.jsx";

import "./popup.less";

/**
 * @param { text: string, hidden: boolean, onClick: Function }
 */
export class Popup extends React.Component {
    render () {
        const containerClasses = [
            "message-popup",
            this.props.hidden ? "hidden" : null
        ].join(" ");

        /* eslint-disable max-len */
        const checkSVG = (
            <svg className="icon" viewBox="0 0 30 30">
                <path d="M25.313 3.75l-14.063 14.063-6.563-6.563-4.688 4.688 11.25 11.25 18.75-18.75z">
                </path>
            </svg>
        );
        /* eslint-enable max-len */

        return (
            <div className={containerClasses}>
                <div className="message" dangerouslySetInnerHTML={{ __html: this.props.text }} />
                <label>
                    {checkSVG}
                    <GameButton
                        onClick={this.props.onClick}
                        size={GameButtonSize.Small}
                    />
                </label>
            </div>
        );
    }
}
