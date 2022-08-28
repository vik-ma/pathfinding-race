export const Node = ({ isStartNode, isGoalNode, row, col, isWall }) => {
  const nodeValues = isStartNode ? "node-start" : isGoalNode ? "node-goal" : isWall ? "node-wall" : "";
  return (
    <div className={`node ${nodeValues}`} id={`node-${row}-${col}`}>
      {row},{col}
    </div>
  );
};
