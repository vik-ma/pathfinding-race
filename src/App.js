import "./App.css";
import React, { useState } from "react";
import { SettingsMenu } from "./PathfindingVisualizer/SettingsMenu";
import { AppContext } from "./Helpers/AppContext";
import { TitleBar } from "./PathfindingVisualizer/TitleBar";
import { SliderWindow } from "./InfoSliders/SliderWindow";

function App() {
  const [isGridRendered, setIsGridRendered] = useState(true);
  const [isSettingsRendered, setIsSettingsRendered] = useState(false);
  const [isInfoRendered, setIsInfoRendered] = useState(false);

  const SLIDER_ROW_DEFAULT_VALUE = 18;
  const SLIDER_COL_DEFAULT_VALUE = 25;
  const [rowCount, setRowCount] = useState(SLIDER_ROW_DEFAULT_VALUE);
  const [colCount, setColCount] = useState(SLIDER_COL_DEFAULT_VALUE);

  const SLIDER_NUMNODES_DEFAULT_VALUE = 4;
  const [numStartNodes, setNumStartNodes] = useState(
    SLIDER_NUMNODES_DEFAULT_VALUE
  );

  const SLIDER_WALL_DENSITY_DEFAULT_VALUE = 0.25;
  const [wallDensityValue, setWallDensityValue] = useState(
    SLIDER_WALL_DENSITY_DEFAULT_VALUE
  );

  const ALLOW_DIAGONAL_DEFAULT_VALUE = false;
  const [allowDiagonal, setAllowDiagonal] = useState(
    ALLOW_DIAGONAL_DEFAULT_VALUE
  );

  const VIS_SPEED_DEFAULT_VALUE = 50;
  const [visualizerSpeed, setVisualizerSpeed] = useState(
    VIS_SPEED_DEFAULT_VALUE
  );

  const [winnerAlgo, setWinnerAlgo] = useState({});
  const [renderWinnerMsg, setRenderWinnerMsg] = useState(false);
  const [calculatedAlgoMap, setCalculatedAlgoMap] = useState({});

  const [slideIndex, setSlideIndex] = useState(0);

  const algorithmMap = {
    0: "A-Star Search",
    1: "Bidirectional Search",
    2: "Breadth-First Search",
    3: "Depth-First Search",
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
    nodex: "node-x",
  };
  const nodeDivMap = {
    nodestart1: `${styles.node} ${styles.nodevisited1} ${styles.nodestart1} ${styles.titlebarnode}`,
    nodestart2: `${styles.node} ${styles.nodevisited2} ${styles.nodestart2} ${styles.titlebarnode}`,
    nodestart3: `${styles.node} ${styles.nodevisited3} ${styles.nodestart3} ${styles.titlebarnode}`,
    nodestart4: `${styles.node} ${styles.nodevisited4} ${styles.nodestart4} ${styles.titlebarnode}`,
    nodegoal: `${styles.node} ${styles.nodegoal} ${styles.titlebarnode}`,
    nodex: `${styles.node} ${styles.nodex} ${styles.titlebarnode}`,
  };

  const [algoList, setAlgoList] = useState(
    Array.from(
      numStartNodes > 3
        ? { length: 4 }
        : numStartNodes > 2
        ? { length: 3 }
        : { length: 2 },
      () => Math.floor(Math.random() * 6)
    )
  );

  const [disabledAlgos, setDisabledAlgos] = useState([]);

  const [titleKey, setTitleKey] = useState(0);

  const [userChoice, setUserChoice] = useState(0);
  const [userGuessScore, setUserGuessScore] = useState(0);
  const [timesGuessed, setTimesGuessed] = useState(0);

  const [visIsFinished, setVisIsFinished] = useState(false);
  const [visIsOngoing, setVisIsOngoing] = useState(false);

  const generateNewAlgoList = () => {
    const newAlgoList = [];
    for (let i = 0; i < numStartNodes; i++) {
      newAlgoList.push(filterDisabledAlgos());
    }
    setAlgoList(newAlgoList);
  };

  const filterDisabledAlgos = () => {
    let random = Math.floor(Math.random() * 6);
    while (disabledAlgos.includes(random)) {
      random = Math.floor(Math.random() * 6);
    }
    return random;
  };

  const remakeGrid = () => {
    setIsSettingsRendered(false);
    setIsGridRendered(false);
    setWinnerAlgo({});
    setRenderWinnerMsg(false);
    setVisIsFinished(false);
    setUserChoice(0);
    generateNewAlgoList();
    setTitleKey(titleKey + 1);
    setIsGridRendered(true);
  };

  const updateUserScore = () => {
    if (userChoice !== 0) {
      setTimesGuessed(timesGuessed + 1);
      if (userChoice in winnerAlgo) {
        setUserGuessScore(userGuessScore + 1);
      }
    }
  };

  const printWinnerAlgos = (algoMap) => {
    if (algoMap !== null) {
      const winnerDivList = [];
      const winnerNameList = [];
      for (let [key, value] of Object.entries(algoMap)) {
        const keyNum = key;
        var name = algoMap[key];
        switch (keyNum) {
          case "1":
            var divBox = <div className={nodeDivMap["nodestart1"]}>1</div>;
            break;
          case "2":
            var divBox = <div className={nodeDivMap["nodestart2"]}>2</div>;
            break;
          case "3":
            var divBox = <div className={nodeDivMap["nodestart3"]}>3</div>;
            break;
          case "4":
            var divBox = <div className={nodeDivMap["nodestart4"]}>4</div>;
            break;
          default:
            return;
        }
        winnerDivList.push(divBox);
        winnerNameList.push(name);
      }

      switch (winnerDivList.length) {
        case 1:
          var printText = (
            <div>
              WINNING ALGORITHM: {winnerDivList[0]} {winnerNameList[0]}
            </div>
          );
          break;
        case 2:
          var printText = (
            <div>
              TIE: {winnerDivList[0]} {winnerNameList[0]} and {winnerDivList[1]}
              {winnerNameList[1]}
            </div>
          );
          break;
        case 3:
          var printText = (
            <div>
              TIE: {winnerDivList[0]} {winnerNameList[0]}, {winnerDivList[1]}
              {winnerNameList[1]} and {winnerDivList[2]} {winnerNameList[2]}
            </div>
          );
          break;
        case 4:
          var printText = (
            <div>
              TIE: {winnerDivList[0]} {winnerNameList[0]}, {winnerDivList[1]}
              {winnerNameList[1]}, {winnerDivList[2]} {winnerNameList[2]} and{" "}
              {winnerDivList[3]} {winnerNameList[3]}
            </div>
          );
          break;
        default:
          return;
      }
    } else {
      var printText = (
        <div>
          <div className={nodeDivMap["nodex"]}>X</div> No algorithms were able
          to reach the goal node!
        </div>
      );
    }
    return printText;
  };

  return (
    <div className="App">
      <header className="App-header">
        <AppContext.Provider
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
            algorithmMap,
            nodeDivMap,
            winnerAlgo,
            setWinnerAlgo,
            renderWinnerMsg,
            setRenderWinnerMsg,
            userChoice,
            setUserChoice,
            calculatedAlgoMap,
            setCalculatedAlgoMap,
            remakeGrid,
            allowDiagonal,
            setAllowDiagonal,
            disabledAlgos,
            setDisabledAlgos,
            visualizerSpeed,
            setVisualizerSpeed,
            userGuessScore,
            setUserGuessScore,
            timesGuessed,
            setTimesGuessed,
            updateUserScore,
            visIsFinished,
            setVisIsFinished,
            visIsOngoing,
            setVisIsOngoing,
            setIsSettingsRendered,
            isInfoRendered,
            setIsInfoRendered,
            slideIndex,
            setSlideIndex,
          }}
        >
          <div className="appContainer">
            <div className="appBackdrop">
              {isGridRendered ? <TitleBar key={titleKey} /> : null}
              {isSettingsRendered ? <SettingsMenu /> : null}
              {isInfoRendered ? <SliderWindow /> : null}
            </div>
          </div>
        </AppContext.Provider>
      </header>
    </div>
  );
}

export default App;
