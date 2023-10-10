export function DepthFirstSearch(startNode, goalNode) {
  var path = [];
  var pathFoundMessage = "CANT FIND PATH";
  var pathIsFound = false;
  var pathToGoal = [];
  var algoName = "Depth-First Search"

  var stopRecursion = false;
  dFSRecursion(startNode);
  
  function dFSRecursion(currentNode) {
    if (currentNode.isVisited) {
      return;
    } else if (currentNode === goalNode) {
      // console.log(`PATH FOUND ${currentNode.row} ${currentNode.col}`);
      currentNode.isVisited = true;
      stopRecursion = true;
      pathIsFound = true;
      pathFoundMessage = `PATH FOUND ${currentNode.row} ${currentNode.col}`;
      path.push(currentNode);
      pathToGoal.push(currentNode);

      return { path, pathFoundMessage, pathToGoal, pathIsFound, algoName };
    } else {
      currentNode.isVisited = true;
      path.push(currentNode);
      pathToGoal.push(currentNode);
      // console.log(`VISITED ${currentNode.row} ${currentNode.col}`);
    }

    var adjacentNodes = currentNode.adjacentNodes;
    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!stopRecursion) {
        dFSRecursion(adjacentNodes[i]);
      }
    }
  }

  return { path, pathFoundMessage, pathToGoal, pathIsFound, algoName };
}
