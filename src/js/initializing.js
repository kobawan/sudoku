import { addMenuButtonListeners } from "./menu/menu";
import {
	addGameButtonListeners,
	addTableCellListeners,
} from "./game/game";

import "../styles";

// Initialize menu event listeners
addMenuButtonListeners();

// Initialize game event listeners
addGameButtonListeners();
addTableCellListeners();
