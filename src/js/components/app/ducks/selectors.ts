import { RootState } from "../../../ducks/store";

export const getPage = (state: RootState) => state.app.page;
export const getCurrentGame = (state: RootState) => state.app.currentGame;
export const getHasCurrentGame = (state: RootState) => !!state.app.currentGame;
export const getLobbyIsLoading = (state: RootState) => state.app.lobbyIsLoading;
export const getLobbyHasError = (state: RootState) => state.app.lobbyHasError;
export const getLobbyMenuSection = (state: RootState) =>
  state.app.lobbyMenuSection;
export const getErrors = (state: RootState) => state.app.errors;
