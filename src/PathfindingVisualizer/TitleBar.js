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
    switchToSettingsMenu
  } = useContext(GridContext);

  const generatorRef = useRef();

  const [selectedDiv, setSelectedDiv] = useState("");

  return (
    <div>
      <div className="titleBarContainer">
        <div>
          WHICH ALGORITHM WILL REACH THE GOAL NODE{" "}
          <div className={nodeDivMap["nodegoal"]}>G</div> FIRST?
        </div>
        <div>
          <div
            className={`titleBarChoices ${
              selectedDiv === "algoChoice1" ? " selectedChoice" : undefined
            } ${renderWinnerMsg && winnerAlgo[1] ? "winnerAlgo" : ""}`}
            onClick={() => {
              setSelectedDiv("algoChoice1");
              setUserChoice(1);
              generatorRef.current.visualize();
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
              setSelectedDiv("algoChoice2");
              setUserChoice(2);
              generatorRef.current.visualize();
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
                setSelectedDiv("algoChoice3");
                setUserChoice(3);
                generatorRef.current.visualize();
              }}
              id="algoChoice3"
            >
              <div className={nodeDivMap["nodestart3"]}>3</div>{" "}
              {algorithmMap[algoList[2]]}
            </div>
            <div className="algoPathMsg">
              {renderWinnerMsg
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
                setSelectedDiv("algoChoice4");
                setUserChoice(4);
                generatorRef.current.visualize();
              }}
              id="algoChoice4"
            >
              <div className={nodeDivMap["nodestart4"]}>4</div>{" "}
              {algorithmMap[algoList[3]]}
            </div>
            <div className="algoPathMsg">
              {renderWinnerMsg
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
              setSelectedDiv("algoChoice0");
              setUserChoice(5);
              generatorRef.current.visualize();
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
      <button onClick={() => generatorRef.current.visualize()}>
        JUST VISUALIZE
      </button>{" "}
      <button onClick={() => remakeGrid()}>New Map</button>
      {" "}
      <button onClick={() => switchToSettingsMenu()}>SETTINGS</button>
      <GridGenerator ref={generatorRef} />
    </div>
  );
};
