//Bidirectional Breadth First Search
export function BidirectionalSearch(startNode, goalNode) {
  var path = [];
  var pathFoundMessage = "CANT FIND PATH";
  var pathToGoal = [];
  var pathIsFound = false;
  var algoName = "Bidirectional Search"

  var sourceQueue = [];
  var destinationQueue = [];
  sourceQueue.push(startNode);
  destinationQueue.push(goalNode);


  while (sourceQueue.length !== 0 || destinationQueue.length !== 0) {
    if (sourceQueue.length !== 0) {
      let currentNodeFwd = sourceQueue.shift();
      path.push(currentNodeFwd);
      let adjacentNodesFwd = currentNodeFwd.adjacentNodes;
      // console.log(`VISITED ${currentNodeFwd.row} ${currentNodeFwd.col}`);
      currentNodeFwd.isVisited = true;

      if (currentNodeFwd.isVisited && currentNodeFwd.isVisitedBidirectional) {
        pathFoundMessage = `PATH FOUND - INTERSECTION (FORWARD): ${currentNodeFwd.row} ${currentNodeFwd.col}`;

        pathIsFound = true;

        let tempNodeFwd = currentNodeFwd;
        pathToGoal.push(tempNodeFwd);
        while (tempNodeFwd.previousNode) {
          pathToGoal.push(tempNodeFwd.previousNode);
          tempNodeFwd = tempNodeFwd.previousNode;
        }
  
        pathToGoal = pathToGoal.reverse();

        let tempNodeBack = currentNodeFwd;
        while (tempNodeBack.previousNodeBidirectional) {
          pathToGoal.push(tempNodeBack.previousNodeBidirectional);
          tempNodeBack = tempNodeBack.previousNodeBidirectional;
        }

        return { path, pathFoundMessage, pathToGoal, pathIsFound, algoName };

      }

      for (let i = 0; i < adjacentNodesFwd.length; i++) {
        if (!adjacentNodesFwd[i].isVisited) {
          sourceQueue.push(adjacentNodesFwd[i]);
          adjacentNodesFwd[i].isVisited = true;
          adjacentNodesFwd[i].previousNode = currentNodeFwd;
        }
      }
    }
    if (destinationQueue.length !== 0) {
      let currentNodeBack = destinationQueue.shift();
      path.push(currentNodeBack);
      let adjacentNodesBack = currentNodeBack.adjacentNodes;
      // console.log(`VISITED ${currentNodeBack.row} ${currentNodeBack.col}`);
      currentNodeBack.isVisitedBidirectional = true;

      if (currentNodeBack.isVisited && currentNodeBack.isVisitedBidirectional) {
        pathFoundMessage = `PATH FOUND - INTERSECTION (BACK): ${currentNodeBack.row} ${currentNodeBack.col}`;

        pathIsFound = true;

        let tempNodeBack = currentNodeBack;
        pathToGoal.push(tempNodeBack);
        while (tempNodeBack.previousNodeBidirectional) {
          pathToGoal.push(tempNodeBack.previousNodeBidirectional);
          tempNodeBack = tempNodeBack.previousNodeBidirectional;
        }
  
        pathToGoal = pathToGoal.reverse();

        let tempNodeFwd = currentNodeBack;
        while (tempNodeFwd.previousNode) {
          pathToGoal.push(tempNodeFwd.previousNode);
          tempNodeFwd = tempNodeFwd.previousNode;
        }

        pathToGoal = pathToGoal.reverse();
        
        return { path, pathFoundMessage, pathToGoal, pathIsFound, algoName };
      }

      for (let i = 0; i < adjacentNodesBack.length; i++) {
        if (!adjacentNodesBack[i].isVisitedBidirectional) {
          destinationQueue.push(adjacentNodesBack[i]);
          adjacentNodesBack[i].isVisitedBidirectional = true;
          adjacentNodesBack[i].previousNodeBidirectional = currentNodeBack;
        }
      }
    }
  }

  return { path, pathFoundMessage, pathIsFound, algoName };
}
