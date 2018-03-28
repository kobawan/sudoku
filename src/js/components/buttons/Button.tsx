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
    <input
        type="button"
        value={props.value}
        className={[
            "menu-button",
            props.reversed ? "reversed" : null,
            props.disabled ? "disabled" : null,
        ].join(" ")}
        onClick={props.onClick}
        key={props.index}
    />
);

export const mapPropsToMenuButtons = (buttons: MenuButtonProps[]) => {
    return buttons.map((props, index) => (
        <MenuButton
            {...props}
            key={index}
        />
    ));
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
}

export const GameButton = ({
    value,
    onClick,
    size = GameButtonSize.Default,
    selected = false,
}: GameButtonProps) => (
    <input
        type="button"
        value={value}
        className={[
            "game-button",
            selected ? "selected" : null,
            size === GameButtonSize.Small ? "small" : null,
        ].join(" ")}
        onClick={onClick}
    />
);
