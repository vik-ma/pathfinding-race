import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../Helpers/GridContexts";
import { Node } from "./Node";
import { BreadthFirstSearch } from "../Algorithms/BreadthFirstSearch";
import { DepthFirstSearch } from "../Algorithms/DepthFirstSearch";
import { Dijkstra } from "../Algorithms/Dijkstra";
import { Astar } from "../Algorithms/Astar";
import { GreedyBestFirstSearch } from "../Algorithms/GreedyBestFirstSearch";
import { BidirectionalSearch } from "../Algorithms/BidirectionalSearch";

export const GridGenerator = () => {
  const { rowCount, colCount } = useContext(GridContext);
  const START_NODE_ROW = 0;
  const START_NODE_COL = 1;
  const GOAL_NODE_ROW = rowCount - 2;
  const GOAL_NODE_COL = colCount - 1;
  // const GOAL_NODE_COL = 3;
  // const GOAL_NODE_ROW = 9;

  const NUM_NODES = rowCount * colCount;

  const [gridLayout, setGridLayout] = useState([]);

  useEffect(() => {
    createGrid();
  }, [rowCount, colCount]);

  const createGrid = () => {
    const grid = new Array(rowCount);

    for (let row = 0; row < rowCount; row++) {
      grid[row] = new Array(colCount);
    }

    createNodeMatrix(grid);

    setGridLayout(grid);

    createWalls(grid);

    createAdjacentNodeMatrix(grid);

    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const goalNode = grid[GOAL_NODE_ROW][GOAL_NODE_COL];

    // let testAlgo = BreadthFirstSearch(startNode, goalNode);
    // let testAlgo = DepthFirstSearch(startNode, goalNode);
    // let testAlgo = Dijkstra(startNode, goalNode);
    let testAlgo = Astar(startNode, goalNode)
    // let testAlgo = GreedyBestFirstSearch(startNode, goalNode)
    // let testAlgo = BidirectionalSearch(startNode, goalNode);
    console.log(testAlgo.pathFoundMessage);
    console.log(testAlgo.path);
  };

  const createNodeMatrix = (grid) => {
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        grid[row][col] = new gridElement(row, col);
      }
    }
  };

  const createAdjacentNodeMatrix = (grid) => {
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        grid[row][col].addAdjacentNodes(grid);
      }
    }
  };

  const createWalls = (grid) => {
    grid[0][2].isWall = true;
    grid[1][0].isWall = true;
    grid[1][1].isWall = true;
    grid[1][2].isWall = true;
  };

  const drawGrid = (
    <div>
      {gridLayout.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStartNode, isGoalNode, isWall, isVisited, isVisitedBidirectional } = col;
              return (
                <Node
                  key={colIndex}
                  isStartNode={isStartNode}
                  isGoalNode={isGoalNode}
                  row={rowIndex}
                  col={colIndex}
                  isWall={isWall}
                  isVisited={isVisited}
                  isVisitedBidirectional={isVisitedBidirectional}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  function gridElement(row, col) {
    this.row = row;
    this.col = col;
    this.isStartNode =
      this.row === START_NODE_ROW && this.col === START_NODE_COL;
    this.isGoalNode = this.row === GOAL_NODE_ROW && this.col === GOAL_NODE_COL;

    this.isWall = false;
    this.isVisited = false;
    this.isVisitedBidirectional = false;
    this.adjacentNodes = [];
    this.previousNode = undefined;
    this.distance = Infinity;
    this.addAdjacentNodes = function (grid) {
      let row = this.row;
      let col = this.col;
      if (row > 0 && !grid[row - 1][col].isWall)
        this.adjacentNodes.push(grid[row - 1][col]);
      if (row < rowCount - 1 && !grid[row + 1][col].isWall)
        this.adjacentNodes.push(grid[row + 1][col]);
      if (col > 0 && !grid[row][col - 1].isWall)
        this.adjacentNodes.push(grid[row][col - 1]);
      if (col < colCount - 1 && !grid[row][col + 1].isWall)
        this.adjacentNodes.push(grid[row][col + 1]);
    };
  }

  return <div className="gridContainer">{drawGrid}</div>;
};
