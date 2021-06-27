import { setSessionStorageKey, SessionStorageKeys } from "./sessionStorage";

export const logout = () => {
  setSessionStorageKey(SessionStorageKeys.UserId, "");
  window.location.reload();
};
