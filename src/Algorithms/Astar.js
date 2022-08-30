export function Astar(startNode, goalNode) {
  var path = [];
  var pathFoundMessage = "CANT FIND PATH";
  var pathToGoal = [];

  var openSet = [];
  var closedSet = [];

  openSet.push(startNode);

  while (openSet.length > 0) {
    let minIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[minIndex].f) {
        minIndex = i;
      }
    }

    let currentNode = openSet[minIndex];
    currentNode.isVisited = true;
    path.push(currentNode);

    if (currentNode === goalNode) {
      // console.log(`PATH FOUND ${currentNode.row} ${currentNode.col}`);
      pathFoundMessage = `PATH FOUND ${currentNode.row} ${currentNode.col}`;

      let tempNode = currentNode;
      pathToGoal.push(tempNode);
      while (tempNode.previousNode) {
        pathToGoal.push(tempNode.previousNode);
        tempNode = tempNode.previousNode;
      }

      pathToGoal = pathToGoal.reverse();
      return { path, pathFoundMessage, shortestpath: pathToGoal };
    }

    openSet = openSet.filter((node) => node !== currentNode);
    closedSet.push(currentNode);

    let adjacentNodes = currentNode.adjacentNodes;
    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!closedSet.includes(adjacentNodes[i])) {
        let gScore = currentNode.g + 1;

        let newPath = false;

        if (openSet.includes(currentNode)) {
          adjacentNodes[i].g = gScore;
          newPath = true;
        } else {
          adjacentNodes[i].g = gScore;
          newPath = true;
          openSet.push(adjacentNodes[i]);
        }

        if (newPath) {
          adjacentNodes[i].h = heuristic(adjacentNodes[i], goalNode);
          adjacentNodes[i].f = adjacentNodes[i].g + adjacentNodes[i].h;
          adjacentNodes[i].previousNode = currentNode;
        }
      }
    }
  }

  function heuristic(nodeA, nodeB) {
    let x1 = nodeA.row;
    let y1 = nodeA.col;

    let x2 = nodeB.row;
    let y2 = nodeB.col;

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  return { path, pathFoundMessage };
}
