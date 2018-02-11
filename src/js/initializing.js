import { addMenuButtonListeners } from "./menu/menu";
import {
	addGameButtonListeners,
	addTableCellListeners,
} from "./game/game";

// eslint-disable-next-line no-unused-vars
import styles from "../styles";

// Initialize menu event listeners
addMenuButtonListeners();

// Initialize game event listeners
addGameButtonListeners();
addTableCellListeners();
