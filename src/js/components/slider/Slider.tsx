import * as React from "react";

import "./slider.less";

import { CellMode } from "../../consts";

export interface SliderProps {
    onClick: () => void;
}

export interface SliderState {
    cellMode: CellMode;
}

export class Slider extends React.PureComponent<SliderProps, SliderState> {
    public state: SliderState = {
        cellMode: CellMode.Pencil,
    };

    public render () {
        return (
            <div className="game-buttons" onClick={this.handleClick}>
                <span>Pencil</span>
                <span>Notes</span>
                <div className={`slider ${this.state.cellMode}`} />
            </div>
        );
    }

    private handleClick = () => {
        this.props.onClick();
        this.setState({
            cellMode: this.state.cellMode === CellMode.Pencil
                ? CellMode.Notes
                : CellMode.Pencil,
        });
    }
}
