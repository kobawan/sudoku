import * as React from "react";

import "./sudokuTable.less";

import { Cell } from "./Cell";
import { TableCellsMap, GameType } from "../../consts";

export interface SudokuTableProps {
    cellState: TableCellsMap;
    gameType: GameType;
}

export class SudokuTable extends React.Component<SudokuTableProps> {
    public render () {
        return (
            <table className="sudoku" id="SudokuTable">
                <tbody>
                    {this.getTable()}
                </tbody>
            </table>
        );
    }

    private getTable = () => {
        const rows: JSX.Element[] = [];
        for (let row = 0; row < this.props.gameType; row++) {
            const cols: JSX.Element[] = [];
            for (let col = 0; col < this.props.gameType; col++) {
                const props = this.props.cellState[row * this.props.gameType + col];
                cols.push(<td key={col}><Cell {...props} /></td>);
            }
            rows.push(<tr key={row}>{cols}</tr>);
        }

        return (
            <React.Fragment>
                {rows}
            </React.Fragment>
        );
    }
}
