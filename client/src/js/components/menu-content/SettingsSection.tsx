import * as React from "react";

import { MenuContentSection } from "./MenuContentSection";
import { SharedSectionProps, MenuSection } from "./types";
import { Checkbox, CheckBoxProps } from "../checkbox/Checkbox";
import { StorageKeys } from "../../utils/localStorage";

export class SettingsSection extends React.PureComponent<SharedSectionProps> {
  public render() {
    return (
      <MenuContentSection
        title={MenuSection.Settings}
        content={this.getContent()}
        crossOnClick={this.props.crossOnClick}
        arrowOnClick={this.props.arrowOnClick}
      />
    );
  }

  private getContent = () => {
    const disableInGameProps: CheckBoxProps = {
      text: "Disable in-game error",
      storageKey: StorageKeys.DisableInGameError,
    };
    const disableHighlightingProps: CheckBoxProps = {
      text: "Disable cell highlighting",
      storageKey: StorageKeys.DisableHighlighting,
    };
    const disableAutoNotesRemovalProps: CheckBoxProps = {
      text: "Disable automatic removal of notes values",
      storageKey: StorageKeys.DisableAutoNotesRemoval,
    };
    return (
      <>
        <Checkbox {...disableInGameProps} />
        <Checkbox {...disableHighlightingProps} />
        <Checkbox {...disableAutoNotesRemovalProps} />
      </>
    );
  };
}
