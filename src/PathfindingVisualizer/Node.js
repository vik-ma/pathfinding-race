
export const Node = ({ isStartNode, isGoalNode }) => {
    const nodeValues = isStartNode
      ? "node-start"
      : isGoalNode
      ? "node-goal"
      : "node";
    return <div className={`node ${nodeValues}`}></div>;
  };

