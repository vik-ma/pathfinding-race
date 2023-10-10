import { PriorityQueue } from "./PriorityQueue";

//Lazy Dijkstra Algorithm (No indexed priority queue)
export function Dijkstra(startNode, goalNode) {
  var path = [];
  var pathFoundMessage = "CANT FIND PATH";
  var pathToGoal = [];
  var pathIsFound = false;
  var algoName = "Dijkstra's Algorithm"

  var pq = new PriorityQueue();

  startNode.distance = 0;
  pq.enqueue([startNode, 0]);

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
        let newDist = currentNode.distance + 1;
        if (newDist < adjacentNodes[i].distance) {
          adjacentNodes[i].distance = newDist;
          pq.enqueue([adjacentNodes[i], adjacentNodes[i].distance]);
          adjacentNodes[i].previousNode = currentNode;
        }
      }
    }
  }

  return { path, pathFoundMessage, pathIsFound, algoName };
}
