import * as React from "react";

import { MenuContentSection } from "./MenuContentSection";
import { SharedSectionProps, MenuSection } from "./types";

export class StatsSection extends React.PureComponent<SharedSectionProps> {
  public render() {
    return (
      <MenuContentSection
        title={MenuSection.Stats}
        content={<p>TBD</p>}
        crossOnClick={this.props.crossOnClick}
        arrowOnClick={this.props.arrowOnClick}
      />
    );
  }
}
