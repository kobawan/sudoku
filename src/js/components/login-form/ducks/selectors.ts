import { RootState } from "../../../ducks/store";

export const getLoginFormProps = (state: RootState) => state.loginForm;
export const isRegistrationForm = (state: RootState) =>
  state.loginForm.formType === "Register";
export const isLoginRegistrationFormOpen = (state: RootState) =>
  state.loginForm.isFormOpen;
