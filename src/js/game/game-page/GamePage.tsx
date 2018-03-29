import * as React from "react";

import "./cells.less";
import "./gamePage.less";

import { SideMenu } from "../../components/side-menu/SideMenu";
import { Popup, PopupProps } from "../../components/popup/Popup";
import { GameButton, MenuButtonProps, GameButtonProps, GameButtonSize } from "../../components/buttons/Button";
import { CoordinateTableX, CoordinateTableY } from "../../components/coordinates/Coordinates";
import { sortByGrids, GridValues } from "../../utils/arrayUtils";
import { isEmptyCell, isReadOnlyCell } from "../helpers";
import { CellClassType, CellMode } from "../../consts";
import { arrowKeys, selectValue, changeSelectedCellMode, filterInvalidInput } from "../gameCells";
import { highlight, checkForWin, showDuplicates } from "../gameTable";
import { updateNotesCells } from "../gameNotesCells";
import { changePage, Page } from "../../utils/visibilityUtils";
import { addListener, removeListener, Listener } from "../../utils/generalUtils";
import { Game } from "../../generator";
import { checkSvg } from "../../components/svg/Icons";


export interface GamePageProps {
    hidden?: boolean;
    game: Game;
}

interface GamePageState {
    cellMode: CellMode;
    toggleSideMenu: boolean;
    popupProps: PopupProps;
    toggleCoordinates: boolean;
}

export class GamePage extends React.Component<GamePageProps, GamePageState> {
    public state: GamePageState = {
        cellMode: CellMode.Pencil,
        toggleSideMenu: false,
        popupProps: {
            hidden: true,
        },
        toggleCoordinates: false,
    };

    private table: HTMLTableElement | undefined;
    private cells: NodeListOf<HTMLTextAreaElement> | undefined;
    private listeners: Listener[] | undefined;

    public componentDidMount () {
        this.table = document.querySelector(".game .sudoku") as HTMLTableElement;
        this.cells = document.querySelectorAll(".game .sudoku textarea");
        this.resetCells();
        sortByGrids(this.props.game, this.assignValues);
        this.listeners = this.addCellListeners();
    }

    public componentWillUnmount () {
        if (this.cells && this.listeners && this.listeners.length > 0) {
            this.listeners = removeListener(this.listeners, Array.from(this.cells));
        }
    }

    public componentWillUpdate (nextProps: GamePageProps, nextState: GamePageState) {
        if (this.props.hidden && !nextProps.hidden) {
            this.resetState();
        }
        if (this.state.cellMode !== nextState.cellMode) {
            this.handleCellModeChange();
        }
    }

    public render () {
        const sideMenuButtons: MenuButtonProps[] = [
            {
                value: "Return",
                onClick: () => changePage(this.props.game, Page.Menu),
            },
            {
                value: "Reset",
                onClick: () => {
                    this.enableMessagePopup({
                        text: <span>Are you sure you want to reset?</span>,
                        buttons: [
                            {
                                size: GameButtonSize.Small,
                                value: "Yes",
                                onClick: () => {
                                    // TODO reset only non readonly cells
                                    this.resetCells();
                                    this.resetState();
                                    sortByGrids(this.props.game, this.assignValues);
                                },
                            },
                            {
                                size: GameButtonSize.Small,
                                value: "No",
                                onClick: this.disableMessagePopup,
                            },
                        ],
                    });
                },
            },
            {
                value: "Check",
                onClick: () => {
                    if (!this.cells) {
                        return;
                    }
                    const duplicates = showDuplicates(this.cells, this.props.game);
                    const wrongCells = duplicates
                        .map((cell: HTMLTextAreaElement) => {
                            const tableCell = cell.parentElement as HTMLTableDataCellElement;
                            const tableRow = tableCell.parentElement as HTMLTableRowElement;
                            const row = tableRow.rowIndex + 1;
                            const col = "ABCDEFGHI"[tableCell.cellIndex];
                            return `${col + row}`;
                        })
                        .sort()
                        .join(", ")
                    ;
                    const text = wrongCells.length > 0
                        ? <span>Cells {wrongCells} are incorrect.</span>
                        : <span>Correct so far!</span>;
                    this.enableMessagePopup(
                        {
                            text,
                            buttons: [{
                                size: GameButtonSize.Small,
                                icon: checkSvg,
                                onClick: this.disableMessagePopup,
                            }],
                        },
                        true,
                    );
                },
            },
            {
                value: "Solve",
                onClick: () => {
                    this.enableMessagePopup({
                        text: <span>Are you sure you want to solve?</span>,
                        buttons: [
                            {
                                size: GameButtonSize.Small,
                                value: "Yes",
                                onClick: () => {
                                    if (!this.cells) {
                                        return;
                                    }
                                    // TODO reset only non readonly cells
                                    this.resetCells();
                                    this.resetState();
                                    sortByGrids(this.props.game, this.assignValues);
                                    this.cells.forEach((cell, index: number) => {
                                        cell.value = `${this.props.game.matrix[index]}`;
                                    });
                                },
                            },
                            {
                                size: GameButtonSize.Small,
                                value: "No",
                                onClick: this.disableMessagePopup,
                            },
                        ],
                    });
                },
            },
        ];

        return (
            <div className={["game", this.props.hidden ? "hidden" : null].join(" ")}>
                <SideMenu
                    hidden={!this.state.toggleSideMenu}
                    onClick={this.toggleSideMenu}
                    buttons={sideMenuButtons}
                />
                <Popup {...this.state.popupProps} />

                <div className="game-wrapper">
                    <CoordinateTableX hidden={!this.state.toggleCoordinates} />

                    <div className="center">
                        <CoordinateTableY hidden={!this.state.toggleCoordinates} />

                        <table className="sudoku">
                            <tbody>
                                <tr>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                </tr>
                                <tr>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                </tr>
                                <tr>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                </tr>
                                <tr>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                </tr>
                                <tr>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                </tr>
                                <tr>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                </tr>
                                <tr>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                </tr>
                                <tr>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                </tr>
                                <tr>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                    <td><textarea></textarea></td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="dummy-block"></div>
                    </div>

                    <div className="game-buttons">
                        <GameButton
                            value="Pencil"
                            onClick={this.setCellModePencil}
                            selected={this.state.cellMode === CellMode.Pencil}
                        />
                        <GameButton
                            value="Notes"
                            onClick={this.setCellModeNotes}
                            selected={this.state.cellMode === CellMode.Notes}
                        />
                    </div>
                </div>
            </div>
        );
    }

    private setCellModePencil = () => {
        this.setState({ cellMode: CellMode.Pencil });
    }

    private setCellModeNotes = () => {
        this.setState({ cellMode: CellMode.Notes });
    }

    private resetCells = () => {
        if (!this.cells) {
            return;
        }
        this.cells.forEach(cell => {
            cell.value = cell.defaultValue;
            cell.readOnly = false;
            cell.maxLength = 1;
            cell.className = CellClassType.PENCIL;
        });
    }

    /**
     * Assigns game values to corresponding cells
     */
    private assignValues = ({ row, col, grid, pos }: GridValues) => {
        if (!this.cells) {
            return;
        }
        const counter = col + (row * this.props.game.ratio);
        const val = this.props.game.mask[grid][counter];
        if (val !== 0) {
            this.cells[pos].value = `${val}`;
            this.cells[pos].readOnly = true;
            this.cells[pos].maxLength = 1;
            this.cells[pos].className = CellClassType.READONLY;
        }
    }

    private handleCellModeChange = () => {
        if (!this.cells) {
            return;
        }
        switch (this.state.cellMode) {
        case CellMode.Pencil:
            this.cells.forEach(cell => {
                if (isEmptyCell(cell)) {
                    cell.maxLength = 9;
                    cell.className = CellClassType.NOTES;
                }
            });
            break;
        case CellMode.Notes:
            this.cells.forEach(cell => {
                if (isEmptyCell(cell)) {
                    cell.maxLength = 1;
                    cell.className = CellClassType.PENCIL;
                }
            });
            break;
        default:
        }
    }

    private resetState = () => {
        this.setState({
            cellMode: CellMode.Pencil,
            toggleSideMenu: false,
            popupProps: {
                ...this.state.popupProps,
                hidden: true,
            },
            toggleCoordinates: false,
        });
    }

    private toggleSideMenu = () => {
        this.setState({ toggleSideMenu: !this.state.toggleSideMenu });
    }

    private enableMessagePopup = (
        { text, buttons }: { text: JSX.Element, buttons: GameButtonProps[] },
        toggleCoordinates = false,
    ) => {
        this.setState({
            toggleCoordinates,
            popupProps: {
                text,
                buttons,
                hidden: false,
            },
        });
    }

    private disableMessagePopup = () => {
        this.setState({
            popupProps: {
                ...this.state.popupProps,
                hidden: true,
            },
            toggleCoordinates: false,
        });
    }

    private addCellListeners = () => {
        if (!this.cells) {
            return undefined;
        }
        const listeners: Listener[] = [];
        const playableCells = Array.from(this.cells).filter(cell => !isReadOnlyCell(cell));
        const allCells = Array.from(this.cells);

        listeners.push(
            addListener(playableCells, "focus", e => {
                // selects cell values
                selectValue(e)(this.state.cellMode);
            }),
            addListener(playableCells, "input", e => {
                // changed clicked cell into according style
                changeSelectedCellMode(e)(this.state.cellMode);
                // removes invalid values
                filterInvalidInput(e)(this.state.cellMode);
            }),
            addListener(playableCells, "keyup", e => {
                if (!this.cells) {
                    return;
                }
                // removes notes from column, row and grid where the pencil value was inserted
                // and filters invalid values
                updateNotesCells(e)(this.state.cellMode, this.props.game, this.cells);
            }),
            addListener(allCells, "keyup", e => {
                if (!this.cells || !this.table) {
                    return;
                }
                // shows in-game error for same number and displays automatic win message
                const hasWon = checkForWin(this.cells, this.props.game);
                if (hasWon) {
                    this.enableMessagePopup({
                        text: (
                            <React.Fragment>
                                <span>Correct!</span><br /><span>You have won the game!</span>
                            </React.Fragment>
                        ),
                        buttons: [{
                            size: GameButtonSize.Small,
                            icon: checkSvg,
                            onClick: this.disableMessagePopup,
                        }],
                    });
                }
                // use arrow keys to move from cell to cell.
                arrowKeys(e)(this.table);
            }),
            addListener(allCells, "focus", e => {
                if (!this.cells) {
                    return;
                }
                // finds cells with same values as clicked cell and highlights them
                highlight(e)(this.cells);
            }),
        );
        return listeners;
    }
}
