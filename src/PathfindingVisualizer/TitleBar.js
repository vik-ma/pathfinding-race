import React, { useState, useEffect, useContext, useRef } from "react";
import { GridContext } from "../Helpers/GridContexts";
import { GridGenerator } from "./GridGenerator";

export const TitleBar = () => {
  const {
    algoList,
    algorithmMap,
    numStartNodes,
    nodeDivMap,
    setUserChoice,
    renderWinnerMsg,
    calculatedAlgoMap,
    winnerAlgo,
    remakeGrid,
    switchToSettingsMenu,
    timesGuessed,
    userGuessScore,
    updateUserScore,
    visIsFinished,
    visIsOngoing
  } = useContext(GridContext);

  const generatorRef = useRef();

  const [selectedDiv, setSelectedDiv] = useState("");

  useEffect(() => {
    updateUserScore();
  }, [visIsFinished]);

  return (
    <div>
      <div className="titleBarContainer">
        <div className="title">
          WHICH ALGORITHM WILL REACH THE GOAL NODE{" "}</div>{" "}
          <div className={nodeDivMap["nodegoal"]}>G</div>{" "}<div className="title"> FIRST?
        </div>
        <div>
          <div
            className={`titleBarChoices ${
              selectedDiv === "algoChoice1" ? " selectedChoice" : undefined
            } ${renderWinnerMsg && winnerAlgo[1] ? "winnerAlgo" : ""}`}
            onClick={() => {
              if (!visIsOngoing && !visIsFinished) {
                setSelectedDiv("algoChoice1");
                setUserChoice(1);
                generatorRef.current.visualize();
              }
            }}
            id="algoChoice1"
          >
            <div className={nodeDivMap["nodestart1"]}>1</div>{" "}
            {algorithmMap[algoList[0]]}
          </div>
          <div className="algoPathMsg">
            {renderWinnerMsg
              ? calculatedAlgoMap[1].pathIsFound
                ? `Found the goal node after visiting ${
                    calculatedAlgoMap[1].path.length - 1
                  } nodes!`
                : "Could not find the goal node!"
              : null}
          </div>
        </div>
        <div>
          <div
            className={`titleBarChoices ${
              selectedDiv === "algoChoice2" ? " selectedChoice" : undefined
            } ${renderWinnerMsg && winnerAlgo[2] ? "winnerAlgo" : ""}`}
            onClick={() => {
              if (!visIsOngoing && !visIsFinished) {
                setSelectedDiv("algoChoice2");
                setUserChoice(2);
                generatorRef.current.visualize();
              }
            }}
            id="algoChoice2"
          >
            <div className={nodeDivMap["nodestart2"]}>2</div>{" "}
            {algorithmMap[algoList[1]]}
          </div>
          <div className="algoPathMsg">
            {renderWinnerMsg
              ? calculatedAlgoMap[2].pathIsFound
                ? `Found the goal node after visiting ${
                    calculatedAlgoMap[2].path.length - 1
                  } nodes!`
                : "Could not find the goal node!"
              : null}
          </div>
        </div>
        {numStartNodes > 2 ? (
          <div>
            <div
              className={`titleBarChoices ${
                selectedDiv === "algoChoice3" ? " selectedChoice" : undefined
              } ${renderWinnerMsg && winnerAlgo[3] ? "winnerAlgo" : ""}`}
              onClick={() => {
                if (!visIsOngoing && !visIsFinished) {
                  setSelectedDiv("algoChoice3");
                  setUserChoice(3);
                  generatorRef.current.visualize();
                }
              }}
              id="algoChoice3"
            >
              <div className={nodeDivMap["nodestart3"]}>3</div>{" "}
              {algorithmMap[algoList[2]]}
            </div>
            <div className="algoPathMsg">
              {renderWinnerMsg && calculatedAlgoMap[3]
                ? calculatedAlgoMap[3].pathIsFound
                  ? `Found the goal node after visiting ${
                      calculatedAlgoMap[3].path.length - 1
                    } nodes!`
                  : "Could not find the goal node!"
                : null}
            </div>
          </div>
        ) : null}
        {numStartNodes > 3 ? (
          <div>
            <div
              className={`titleBarChoices ${
                selectedDiv === "algoChoice4" ? " selectedChoice" : undefined
              } ${renderWinnerMsg && winnerAlgo[4] ? "winnerAlgo" : ""}`}
              onClick={() => {
                if (!visIsOngoing && !visIsFinished) {
                  setSelectedDiv("algoChoice4");
                  setUserChoice(4);
                  generatorRef.current.visualize();
                }
              }}
              id="algoChoice4"
            >
              <div className={nodeDivMap["nodestart4"]}>4</div>{" "}
              {algorithmMap[algoList[3]]}
            </div>
            <div className="algoPathMsg">
              {renderWinnerMsg && calculatedAlgoMap[4]
                ? calculatedAlgoMap[4].pathIsFound
                  ? `Found the goal node after visiting ${
                      calculatedAlgoMap[4].path.length - 1
                    } nodes!`
                  : "Could not find the goal node!"
                : null}
            </div>
          </div>
        ) : null}
        <div>
          <div
            className={`titleBarChoices ${
              selectedDiv === "algoChoice0" ? " selectedChoice" : undefined
            } ${renderWinnerMsg && winnerAlgo[5] ? "winnerAlgo" : ""}`}
            onClick={() => {
              if (!visIsOngoing && !visIsFinished) {
                setSelectedDiv("algoChoice0");
                setUserChoice(5);
                generatorRef.current.visualize();
              }
            }}
            id="algoChoice5"
          >
            <div className={nodeDivMap["nodex"]}>X</div> No Path Will Be Found!
          </div>
          <div className="algoPathMsg">
            {renderWinnerMsg && winnerAlgo[5]
              ? "No algorithms were able to find the goal node!"
              : null}
          </div>
        </div>
      </div>
      <button className="titleBarButton justVisualizeButton" onClick={() => !visIsOngoing && !visIsFinished && generatorRef.current.visualize()}>
        Just Visualize
      </button>{" "}
      <button className="titleBarButton newMapButton" onClick={() => remakeGrid()}>New Map</button>{" "}
      <button className="titleBarButton settingsMenuButton" onClick={() => switchToSettingsMenu()}>Settings</button>{" "}
      <div className="scoreDiv">{timesGuessed > 0 ? `Score: ${userGuessScore} / ${timesGuessed}` : null}</div>
      <GridGenerator ref={generatorRef} />
    </div>
  );
};
