import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Helpers/AppContext";

export const SettingsMenu = () => {
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
    disabledAlgos,
    setDisabledAlgos,
    visualizerSpeed,
    setVisualizerSpeed,
    setIsSettingsRendered,
  } = useContext(AppContext);

  const defaultRowValue = rowCount;
  const defaultColValue = colCount;
  const defaultNumNodes = numStartNodes;
  const defaultWallDensity = wallDensityValue;
  const defaultVisualizerSpeed = visualizerSpeed;

  const wallDensityMap = { 1: 0.15, 2: 0.25, 3: 0.4 };
  const inverseWallDensityMap = { 0.15: 1, 0.25: 2, 0.4: 3 };
  const wordWallDensityMap = { 0.15: "Low", 0.25: "Medium", 0.4: "High" };
  const visualizerSpeedMap = { 1: 150, 2: 100, 3: 50 };
  const inverseVisualizerSpeedMap = { 150: 1, 100: 2, 50: 3 };
  const wordVisualizerSpeedMap = { 150: "Slow", 100: "Medium", 50: "Fast" };

  var backdropDiv = document.querySelector(".appBackdrop");

  const [newChanges, setNewChanges] = useState({});

  const [isChangeMade, setIsChangeMade] = useState(false);

  const [noChangeMade, setNoChangeMade] = useState(true);

  const handleAlgoCheckboxChange = (e, num) => {
    if (!e) {
      //If checkbox gets unchecked
      if (disabledAlgos.length < 5) {
        setDisabledAlgos([...disabledAlgos, num]);
      }
    } else {
      //If checkbox gets checked
      const newArray = disabledAlgos.filter((x) => x !== num);
      setDisabledAlgos(newArray);
    }
    setNoChangeMade(false);
  };

  const applyChanges = () => {
    var minHeight = { rows: 0, nodes: 0 };
    for (let [key, value] of Object.entries(newChanges)) {
      switch (key) {
        case "rows":
          const rowValue = newChanges[key];
          setRowCount(rowValue);
          const numNodes = newChanges["nodes"]
            ? newChanges["nodes"]
            : numStartNodes;
          minHeight["rows"] =
            rowValue * 32 +
            91 +
            numNodes * 40 +
            15 +
            Math.abs(4 - numNodes) * 2;

          var newValue = Math.max(minHeight["rows"], minHeight["nodes"]);
          backdropDiv.style.setProperty("min-height", `${newValue}px`);
          break;
        case "cols":
          const colValue = newChanges[key];
          setColCount(colValue);
          if (colValue < 22) {
            var newValue = "fit-content";
          } else {
            backdropDiv.style.removeProperty("fit-content");
            var newValue = `${
              30 * colValue + 50 + Math.abs(24 - colValue) * 2
            }px`;
          }
          backdropDiv.style.setProperty("min-width", newValue);
          break;
        case "nodes":
          const nodesValue = newChanges[key];
          setNumStartNodes(nodesValue);
          const rows = newChanges["rows"] ? newChanges["rows"] : rowCount;
          minHeight["nodes"] =
            rows * 32 + 95 + nodesValue * 40 + 15 - (nodesValue - 2) * 2;
          var newValue = Math.max(minHeight["rows"], minHeight["nodes"]);
          backdropDiv.style.setProperty("min-height", `${newValue}px`);
          break;
        default:
          break;
      }
    }
    setNewChanges({});
    setIsChangeMade(true);
  };

  useEffect(() => {
    if (isChangeMade) {
      remakeGrid();
    }
  }, [isChangeMade]);

  return (
    <div className="popupBackground">
      <div className="popupBackdrop">
        <div className="settingsContainer">
          <div className="settingsInner">
            <div className="settingsRightSide">
              <h1 className="infoTitle settingsTitle">Settings</h1>
              <div className="settingsElement settingsElementVisual">
                Number of Rows:{" "}
                <div className="settingValue">
                  {newChanges["rows"] ? newChanges["rows"] : rowCount}
                </div>
                <br />
                <input
                  className="settingsSlider"
                  type="range"
                  min="10"
                  max="26"
                  name="row"
                  defaultValue={defaultRowValue}
                  onChange={(e) => {
                    setNoChangeMade(false);
                    setNewChanges({
                      ...newChanges,
                      rows: e.target.valueAsNumber,
                    });
                  }}
                ></input>
              </div>
              <div className="settingsElement settingsElementVisual">
                Number of Columns:{" "}
                <div className="settingValue">
                  {newChanges["cols"] ? newChanges["cols"] : colCount}
                </div>
                <br />
                <input
                  className="settingsSlider"
                  type="range"
                  min="10"
                  max="40"
                  name="col"
                  defaultValue={defaultColValue}
                  onChange={(e) => {
                    setNoChangeMade(false);
                    setNewChanges({
                      ...newChanges,
                      cols: e.target.valueAsNumber,
                    });
                  }}
                ></input>
              </div>
              <div className="settingsElement settingsElementVisual">
                Number of Start Nodes:{" "}
                <div className="settingValue">
                  {newChanges["nodes"] ? newChanges["nodes"] : numStartNodes}
                </div>
                <br />
                <input
                  className="settingsSlider"
                  type="range"
                  min="2"
                  max="4"
                  name="numNodes"
                  defaultValue={defaultNumNodes}
                  onChange={(e) => {
                    setNoChangeMade(false);
                    setNewChanges({
                      ...newChanges,
                      nodes: e.target.valueAsNumber,
                    });
                  }}
                ></input>
              </div>
              <div className="settingsElement settingsElementVisual">
                Wall Density:{" "}
                <div className="settingValue">
                  {wordWallDensityMap[wallDensityValue]}
                </div>
                <br />
                <input
                  className="settingsSlider"
                  type="range"
                  min="1"
                  max="3"
                  name="wallDensity"
                  defaultValue={inverseWallDensityMap[defaultWallDensity]}
                  onChange={(e) => {
                    setNoChangeMade(false);
                    setWallDensityValue(wallDensityMap[e.target.value]);
                  }}
                ></input>
              </div>
              <div className="settingsElement settingsElementVisual">
                Visualizer Speed:{" "}
                <div className="settingValue">
                  {wordVisualizerSpeedMap[visualizerSpeed]}
                </div>
                <br />
                <input
                  className="settingsSlider"
                  type="range"
                  min="1"
                  max="3"
                  name="visSpeed"
                  defaultValue={
                    inverseVisualizerSpeedMap[defaultVisualizerSpeed]
                  }
                  onChange={(e) => {
                    setNoChangeMade(false);
                    setVisualizerSpeed(visualizerSpeedMap[e.target.value]);
                  }}
                ></input>
              </div>
            </div>
            <div className="enableAlgoList">
              <h2 className="infoTitle settingsTitle algoListTitle">
                Enabled Algorithms
              </h2>
              <div className="checkboxItem">
                <input
                  type="checkbox"
                  id="astar"
                  name="astar"
                  checked={!disabledAlgos.includes(0)}
                  value="astar"
                  onChange={(e) =>
                    handleAlgoCheckboxChange(e.target.checked, 0)
                  }
                />{" "}
                <label htmlFor="astar">A-Star Search</label>
              </div>
              <div className="checkboxItem">
                <input
                  type="checkbox"
                  id="bidirectional"
                  name="bidirectional"
                  checked={!disabledAlgos.includes(1)}
                  value="bidirectional"
                  onChange={(e) =>
                    handleAlgoCheckboxChange(e.target.checked, 1)
                  }
                />{" "}
                <label htmlFor="bidirectional">Bidirectional Search</label>
              </div>
              <div className="checkboxItem">
                <input
                  type="checkbox"
                  id="breadth"
                  name="breadth"
                  checked={!disabledAlgos.includes(2)}
                  value="breadth"
                  onChange={(e) =>
                    handleAlgoCheckboxChange(e.target.checked, 2)
                  }
                />{" "}
                <label htmlFor="breadth">Breadth-First Search</label>
              </div>
              <div className="checkboxItem">
                <input
                  type="checkbox"
                  id="depth"
                  name="depth"
                  checked={!disabledAlgos.includes(3)}
                  value="depth"
                  onChange={(e) =>
                    handleAlgoCheckboxChange(e.target.checked, 3)
                  }
                />{" "}
                <label htmlFor="depth">Depth-First Search</label>
              </div>
              <div className="checkboxItem">
                <input
                  type="checkbox"
                  id="dijkstra"
                  name="dijkstra"
                  checked={!disabledAlgos.includes(4)}
                  value="dijkstra"
                  onChange={(e) =>
                    handleAlgoCheckboxChange(e.target.checked, 4)
                  }
                />{" "}
                <label htmlFor="dijkstra">Dijkstra's Algorithm</label>
              </div>
              <div className="checkboxItem">
                <input
                  type="checkbox"
                  id="greedy"
                  name="greedy"
                  checked={!disabledAlgos.includes(5)}
                  value="greedy"
                  onChange={(e) =>
                    handleAlgoCheckboxChange(e.target.checked, 5)
                  }
                />{" "}
                <label htmlFor="greedy">Greedy Best-First Search</label>
              </div>
              <div className="allowDiagonalSetting settingsElementVisual">
                <input
                  type="checkbox"
                  id="allowDiagonals"
                  name="allowDiagonals"
                  checked={allowDiagonal}
                  value="allowDiagonal"
                  onChange={() => {
                    setNoChangeMade(false);
                    setAllowDiagonal(!allowDiagonal);
                  }}
                />{" "}
                <label htmlFor="allowDiagonals">Allow Diagonal Movement</label>
              </div>
              <div className="settingsDoneButtonDiv">
                <button
                  className="settingsButton"
                  onClick={() => {
                    noChangeMade
                      ? setIsSettingsRendered(false)
                      : applyChanges();
                  }}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
