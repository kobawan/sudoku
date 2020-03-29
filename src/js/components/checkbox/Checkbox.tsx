import React, { useState, useCallback } from "react";
import cx from "classnames";
import {
  LocalStorageKeys,
  getStorageKey,
  setStorageKey,
} from "../../utils/localStorage";

import "./checkbox.less";

export interface CheckBoxProps {
  text: string;
  storageKey: LocalStorageKeys;
  onChange?: (isChecked: boolean) => void;
}

export const Checkbox: React.FC<CheckBoxProps> = ({
  text,
  storageKey,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(!!getStorageKey(storageKey));
  const onChangeHandler = useCallback(() => {
    const newChecked = !isChecked;
    setStorageKey(storageKey, newChecked);
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  }, [isChecked, setIsChecked, storageKey, onChange]);

  return (
    <label className={cx("checkbox-label", isChecked && "checked")}>
      <input
        className="checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={onChangeHandler}
      />
      <span>{text}</span>
    </label>
  );
};
