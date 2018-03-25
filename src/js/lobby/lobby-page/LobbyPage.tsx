import * as React from "react";

import "./lobbyPage.less";

import { MainMenu } from "../../components/main-menu/MainMenu";
import {
    StatsSection,
    SettingsSection,
    RulesSection,
    AboutSection,
    ContactsSection,
    MenuSection,
    SharedSectionProps,
} from "../../components/menu-content/Sections";
import { MenuButtonProps } from "../../components/buttons/Button";

type MapMenuSectionToComponentIndexSignature = {
    [k in keyof typeof MenuSection]: ({ crossOnClick, arrowOnClick }: SharedSectionProps) => JSX.Element
};

const mapMenuSectionToComponent: MapMenuSectionToComponentIndexSignature = {
    [MenuSection.Stats]: StatsSection,
    [MenuSection.Settings]: SettingsSection,
    [MenuSection.Rules]: RulesSection,
    [MenuSection.About]: AboutSection,
    [MenuSection.Contacts]: ContactsSection,
};

export interface LobbyPageState {
    currentSection?: MenuSection;
}

export class LobbyPage extends React.PureComponent<{}, LobbyPageState> {
    public state: LobbyPageState = {
        currentSection: undefined,
    };

    public render () {
        const rightColumn: MenuButtonProps[] = [
            {
                value: MenuSection.Stats,
                onClick: () => this.setState({ currentSection: MenuSection.Stats }),
            },
            {
                value: MenuSection.Settings,
                onClick: () => this.setState({ currentSection: MenuSection.Settings }),
            },
            {
                value: MenuSection.Rules,
                onClick: () => this.setState({ currentSection: MenuSection.Rules }),
            },
            {
                value: MenuSection.About,
                onClick: () => this.setState({ currentSection: MenuSection.About }),
            },
        ];

        return (
            <div className="lobby">
                <div className="lobby-wrapper">
                    <div className="lobby-content-box"></div>

                    <div className="lobby-content-box">
                        <MainMenu rightColumn={rightColumn} />
                    </div>

                    <div className="lobby-content-box">
                        {this.getSectionComponent()}
                    </div>
                </div>
            </div>
        );
    }

    private getSectionComponent = () => {
        if (!this.state.currentSection) {
            return null;
        }
        const Component = mapMenuSectionToComponent[this.state.currentSection];
        const crossOnClick = () => this.setState({ currentSection: undefined });
        const hasSubSection = [
            MenuSection.About,
            MenuSection.Contacts
        ].includes(this.state.currentSection);

        const arrowOnClick = !hasSubSection
            ? () => undefined
            : () => {
                switch(this.state.currentSection) {
                    case MenuSection.About:
                        this.setState({ currentSection: MenuSection.Contacts });
                        break;
                    case MenuSection.Contacts:
                        this.setState({ currentSection: MenuSection.About });
                        break;
                    default:
                        break;
                }
            }
        ;

        return (
            <Component
                crossOnClick={crossOnClick}
                arrowOnClick={arrowOnClick}
            />
        );
    }
}
