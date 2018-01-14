export const Page = {
	Game: 0,
	Menu: 1,
};

export const changePage = (page = Page.Game) => {
	if(page === Page.Game) {
		document.querySelector(".lobby").classList.add("hidden");
		document.querySelector(".game").classList.remove("hidden");
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