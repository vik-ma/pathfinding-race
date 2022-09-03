import "./App.css";
import React, { useState } from "react";
import { GridGenerator } from "./PathfindingVisualizer/GridGenerator";
import { GridCustomizer } from "./PathfindingVisualizer/GridCustomizer";
import { GridContext } from "./Helpers/GridContexts";
import { TestComponent } from "./TestComponent";

function App() {
  const [isGridRendered, setIsGridRendered] = useState(true);
  const [renderTest, setRenderTest] = useState(false);

  const SLIDER_DEFAULT_VALUE = 12;
  const [rowCount, setRowCount] = useState(SLIDER_DEFAULT_VALUE);
  const [colCount, setColCount] = useState(SLIDER_DEFAULT_VALUE);

  // const [randRow1, setRandRow1] = useState(Math.floor(Math.random() * rowCount));
  // const [randRow2, setRandRow2] = useState(Math.floor(Math.random() * rowCount));
  // const [randRow3, setRandRow3] = useState(Math.floor(Math.random() * rowCount));
  // const [randRow4, setRandRow4] = useState(Math.floor(Math.random() * rowCount));
  // const [randRow5, setRandRow5] = useState(Math.floor(Math.random() * rowCount));

  // const [randCol1, setRandCol1] = useState(Math.floor(Math.random() * colCount));
  // const [randCol2, setRandCol2] = useState(Math.floor(Math.random() * colCount));
  // const [randCol3, setRandCol3] = useState(Math.floor(Math.random() * colCount));
  // const [randCol4, setRandCol4] = useState(Math.floor(Math.random() * colCount));
  // const [randCol5, setRandCol5] = useState(Math.floor(Math.random() * colCount));

  const [gridKey, setGridKey] = useState(0);

  const remakeGrid = () => {
    setIsGridRendered(false);
    setGridKey(gridKey + 1);
    setIsGridRendered(true);
    // setRandRow1(Math.floor(Math.random() * rowCount));
    // setRandRow2(Math.floor(Math.random() * rowCount));
    // setRandRow3(Math.floor(Math.random() * rowCount));
    // setRandRow4(Math.floor(Math.random() * rowCount));
    // setRandRow5(Math.floor(Math.random() * rowCount));
    // setRandCol1(Math.floor(Math.random() * colCount));
    // setRandCol2(Math.floor(Math.random() * colCount));
    // setRandCol3(Math.floor(Math.random() * colCount));
    // setRandCol4(Math.floor(Math.random() * colCount));
    // setRandCol5(Math.floor(Math.random() * colCount));
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
            // randRow1,
            // randRow2,
            // randRow3,
            // randRow4,
            // randRow5,
            // randCol1,
            // randCol2,
            // randCol3,
            // randCol4,
            // randCol5,
          }}
        >
          <GridCustomizer />
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
          {isGridRendered ? <GridGenerator key={gridKey} /> : null}
          {renderTest ? <TestComponent /> : null}
        </GridContext.Provider>
      </header>
    </div>
  );
}

export default App;
