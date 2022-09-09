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
    remakeGrid,
    allowDiagonal,
    setAllowDiagonal,
  } = useContext(GridContext);

  const defaultRowValue = rowCount;
  const defaultColValue = colCount;
  const defaultNumNodes = numStartNodes;
  const defaultWallDensity = wallDensityValue;

  const wallDensityMap = { 1: 0.15, 2: 0.25, 3: 0.4 };
  const inverseWallDensityMap = { 0.15: 1, 0.25: 2, 0.4: 3 };

  return (
    <div>
      <h1>SETTINGS</h1>
      <div className="sliderContainer">
        <div className="sliderElement">
          Row Count: {rowCount}
          <br />
          <input
            type="range"
            min="10"
            max="26"
            name="row"
            defaultValue={defaultRowValue}
            onChange={(e) => setRowCount(e.target.valueAsNumber)}
          ></input>
        </div>
        <div className="sliderElement">
          Column Count: {colCount}
          <br />
          <input
            type="range"
            min="10"
            max="40"
            name="col"
            defaultValue={defaultColValue}
            onChange={(e) => setColCount(e.target.valueAsNumber)}
          ></input>
        </div>

        <div className="sliderElement">
          Wall Density: {wallDensityValue}
          <br />
          <input
            type="range"
            min="1"
            max="3"
            name="wallDensity"
            defaultValue={inverseWallDensityMap[defaultWallDensity]}
            onChange={(e) =>
              setWallDensityValue(wallDensityMap[e.target.value])
            }
          ></input>
        </div>
        <div className="sliderElement">
          Number of Start Nodes: {numStartNodes}
          <br />
          <input
            type="range"
            min="2"
            max="4"
            name="numNodes"
            defaultValue={defaultNumNodes}
            onChange={(e) => setNumStartNodes(e.target.valueAsNumber)}
          ></input>
        </div>
        <div className="sliderElement">
          <input
            type="checkbox"
            id="allowDiagonals"
            name="allowDiagonals"
            checked={allowDiagonal}
            value="allowDiagonal"
            onChange={() => setAllowDiagonal(!allowDiagonal)}
          />
          <label htmlFor="allowDiagonals">Allow Diagonal Movement</label>
        </div>
      </div>
      <button onClick={() => remakeGrid()}>RETURN</button>
    </div>
  );
};
