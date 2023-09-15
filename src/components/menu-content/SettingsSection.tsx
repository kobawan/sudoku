import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { MenuContentSection } from "./MenuContentSection";
import { SharedSectionProps, MenuSection } from "./types";
import { Checkbox, CheckBoxProps } from "../checkbox/Checkbox";
import { LocalStorageKeys } from "../../utils/localStorage";
import { resetErrorCells, updatePencilCells } from "../game-page/ducks/actions";

const disableHighlightingProps: CheckBoxProps = {
  text: "Disable cell highlighting",
  storageKey: LocalStorageKeys.DisableHighlighting,
};
const disableAutoNotesRemovalProps: CheckBoxProps = {
  text: "Disable automatic removal of notes values",
  storageKey: LocalStorageKeys.DisableAutoNotesRemoval,
};

export const SettingsSection: React.FC<SharedSectionProps> = ({
  crossOnClick,
  arrowOnClick,
}) => {
  const dispatch = useDispatch();
  const onErrorDisabledChange = useCallback(
    (isChecked: boolean) => {
      if (isChecked) {
        dispatch(resetErrorCells());
      } else {
        dispatch(updatePencilCells());
      }
    },
    [dispatch]
  );
  const disableInGameProps: CheckBoxProps = {
    text: "Disable in-game error",
    storageKey: LocalStorageKeys.DisableInGameError,
    onChange: onErrorDisabledChange,
  };

  const Content = (
    <>
      <Checkbox {...disableInGameProps} />
      <Checkbox {...disableHighlightingProps} />
      <Checkbox {...disableAutoNotesRemovalProps} />
    </>
  );

  return (
    <MenuContentSection
      title={MenuSection.Settings}
      content={Content}
      crossOnClick={crossOnClick}
      arrowOnClick={arrowOnClick}
    />
  );
};
