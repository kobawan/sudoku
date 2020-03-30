import React, { useCallback, useState, MouseEvent } from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import "./loginForm.less";
import { LoadingButton } from "../buttons/Button";
import { loginUser } from "../app/ducks/actions";
import { onFormItemChange, onFormItemBlur } from "../../utils/formHandlers";

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
  // TODO move to reducer
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistration, setIsRegistration] = useState(false);
  const resetForm = useCallback(() => {
    // FIXME: doesn't work
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setFormError("");
  }, [setUsername, setPassword, setConfirmPassword, setFormError]);
  const toggleForm = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (isLoading) {
        return;
      }
      setIsRegistration(!isRegistration);
      resetForm();
    },
    [setIsRegistration, isRegistration, resetForm, isLoading]
  );

  const handleUsernameChange = onFormItemChange(setUsername, setFormError);
  const handlePasswordChange = onFormItemChange(setPassword, setFormError);
  const handleConfirmPasswordChange = onFormItemChange(
    setConfirmPassword,
    setFormError
  );
  const onUsernameBlur = onFormItemBlur(validateUsername, setFormError);
  const onPasswordBlur = onFormItemBlur(validatePassword, setFormError);
  const onConfirmPasswordBlur = onFormItemBlur(
    () => validateConfirmPassword(password, confirmPassword),
    setFormError
  );

  const onSubmit = useCallback(
    async (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();

      setIsLoading(true);
      dispatch(
        loginUser(
          username.trim(),
          password.trim(),
          isRegistration,
          setFormError
        )
      );
    },
    [username, password, setIsLoading, isRegistration, setFormError]
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
          disabled={isLoading}
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
          disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
      )}
      <div className={cx("row", !formError && "hidden")}>
        <span className="formError">{formError}</span>
      </div>
      <div className="row">
        <button
          className={cx("formSwitch", isLoading && "disabled")}
          onClick={toggleForm}
          tabIndex={isLoading ? -1 : 0}
        >
          {isRegistration ? "Login" : "Register"}
        </button>
      </div>
      <div className="row buttonRow">
        <LoadingButton
          onClick={onSubmit}
          value="Submit"
          disabled={!username || !password.length || !!formError || isLoading}
          loading={isLoading}
        />
      </div>
    </form>
  );
};
