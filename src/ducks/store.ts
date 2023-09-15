import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "../components/app/ducks/reducer";
import { gameReducer } from "../components/game-page/ducks/reducer";
import { popupReducer } from "../components/popup/ducks/reducer";
import { sideMenuReducer } from "../components/side-menu/ducks/reducer";
import { network } from "./middlewares/network";
import { autoSave } from "./middlewares/autoSave";
import { loginFormReducer } from "../components/login-form/ducks/reducer";

export const rootReducer = combineReducers({
  app: appReducer,
  game: gameReducer,
  popup: popupReducer,
  sideMenu: sideMenuReducer,
  loginForm: loginFormReducer,
});

const middlewares = [thunk, network, autoSave];

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers = process.env.NODE_ENV
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
