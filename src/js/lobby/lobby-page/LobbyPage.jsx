import * as React from "react";

import { MainMenu } from "../../components/main-menu/MainMenu.jsx";
import {
    StatsSection,
    SettingsSection,
    RulesSection,
    AboutSection,
    ContactsSection,
    MenuSection,
} from "../../components/menu-content/Sections.jsx";

import "./lobbyPage.less";

const mapMenuSectionToComponent = {
    [MenuSection.Stats]: StatsSection,
    [MenuSection.Settings]: SettingsSection,
    [MenuSection.Rules]: RulesSection,
    [MenuSection.About]: AboutSection,
    [MenuSection.Contacts]: ContactsSection,
};

export class LobbyPage extends React.Component {
    constructor (props) {
        super(props);
        this.getSectionComponent = this.getSectionComponent.bind(this);
        this.state = {
            currentSection: undefined,
        };
    }

    render () {
        const rightColumn = [
            {
                value: "Stats",
                onClick: () => this.setState({ currentSection: MenuSection.Stats }),
            },
            {
                value: "Settings",
                onClick: () => this.setState({ currentSection: MenuSection.Settings }),
            },
            {
                value: "Rules",
                onClick: () => this.setState({ currentSection: MenuSection.Rules }),
            },
            {
                value: "About",
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
                        {this.state.currentSection && this.getSectionComponent()}
                    </div>
                </div>
            </div>
        );
    }

    getSectionComponent () {
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
