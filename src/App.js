import "./App.css";
import React, { useState, useContext } from "react";
import { GridGenerator } from "./PathfindingVisualizer/GridGenerator";
import { GridCustomizer } from "./PathfindingVisualizer/GridCustomizer";
import { GridContext } from "./Helpers/GridContexts";
import { TestComponent } from "./TestComponent";

function App() {
  const [isGridRendered, setIsGridRendered] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <GridContext.Provider value={{ isGridRendered, setIsGridRendered }}>
          <GridCustomizer></GridCustomizer>
          <div className="buttonContainer">
            <button
              // onClick={() => {
              //   setIsGridRendered(true);
              // }}
              onClick={() => {
                isGridRendered
                  ? setIsGridRendered(false)
                  : setIsGridRendered(true);
              }}
            >
              Create Grid
            </button>
          </div>
          {isGridRendered ? <GridGenerator /> : <TestComponent />}
        </GridContext.Provider>
      </header>
    </div>
  );
}

export default App;
