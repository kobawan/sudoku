import { addMenuButtonListeners } from "./menu/menu";
import { changePage, Page } from "./utils/visibilityUtils";

import {
	addGameButtonListeners,
	addTableCellListeners,
} from "./game/game";

// eslint-disable-next-line no-unused-vars
import styles from "../styles";

// Initialize menu event listeners and show menu
addMenuButtonListeners();
changePage(Page.Menu);

// Initialize game event listeners
addGameButtonListeners();
addTableCellListeners();
