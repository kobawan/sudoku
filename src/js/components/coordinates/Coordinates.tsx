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
                <td>A</td>
                <td>B</td>
                <td>C</td>
                <td>D</td>
                <td>E</td>
                <td>F</td>
                <td>G</td>
                <td>H</td>
                <td>I</td>
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
            <tr><td>1</td></tr><tr><td>2</td></tr><tr><td>3</td></tr>
            <tr><td>4</td></tr><tr><td>5</td></tr><tr><td>6</td></tr>
            <tr><td>7</td></tr><tr><td>8</td></tr><tr><td>9</td></tr>
        </tbody>
    </table>
);
