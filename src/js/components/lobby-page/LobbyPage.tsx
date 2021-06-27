import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import "./lobbyPage.less";

import { MainMenu } from "../main-menu/MainMenu";
import { MenuSection, SharedSectionProps } from "../menu-content/types";
import { SettingsSection } from "../menu-content/SettingsSection";
import { RulesSection } from "../menu-content/RulesSection";
import { ContactsSection } from "../menu-content/ContactsSection";
import { StatsSection } from "../menu-content/StatsSection";
import { AboutSection } from "../menu-content/AboutSection";
import {
  getLobbyIsLoading,
  getLobbyHasError,
  getLobbyMenuSection,
} from "../app/ducks/selectors";
import { setLobbyMenuSection } from "../app/ducks/actions";
import { spinnerSvg } from "../svg/Icons";
import { LoginForm } from "../login-form/LoginForm";
import { isLoginRegistrationFormOpen } from "../login-form/ducks/selectors";

type MapMenuSectionToComponentIndexSignature = {
  [k in MenuSection]: React.ComponentType<SharedSectionProps>;
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

const getSectionComponent = (
  setSection: (section?: MenuSection) => void,
  currentSection?: MenuSection
) => {
  if (!currentSection) {
    return null;
  }

  const Component = mapMenuSectionToComponent[currentSection];
  const setSubSection = () => {
    if (currentSection === MenuSection.About) {
      setSection(MenuSection.Contacts);
      return;
    }
    if (currentSection === MenuSection.Contacts) {
      setSection(MenuSection.About);
      return;
    }
  };

  return (
    <Component
      crossOnClick={() => setSection(undefined)}
      arrowOnClick={setSubSection}
    />
  );
};

export const LobbyPage: React.FC<LobbyPageProps> = ({ hidden }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLobbyIsLoading);
  const hasError = useSelector(getLobbyHasError);
  const currentSection = useSelector(getLobbyMenuSection);
  const isReady = !isLoading && !hasError;
  const setSection = useCallback(
    (section?: MenuSection) => dispatch(setLobbyMenuSection(section)),
    [dispatch, setLobbyMenuSection]
  );
  const isFormOpen = useSelector(isLoginRegistrationFormOpen);

  return (
    <div className={cx("lobby", hidden && "hidden")}>
      <div className="lobby-wrapper">
        <h1 className="menu-logo">Sudokuuu</h1>
        {hasError && (
          <h3>
            An error has occurred :(<br></br>Please refresh the page!
          </h3>
        )}
        {isLoading && !hasError && <div className="loading">{spinnerSvg}</div>}
        {isFormOpen && isReady && <LoginForm />}
        {!isFormOpen && isReady && (
          <>
            <MainMenu />
            {getSectionComponent(setSection, currentSection)}
          </>
        )}
        <a
          href="https://github.com/kobawan"
          target="_blank"
          rel="noopener noreferrer"
          className={"copyright"}
        >
          @kobawan
        </a>
      </div>
    </div>
  );
};
