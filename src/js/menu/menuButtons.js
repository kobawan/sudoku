import * as MenuIds from "./consts";
import { getGame } from "../game/game";
import { changePage } from "../utils/visibilityUtils";

/**
 * Callback for resume button click event. Opens game page if game is initialized
 */
export const resumeGame = () => {
	const game = getGame();
	// TODO check for ongoing game entries also
	if(game) {
		changePage();
	}
};

export const MenuTabs = {
	Stats: 0,
	Settings: 1,
	Rules: 2,
	About: 3,
};

/**
 * Iterates through menu tabs to show/hide according to button clicked in menu.
 * @param {MenuTabs} menuTab tab to open in menu
 */
export const showContent = (menuTab) => {
	MenuIds.tabsWrapper.style.display = "block";
	const tabs = [
		MenuIds.statsWrapper,
		MenuIds.settingsWrapper,
		MenuIds.rulesWrapper,
		MenuIds.aboutWrapper,
	];
	tabs.forEach((tab, i) => {
		i === menuTab
			? tab.style.display = "block"
			: tab.style.display = "none";
	});
};

export const ArrowButton = {
	Right: 0,
	Left: 1,
};

/**
 * Toggles sections of about tab in menu. Hides according arrow button.
 * @param {ArrowButton} dir direction of clicked arrow button
 */
export const moveSection = (dir) => {
	if(dir == ArrowButton.Right) {
		MenuIds.arrowLeftButton.style.display = "block";
		MenuIds.arrowRightButton.style.display = "none";
		MenuIds.aboutSection.style.display = "none";
		MenuIds.contactsSection.style.display = "inline-block";
	}
	else if(dir == ArrowButton.Left) {
		MenuIds.arrowLeftButton.style.display = "none";
		MenuIds.arrowRightButton.style.display = "block";
		MenuIds.aboutSection.style.display = "block";
		MenuIds.contactsSection.style.display = "none";
	}
};
