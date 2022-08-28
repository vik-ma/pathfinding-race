//Bidirectional Breadth First Search
export function BidirectionalSearch(startNode, goalNode) {
  var sourceQueue = [];
  var destinationQueue = [];
  var path = [];
  sourceQueue.push(startNode);
  destinationQueue.push(goalNode);
  var pathFoundMessage = "CANT FIND PATH";

  while (sourceQueue.length !== 0 || destinationQueue.length !== 0) {
    if (sourceQueue.length !== 0) {
      let currentNodeFwd = sourceQueue.shift();
      path.push(currentNodeFwd);
      let adjacentNodesFwd = currentNodeFwd.adjacentNodes;
      console.log(`VISITED ${currentNodeFwd.row} ${currentNodeFwd.col}`);
      currentNodeFwd.isVisited = true;

      if (currentNodeFwd.isVisited && currentNodeFwd.isVisitedBidirectional) {
        pathFoundMessage = `PATH FOUND - INTERSECTION: ${currentNodeFwd.row} ${currentNodeFwd.col}`;
        return { path, pathFoundMessage };
      }

      for (let i = 0; i < adjacentNodesFwd.length; i++) {
        if (!adjacentNodesFwd[i].isVisited) {
          sourceQueue.push(adjacentNodesFwd[i]);
          adjacentNodesFwd[i].isVisited = true;
        }
      }
    }
    if (destinationQueue.length !== 0) {
      let currentNodeBack = destinationQueue.shift();
      path.push(currentNodeBack);
      let adjacentNodesBack = currentNodeBack.adjacentNodes;
      console.log(`VISITED ${currentNodeBack.row} ${currentNodeBack.col}`);
      currentNodeBack.isVisitedBidirectional = true;

      if (currentNodeBack.isVisited && currentNodeBack.isVisitedBidirectional) {
        pathFoundMessage = `PATH FOUND - INTERSECTION: ${currentNodeBack.row} ${currentNodeBack.col}`;
        return { path, pathFoundMessage };
      }

      for (let i = 0; i < adjacentNodesBack.length; i++) {
        if (!adjacentNodesBack[i].isVisitedBidirectional) {
          destinationQueue.push(adjacentNodesBack[i]);
          adjacentNodesBack[i].isVisitedBidirectional = true;
        }
      }
    }
  }

  return { path, pathFoundMessage };
}
