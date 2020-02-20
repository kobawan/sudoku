import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./components/app/ducks/reducer";

export const rootReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
