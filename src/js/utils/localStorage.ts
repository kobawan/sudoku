import { SavedGame } from "../components/app/ducks/requests";

export enum LocalStorageKeys {
  DisableInGameError = "DisableInGameError",
  DisableHighlighting = "DisableHighlighting",
  DisableAutoNotesRemoval = "DisableAutoNotesRemoval",
  CurrentGame = "CurrentGame",
}

type StorageKeysType = boolean | SavedGame | undefined;

const storageKeysToDefaultMap: {
  [key in LocalStorageKeys]: StorageKeysType;
} = {
  [LocalStorageKeys.DisableInGameError]: false,
  [LocalStorageKeys.DisableHighlighting]: false,
  [LocalStorageKeys.DisableAutoNotesRemoval]: false,
  [LocalStorageKeys.CurrentGame]: undefined,
};

export const getStorageKey = (key: LocalStorageKeys): StorageKeysType => {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null) {
      throw new Error();
    }
    return JSON.parse(value);
  } catch {
    return storageKeysToDefaultMap[key];
  }
};

export const setStorageKey = (
  key: LocalStorageKeys,
  value: StorageKeysType
) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Local storage: Was not able to set item in key ${key}`);
  }
};
