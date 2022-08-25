export function BreadthFirstSearch(startNode, goalNode) {
  var queue = [];
  queue.push(startNode);

  while (queue.length !== 0) {
    var currrentNode = queue.shift();
    var adjacentNodes = currrentNode.adjacentNodes;

    if (currrentNode === goalNode) {
      console.log(`PATH FOUND ${currrentNode.row} ${currrentNode.col}`);
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
