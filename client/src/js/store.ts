import { createStore, combineReducers } from "redux";
import { appReducer } from "./components/app/ducks/reducer";

export const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
