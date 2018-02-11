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

export const Page = {
	Game: 0,
	Menu: 1,
};

export const changePage = (page = Page.Game) => {
	if(page === Page.Game) {
		document.querySelector(".lobby").classList.add("hidden");
		document.querySelector(".game").classList.remove("hidden");

		toggleContent(); // Resets menu content and its sections to default visibility
	}
	else if (page === Page.Menu) {
		document.querySelector(".lobby").classList.remove("hidden");
		document.querySelector(".game").classList.add("hidden");
	}
};

export const enableMessagePopup = (text) => {
	document.querySelector(".game .coorX").classList.remove("hidden");
	document.querySelector(".game .coorY").classList.remove("hidden");
	document.querySelector(".game .message").innerHTML = text;
	document.querySelector(".game .message-popup").classList.remove("hidden");
};

export const disableMessagePopup = () => {
	document.querySelector(".game .coorX").classList.add("hidden");
	document.querySelector(".game .coorY").classList.add("hidden");
	document.querySelector(".game .message-popup").classList.add("hidden");
};

export const toggleSideMenu = () => {
	const sideMenu = document.querySelector(".game .menu");
	if(sideMenu.classList.contains("hidden")) {
		sideMenu.classList.remove("hidden");
	}
	else sideMenu.classList.add("hidden");
};