import * as React from "react";

import "./cell.less";

import { CellMode, CellProps } from "../../consts";

export enum CellClassType {
    READONLY = "readOnly",
    PENCIL = "pencil",
    NOTES = "notes",
    HIGHLIGHT = "highlight",
    ERROR = "error",
}

export const Cell = (props: CellProps) => {
    let className: CellClassType = CellClassType.PENCIL;
    if (props.mode === CellMode.Notes) {
        className = CellClassType.NOTES;
    } else if (props.mode === CellMode.ReadOnly) {
        className = CellClassType.READONLY;
    }

    return (
        <textarea
            readOnly={props.mode === CellMode.ReadOnly}
            maxLength={props.mode !== CellMode.Notes ? 1 : 9}
            value={props.value || ""}
            className={[
                className,
                props.withError && props.mode !== CellMode.Notes ? CellClassType.ERROR : null,
                props.withHighlight && props.mode !== CellMode.Notes ? CellClassType.HIGHLIGHT : null,
            ].join(" ")}
            onKeyUp={props.onKeyup}
            onFocus={props.onFocus}
            onClick={props.onClick}
            onInput={props.onInput}
        />
    );
};
