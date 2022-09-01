export const Node = ({ isStartNode, isGoalNode, row, col, isWall, isVisited, isVisitedBidirectional, isStartNode2 }) => {
  const nodeValues = isStartNode ? "node-start" : isGoalNode ? "node-goal" : isWall ? "node-wall" : isVisited ? "node-visited" : isStartNode2 ? "node-visited-bi" : "";
  return (
    <div className={`node ${nodeValues}`} id={`node-${row}-${col}`}>
      {row},{col}
    </div>
  );
};
