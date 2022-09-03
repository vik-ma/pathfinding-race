import React, { useContext } from "react";
import { GridContext } from "../Helpers/GridContexts";

export const GridCustomizer = () => {
  const { rowCount, setRowCount, colCount, setColCount } =
    useContext(GridContext);

  return (
    <div>
      <div className="sliderContainer">
        <input
          type="range"
          min="10"
          max="26"
          name="row"
          defaultValue="SLIDER_DEFAULT_VALUE"
          onChange={(e) => setRowCount(e.target.value)}
        ></input>
        Set Row Count: {rowCount}
      </div>
      <div className="sliderContainer">
        <input
          type="range"
          min="10"
          max="40"
          name="col"
          defaultValue="SLIDER_DEFAULT_VALUE"
          onChange={(e) => setColCount(e.target.value)}
        ></input>
        Set Column Count: {colCount}
        <br />
      </div>
    </div>
  );
};
