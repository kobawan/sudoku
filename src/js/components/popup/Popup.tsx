import * as React from "react";

import "./popup.less";

import { GameButtonProps, mapPropsToGameButtons } from "../buttons/Button";

export interface PopupProps {
    text?: JSX.Element;
    hidden: boolean;
    buttons?: GameButtonProps[];
}

export class Popup extends React.PureComponent<PopupProps> {
    public render () {
        const isHidden = this.props.hidden || !this.props.text || !this.props.buttons ? "hidden" : "";

        return (
            <div className={`message-popup ${isHidden}`}>
                <div className="message">
                    {this.props.text}
                </div>
                <div className="buttons">
                    {this.props.buttons && mapPropsToGameButtons(this.props.buttons)}
                </div>
            </div>
        );
    }
}
