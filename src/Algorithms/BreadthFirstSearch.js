export function BreadthFirstSearch(startNode, goalNode) {
  var queue = [];
  var path = [];
  queue.push(startNode);
  var pathFoundMessage = "CANT FIND PATH";

  while (queue.length !== 0) {
    var currentNode = queue.shift();
    path.push(currentNode);
    var adjacentNodes = currentNode.adjacentNodes;
    // console.log(`VISITED ${currentNode.row} ${currentNode.col}`);
    currentNode.isVisited = true; 
    // console.log(currentNode)

    if (currentNode === goalNode) {
      // console.log(`PATH FOUND ${currentNode.row} ${currentNode.col}`);
      pathFoundMessage = `PATH FOUND ${currentNode.row} ${currentNode.col}`
      return {path, pathFoundMessage};
    }

    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!adjacentNodes[i].isVisited) {
        queue.push(adjacentNodes[i]);
        adjacentNodes[i].isVisited = true;
      }
    }
  }
  
  return {path, pathFoundMessage};
}
