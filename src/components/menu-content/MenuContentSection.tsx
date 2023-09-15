import * as React from "react";
import cx from "classnames";

import "./menuContentSection.scss";

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

export class MenuContentSection extends React.PureComponent<MenuContentSectionProps> {
  public render() {
    return (
      <div className="section">
        <button
          className="cross"
          onClick={this.props.crossOnClick}
          tabIndex={0}
        >
          {crossSvg}
        </button>
        <div className="header">
          <h2>{this.props.title}</h2>
        </div>
        <div className="scrollable">{this.props.content}</div>
        {this.props.withFooter && (
          <div className="footer">
            <button
              className={cx(
                "arrow",
                this.props.arrow === ArrowDirection.Left && "left"
              )}
              onClick={this.props.arrowOnClick}
              tabIndex={0}
            >
              {arrowSvg}
            </button>
          </div>
        )}
      </div>
    );
  }
}
