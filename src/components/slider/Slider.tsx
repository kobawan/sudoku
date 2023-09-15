import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import "./slider.scss";

import { toggleCellMode } from "../game-page/ducks/actions";
import { getCellMode } from "../game-page/ducks/selectors";

export const Slider: React.FC = () => {
  const dispatch = useDispatch();
  const cellMode = useSelector(getCellMode);

  return (
    <div className="game-buttons" onClick={() => dispatch(toggleCellMode())}>
      <span>Pencil</span>
      <span>Notes</span>
      <div className={`slider ${cellMode}-slider`} />
    </div>
  );
};
