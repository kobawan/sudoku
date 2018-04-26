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
import { GameConfig, GameDifficulty } from "../../consts";

type MapMenuSectionToComponentIndexSignature = {
    [k in keyof typeof MenuSection]:
        ({ crossOnClick, arrowOnClick }: SharedSectionProps) => JSX.Element
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

export interface LobbyPageProps {
    hasCurrentGame: boolean;
    generateGame: (props: GameConfig) => void;
    returnToGame: () => void;
}

export class LobbyPage extends React.PureComponent<LobbyPageProps, LobbyPageState> {
    public state: LobbyPageState = {
        currentSection: undefined,
    };

    public render () {
        const menuSectionButtons = [
            MenuSection.Stats,
            MenuSection.Settings,
            MenuSection.Rules,
            MenuSection.About,
        ];

        const leftColumn: MenuButtonProps[] = [
            {
                value: "Resume",
                disabled: !this.props.hasCurrentGame,
                onClick: this.props.hasCurrentGame ? this.props.returnToGame : () => {},
            },
            {
                value: "Easy",
                onClick: () => this.props.generateGame({ difficulty: GameDifficulty.Easy }),
            },
            {
                value: "Medium",
                onClick: () => this.props.generateGame({ difficulty: GameDifficulty.Medium }),
            },
            {
                value: "Hard",
                onClick: () => this.props.generateGame({ difficulty: GameDifficulty.Hard }),
            },
        ];

        const rightColumn: MenuButtonProps[] = menuSectionButtons.map((section: MenuSection) => ({
            value: section,
            onClick: () => this.setState({ currentSection: section }),
        }));

        return (
            <div className="lobby">
                <div className="lobby-wrapper">
                    <div className="lobby-content-box"></div>

                    <div className="lobby-content-box">
                        <MainMenu rightColumn={rightColumn} leftColumn={leftColumn} />
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
            MenuSection.Contacts,
        ].includes(this.state.currentSection);

        const arrowOnClick = !hasSubSection
            ? () => undefined
            : () => {
                switch (this.state.currentSection) {
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
