import React, { useState } from "react";

export const GridCustomizer = () => {
  const SLIDER_DEFAULT_VALUE = 20;
  const [rowCount, setRowCount] = useState(SLIDER_DEFAULT_VALUE);
  const [colCount, setColCount] = useState(SLIDER_DEFAULT_VALUE);

  return (
    <div>
      <div className="sliderContainer">
        <input
          type="range"
          min="10"
          max="30"
          name="row"
          defaultValue="SLIDER_DEFAULT_VALUE"
          onChange={(e) => setRowCount(e.target.value)}
        ></input>
        Set Row Count: {rowCount}</div>
        <div className="sliderContainer">
        <input
          type="range"
          min="10"
          max="30"
          name="col"
          defaultValue="SLIDER_DEFAULT_VALUE"
          onChange={(e) => setColCount(e.target.value)}
        ></input>
        Set Column Count: {colCount}
        <br />
        </div>
        
      <div className="buttonContainer"><button>Create Grid</button></div>
    </div>
  );
};
