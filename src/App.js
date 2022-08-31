import "./App.css";
import React, { useState } from "react";
import { GridGenerator } from "./PathfindingVisualizer/GridGenerator";
import { GridCustomizer } from "./PathfindingVisualizer/GridCustomizer";
import { GridContext } from "./Helpers/GridContexts";
import { TestComponent } from "./TestComponent";

function App() {
  const [isGridRendered, setIsGridRendered] = useState(false);
  const [renderTest, setRenderTest] = useState(false);

  const SLIDER_DEFAULT_VALUE = 12;
  const [rowCount, setRowCount] = useState(SLIDER_DEFAULT_VALUE);
  const [colCount, setColCount] = useState(SLIDER_DEFAULT_VALUE);

  return (
    <div className="App">
      <header className="App-header">
        <GridContext.Provider
          value={{ rowCount, setRowCount, colCount, setColCount }}
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

            <button
              onClick={() => {
                setRenderTest(true);
              }}
            >
              TEST BUTTON
            </button>
          </div>
          {isGridRendered ? <GridGenerator /> : null}
          {renderTest ? <TestComponent /> : null}
        </GridContext.Provider>
      </header>
    </div>
  );
}

export default App;
