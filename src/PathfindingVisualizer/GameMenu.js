import React, { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../Helpers/AppContext";
import { GridGenerator } from "./GridGenerator";

export const GameMenu = () => {
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
    setIsSettingsRendered,
    timesGuessed,
    userGuessScore,
    updateUserScore,
    visIsFinished,
    visIsOngoing,
    setIsInfoRendered,
  } = useContext(AppContext);

  //Reference to GridGenerator component
  const generatorRef = useRef();

  //Used to mark which contender user has picked
  const [selectedDiv, setSelectedDiv] = useState("");

  useEffect(() => {
    updateUserScore();
  }, [visIsFinished]);

  return (
    <div>
      <div className="gameMenuContainer">
        <div className="title">WHICH ALGORITHM WILL REACH THE GOAL NODE </div>{" "}
        <div className={nodeDivMap["nodegoal"]}>G</div>{" "}
        <div className="title"> FIRST?</div>
        <div>
          <div
            className={`contenderChoice ${
              selectedDiv === "contenderChoice1" ? " selectedChoice" : undefined
            } ${renderWinnerMsg && winnerAlgo[1] ? "winnerAlgo" : ""}`}
            onClick={() => {
              if (!visIsOngoing && !visIsFinished) {
                //Do nothing if visualizer has already started
                setSelectedDiv("contenderChoice1");
                setUserChoice(1);
                //Automatically start visualizer after user clicks on contender
                generatorRef.current.visualize();
              }
            }}
            id="contenderChoice1"
          >
            <div className={nodeDivMap["nodestart1"]}>1</div>{" "}
            {/* Show which randomly assigned pathfinding algorithm contender was assigned */}
            {algorithmMap[algoList[0]]}
          </div>
          <div
          //Show result of contender's pathfinding algorithm when visualizer is finished
            className={`algoPathMsg ${
              renderWinnerMsg ? "fadeInAnimClass" : ""
            }`}
          >
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
            className={`contenderChoice ${
              selectedDiv === "contenderChoice2" ? " selectedChoice" : undefined
            } ${renderWinnerMsg && winnerAlgo[2] ? "winnerAlgo" : ""}`}
            onClick={() => {
              if (!visIsOngoing && !visIsFinished) {
                setSelectedDiv("contenderChoice2");
                setUserChoice(2);
                generatorRef.current.visualize();
              }
            }}
            id="contenderChoice2"
          >
            <div className={nodeDivMap["nodestart2"]}>2</div>{" "}
            {algorithmMap[algoList[1]]}
          </div>
          <div
            className={`algoPathMsg ${
              renderWinnerMsg ? "fadeInAnimClass" : ""
            }`}
          >
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
              className={`contenderChoice ${
                selectedDiv === "contenderChoice3"
                  ? " selectedChoice"
                  : undefined
              } ${renderWinnerMsg && winnerAlgo[3] ? "winnerAlgo" : ""}`}
              onClick={() => {
                if (!visIsOngoing && !visIsFinished) {
                  setSelectedDiv("contenderChoice3");
                  setUserChoice(3);
                  generatorRef.current.visualize();
                }
              }}
              id="contenderChoice3"
            >
              <div className={nodeDivMap["nodestart3"]}>3</div>{" "}
              {algorithmMap[algoList[2]]}
            </div>
            <div
              className={`algoPathMsg ${
                renderWinnerMsg ? "fadeInAnimClass" : ""
              }`}
            >
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
              className={`contenderChoice ${
                selectedDiv === "contenderChoice4"
                  ? " selectedChoice"
                  : undefined
              } ${renderWinnerMsg && winnerAlgo[4] ? "winnerAlgo" : ""}`}
              onClick={() => {
                if (!visIsOngoing && !visIsFinished) {
                  setSelectedDiv("contenderChoice4");
                  setUserChoice(4);
                  generatorRef.current.visualize();
                }
              }}
              id="contenderChoice4"
            >
              <div className={nodeDivMap["nodestart4"]}>4</div>{" "}
              {algorithmMap[algoList[3]]}
            </div>
            <div
              className={`algoPathMsg ${
                renderWinnerMsg ? "fadeInAnimClass" : ""
              }`}
            >
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
            className={`contenderChoice ${
              selectedDiv === "contenderChoice0" ? " selectedChoice" : undefined
            } ${renderWinnerMsg && winnerAlgo[5] ? "winnerAlgo" : ""}`}
            onClick={() => {
              if (!visIsOngoing && !visIsFinished) {
                setSelectedDiv("contenderChoice0");
                setUserChoice(5);
                generatorRef.current.visualize();
              }
            }}
            id="contenderChoice5"
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

      <div className="gameMenuButtonContainer">
        <div className="gameMenuLeftSideItems">
          <button
            className="gameMenuButton justVisualizeButton"
            onClick={() =>
              !visIsOngoing &&
              !visIsFinished &&
              generatorRef.current.visualize()
            }
          >
            Just Visualize
          </button>
          <button
            className="gameMenuButton newMapButton"
            onClick={() => !visIsOngoing && remakeGrid()}
          >
            New Map
          </button>{" "}
        </div>
        <div className="gameMenuRightSideItems">
          <div className="scoreDiv">
            {timesGuessed > 0
              ? `Score: ${userGuessScore} / ${timesGuessed}`
              : null}
          </div>
          <button
            className="gameMenuButton infoButton"
            onClick={() => setIsInfoRendered(true)}
          >
            Information
          </button>
          <button
            className="gameMenuButton settingsMenuButton"
            onClick={() => !visIsOngoing && setIsSettingsRendered(true)}
          >
            Settings
          </button>
        </div>
      </div>
      {/* Create randomized grid */}
      <GridGenerator ref={generatorRef} />
    </div>
  );
};
