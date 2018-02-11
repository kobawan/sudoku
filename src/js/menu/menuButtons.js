import { getGame } from "../game/game";
import {
	changePage,
	toggleAboutSection,
} from "../utils/visibilityUtils";

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
