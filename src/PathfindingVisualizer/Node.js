import React, { useState } from "react";

export const Node = ({ isStartNode, isGoalNode, row, col, isVisited }) => {
  // const [isVisited, setIsVisited] = useState(false)
  const nodeValues = isStartNode ? "node-start" : isGoalNode ? "node-goal" : "" ;
  return (
    <div className={`node ${nodeValues}`} id={`node-${row}-${col}`}>
      {row},{col}
    </div>
  );
};
