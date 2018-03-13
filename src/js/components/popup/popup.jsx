import * as React from "react";

import "./popup.less";

/**
 * @param { text: string, hidden: boolean, onClick: Function }
 */
export class Popup extends React.Component {
    constructor (props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            hidden: undefined,
        };
    }

    componentWillUpdate (nextProps, nextState) {
        if (this.state.hidden && this.state.hidden === nextState.hidden) {
            this.setState({ hidden: nextProps.hidden });
        }
    }

    render () {
        const containerClasses = [
            "message-popup",
            this.state.hidden || this.props.hidden ? "hidden" : null
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
                    <input type="button" className="game-button" onClick={this.onClick} />
                </label>
            </div>
        );
    }

    onClick (e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
        this.setState({ hidden: true });
    }
}
