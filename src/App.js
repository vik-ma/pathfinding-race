import "./App.css";
import React, { useState } from "react";
import { GridGenerator } from "./PathfindingVisualizer/GridGenerator";
import { GridCustomizer } from "./PathfindingVisualizer/GridCustomizer";
import { GridContext } from "./Helpers/GridContexts";
import { TestComponent } from "./TestComponent";

function App() {
  const [isGridRendered, setIsGridRendered] = useState(true);
  const [renderTest, setRenderTest] = useState(false);

  const SLIDER_ROW_DEFAULT_VALUE = 18;
  const SLIDER_COL_DEFAULT_VALUE = 25;
  const [rowCount, setRowCount] = useState(SLIDER_ROW_DEFAULT_VALUE);
  const [colCount, setColCount] = useState(SLIDER_COL_DEFAULT_VALUE);

  const SLIDER_NUMNODES_DEFAULT_VALUE = 4;
  const [numStartNodes, setNumStartNodes] = useState(
    SLIDER_NUMNODES_DEFAULT_VALUE
  );

  const SLIDER_WALL_DENSITY_DEFAULT_VALUE = 0.4;
  const [wallDensityValue, setWallDensityValue] = useState(
    SLIDER_WALL_DENSITY_DEFAULT_VALUE
  );

  const [algoList, setAlgoList] = useState([
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
  ]);

  const [gridKey, setGridKey] = useState(0);

  const generateNewAlgoList = () => {
    const newAlgoList = [];
    for (let i = 0; i < numStartNodes; i++) {
      newAlgoList.push(Math.floor(Math.random() * 6));
    }
    setAlgoList(newAlgoList);
  };

  const remakeGrid = () => {
    setIsGridRendered(false);
    generateNewAlgoList();
    setGridKey(gridKey + 1);
    setIsGridRendered(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <GridContext.Provider
          value={{
            rowCount,
            setRowCount,
            colCount,
            setColCount,
            numStartNodes,
            setNumStartNodes,
            wallDensityValue,
            setWallDensityValue,
            algoList,
            setAlgoList,
          }}
        >
          {" "}
          {isGridRendered ? <GridGenerator key={gridKey} /> : null}
          <div className="buttonContainer">
            <button
              onClick={() => {
                setIsGridRendered(true);
              }}
            >
              Create Grid
            </button>
            <button
              onClick={() => {
                setIsGridRendered(false);
              }}
            >
              Destroy Grid
            </button>
            <button onClick={remakeGrid}>Remake Grid</button>
            <button
              onClick={() => {
                setRenderTest(true);
              }}
            >
              TEST BUTTON
            </button>
          </div>
          <GridCustomizer />
          {renderTest ? <TestComponent /> : null}
        </GridContext.Provider>
      </header>
    </div>
  );
}

export default App;
