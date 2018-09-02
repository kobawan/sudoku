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
        return (
            <>
                <Checkbox {...disableInGameProps} />
            </>
        );
    }
}
