import "./App.css";
//import React, { useState } from "react";
import { GridGenerator } from "./PathfindingVisualizer/GridGenerator";
import { GridCustomizer } from "./PathfindingVisualizer/GridCustomizer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GridCustomizer></GridCustomizer>
        <GridGenerator></GridGenerator>
      </header>
    </div>
  );
}

export default App;
