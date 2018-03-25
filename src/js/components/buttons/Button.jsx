import * as React from "react";

import "./button.less";

export const MenuButton = ({
    value,
    onClick,
    reversed = false,
    disabled = false,
    index = undefined,
}) => (
    <input
        type="button"
        value={value}
        className={[
            "menu-button",
            reversed ? "reversed" : null,
            disabled ? "disabled" : null,
        ].join(" ")}
        onClick={onClick}
        key={index}
    />
);

export const mapPropsToMenuButtons = (buttons) => {
    return buttons.map((props, index) => (
        <MenuButton
            {...props}
            key={index}
        />
    ));
};

export const GameButtonSize = {
    Default: 0,
    Small: 1,
};

export const GameButton = ({
    value = undefined,
    onClick,
    size = GameButtonSize.Default,
    selected = false,
}) => (
    <input
        type="button"
        value={value}
        className={[
            "game-button",
            selected ? "selected" : null,
            size === GameButtonSize.Small ? "small" : null
        ].join(" ")}
        onClick={onClick}
    />
);
