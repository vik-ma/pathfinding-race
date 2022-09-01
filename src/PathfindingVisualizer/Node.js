export const Node = ({ isStartNode1, isGoalNode, row, col, isWall, isVisited, isStartNode2 }) => {
  const nodeValues = isStartNode1 ? "node-1" : isGoalNode ? "node-goal" : isWall ? "node-wall" : isVisited ? "node-visited" : isStartNode2 ? "node-2" : "";
  return (
    <div className={`node ${nodeValues}`} id={`node-${row}-${col}`}>
      {row},{col}
    </div>
  );
};
