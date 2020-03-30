import { RootState } from "../../../ducks/store";

export const getLoginFormProps = (state: RootState) => state.loginForm;
export const isRegistrationForm = (state: RootState) =>
  state.loginForm.formType === "Register";
