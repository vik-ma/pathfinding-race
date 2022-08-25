export function BreadthFirstSearch(startNode, goalNode) {
  var queue = [];
  queue.push(startNode);

  while (queue.length !== 0) {
    var currentNode = queue.shift();
    var adjacentNodes = currentNode.adjacentNodes;
    console.log(`VISITED ${currentNode.row} ${currentNode.col}`);

    if (currentNode === goalNode) {
      console.log(`PATH FOUND ${currentNode.row} ${currentNode.col}`);
      break;
    }

    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!adjacentNodes[i].isVisited) {
        queue.push(adjacentNodes[i]);
        adjacentNodes[i].isVisited = true;
      }
    }
  }
}
