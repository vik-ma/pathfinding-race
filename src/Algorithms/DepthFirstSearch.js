export function DepthFirstSearch(startNode, goalNode) {
  dFSRecursion(startNode);
  var stopRecursion = false;

  function dFSRecursion(currentNode) {
    if (currentNode.isVisited) {
      return;
    } else if (currentNode === goalNode) {
      console.log(`PATH FOUND ${currentNode.row} ${currentNode.col}`);
      currentNode.isVisited = true;
      stopRecursion = true;
    } else {
      currentNode.isVisited = true;
      console.log(`VISITED ${currentNode.row} ${currentNode.col}`);
    }

    var adjacentNodes = currentNode.adjacentNodes;
    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!stopRecursion) {
        dFSRecursion(adjacentNodes[i]);
      }
    }
  }
}
