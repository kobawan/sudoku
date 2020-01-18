export enum StorageKeys {
  DisableInGameError = "DisableInGameError",
  DisableHighlighting = "DisableHighlighting",
  DisableAutoNotesRemoval = "DisableAutoNotesRemoval",
  UserId = "UserId",
}

type StorageKeysType = boolean | string;

export const storageKeysToDefaultMap: { [key in StorageKeys]: StorageKeysType } = {
  [StorageKeys.DisableInGameError]: false,
  [StorageKeys.DisableHighlighting]: false,
  [StorageKeys.DisableAutoNotesRemoval]: false,
  [StorageKeys.UserId]: "",
};

export const getStorageKey = (key: StorageKeys): StorageKeysType => {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null) {
      throw Error;
    }
    return JSON.parse(value);
  } catch {
    return storageKeysToDefaultMap[key];
  }
};

export const setStorageKey = (key: StorageKeys, value: StorageKeysType) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};
