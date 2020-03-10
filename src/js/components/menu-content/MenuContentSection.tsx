import * as React from "react";

import "./menuContentSection.less";

import { crossSvg, arrowSvg } from "../svg/Icons";

export enum ArrowDirection {
  Right,
  Left,
}

export interface MenuContentSectionProps {
  title: string;
  content: JSX.Element;
  withFooter?: boolean;
  arrow?: ArrowDirection;
  arrowOnClick?: () => void;
  crossOnClick: () => void;
}

export class MenuContentSection extends React.PureComponent<
  MenuContentSectionProps
> {
  public render() {
    const arrowClassNames = [
      "arrow",
      this.props.arrow === ArrowDirection.Left ? "left" : null,
    ].join(" ");

    return (
      <div className="section">
        <div className="cross" onClick={this.props.crossOnClick}>
          {crossSvg}
        </div>
        <div className="header">
          <h2>{this.props.title}</h2>
        </div>
        <div className="scrollable">{this.props.content}</div>
        {this.props.withFooter && (
          <div className="footer">
            <div className={arrowClassNames} onClick={this.props.arrowOnClick}>
              {arrowSvg}
            </div>
          </div>
        )}
      </div>
    );
  }
}
