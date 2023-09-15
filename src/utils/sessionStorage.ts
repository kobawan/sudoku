export enum SessionStorageKeys {
  UserId = "UserId",
}

type StorageKeysType = string;

const storageKeysToDefaultMap: {
  [key in SessionStorageKeys]: StorageKeysType;
} = {
  [SessionStorageKeys.UserId]: "",
};

export const getSessionStorageKey = (
  key: SessionStorageKeys
): StorageKeysType => {
  try {
    const value = window.sessionStorage.getItem(key);
    if (value === null) {
      throw new Error();
    }
    return JSON.parse(value);
  } catch {
    return storageKeysToDefaultMap[key];
  }
};

export const setSessionStorageKey = (
  key: SessionStorageKeys,
  value: StorageKeysType
) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Session storage: Was not able to set item in key ${key}`);
  }
};
