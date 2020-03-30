import * as React from "react";
import cx from "classnames";

import "./button.less";
import { spinnerSvg } from "../svg/Icons";

export interface LoadingButtonProps {
  value: string;
  onClick: React.MouseEventHandler;
  disabled?: boolean;
  loading?: boolean;
}

export const LoadingButton = ({
  disabled,
  loading,
  onClick,
  value,
}: LoadingButtonProps) => (
  <button
    className={cx("loading-button", loading && "buttonLoading")}
    disabled={disabled}
    onClick={onClick}
    tabIndex={disabled ? -1 : 0}
  >
    {loading ? (
      <>
        <div className="buttonSvgLoading">{spinnerSvg}</div>
        <span>Loading</span>
      </>
    ) : (
      value
    )}
  </button>
);

export interface MenuButtonProps {
  value: string;
  onClick: React.MouseEventHandler;
  reversed?: boolean;
  disabled?: boolean;
  index?: number;
  hidden?: boolean;
}

export const MenuButton = ({
  reversed,
  disabled,
  onClick,
  index,
  value,
  hidden,
}: MenuButtonProps) => (
  <button
    className={cx("menu-button", reversed && "reversed")}
    disabled={disabled}
    onClick={onClick}
    key={index}
    tabIndex={disabled || hidden ? -1 : 0}
  >
    {value}
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
    className={cx(
      "game-button",
      selected && "selected",
      size === GameButtonSize.Small && "small"
    )}
    onClick={onClick}
  >
    {value}
    {icon}
  </button>
);

export const mapPropsToGameButtons = (buttons: GameButtonProps[]) => {
  return buttons.map((props, index) => <GameButton {...props} key={index} />);
};
