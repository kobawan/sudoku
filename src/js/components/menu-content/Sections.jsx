import * as React from "react";

import { MenuContentSection, ArrowDirection } from "./MenuContentSection.jsx";

export const MenuSection = {
    Stats: "Stats",
    Settings: "Settings",
    Rules: "Rules",
    About: "About",
    Contacts: "Contacts",
};

export const StatsSection = ({ crossOnClick, arrowOnClick }) => {
    return (
        <MenuContentSection
            title={MenuSection.Stats}
            content={<p>TBA</p>}
            crossOnClick={crossOnClick}
            arrowOnClick={arrowOnClick}
        />
    );
};

export const SettingsSection = ({ crossOnClick, arrowOnClick }) => {
    return (
        <MenuContentSection
            title={MenuSection.Settings}
            content={<p>TBA</p>}
            crossOnClick={crossOnClick}
            arrowOnClick={arrowOnClick}
        />
    );
};

export const RulesSection = ({ crossOnClick, arrowOnClick }) => {
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
            crossOnClick={crossOnClick}
            arrowOnClick={arrowOnClick}
        />
    );
};

export const AboutSection = ({ crossOnClick, arrowOnClick }) => {
    const paragraph1 =
        "Hi! My name is Sara, or Kobawan in the interwebz. I've always been a fan of puzzles, " +
        "so when I started programming, I came up with the idea to combine my two joys of " +
        "puzzles and programming, to create this website."
    ;
    const paragraph2 =
        "It's been a fun project to create. Sometimes challenging and time-consuming, " +
        "but in the end, a very good opportunity to learn programming."
    ;
    const paragraph3 =
        "Along with creating more projects than I can handle, I also knit, play with my " +
        "dogs, and binge watch netflix."
    ;
    return (
        <MenuContentSection
            title={MenuSection.About}
            withFooter={true}
            content={
                <React.Fragment>
                    <p>{paragraph1}</p>
                    <p>{paragraph2}</p>
                    <p>{paragraph3}</p>
                    <p>I hope you enjoy!</p>
                </React.Fragment>
            }
            crossOnClick={crossOnClick}
            arrowOnClick={arrowOnClick}
        />
    );
};

export const ContactsSection = ({ crossOnClick, arrowOnClick }) => {
    return (
        <MenuContentSection
            title={MenuSection.Contacts}
            withFooter={true}
            arrow={ArrowDirection.Left}
            content={
                <React.Fragment>
                    <p>
                        <strong>Developer:</strong> Sara Nordmyr da Cunha
                        (<a
                            href="https://github.com/kobawan"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            @kobawan
                        </a>)
                    </p>
                    <p>
                        <strong>Bug reporting: </strong>
                        <a
                            href="https://github.com/kobawan/sudoku/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://github.com/kobawan/sudoku/issues
                        </a>
                    </p>
                </React.Fragment>
            }
            crossOnClick={crossOnClick}
            arrowOnClick={arrowOnClick}
        />
    );
};
