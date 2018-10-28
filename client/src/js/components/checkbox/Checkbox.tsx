import * as React from "react";
import { StorageKeys, getStorageKey, setStorageKey } from "../../utils/localStorage";

import "./checkbox.less";

export interface CheckBoxProps {
    text: string;
    storageKey: StorageKeys;
}

interface CheckboxState {
    isChecked: boolean;
}

export class Checkbox extends React.PureComponent<CheckBoxProps, CheckboxState> {
    public state: CheckboxState = {
        isChecked: !!getStorageKey(this.props.storageKey),
    };

    public render () {
        const checked = this.state.isChecked ? "checked" : "";
        return (
            <label className={`checkbox-label ${checked}`}>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.onChange}
                />
                <span>{this.props.text}</span>
            </label>
        );
    }

    private onChange = () => {
        const isChecked = !this.state.isChecked;
        setStorageKey(this.props.storageKey, isChecked);
        this.setState({ isChecked });
    }
}
