import * as React from "react";

import { MenuContentSection, ArrowDirection } from "./MenuContentSection";
import { SharedSectionProps, MenuSection } from "./types";

export class ContactsSection extends React.PureComponent<SharedSectionProps> {
  public render() {
    return (
      <MenuContentSection
        title={MenuSection.Contacts}
        withFooter={true}
        arrow={ArrowDirection.Left}
        content={
          <React.Fragment>
            <p>
              <strong>Developer:</strong> Sara Nordmyr da Cunha{" "}
              <a
                href="https://github.com/kobawan"
                target="_blank"
                rel="noopener noreferrer"
              >
                @kobawan
              </a>
            </p>
            <p>
              <strong>Bug reporting: </strong>
              <a
                href="https://github.com/kobawan/sudoku/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://github.com/kobawan/sudoku/issues
              </a>
            </p>
          </React.Fragment>
        }
        crossOnClick={this.props.crossOnClick}
        arrowOnClick={this.props.arrowOnClick}
      />
    );
  }
}
