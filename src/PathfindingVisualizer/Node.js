export const Node = ({
  isStartNode1,
  isStartNode2,
  isStartNode3,
  isStartNode4,
  isGoalNode,
  row,
  col,
  isWall,
}) => {
  const nodeValues = isStartNode1
    ? "node-visited-1"
    : isStartNode2
    ? "node-visited-2"
    : isStartNode3
    ? "node-visited-3"
    : isStartNode4
    ? "node-visited-4"
    : isGoalNode
    ? "node-goal"
    : isWall
    ? "node-wall"
    : "";
  const gridText = isStartNode1
    ? "S C"
    : isStartNode2
    ? "S B"
    : isStartNode3
    ? "S K"
    : isStartNode4
    ? "S O"
    : isGoalNode
    ? "G"
    : "";
  return (
    <div className={`node ${nodeValues}`} id={`node-${row}-${col}`}>
      {row},{col}
      {/* {gridText} */}
    </div>
  );
};
