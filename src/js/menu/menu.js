import {
	resumeGame,
	showContent,
	moveSection,
	ArrowButton,
} from "./menuButtons";
import { initGame } from "../game/game";
import { GameConfig } from "../consts";

/**
 * Adds click event listeners to menu buttons
 */
export const addMenuButtonListeners = () => {
	document.querySelector(".lobby input[value=Resume]").addEventListener("click", resumeGame);
	document.querySelector(".lobby input[value=Easy]").addEventListener("click", () => initGame());
	document.querySelector(".lobby input[value=Medium]").addEventListener("click",
		() => initGame(GameConfig.TYPE.DEFAULT, GameConfig.DIFFICULTY.MEDIUM)
	);
	document.querySelector(".lobby input[value=Hard]").addEventListener("click",
		() => initGame(GameConfig.TYPE.DEFAULT, GameConfig.DIFFICULTY.HARD)
	);

	document.querySelector(".lobby input[value=Stats]").addEventListener("click", showContent);
	document.querySelector(".lobby input[value=Settings]").addEventListener("click", showContent);
	document.querySelector(".lobby input[value=Rules]").addEventListener("click", showContent);
	document.querySelector(".lobby input[value=About]").addEventListener("click", showContent);

	document.querySelector(".lobby .arrow.left").addEventListener("click",
		() => moveSection(ArrowButton.Left)
	);
	document.querySelector(".lobby .arrow.right").addEventListener("click",
		() => moveSection(ArrowButton.Right)
	);
};