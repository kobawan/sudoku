import * as React from "react";

import "./button.less";

export interface MenuButtonProps {
  value: string;
  onClick: () => void;
  reversed?: boolean;
  disabled?: boolean;
  index?: number;
}

export const MenuButton = (props: MenuButtonProps) => (
  <button
    className={[
      "menu-button",
      props.reversed ? "reversed" : null,
      props.disabled ? "disabled" : null,
    ].join(" ")}
    onClick={props.onClick}
    key={props.index}
  >
    {props.value}
  </button>
);

export const mapPropsToMenuButtons = (buttons: MenuButtonProps[]) => {
  return buttons.map((props, index) => <MenuButton {...props} key={index} />);
};

export enum GameButtonSize {
  Default,
  Small,
}

export interface GameButtonProps {
  value?: string;
  onClick: () => void;
  size?: GameButtonSize;
  selected?: boolean;
  icon?: JSX.Element;
}

export const GameButton = ({
  value,
  icon,
  onClick,
  size = GameButtonSize.Default,
  selected = false,
}: GameButtonProps) => (
  <button
    className={[
      "game-button",
      selected ? "selected" : null,
      size === GameButtonSize.Small ? "small" : null,
    ].join(" ")}
    onClick={onClick}
  >
    {value}
    {icon}
  </button>
);

export const mapPropsToGameButtons = (buttons: GameButtonProps[]) => {
  return buttons.map((props, index) => <GameButton {...props} key={index} />);
};
