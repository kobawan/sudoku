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

/**
 * Iterates through menu tabs to show/hide according to button clicked in menu.
 */
export const showContent = (event) => {
	const tabs = document.querySelector(".lobby-content-box.menu-content").children;

	Array.from(tabs).forEach(tab => {
		// Checks if button value is same as menu content title
		tab.querySelector("h2").innerText === event.target.value
			? tab.classList.remove("hidden")
			: tab.classList.add("hidden");
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
		document.querySelector(".lobby #aboutSection").classList.add("hidden");
		document.querySelector(".lobby #contactsSection").classList.remove("hidden");
	}
	else if(dir == ArrowButton.Left) {
		document.querySelector(".lobby #aboutSection").classList.remove("hidden");
		document.querySelector(".lobby #contactsSection").classList.add("hidden");
	}
};
