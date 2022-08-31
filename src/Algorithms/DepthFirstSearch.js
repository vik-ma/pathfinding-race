export function DepthFirstSearch(startNode, goalNode) {
  var path = [];
  var pathFoundMessage = "CANT FIND PATH";
  // var pathToGoal = [];

  dFSRecursion(startNode);
  var stopRecursion = false;

  function dFSRecursion(currentNode) {
    if (currentNode.isVisited) {
      return;
    } else if (currentNode === goalNode) {
      // console.log(`PATH FOUND ${currentNode.row} ${currentNode.col}`);
      currentNode.isVisited = true;
      stopRecursion = true;
      pathFoundMessage = `PATH FOUND ${currentNode.row} ${currentNode.col}`;
      path.push(currentNode);

      let pathToGoal = path.map((i) => i);


      return { path, pathFoundMessage, pathToGoal };
    } else {
      currentNode.isVisited = true;
      path.push(currentNode);
      // console.log(`VISITED ${currentNode.row} ${currentNode.col}`);
    }

    var adjacentNodes = currentNode.adjacentNodes;
    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!stopRecursion) {
        dFSRecursion(adjacentNodes[i]);
      }
    }
  }

  return { path, pathFoundMessage };
}
