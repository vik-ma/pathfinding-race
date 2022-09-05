import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../Helpers/GridContexts";

export const TitleBar = () => {
  const { algoList } = useContext(GridContext);

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
        <div className="titleBarChoices">
          <div
            className={`${styles.node} ${styles.nodevisited3} ${styles.nodestart3} ${styles.titlebarnode}`}
          >
            3
          </div>{" "}
          {algorithmMap[algoList[2]]}
        </div>
        <div className="titleBarChoices">
          <div
            className={`${styles.node} ${styles.nodevisited4} ${styles.nodestart4} ${styles.titlebarnode}`}
          >
            4
          </div>{" "}
          {algorithmMap[algoList[3]]}
        </div>
        <div className="titleBarChoices">
          <div
            className={`${styles.node} ${styles.nodex} ${styles.titlebarnode}`}
          >
            X
          </div>{" "}No Path Will Be Found!</div>
        {/* <div>
          YOUR GUESS [&nbsp;&nbsp;&nbsp;] Greedy Best-First Search WAS CORRECT!
        </div> */}
      </div>
    </div>
  );
};
