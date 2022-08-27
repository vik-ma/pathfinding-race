import { PriorityQueue } from "./PriorityQueue";

export function Astar(startNode, goalNode) {
  var pq = new PriorityQueue();
  var path = [];
  var pathFoundMessage = "CANT FIND PATH";

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
      console.log(`PATH FOUND ${currentNode.row} ${currentNode.col}`);
    //   pathFoundMessage = `PATH FOUND ${currentNode.row} ${currentNode.col}`;
      return { path, pathFoundMessage };
    }

    let adjacentNodes = currentNode.adjacentNodes;
    for (let i = 0; i < adjacentNodes.length; i++) {
      if (!adjacentNodes[i].isVisited) {
        let newDist = currentNode.distance + 1;
        if (newDist < adjacentNodes[i].distance) {
          adjacentNodes[i].distance = newDist;
          let priority = adjacentNodes[i].distance + heuristic(adjacentNodes[i], goalNode);
          pq.enqueue([adjacentNodes[i], priority]);
        }
      }
    }
  }

  return { path, pathFoundMessage };
}
