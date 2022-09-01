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

  const [startNodeRow1, setStartNodeRow1] = useState(11);
  const [startNodeCol1, setStartNodeCol1] = useState(1);
  const [startNodeRow2, setStartNodeRow2] = useState(11);
  const [startNodeCol2, setStartNodeCol2] = useState(5);
  const [goalNodeRow, setGoalNodeRow] = useState(9);
  const [goalNodeCol, setGoalNodeCol] = useState(3);

  const [numStartNodes, setStartNumNodes] = useState(4);
  const [savedGrid, setSavedGrid] = useState([]);
  const [savedGrid2, setSavedGrid2] = useState([]);

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

    setSavedGrid(grid);

    const grid2 = new Array(rowCount);

    for (let row = 0; row < rowCount; row++) {
      grid2[row] = new Array(colCount);
    }

    createNodeMatrix(grid2);

    setGridLayout(grid2);

    createWalls(grid2);

    createAdjacentNodeMatrix(grid2);

    setSavedGrid2(grid2);
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
    // grid[1][0].isWall = true;
    // grid[1][1].isWall = true;
    grid[1][2].isWall = true;
    grid[7][4].isWall = true;
    grid[6][5].isWall = true;
    grid[5][6].isWall = true;
    grid[4][7].isWall = true;
    grid[3][8].isWall = true;
    grid[8][4].isWall = true;
    grid[9][4].isWall = true;
    grid[10][4].isWall = true;
    // grid[11][4].isWall = true;
  };

  const drawGrid = (
    <div>
      {gridLayout.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const {
                isStartNode1,
                isStartNode2,
                isGoalNode,
                isWall,
                isVisited,
                isVisitedBidirectional,
              } = col;
              return (
                <Node
                  key={colIndex}
                  isStartNode1={isStartNode1}
                  isStartNode2={isStartNode2}
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
    this.isStartNode1 =
      this.row === startNodeRow1 && this.col === startNodeCol1;
    this.isStartNode2 =
      this.row === startNodeRow2 && this.col === startNodeCol2;
    this.isGoalNode = this.row === goalNodeRow && this.col === goalNodeCol;

    this.allowDiagonals = true;
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

      // DIAGONALS
      if (this.allowDiagonals) {
        if (
          row > 0 &&
          col > 0 &&
          !grid[row - 1][col - 1].isWall &&
          !(grid[row - 1][col].isWall && grid[row][col - 1].isWall)
        )
          this.adjacentNodes.push(grid[row - 1][col - 1]);
        if (
          row < rowCount - 1 &&
          col > 0 &&
          !grid[row + 1][col - 1].isWall &&
          !(grid[row + 1][col].isWall && grid[row][col - 1].isWall)
        )
          this.adjacentNodes.push(grid[row + 1][col - 1]);
        if (
          row < rowCount - 1 &&
          col < colCount - 1 &&
          !grid[row + 1][col + 1].isWall &&
          !(grid[row + 1][col].isWall && grid[row][col + 1].isWall)
        )
          this.adjacentNodes.push(grid[row + 1][col + 1]);
        if (
          row > 0 &&
          col < colCount - 1 &&
          !grid[row - 1][col + 1].isWall &&
          !(grid[row - 1][col].isWall && grid[row][col + 1].isWall)
        )
          this.adjacentNodes.push(grid[row - 1][col + 1]);
      }
    };
  }

  const visualizePath = () => {
    let grid = savedGrid;
    let grid2 = savedGrid2;
    const startNode1 = grid[startNodeRow1][startNodeCol1];
    const goalNode = grid[goalNodeRow][goalNodeCol];
    const startNode2 = grid2[startNodeRow2][startNodeCol2];
    const goalNode2 = grid2[goalNodeRow][goalNodeCol];

    let algoMap = {};

    let algo1 = BreadthFirstSearch(startNode1, goalNode);
    algoMap[1] = algo1;
    let algo2 = BreadthFirstSearch(startNode2, goalNode2);
    algoMap[2] = algo2;

    let pathMinLength = Math.min(algo1.path.length, algo2.path.length);

    let anyPathFound = false;
    let minIndex = {};

    console.log(algo1.path, algo2.path);

    for (let [key, value] of Object.entries(algoMap)) {
      if (
        algoMap[key].path.length === pathMinLength &&
        algoMap[key].pathIsFound
      ) {
        minIndex[key] = value;
      }
      if (anyPathFound === false && algoMap[key].pathIsFound === true) {
        anyPathFound = true;
      }
    }

    for (let i = 0; i <= pathMinLength; i++) {
      if (i === pathMinLength) {
        if (anyPathFound) {
          setTimeout(() => {
            drawWinnerPath(minIndex);
          }, 50 * i);
        }
      } else {
        setTimeout(() => {
          const node = algo1.path[i];
          const node2 = algo2.path[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add("node-1", "node-current");
          document
            .getElementById(`node-${node2.row}-${node2.col}`)
            .classList.add("node-2", "node-current");
        }, 50 * i);
      }
    }
  };

  const drawWinnerPath = (winnerAlgo) => {
    for (let [key, value] of Object.entries(winnerAlgo)) {
      let path = winnerAlgo[key].pathToGoal;
      for (let i = 0; i < path.length; i++) {
        const node = path[i];
        document
          .getElementById(`node-${node.row}-${node.col}`)
          .classList.add(`node-winner-${key}`);
      }
    }
  };

  return (
    <div>
      <button className="buttonContainer" onClick={visualizePath}>
        VISUALIZE
      </button>
      <div className="gridContainer">{drawGrid}</div>
    </div>
  );
};
