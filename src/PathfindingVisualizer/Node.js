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
  //Add CSS class to node if special node
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
  //Add text to node if special node
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
    : "";
  return (
    <div className={`node ${nodeValues}`} id={`node-${row}-${col}`}>
      {gridText}
    </div>
  );
};
