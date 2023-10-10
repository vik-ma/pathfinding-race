import { PriorityQueue } from "./PriorityQueue";

export function GreedyBestFirstSearch(startNode, goalNode) {
  var path = [];
  var pathFoundMessage = "CANT FIND PATH";
  var pathToGoal = [];
  var pathIsFound = false;
  var algoName = "Greedy Best-First Search";

  var pq = new PriorityQueue();

  startNode.distance = 0;
  pq.enqueue([startNode, 0]);

  function heuristic(nodeA, nodeB) {
    let x1 = nodeA.row;
    let y1 = nodeA.col;

    let x2 = nodeB.row;
    let y2 = nodeB.col;

    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }

  while (!pq.isEmpty()) {
    let currentNode = pq.dequeue();
    currentNode.isVisited = true;
    path.push(currentNode);

    // console.log(`VISITED ${currentNode.row} ${currentNode.col}`);

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
      return { path, pathFoundMessage, pathToGoal, pathIsFound, algoName };
    }

    let adjacentNodes = currentNode.adjacentNodes;
    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!adjacentNodes[i].isVisited) {
        let priority = heuristic(adjacentNodes[i], goalNode);
        pq.enqueue([adjacentNodes[i], priority]);
        adjacentNodes[i].isVisited = true;
        adjacentNodes[i].previousNode = currentNode;
      }
    }
  }

  return { path, pathFoundMessage, pathIsFound, algoName };
}
