export function BreadthFirstSearch(startNode, goalNode) {
  var path = [];
  var pathFoundMessage = "CANT FIND PATH";
  var shortestpath = [];

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

      let tempNode = currentNode;
      shortestpath.push(tempNode);
      while (tempNode.previousNode) {
        shortestpath.push(tempNode.previousNode);
        tempNode = tempNode.previousNode;
      }

      shortestpath = shortestpath.reverse();
      return { path, pathFoundMessage, shortestpath };
    }

    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!adjacentNodes[i].isVisited) {
        queue.push(adjacentNodes[i]);
        adjacentNodes[i].isVisited = true;
        adjacentNodes[i].previousNode = currentNode;
      }
    }
  }

  return { path, pathFoundMessage };
}
