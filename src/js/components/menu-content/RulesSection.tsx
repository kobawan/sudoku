import * as React from "react";

import { MenuContentSection } from "./MenuContentSection";
import { SharedSectionProps, MenuSection } from "./types";

export class RulesSection extends React.PureComponent<SharedSectionProps> {
    public render() {
        const paragraph1 =
            "The classic Sudoku game involves a table of 81 squares. The table is divided " +
            "into nine 3x3 grids, each containing nine squares."
        ;
        const paragraph2 =
            "To win the game, each of the nine grids has to contain all the numbers 1-9 within " +
            "its cells. Each number can only appear once in a row, column or grid."
        ;
        return (
            <MenuContentSection
                title={MenuSection.Rules}
                content={
                    <React.Fragment>
                        <p>{paragraph1}</p>
                        <p>{paragraph2}</p>
                    </React.Fragment>
                }
                crossOnClick={this.props.crossOnClick}
                arrowOnClick={this.props.arrowOnClick}
            />
        );
    }
}
