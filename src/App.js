import "./App.css";
import React, { useState } from "react";
import { SettingsMenu } from "./PathfindingVisualizer/SettingsMenu";
import { AppContext } from "./Helpers/AppContext";
import { GameMenu } from "./PathfindingVisualizer/GameMenu";
import { InfoSlider } from "./InfoWindow/InfoSlider";

function App() {
  const SLIDER_ROW_DEFAULT_VALUE = 18;
  const SLIDER_COL_DEFAULT_VALUE = 25;
  const SLIDER_NUMNODES_DEFAULT_VALUE = 4;
  const SLIDER_WALL_DENSITY_DEFAULT_VALUE = 0.25;
  const ALLOW_DIAGONAL_DEFAULT_VALUE = false;
  const VIS_SPEED_DEFAULT_VALUE = 50;

  //Values changeable in Settings Menu
  const [rowCount, setRowCount] = useState(SLIDER_ROW_DEFAULT_VALUE);
  const [colCount, setColCount] = useState(SLIDER_COL_DEFAULT_VALUE);
  const [numStartNodes, setNumStartNodes] = useState(
    SLIDER_NUMNODES_DEFAULT_VALUE
  );
  const [wallDensityValue, setWallDensityValue] = useState(
    SLIDER_WALL_DENSITY_DEFAULT_VALUE
  );
  const [allowDiagonal, setAllowDiagonal] = useState(
    ALLOW_DIAGONAL_DEFAULT_VALUE
  );
  const [visualizerSpeed, setVisualizerSpeed] = useState(
    VIS_SPEED_DEFAULT_VALUE
  );
  //List of user disabled pathfinding algorithms in Settings Menu
  const [disabledAlgos, setDisabledAlgos] = useState([]);

  const [isGridRendered, setIsGridRendered] = useState(true);
  const [isSettingsRendered, setIsSettingsRendered] = useState(false);
  const [isInfoRendered, setIsInfoRendered] = useState(false);

  //Key for GameMenu component
  //Everytime remakeGrid() is called, the old GameMenu component gets deleted
  //and a new one created with a different key
  const [gameKey, setGameKey] = useState(0);

  //Default Information Menu slide
  const [slideIndex, setSlideIndex] = useState(0);

  //HashMap of the calculated paths for the different contending pathfinding algorithms
  const [calculatedAlgoMap, setCalculatedAlgoMap] = useState({});
  //Contending pathfinding algorithm(s) that wins the current game
  const [winnerAlgo, setWinnerAlgo] = useState({});
  //Displays the result of the game in GameMenu when true
  const [renderWinnerMsg, setRenderWinnerMsg] = useState(false);

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
    menunode: "menuNode",
    nodex: "node-x",
  };
  //HashMap of combined CSS classes for specific nodes
  const nodeDivMap = {
    nodestart1: `${styles.node} ${styles.nodevisited1} ${styles.nodestart1} ${styles.menunode}`,
    nodestart2: `${styles.node} ${styles.nodevisited2} ${styles.nodestart2} ${styles.menunode}`,
    nodestart3: `${styles.node} ${styles.nodevisited3} ${styles.nodestart3} ${styles.menunode}`,
    nodestart4: `${styles.node} ${styles.nodevisited4} ${styles.nodestart4} ${styles.menunode}`,
    nodegoal: `${styles.node} ${styles.nodegoal} ${styles.menunode}`,
    nodex: `${styles.node} ${styles.nodex} ${styles.menunode}`,
  };

  //HashMap of implemented pathfinding algorithms
  const algorithmMap = {
    0: "A-Star Search",
    1: "Bidirectional Search",
    2: "Breadth-First Search",
    3: "Depth-First Search",
    4: "Dijkstra's Algorithm",
    5: "Greedy Best-First Search",
  };

  //List of which contending pathfinding algorithms gets assigned which implemented pathfinding algorithms
  //Randomly generated numbers (corresponding to algorithmMap keys)
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

  //Assigns new pathfinding algorithms to contenders
  const generateNewAlgoList = () => {
    const newAlgoList = [];
    for (let i = 0; i < numStartNodes; i++) {
      newAlgoList.push(filterDisabledAlgos());
    }
    setAlgoList(newAlgoList);
  };

  //Generates random numbers corresponding to algorithmMap keys excluding user disabled algorithms
  const filterDisabledAlgos = () => {
    let random = Math.floor(Math.random() * 6);
    while (disabledAlgos.includes(random)) {
      random = Math.floor(Math.random() * 6);
    }
    return random;
  };

  //Contending pathfinding algorithm that user picks to win
  const [userChoice, setUserChoice] = useState(0);

  //Number of correct user picks
  const [userGuessScore, setUserGuessScore] = useState(0);
  //Number of total user picks
  const [timesGuessed, setTimesGuessed] = useState(0);

  //States of pathfinding visualizer
  const [visIsOngoing, setVisIsOngoing] = useState(false);
  const [visIsFinished, setVisIsFinished] = useState(false);

  //Create new map/game
  const remakeGrid = () => {
    setIsSettingsRendered(false);
    setIsGridRendered(false);
    setWinnerAlgo({});
    setRenderWinnerMsg(false);
    setVisIsFinished(false);
    setUserChoice(0);
    generateNewAlgoList();
    setGameKey(gameKey + 1); //Create new GameMenu component with different key from last
    setIsGridRendered(true);
  };

  const updateUserScore = () => {
    if (userChoice !== 0) {
      //If user picked any contender
      setTimesGuessed(timesGuessed + 1);
      if (userChoice in winnerAlgo) {
        //If user picked correct contender
        setUserGuessScore(userGuessScore + 1);
      }
    }
  };

  //Unused function to print out winning contender in a div
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
              {isGridRendered ? <GameMenu key={gameKey} /> : null}
              {isSettingsRendered ? <SettingsMenu /> : null}
              {isInfoRendered ? <InfoSlider /> : null}
            </div>
          </div>
        </AppContext.Provider>
      </header>
    </div>
  );
}

export default App;
