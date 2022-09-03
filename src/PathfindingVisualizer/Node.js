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
    ? "node-start-1"
    : isStartNode2
    ? "node-start-2"
    : isStartNode3
    ? "node-start-3"
    : isStartNode4
    ? "node-start-4"
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
