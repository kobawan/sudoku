import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import "./lobbyPage.less";

import { MainMenu } from "../main-menu/MainMenu";
import {
  MenuSection,
  SharedSectionProps,
} from "../menu-content/types";
import { SettingsSection } from "../menu-content/SettingsSection";
import { RulesSection } from "../menu-content/RulesSection";
import { ContactsSection } from "../menu-content/ContactsSection";
import { StatsSection } from "../menu-content/StatsSection";
import { AboutSection } from "../menu-content/AboutSection";
import { getLobbyIsLoading, getLobbyHasError, getLobbyMenuSection } from "../app/ducks/selectors";
import { setLobbyMenuSection } from "../app/ducks/actions";

type MapMenuSectionToComponentIndexSignature = {
  [k in MenuSection]: React.ComponentClass<SharedSectionProps>;
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
  hidden: boolean;
}

export const LobbyPage: React.FC<LobbyPageProps> = ({
  hidden,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLobbyIsLoading);
  const hasError = useSelector(getLobbyHasError);
  const currentSection = useSelector(getLobbyMenuSection);

  const getSectionComponent = useCallback(() => {
    if (!currentSection) {
      return null;
    }

    const Component = mapMenuSectionToComponent[currentSection];
    const setSubSection = () => {
      if (currentSection === MenuSection.About) {
        dispatch(setLobbyMenuSection(MenuSection.Contacts));
        return;
      }
      if (currentSection === MenuSection.Contacts) {
        dispatch(setLobbyMenuSection(MenuSection.About));
        return;
      }
    };

    return (
      <Component
        crossOnClick={() => dispatch(setLobbyMenuSection(undefined))}
        arrowOnClick={setSubSection}
      />
    );
  }, [currentSection]);

  return (
    <div className={cx("lobby", hidden && "hidden")}>
      <div className="lobby-wrapper">
        <MainMenu />
        {!isLoading && !hasError && getSectionComponent()}
      </div>
    </div>
  );
};
