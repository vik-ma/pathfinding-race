import React, { useContext } from "react";
import { GridContext } from "../Helpers/GridContexts";

export const GridCustomizer = () => {
  const {
    rowCount,
    setRowCount,
    colCount,
    setColCount,
    numStartNodes,
    setNumStartNodes,
    wallDensityValue,
    setWallDensityValue,
  } = useContext(GridContext);

  const defaultRowValue = rowCount;
  const defaultColValue = colCount;
  const defaultNumNodes = numStartNodes;
  const defaultWallDensity = wallDensityValue;

  const wallDensityMap = { 1: 0.15, 2: 0.25, 3: 0.4 };

  return (
    <div>
      <div className="sliderContainer">
        <div className="sliderElement">
          <input
            type="range"
            min="10"
            max="26"
            name="row"
            defaultValue={defaultRowValue}
            onChange={(e) => setRowCount(e.target.value)}
          ></input>
          <br />
          Set Row Count: {rowCount}
        </div>
        <div className="sliderElement">
          <input
            type="range"
            min="10"
            max="40"
            name="col"
            defaultValue={defaultColValue}
            onChange={(e) => setColCount(e.target.value)}
          ></input>
          <br />
          Set Column Count: {colCount}
        </div>
        <br />
        <div className="sliderElement">
          <input
            type="range"
            min="1"
            max="3"
            name="wallDensity"
            defaultValue={defaultWallDensity}
            onChange={(e) =>
              setWallDensityValue(wallDensityMap[e.target.value])
            }
          ></input>
          <br />
          Set Wall Density: {wallDensityValue}
        </div>
        {/* <div className="sliderElement">
          <input
            type="range"
            min="2"
            max="4"
            name="numNodes"
            defaultValue={defaultNumNodes}
            onChangeCapture={(e) => setNodeSlider(e.target.value)}
          ></input>
          <br />
          Set Number of Nodes: {numStartNodes}
        </div> */}
      </div>
    </div>
  );
};
