import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../Helpers/GridContexts";

export const TitleBar = () => {
  const { algoList, styles, algorithmMap, numStartNodes, nodeDivMap, userChoice, setUserChoice } =
    useContext(GridContext);



  return (
    <div>
      <div className="titleBarContainer">
        <div>
          WHICH ALGORITHM WILL REACH THE GOAL NODE{" "}
          <div className={nodeDivMap["nodegoal"]}>G</div> FIRST?
        </div>
        <div
          className="titleBarChoices"
          id="algoChoice1"
          onClick={() => setUserChoice(1)}
        >
          <div className={nodeDivMap["nodestart1"]}>1</div>{" "}
          {algorithmMap[algoList[0]]}
        </div>

        <div
          className="titleBarChoices"
          id="algoChoice2"
          onClick={() => setUserChoice(2)}
        >
          <div className={nodeDivMap["nodestart2"]}>2</div>{" "}
          {algorithmMap[algoList[1]]}
        </div>
        {numStartNodes > 2 ? (
          <div
            className="titleBarChoices"
            id="algoChoice3"
            onClick={() => setUserChoice(3)}
          >
            <div className={nodeDivMap["nodestart3"]}>3</div>{" "}
            {algorithmMap[algoList[2]]}
          </div>
        ) : null}
        {numStartNodes > 3 ? (
          <div
            className="titleBarChoices"
            id="algoChoice4"
            onClick={() => setUserChoice(4)}
          >
            <div className={nodeDivMap["nodestart4"]}>4</div>{" "}
            {algorithmMap[algoList[3]]}
          </div>
        ) : null}
        <div
          className="titleBarChoices"
          id="algoChoice5"
          onClick={() => setUserChoice(5)}
        >
          <div className={nodeDivMap["nodex"]}>X</div> No Path Will Be Found!
        </div>
        <div>{userChoice}</div>
      </div>
    </div>
  );
};
