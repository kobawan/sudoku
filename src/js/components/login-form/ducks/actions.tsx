import { ActionWithPayload } from "../../../consts";
import { Action } from "redux";

export const SET_USERNAME = "@loginForm/SET_USERNAME";
export const SET_PASSWORD = "@loginForm/SET_PASSWORD";
export const SET_CONFIRM_PASSWORD = "@loginForm/SET_CONFIRM_PASSWORD";
export const SET_FORM_ERROR = "@loginForm/SET_FORM_ERROR";
export const SET_FORM_LOADING = "@loginForm/SET_FORM_LOADING";
export const TOGGLE_FORM_TYPE = "@loginForm/TOGGLE_FORM_TYPE";
export const OPEN_FORM = "@loginForm/OPEN_FORM";
export const CLOSE_FORM = "@loginForm/CLOSE_FORM";

export type SetUsernameAction = ActionWithPayload<typeof SET_USERNAME, string>;
export const setUsername = (payload: string): SetUsernameAction => ({
  type: SET_USERNAME,
  payload,
});

export type SetPasswordAction = ActionWithPayload<typeof SET_PASSWORD, string>;
export const setPassword = (payload: string): SetPasswordAction => ({
  type: SET_PASSWORD,
  payload,
});

export type SetConfirmPasswordAction = ActionWithPayload<
  typeof SET_CONFIRM_PASSWORD,
  string
>;
export const setConfirmPassword = (
  payload: string
): SetConfirmPasswordAction => ({
  type: SET_CONFIRM_PASSWORD,
  payload,
});

export type SetFormErrorAction = ActionWithPayload<
  typeof SET_FORM_ERROR,
  string
>;
export const setFormError = (payload: string): SetFormErrorAction => ({
  type: SET_FORM_ERROR,
  payload,
});

export type SetFormLoadingAction = ActionWithPayload<
  typeof SET_FORM_LOADING,
  boolean
>;
export const setFormLoading = (payload: boolean): SetFormLoadingAction => ({
  type: SET_FORM_LOADING,
  payload,
});

export type ToggleFormTypeAction = Action<typeof TOGGLE_FORM_TYPE>;
export const toggleFormType = (): ToggleFormTypeAction => ({
  type: TOGGLE_FORM_TYPE,
});

export type OpenFormAction = ActionWithPayload<
  typeof OPEN_FORM,
  "Register" | "Login"
>;
export const openForm = (payload: "Register" | "Login"): OpenFormAction => ({
  type: OPEN_FORM,
  payload,
});

export type CloseFormAction = Action<typeof CLOSE_FORM>;
export const closeForm = (): CloseFormAction => ({
  type: CLOSE_FORM,
});
