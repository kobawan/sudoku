import { menuWrapper } from "../menu/consts";
import * as GameIds from "../game/consts";

export const Page = {
	Game: 0,
	Menu: 1,
};

export const changePage = (page = Page.Game) => {
	if(page === Page.Game) {
		menuWrapper.style.display = "none";
		document.getElementById("tables").style.display = "block";
		document.getElementById("sideButtons").style.display = "block";
		document.getElementById("sideMenu").style.display = "block";
		document.getElementById("sideMenuWrapper").style.display = "block";
	}
	else if (page === Page.Menu) {
		menuWrapper.style.display = "inline-block";
		document.getElementById("tables").style.display = "none";
		document.getElementById("sideButtons").style.display = "none";
		document.getElementById("sideMenu").style.display = "none";
		document.getElementById("sideMenuWrapper").style.display = "none";
	}
};

export const enableMessagePopup = (text) => {
	GameIds.messagePopup.style.display = "block";
	GameIds.coorXTable.style.display = "block";
	GameIds.coorYTable.style.display = "block";
	GameIds.tables.style.width = "429px";
	GameIds.tables.style.height = "429px";
	GameIds.tables.style.padding = "0px";
	GameIds.messagePopupText.innerHTML = text;
};

export const disableMessagePopup = () => {
	GameIds.messagePopup.style.display = "none";
	GameIds.coorXTable.style.display = "none";
	GameIds.coorYTable.style.display = "none";
	GameIds.tables.style.width = "347px";
	GameIds.tables.style.height = "347px";
	GameIds.tables.style.padding = "41px";
};

export const toggleSideMenu = () => {
	if(GameIds.sideMenu.style.display == "block") {
		GameIds.sideMenu.style.display = "none";
	}
	else GameIds.sideMenu.style.display = "block";
};