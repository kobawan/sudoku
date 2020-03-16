import { RootState } from "../../../ducks/store";

export const getSideMenuIsOpen = (state: RootState) => state.sideMenu.isOpen;
