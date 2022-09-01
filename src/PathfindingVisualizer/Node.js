export const Node = ({
  isStartNode1,
  isGoalNode,
  row,
  col,
  isWall,
  isStartNode2,
  isStartNode3,
  isStartNode4,
}) => {
  const nodeValues = isStartNode1
    ? "node-1"
    : isStartNode2
    ? "node-2"
    : isStartNode3
    ? "node-3"
    : isStartNode4
    ? "node-4"
    : isGoalNode
    ? "node-goal"
    : isWall
    ? "node-wall"
    : "";
  return (
    <div className={`node ${nodeValues}`} id={`node-${row}-${col}`}>
      {row},{col}
    </div>
  );
};
