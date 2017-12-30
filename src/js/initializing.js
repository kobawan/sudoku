import { addMenuButtonListeners } from "./menu/menu";
import { changePage, Page } from "./utils/visibilityUtils";

import {
	addGameButtonListeners,
	addTableCellListeners,
} from "./game/game";

// Initialize menu event listeners and show menu
addMenuButtonListeners();
changePage(Page.Menu);

// Initialize game event listeners
addGameButtonListeners();
addTableCellListeners();
