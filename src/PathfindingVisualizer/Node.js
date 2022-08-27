export const Node = ({ isStartNode, isGoalNode, row, col }) => {
  const nodeValues = isStartNode ? "node-start" : isGoalNode ? "node-goal" : "";
  return (
    <div className={`node ${nodeValues}`} id={`node-${row}-${col}`}>
      {row},{col}
    </div>
  );
};
