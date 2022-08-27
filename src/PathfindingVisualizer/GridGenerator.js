import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../Helpers/GridContexts";
import { Node } from "./Node";
import { BreadthFirstSearch } from "../Algorithms/BreadthFirstSearch";
import { DepthFirstSearch } from "../Algorithms/DepthFirstSearch";
import { Dijkstra } from "../Algorithms/Dijkstra";

export const GridGenerator = () => {
  const { rowCount, colCount } = useContext(GridContext);
  const START_NODE_ROW = 0;
  const START_NODE_COL = 1;
  const GOAL_NODE_ROW = rowCount - 2;
  const GOAL_NODE_COL = colCount - 1;
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

    createAdjacentNodeMatrix(grid);

    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const goalNode = grid[GOAL_NODE_ROW][GOAL_NODE_COL];

    // let testAlgo = BreadthFirstSearch(startNode, goalNode);
    // let testAlgo = DepthFirstSearch(startNode, goalNode);
    let testAlgo = Dijkstra(startNode, goalNode);
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

  const drawGrid = (
    <div>
      {gridLayout.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStartNode, isGoalNode } = col;
              return (
                <Node
                  key={colIndex}
                  isStartNode={isStartNode}
                  isGoalNode={isGoalNode}
                  row={rowIndex}
                  col={colIndex}
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

    this.isVisited = false;
    this.adjacentNodes = [];
    this.previousNode = undefined;
    this.distance = Infinity;
    this.addAdjacentNodes = function (grid) {
      let row = this.row;
      let col = this.col;
      if (row > 0) this.adjacentNodes.push(grid[row - 1][col]);
      if (row < rowCount - 1) this.adjacentNodes.push(grid[row + 1][col]);
      if (col > 0) this.adjacentNodes.push(grid[row][col - 1]);
      if (col < colCount - 1) this.adjacentNodes.push(grid[row][col + 1]);
    };
  }

  return <div className="gridContainer">{drawGrid}</div>;
};
