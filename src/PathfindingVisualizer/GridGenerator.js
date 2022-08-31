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
  const [startNodeRow, setStartNodeRow] = useState(1);
  const [startNodeCol, setStartNodeCol] = useState(1);
  const [goalNodeRow, setGoalNodeRow] = useState(8);
  const [goalNodeCol, setGoalNodeCol] = useState(6);

  const [gridLayout, setGridLayout] = useState([]);
  const [savedGrid, setSavedGrid] = useState([]);

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

    setSavedGrid(grid);
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
    // grid[1][1].isWall = true;
    grid[1][2].isWall = true;
    grid[7][4].isWall = true;
    grid[6][5].isWall = true;
    grid[5][6].isWall = true;
    // grid[4][7].isWall = true;
    // grid[3][8].isWall = true;
    // grid[8][4].isWall = true;
    // grid[9][4].isWall = true;
    // grid[10][4].isWall = true;
    // grid[11][4].isWall = true;
  };

  const drawGrid = (
    <div>
      {gridLayout.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const {
                isStartNode,
                isGoalNode,
                isWall,
                isVisited,
                isVisitedBidirectional,
              } = col;
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
    this.isStartNode = this.row === startNodeRow && this.col === startNodeCol;
    this.isGoalNode = this.row === goalNodeRow && this.col === goalNodeCol;

    this.isWall = false;
    this.isVisited = false;
    this.isVisitedBidirectional = false;
    this.adjacentNodes = [];
    this.previousNode = undefined;
    this.previousNodeBidirectional = undefined;
    this.distance = Infinity;
    this.isClosed = false;
    this.f = 0;
    this.g = 0;
    this.h = 0;
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

  const visualizePath = () => {
    let grid = savedGrid;
    const startNode = grid[startNodeRow][startNodeCol];
    const goalNode = grid[goalNodeRow][goalNodeCol];

    let algo = BidirectionalSearch(startNode, goalNode);

    for (let i = 0; i <= algo.path.length; i++) {
      if (i === algo.path.length) {
        if (algo.pathToGoal !== undefined) {
          setTimeout(() => {
            drawWinnerPath(algo);
          }, 50 * i);
        }
      } else {
        setTimeout(() => {
          const node = algo.path[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add("node-visited");
        }, 50 * i);
      }
    }
  };

  const drawWinnerPath = (algo) => {
    for (let i = 0; i < algo.pathToGoal.length; i++) {
      const node = algo.pathToGoal[i];
      document
        .getElementById(`node-${node.row}-${node.col}`)
        .classList.add("node-winner");
    }
  };

  return (
    <div>
      <div className="gridContainer">{drawGrid}</div>
      <button className="buttonContainer" onClick={visualizePath}>
        VISUALIZE
      </button>
    </div>
  );
};
