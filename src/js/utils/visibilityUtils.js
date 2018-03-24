import * as React from "react";
import ReactDOM from "react-dom";

import { GamePage } from "../game/game-page/GamePage.jsx";
import { getGame } from "../game/game";

/**
 * Toggles sections of about tab in menu. Hides according arrow button.
 * @param {string} sectionToHide Id of the about section that should hide
 */
export const toggleAboutSection = (sectionToHide = "contactsSection") => {
    const sectionToShow = sectionToHide === "aboutSection" ? "contactsSection" : "aboutSection";

    document.querySelector(`.lobby #${sectionToHide}`).classList.add("hidden");
    document.querySelector(`.lobby #${sectionToShow}`).classList.remove("hidden");
};

/**
 * Iterates through menu tabs to show/hide according to button clicked in menu.
 * @param {string} contentId
 */
export const toggleContent = (contentId = "") => {
    const tabs = document.querySelector(".lobby-content-box.menu-content").children;

    Array.from(tabs).forEach(tab => {
        toggleAboutSection();
        tab.id === contentId
            ? tab.classList.remove("hidden")
            : tab.classList.add("hidden");
    });
};

/**
 * Closes menu content when cross is clicked
 * @param {MouseEvent} event
 */
export const closeContent = (event) => {
    const sectionEl = event.path.filter(
        el => el.classList && el.classList.contains("section")
    );
    // If section contains multiple subsections, e.g. about tab,
    // then reset to initial subsection
    if (sectionEl.length > 1) {
        toggleAboutSection();
    }
    sectionEl.pop().classList.add("hidden");
};

/**
 * Mounts game page with given props
 * @param { hidden: boolean, game: Game } props
 */
export const mountGamePage = (props) => {
    ReactDOM.render(
        <GamePage {...props} />,
        document.getElementById("gamePage")
    );
};

/**
 * Unmounts game page. Needed for when a new game starts.
 */
export const unmountGamePage = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById("gamePage"));
};

export const Page = {
    Game: 0,
    Menu: 1,
};

/**
 * Toggles page between game and menu
 * @param {Page} page
 */
export const changePage = (page = Page.Game) => {
    if(page === Page.Game) {
        document.querySelector(".lobby").classList.add("hidden");
        mountGamePage({ game: getGame() });
        toggleContent(); // Resets menu content and its sections to default visibility
    }
    else if (page === Page.Menu) {
        document.querySelector(".lobby").classList.remove("hidden");
        mountGamePage({ hidden: true });
    }
};
