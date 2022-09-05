import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../Helpers/GridContexts";

export const TitleBar = () => {
  const { algoList, styles, algorithmMap, numStartNodes } =
    useContext(GridContext);

  return (
    <div>
      <div className="titleBarContainer">
        <div className="titleBarChoices">
          WHICH ALGORITHM WILL REACH THE GOAL NODE{" "}
          <div
            className={`${styles.node} ${styles.nodegoal} ${styles.titlebarnode}`}
          >
            G
          </div>{" "}
          FIRST?
        </div>
        <div className="titleBarChoices">
          <div
            className={`${styles.node} ${styles.nodevisited1} ${styles.nodestart1} ${styles.titlebarnode}`}
          >
            1
          </div>{" "}
          {algorithmMap[algoList[0]]}
        </div>

        <div className="titleBarChoices">
          <div
            className={`${styles.node} ${styles.nodevisited2} ${styles.nodestart2} ${styles.titlebarnode}`}
          >
            2
          </div>{" "}
          {algorithmMap[algoList[1]]}
        </div>
        {numStartNodes > 2 ? (
          <div className="titleBarChoices">
            <div
              className={`${styles.node} ${styles.nodevisited3} ${styles.nodestart3} ${styles.titlebarnode}`}
            >
              3
            </div>{" "}
            {algorithmMap[algoList[2]]}
          </div>
        ) : null}
        {numStartNodes > 3 ? (
          <div className="titleBarChoices">
            <div
              className={`${styles.node} ${styles.nodevisited4} ${styles.nodestart4} ${styles.titlebarnode}`}
            >
              4
            </div>{" "}
            {algorithmMap[algoList[3]]}
          </div>
        ) : null}
        <div className="titleBarChoices">
          <div
            className={`${styles.node} ${styles.nodex} ${styles.titlebarnode}`}
          >
            X
          </div>{" "}
          No Path Will Be Found!
        </div>
        {/* <div>
          YOUR GUESS [&nbsp;&nbsp;&nbsp;] Greedy Best-First Search WAS CORRECT!
        </div> */}
      </div>
    </div>
  );
};
