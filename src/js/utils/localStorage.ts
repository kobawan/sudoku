export enum StorageKeys {
    DisableInGameError = "DisableInGameError",
    DisableHighlighting = "DisableHighlighting",
}

export const storageKeysToDefaultMap: { [key in StorageKeys]: boolean } = {
    [StorageKeys.DisableInGameError]: false,
    [StorageKeys.DisableHighlighting]: false,
};

export const getStorageKey = (key: StorageKeys): boolean => {
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

export const setStorageKey = (key: StorageKeys, value: boolean) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
};
