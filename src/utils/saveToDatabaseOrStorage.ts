import { SavedGame, saveGame } from "../components/app/ducks/requests";
import { setStorageKey, LocalStorageKeys } from "./localStorage";

export const saveToDatabaseOrStorage = async (
  payload: SavedGame,
  userId: string | undefined
) => {
  if (userId) {
    const { data, status } = await saveGame({ ...payload, id: userId });
    if (data.type === "fail") {
      throw { ...data, status };
    }
  } else {
    setStorageKey(LocalStorageKeys.CurrentGame, payload);
  }
};
