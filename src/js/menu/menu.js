import * as MenuIds from "./consts";
import {
	resumeGame,
	showContent,
	MenuTabs,
	moveSection,
	ArrowButton,
} from "./menuButtons";
import { initGame } from "../game/game";
import { GameConfig } from "../consts";

/**
 * Adds click event listeners to menu buttons
 */
export const addMenuButtonListeners = () => {
	MenuIds.resumeButton.addEventListener("click", resumeGame);
	MenuIds.startEasyButton.addEventListener("click", () => initGame());
	MenuIds.startMediumButton.addEventListener("click",
		() => initGame(GameConfig.TYPE.DEFAULT, GameConfig.DIFFICULTY.MEDIUM)
	);
	MenuIds.startHardButton.addEventListener("click",
		() => initGame(GameConfig.TYPE.DEFAULT, GameConfig.DIFFICULTY.HARD)
	);

	MenuIds.statsButton.addEventListener("click", () => showContent(MenuTabs.Stats));
	MenuIds.settingsButton.addEventListener("click", () => showContent(MenuTabs.Settings));
	MenuIds.rulesButton.addEventListener("click", () => showContent(MenuTabs.Rules));
	MenuIds.aboutButton.addEventListener("click", () => showContent(MenuTabs.About));

	MenuIds.arrowLeftButton.addEventListener("click", () => moveSection(ArrowButton.Left));
	MenuIds.arrowRightButton.addEventListener("click", () => moveSection(ArrowButton.Right));
};