export function BreadthFirstSearch(startNode, goalNode) {
  var path = [];
  var pathFoundMessage = "CANT FIND PATH";
  var pathToGoal = [];
  var pathIsFound = false;

  var queue = [];
  queue.push(startNode);

  while (queue.length !== 0) {
    var currentNode = queue.shift();
    path.push(currentNode);
    var adjacentNodes = currentNode.adjacentNodes;
    // console.log(`VISITED ${currentNode.row} ${currentNode.col}`);
    currentNode.isVisited = true;

    if (currentNode === goalNode) {
      // console.log(`PATH FOUND ${currentNode.row} ${currentNode.col}`);
      pathFoundMessage = `PATH FOUND ${currentNode.row} ${currentNode.col}`;

      pathIsFound = true;

      let tempNode = currentNode;
      pathToGoal.push(tempNode);
      while (tempNode.previousNode) {
        pathToGoal.push(tempNode.previousNode);
        tempNode = tempNode.previousNode;
      }

      pathToGoal = pathToGoal.reverse();
      return { path, pathFoundMessage, pathToGoal, pathIsFound };
    }

    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!adjacentNodes[i].isVisited) {
        queue.push(adjacentNodes[i]);
        adjacentNodes[i].isVisited = true;
        adjacentNodes[i].previousNode = currentNode;
      }
    }
  }

  return { path, pathFoundMessage, pathIsFound };
}
