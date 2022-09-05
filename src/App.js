import "./App.css";
import React, { useState } from "react";
import { GridGenerator } from "./PathfindingVisualizer/GridGenerator";
import { GridCustomizer } from "./PathfindingVisualizer/GridCustomizer";
import { GridContext } from "./Helpers/GridContexts";
import { TitleBar } from "./PathfindingVisualizer/TitleBar";
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

  const algorithmMap = {
    0: "A-Star Search",
    1: "Bidirectional Search",
    2: "Breadth First Search",
    3: "Depth First Search",
    4: "Dijkstra's Algorithm",
    5: "Greedy Best-First Search",
  };
  const styles = {
    node: "node",
    nodevisited1: "node-visited-1",
    nodevisited2: "node-visited-2",
    nodevisited3: "node-visited-3",
    nodevisited4: "node-visited-4",
    nodestart1: "node-start-1",
    nodestart2: "node-start-2",
    nodestart3: "node-start-3",
    nodestart4: "node-start-4",
    nodegoal: "node-goal",
    titlebarnode: "titleBarNode",
    nodex: "node-x"
  };

  const [algoList, setAlgoList] = useState([
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
    Math.floor(Math.random() * 6),
  ]);

  const [gridKey, setGridKey] = useState(0);
  const [titleKey, setTitleKey] = useState(1000);

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
    setTitleKey(titleKey + 1);
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
            styles,
            algorithmMap
          }}
        >
          {isGridRendered ? <TitleBar key={titleKey} /> : null}
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
