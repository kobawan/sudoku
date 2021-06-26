import React, { useCallback, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import "./loginForm.less";
import { LoadingButton } from "../buttons/Button";
import { loginUser } from "../app/ducks/actions";
import { onFormItemBlur } from "../../utils/formHandlers";
import { getLoginFormProps, isRegistrationForm } from "./ducks/selectors";
import {
  toggleFormType,
  setFormLoading,
  setUsername,
  setPassword,
  setConfirmPassword,
  setFormError,
} from "./ducks/actions";

const validateUsername = (value: string) => {
  if (!value) {
    return "Field 'Username' cannot be empty";
  }
  if (value.length < 3) {
    return "Field 'Username' should have at least 3 characters";
  }
};

const validatePassword = (value: string) => {
  // TODO: add validator for strong passwords
  if (!value) {
    return "Field 'Password' cannot be empty";
  }
  if (value.length < 6) {
    return "Field 'Password' should have at least 6 characters";
  }
};

const validateConfirmPassword = (pwd: string, confirmPwd: string) => {
  if (pwd !== confirmPwd) {
    return "Passwords don't match";
  }
};

export const LoginForm: React.FC = () => {
  const {
    username,
    password,
    confirmPassword,
    formError,
    formIsLoading,
  } = useSelector(getLoginFormProps);
  const isRegistration = useSelector(isRegistrationForm);
  const dispatch = useDispatch();

  const toggleForm = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (formIsLoading) {
        return;
      }
      dispatch(toggleFormType());
    },
    [formIsLoading]
  );

  const setError = useCallback(
    (error: string) => dispatch(setFormError(error)),
    []
  );
  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setUsername(e.currentTarget.value));
    },
    []
  );
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setPassword(e.currentTarget.value));
    },
    []
  );
  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setConfirmPassword(e.currentTarget.value));
    },
    []
  );
  const onUsernameBlur = useCallback(
    onFormItemBlur(validateUsername, setError),
    []
  );
  const onPasswordBlur = useCallback(
    onFormItemBlur(validatePassword, setError),
    []
  );
  const onConfirmPasswordBlur = useCallback(
    onFormItemBlur(
      () => validateConfirmPassword(password, confirmPassword),
      setError
    ),
    [password, confirmPassword]
  );

  const onSubmit = useCallback(
    async (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();

      dispatch(setFormLoading(true));
      dispatch(loginUser(username.trim(), password.trim(), isRegistration));
    },
    [username, password, isRegistration]
  );

  return (
    <form className="loginForm">
      <div className="row">
        <label htmlFor="username-input" className="label">
          Username:
        </label>
        <input
          id="username-input"
          className="input"
          type="text"
          onChange={handleUsernameChange}
          onBlur={onUsernameBlur}
          disabled={formIsLoading}
          value={username}
        />
      </div>
      <div className="row">
        <label htmlFor="password-input" className="label">
          Password:
        </label>
        <input
          id="password-input"
          className="input"
          type="password"
          onChange={handlePasswordChange}
          onBlur={onPasswordBlur}
          disabled={formIsLoading}
          value={password}
        />
      </div>
      {isRegistration && (
        <div className="row">
          <label htmlFor="confirm-password-input" className="label">
            Confirm Password:
          </label>
          <input
            id="confirm-password-input"
            className="input"
            type="password"
            onChange={handleConfirmPasswordChange}
            onBlur={onConfirmPasswordBlur}
            disabled={formIsLoading}
            value={confirmPassword}
          />
        </div>
      )}
      <div className={cx("row", !formError && "hidden")}>
        <span className="formError">{formError}</span>
      </div>
      <div className="row buttonRow">
        <LoadingButton
          onClick={onSubmit}
          value="Submit"
          disabled={
            !username || !password.length || !!formError || formIsLoading
          }
          loading={formIsLoading}
        />
      </div>
      <div className="row">
        <button
          className={cx("formSwitch", formIsLoading && "disabled")}
          onClick={toggleForm}
          disabled={formIsLoading}
        >
          {isRegistration ? "Login" : "Register"}
        </button>
      </div>
    </form>
  );
};
