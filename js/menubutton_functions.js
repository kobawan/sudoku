import { arrowLeftButton, arrowRightButton } from "./initializing";

const showContent = (button) => {
	document.getElementById("startContent").style.display = "block";
	if(button == "stats") {
		document.getElementById("statsWrapper").style.display = "block";
		document.getElementById("settingsWrapper").style.display = "none";
		document.getElementById("ruleWrapper").style.display = "none";
		document.getElementById("aboutWrapper").style.display = "none";
	}
	else if(button == "settings") {
		document.getElementById("statsWrapper").style.display = "none";
		document.getElementById("settingsWrapper").style.display = "block";
		document.getElementById("ruleWrapper").style.display = "none";
		document.getElementById("aboutWrapper").style.display = "none";
	}
	else if(button == "rule") {
		document.getElementById("statsWrapper").style.display = "none";
		document.getElementById("settingsWrapper").style.display = "none";
		document.getElementById("ruleWrapper").style.display = "block";
		document.getElementById("aboutWrapper").style.display = "none";
	}
	else if(button == "about") {
		document.getElementById("statsWrapper").style.display = "none";
		document.getElementById("settingsWrapper").style.display = "none";
		document.getElementById("ruleWrapper").style.display = "none";
		document.getElementById("aboutWrapper").style.display = "block";
	}
};

const moveSection = (dir) => {
	if(dir == "right") {
		arrowLeftButton.style.display = "block";
		arrowRightButton.style.display = "none";
		document.getElementById("aboutSection").style.display = "none";
		document.getElementById("contactsSection").style.display = "inline-block";
	}
	else if(dir == "left") {
		arrowLeftButton.style.display = "none";
		arrowRightButton.style.display = "block";
		document.getElementById("aboutSection").style.display = "block";
		document.getElementById("contactsSection").style.display = "none";
	}
};

export {
	showContent,
	moveSection
};
