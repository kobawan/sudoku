import { Reducer } from "redux";
import {
  SetUsernameAction,
  SetPasswordAction,
  SetConfirmPasswordAction,
  SetFormErrorAction,
  SetFormLoadingAction,
  ToggleFormTypeAction,
  SET_USERNAME,
  SET_PASSWORD,
  SET_CONFIRM_PASSWORD,
  SET_FORM_ERROR,
  SET_FORM_LOADING,
  TOGGLE_FORM_TYPE,
} from "./actions";

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  formError: string;
  formIsLoading: boolean;
  formType: "Login" | "Register";
}

type Actions =
  | SetUsernameAction
  | SetPasswordAction
  | SetConfirmPasswordAction
  | SetFormErrorAction
  | SetFormLoadingAction
  | ToggleFormTypeAction;

const initialState: State = {
  username: "",
  password: "",
  confirmPassword: "",
  formError: "",
  formIsLoading: false,
  formType: "Login",
};

export const loginFormReducer: Reducer<State, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
        formError: "",
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
        formError: "",
      };
    case SET_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: action.payload,
        formError: "",
      };
    case SET_FORM_ERROR:
      return {
        ...state,
        formError: action.payload,
      };
    case SET_FORM_LOADING:
      return {
        ...state,
        formIsLoading: action.payload,
      };
    case TOGGLE_FORM_TYPE:
      return {
        ...initialState,
        formType: state.formType === "Login" ? "Register" : "Login",
      };
    default:
      return state;
  }
};
