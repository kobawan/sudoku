import * as React from "react";

import "./cell.less";

import { CellMode, CellProps } from "../../consts";

export const Cell = (props: CellProps) => {
    return (
        <textarea
            readOnly={props.mode === CellMode.ReadOnly}
			maxLength={props.mode !== CellMode.Notes ? 1 : 9}
			rows= {1}
			cols={1}
            value={props.value || ""}
            className={[
				props.mode,
                props.withError && props.mode !== CellMode.Notes ? "error" : null,
                props.withHighlight && props.mode !== CellMode.Notes ? "highlight" : null,
            ].join(" ")}
            onKeyUp={props.onKeyup}
            onFocus={props.onFocus}
            onClick={props.onClick}
            onInput={props.onInput}
        />
    );
};
