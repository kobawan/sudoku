import { Action } from "redux";

export const TOGGLE_SIDE_MENU = "@sideMenu/TOGGLE_SIDE_MENU";

export type ToggleSideMenuAction = Action<typeof TOGGLE_SIDE_MENU>;
export const toggleSideMenu = (): ToggleSideMenuAction => ({
  type: TOGGLE_SIDE_MENU,
});
