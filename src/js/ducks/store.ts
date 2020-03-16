import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "../components/app/ducks/reducer";
import { gameReducer } from "../components/game-page/ducks/reducer";
import { popupReducer } from "../components/popup/ducks/reducer";
import { sideMenuReducer } from "../components/side-menu/ducks/reducer";
import { network } from "./middlewares/network";

export const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer,
  popup: popupReducer,
  sideMenu: sideMenuReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk, network));
