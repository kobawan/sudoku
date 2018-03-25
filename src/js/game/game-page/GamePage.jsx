import * as React from "react";

import { SideMenu } from "../../components/side-menu/SideMenu.jsx";
import { Popup } from "../../components/popup/Popup.jsx";
import { GameButton } from "../../components/buttons/Button.jsx";
import { CoordinateTableX, CoordinateTableY } from "../../components/coordinates/Coordinates.jsx";
import { sortByGrids } from "../../utils/arrayUtils";
import { isEmptyCell, isReadOnlyCell } from "../helpers";
import { CellClassType, CellMode } from "../../consts";
import { arrowKeys, selectValue, changeSelectedCellMode, filterInvalidInput } from "../gameCells";
import { highlight, checkForWin, showDuplicates } from "../gameTable";
import { updateNotesCells } from "../gameNotesCells";
import { changePage, Page } from "../../utils/visibilityUtils";
import { addListener, removeListener } from "../../utils/generalUtils";

import "./cells.less";
import "./gamePage.less";

/**
 * @param { hidden: boolean, game: Game }
 */
export class GamePage extends React.Component {
    constructor (props) {
        super(props);
        this.resetCells = this.resetCells.bind(this);
        this.handleCellModeChange = this.handleCellModeChange.bind(this);
        this.addCellListeners = this.addCellListeners.bind(this);
        this.assignValues = this.assignValues.bind(this);
        this.enableMessagePopup = this.enableMessagePopup.bind(this);
        this.disableMessagePopup = this.disableMessagePopup.bind(this);
        this.toggleSideMenu = this.toggleSideMenu.bind(this);
        this.resetState = this.resetState.bind(this);
        this.setCellModePencil = this.setCellModePencil.bind(this);
        this.setCellModeNotes = this.setCellModeNotes.bind(this);

        this.state = {
            cellMode: CellMode.Pencil,
            toggleSideMenu: false,
            popupProps: {
                hidden: true,
                text: "",
                onClick: () => undefined,
            },
            toggleCoordinates: false,
        };
    }

    componentDidMount () {
        this.table = document.querySelector(".game .sudoku");
        this.cells = this.table.querySelectorAll("textarea");
        this.resetCells();
        sortByGrids(this.props.game, this.assignValues);
        this.listeners = this.addCellListeners();
    }

    componentWillUnmount () {
        this.listeners = removeListener(this.listeners, this.cells);
    }

    componentWillUpdate (nextProps, nextState) {
        if (this.props.hidden && !nextProps.hidden) {
            this.resetState();
        }
        if (this.state.cellMode !== nextState.cellMode) {
            this.handleCellModeChange();
        }
    }

    render () {
        const sideMenuButtons = [
            {
                value: "Return",
                onClick: () => changePage(Page.Menu),
            },
            {
                value: "Reset", 
                onClick: () => {
                    this.enableMessagePopup(
                        "Are you sure you want to reset?",
                        () => {
                            // TODO reset only non readonly cells
                            this.resetCells();
                            this.resetState();
                            sortByGrids(this.props.game, this.assignValues);
                        }
                    );
                },
            },
            {
                value: "Check",
                onClick: () => {
                    const duplicates = showDuplicates(this.cells, this.props.game);
                    const wrongCells = duplicates
                        .map(cell => {
                            const row = cell.parentNode.parentNode.rowIndex + 1;
                            const col = "ABCDEFGHI"[cell.parentNode.cellIndex];
                            return `${col + row}`;
                        })
                        .sort()
                        .join(", ")
                    ;
                    const text = wrongCells.length > 0
                        ? "Cells " + wrongCells + " are incorrect."
                        : "Correct so far!";
                    this.enableMessagePopup(text, this.disableMessagePopup, true);
                },
            },
            {
                value: "Solve",
                onClick: () => {
                    this.enableMessagePopup(
                        "Are you sure you want to solve?",
                        () => {
                            // TODO reset only non readonly cells
                            this.resetCells();
                            this.resetState();
                            sortByGrids(this.props.game, this.assignValues);
                            this.cells.forEach(
                                (cell, index) => cell.value = this.props.game.matrix[index]
                            );
                            this.enableMessagePopup(
                                "Correct!<br />You have won the game!",
                                this.disableMessagePopup
                            );
                        }
                    );
                },
            }
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

    setCellModePencil () {
        this.setState({ cellMode: CellMode.Pencil });
    }

    setCellModeNotes () {
        this.setState({ cellMode: CellMode.Notes });
    }

    resetCells () {
        this.cells.forEach(cell => {
            cell.value = cell.defaultValue;
            cell.readOnly = false;
            cell.maxLength = 1;
            cell.className = CellClassType.PENCIL;
        });
    }

    /**
     * Assigns game values to corresponding cells
     * @param {object} values coordinates
     */
    assignValues (values) {
        const counter = values.col + (values.row * this.props.game.ratio);
        const val = this.props.game.mask[values.grid][counter];
        if (val !== 0) {
            this.cells[values.pos].value = val;
            this.cells[values.pos].readOnly = true;
            this.cells[values.pos].maxLength = 1;
            this.cells[values.pos].className = CellClassType.READONLY;
        }
    }

    handleCellModeChange () {
        switch(this.state.cellMode) {
            case CellMode.Pencil:
                this.cells.forEach(cell => {
                    if(isEmptyCell(cell)) {
                        cell.maxLength = 9;
                        cell.className = CellClassType.NOTES;
                    }
                });
                break;
            case CellMode.Notes:
                this.cells.forEach(cell => {
                    if(isEmptyCell(cell)) {
                        cell.maxLength = 1;
                        cell.className = CellClassType.PENCIL;
                    }
                });
                break;
            default:
        }
    }

    resetState () {
        this.setState({
            cellMode: CellMode.Pencil,
            toggleSideMenu: false,
            popupProps: {
                hidden: true,
                text: "",
                onClick: () => undefined,
            },
            toggleCoordinates: false,
        });
    }

    toggleSideMenu () {
        this.setState({ toggleSideMenu: !this.state.toggleSideMenu });
    }

    enableMessagePopup (text, onClick, toggleCoordinates = false) {
        this.setState({
            popupProps: {
                hidden: false,
                text,
                onClick,
            },
            toggleCoordinates,
        });
    }

    disableMessagePopup () {
        this.setState({
            popupProps: {
                hidden: true,
                text: "",
                onClick: () => undefined,
            },
            toggleCoordinates: false,
        });
    }

    addCellListeners () {
        const listeners = [];
        const playableCells = Array.from(this.cells).filter(cell => !isReadOnlyCell(cell));

        listeners.push(
            addListener(playableCells, "focus", () => {
                // selects cell values
                selectValue(this.state.cellMode);
            }),
            addListener(playableCells, "input", () => {
                // changed clicked cell into according style
                changeSelectedCellMode(this.state.cellMode);
                //removes invalid values
                filterInvalidInput(this.state.cellMode);
            }),
            addListener(playableCells, "keyup",() => {
                //removes notes from column, row and grid where the pencil value was inserted
                //and filters invalid values
                updateNotesCells(this.state.cellMode, this.props.game, this.cells);
            }),
            addListener(this.cells, "keyup", () => {
                // shows in-game error for same number and displays automatic win message
                const hasWon = checkForWin(this.cells, this.props.game);
                if (hasWon) {
                    this.enableMessagePopup(
                        "Correct!<br />You have won the game!",
                        this.disableMessagePopup
                    );
                }
                // use arrow keys to move from cell to cell.
                arrowKeys(this.table);
            }),
            addListener(this.cells, "focus", () => {
                // finds cells with same values as clicked cell and highlights them
                highlight(this.cells);
            })
        );
        return listeners;
    }
}
