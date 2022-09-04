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
    ? "node-start-1 node-visited-1"
    : isStartNode2
    ? "node-start-2 node-visited-2"
    : isStartNode3
    ? "node-start-3 node-visited-3"
    : isStartNode4
    ? "node-start-4 node-visited-4"
    : isGoalNode
    ? "node-goal"
    : isWall
    ? "node-wall"
    : "";
  const gridText = isStartNode1
    ? "1"
    : isStartNode2
    ? "2"
    : isStartNode3
    ? "3"
    : isStartNode4
    ? "4"
    : isGoalNode
    ? "G"
    : // : `${row},${col}`;
      "";
  return (
    <div className={`node ${nodeValues}`} id={`node-${row}-${col}`}>
      {/* {row},{col} */}
      {gridText}
    </div>
  );
};
