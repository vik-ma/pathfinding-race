import "./App.css";
import React, { useState } from "react";
import { GridGenerator } from "./PathfindingVisualizer/GridGenerator";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GridGenerator></GridGenerator>
      </header>
    </div>
  );
}

export default App;
