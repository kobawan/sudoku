import * as React from "react";

import "./menuContentSection.less";

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
    public render () {
        /* tslint:disable max-line-length */
        const crossSvg = (
            <svg viewBox="0 0 30 30" className="icon">
                <path d={
                    `m29.082202,23.702671c0,0 0,0 0,0l-8.702823,-8.702823l8.702823,-8.702823c0,0 0,0 0,
                    0c0.093712,-0.093712 0.161606,-0.203681 0.204637,-0.319387c0.118575,-0.318431 0.050681,
                    -0.691368 -0.205594,-0.947643l-4.110915,-4.110915c-0.256275,-0.256275 -0.629212,
                    -0.324168 -0.947643,-0.204637c-0.116662,0.043031 -0.225675,0.110925 -0.320343,0.204637c0,
                    0 0,0 0,0l-8.702823,8.702823l-8.702823,-8.702823c0,0 0,0 0,0c-0.093712,-0.093712 -0.203681,
                    -0.161606 -0.319387,-0.204637c-0.318431,-0.118575 -0.691368,-0.050681 -0.947643,0.204637l-4.110915,
                    4.110915c-0.256275,0.256275 -0.324168,0.629212 -0.205594,0.947643c0.043031,0.116662 0.110925,
                    0.225675 0.204637,0.319387c0,0 0,0 0,0l8.702823,8.702823l-8.702823,8.702823c0,0 0,0 0,0c-0.093712,
                    0.093712 -0.161606,0.203681 -0.204637,0.319387c-0.118575,0.318431 -0.050681,0.691368 0.205594,
                    0.947643l4.110915,4.110915c0.256275,0.256275 0.629212,0.324168 0.947643,0.205594c0.116662,
                    -0.043031 0.225675,-0.110925 0.319387,-0.204637c0,0 0,0 0,0l8.702823,-8.702823l8.702823,8.702823c0,
                    0 0,0 0,0c0.093712,0.093712 0.203681,0.161606 0.319387,0.204637c0.318431,0.118575 0.691368,
                    0.050681 0.947643,-0.205594l4.110915,-4.110915c0.256275,-0.256275 0.324168,-0.629212 0.205594,
                    -0.947643c-0.043031,-0.116662 -0.110925,-0.225675 -0.204637,-0.319387l0.000956,0z`
                }>
                </path>
            </svg>
        );

        const arrowSvg = (
            <svg viewBox="0 0 30 30" className="icon">
                <path d="m29.5315,15l-14.063,-14.063l0,8.438l-15,0l0,11.25l15,0l0,8.438l14.063,-14.063z"></path>
            </svg>
        );
        /* tslint:enable max-line-length */

        const arrowClassNames = [
            "arrow",
            this.props.arrow === ArrowDirection.Left ? "left" : null,
        ].join(" ");

        return (
            <div className="section">
                <div className="header">
                    <h2>{this.props.title}</h2>
                    <div className="cross" onClick={this.props.crossOnClick}>
                        {crossSvg}
                    </div>
                </div>
                <div className="scrollable">
                    {this.props.content}
                </div>
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
