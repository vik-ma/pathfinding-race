import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../Helpers/GridContexts";

export const TitleBar = () => {
  const {
    algoList,
    styles,
    algorithmMap,
    numStartNodes,
    nodeDivMap,
    userChoice,
    setUserChoice,
  } = useContext(GridContext);

  const [selectedDiv, setSelectedDiv] = useState("");

  const setChoice = (num) => {
    setUserChoice(num);
  };

  return (
    <div>
      <div className="titleBarContainer">
        <div>
          WHICH ALGORITHM WILL REACH THE GOAL NODE{" "}
          <div className={nodeDivMap["nodegoal"]}>G</div> FIRST?
        </div>
        <div
          className={`titleBarChoices ${
            selectedDiv === "algoChoice1" ? " selectedChoice" : undefined
          }`}
          onClick={() => {
            setSelectedDiv("algoChoice1");
            setUserChoice(1);
          }}
          id="algoChoice1"
        >
          <div className={nodeDivMap["nodestart1"]}>1</div>{" "}
          {algorithmMap[algoList[0]]}
        </div>

        <div
          className={`titleBarChoices ${
            selectedDiv === "algoChoice2" ? " selectedChoice" : undefined
          }`}
          onClick={() => {
            setSelectedDiv("algoChoice2");
            setUserChoice(2);
          }}
          id="algoChoice2"
        >
          <div className={nodeDivMap["nodestart2"]}>2</div>{" "}
          {algorithmMap[algoList[1]]}
        </div>
        {numStartNodes > 2 ? (
          <div
            className={`titleBarChoices ${
              selectedDiv === "algoChoice3" ? " selectedChoice" : undefined
            }`}
            onClick={() => {
              setSelectedDiv("algoChoice3");
              setUserChoice(3);
            }}
            id="algoChoice3"
          >
            <div className={nodeDivMap["nodestart3"]}>3</div>{" "}
            {algorithmMap[algoList[2]]}
          </div>
        ) : null}
        {numStartNodes > 3 ? (
          <div
            className={`titleBarChoices ${
              selectedDiv === "algoChoice4" ? " selectedChoice" : undefined
            }`}
            onClick={() => {
              setSelectedDiv("algoChoice4");
              setUserChoice(4);
            }}
            id="algoChoice4"
          >
            <div className={nodeDivMap["nodestart4"]}>4</div>{" "}
            {algorithmMap[algoList[3]]}
          </div>
        ) : null}
        <div
          className={`titleBarChoices ${
            selectedDiv === "algoChoice5" ? " selectedChoice" : undefined
          }`}
          onClick={() => {
            setSelectedDiv("algoChoice5");
            setUserChoice(5);
          }}
          id="algoChoice5"
        >
          <div className={nodeDivMap["nodex"]}>X</div> No Path Will Be Found!
        </div>
        <div></div>
      </div>
    </div>
  );
};
