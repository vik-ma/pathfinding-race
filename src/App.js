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
          </div>
          {isGridRendered ? <GridGenerator /> : null}
        </GridContext.Provider>
      </header>
    </div>
  );
}

export default App;
