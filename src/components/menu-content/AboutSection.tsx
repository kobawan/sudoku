import * as React from "react";

import { MenuContentSection } from "./MenuContentSection";
import { SharedSectionProps, MenuSection } from "./types";

export class AboutSection extends React.PureComponent<SharedSectionProps> {
  public render() {
    const paragraph1 =
      "Hi! My name is Sara (Kobawan on github). I've always been a fan of puzzles, " +
      "so when I started programming, I came up with the idea to combine my two joys of " +
      "puzzles and programming, to create this website.";
    const paragraph2 =
      "It's been a fun project to create. Sometimes challenging and time-consuming, " +
      "but in the end, a very good opportunity to learn programming.";
    const paragraph3 =
      "Along with creating more projects than I can handle, I also knit, play with my " +
      "dogs, and binge watch netflix.";
    return (
      <MenuContentSection
        title={MenuSection.About}
        withFooter={true}
        content={
          <React.Fragment>
            <p>{paragraph1}</p>
            <p>{paragraph2}</p>
            <p>{paragraph3}</p>
            <p>I hope you enjoy!</p>
          </React.Fragment>
        }
        crossOnClick={this.props.crossOnClick}
        arrowOnClick={this.props.arrowOnClick}
      />
    );
  }
}
