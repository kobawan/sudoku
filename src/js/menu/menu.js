import {
	resumeGame,
	closeContent,
} from "./menuButtons";
import {
	toggleAboutSection,
	toggleContent,
} from "../utils/visibilityUtils";
import { initGame } from "../game/game";
import { GameConfig } from "../consts";

/**
 * Adds click event listeners to menu buttons
 */
export const addMenuButtonListeners = () => {
	document.querySelector(".lobby input[value=Resume]").addEventListener("click", resumeGame);
	document.querySelector(".lobby input[value=Easy]").addEventListener("click",
		() => initGame(GameConfig.DIFFICULTY.EASY)
	);
	document.querySelector(".lobby input[value=Medium]").addEventListener("click",
		() => initGame(GameConfig.DIFFICULTY.MEDIUM)
	);
	document.querySelector(".lobby input[value=Hard]").addEventListener("click",
		() => initGame(GameConfig.DIFFICULTY.HARD)
	);

	const menuContentButtons =
		document.querySelectorAll(".lobby .lobby-content-box.menu .column")[1]
		.querySelectorAll("input");

	menuContentButtons.forEach(
		button => button.addEventListener("click",
			event => toggleContent(`${event.target.value.toLowerCase()}Content`)
		)
	);

	document.querySelectorAll(".lobby .arrow").forEach(
		arrow => arrow.addEventListener("click", () => {
			toggleAboutSection(event.path.find(
				el => el.classList && el.classList.contains("sub-section")
			).id);
		})
	);

	document.querySelectorAll(".lobby .cross").forEach(
		cross => cross.addEventListener("click", closeContent)
	);
};