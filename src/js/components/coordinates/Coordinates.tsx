import * as React from "react";

import "./coordinates.less";

export const CoordinateTableX = ({ hidden }: { hidden: boolean }) => (
    <table
        className={[
            "coorX",
            hidden ? "hidden" : null,
        ].join(" ")}
    >
        <tbody>
            <tr>
                <td><span>A</span></td>
                <td><span>B</span></td>
                <td><span>C</span></td>
                <td><span>D</span></td>
                <td><span>E</span></td>
                <td><span>F</span></td>
                <td><span>G</span></td>
                <td><span>H</span></td>
                <td><span>I</span></td>
            </tr>
        </tbody>
    </table>
);

export const CoordinateTableY = ({ hidden }: { hidden: boolean }) => (
    <table
        className={[
            "coorY",
            hidden ? "hidden" : null,
        ].join(" ")}
    >
        <tbody>
            <tr><td><span>1</span></td></tr>
            <tr><td><span>2</span></td></tr>
            <tr><td><span>3</span></td></tr>
            <tr><td><span>4</span></td></tr>
            <tr><td><span>5</span></td></tr>
            <tr><td><span>6</span></td></tr>
            <tr><td><span>7</span></td></tr>
            <tr><td><span>8</span></td></tr>
            <tr><td><span>9</span></td></tr>
        </tbody>
    </table>
);
