import React, { useState } from "react";

export const GridGenerator = () => {
  const SLIDER_DEFAULT_VALUE = 20;
  const [rowCount, setRowCount] = useState(SLIDER_DEFAULT_VALUE);
  const [colCount, setColCount] = useState(SLIDER_DEFAULT_VALUE);

  return (
    <div>
      <div>
        <input
          type="range"
          min="10"
          max="30"
          name="row"
          defaultValue="SLIDER_DEFAULT_VALUE"
          onChange={(e) => setRowCount(e.target.value)}
        ></input>
        Set Row Count: {rowCount}
        <br />
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
        <button>Create Grid</button>
      </div>
      <div></div>
    </div>
  );
};
