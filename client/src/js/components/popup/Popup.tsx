import * as React from "react";
import cx from "classnames";

import "./popup.less";

import { GameButtonProps, mapPropsToGameButtons } from "../buttons/Button";

export enum PopupText {
  Solve = "Solve",
  Reset = "Reset",
  Win = "Win",
  Duplicates = "Duplicates",
  Check = "Check",
}

const PopupTextMap = {
  [PopupText.Solve]: <span>Are you sure you want to solve?</span>,
  [PopupText.Reset]: <span>Are you sure you want to reset?</span>,
  [PopupText.Win]: <><span>Correct!</span><br /><span>You have won the game!</span></>,
  [PopupText.Duplicates]: <span>Some cell values are incorrect.</span>,
  [PopupText.Check]: <span>Correct so far!</span>,
};

export interface PopupProps {
    text?: PopupText;
    hidden: boolean;
    buttons?: GameButtonProps[];
}

export const Popup: React.FC<PopupProps> = ({
  text,
  hidden,
  buttons
}) => {
  const isHidden = hidden || !text || !buttons;

  return (
    <div className={cx("message-popup", isHidden && "hidden")}>
      <div className="message">
        {text && PopupTextMap[text]}
      </div>
      <div className="buttons">
        {buttons && mapPropsToGameButtons(buttons)}
      </div>
    </div>
  );
};
