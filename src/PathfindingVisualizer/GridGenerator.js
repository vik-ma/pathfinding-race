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

  const randomNodeRow = new Set();
  const randomNodeCol = new Set();

  while (randomNodeRow.size < 5) {
    randomNodeRow.add(Math.floor(Math.random() * rowCount));
  }
  while (randomNodeCol.size < 5) {
    randomNodeCol.add(Math.floor(Math.random() * colCount));
  }

  const randomNodeRowArray = Array.from(randomNodeRow);
  const randomNodeColArray = Array.from(randomNodeCol);

  const [startNodeRow1, setStartNodeRow1] = useState(randomNodeRowArray[0]);
  const [startNodeCol1, setStartNodeCol1] = useState(randomNodeColArray[0]);

  const [startNodeRow2, setStartNodeRow2] = useState(randomNodeRowArray[1]);
  const [startNodeCol2, setStartNodeCol2] = useState(randomNodeColArray[1]);

  const [startNodeRow3, setStartNodeRow3] = useState(randomNodeRowArray[2]);
  const [startNodeCol3, setStartNodeCol3] = useState(randomNodeColArray[2]);

  const [startNodeRow4, setStartNodeRow4] = useState(randomNodeRowArray[3]);
  const [startNodeCol4, setStartNodeCol4] = useState(randomNodeColArray[3]);

  const [goalNodeRow, setGoalNodeRow] = useState(randomNodeRowArray[4]);
  const [goalNodeCol, setGoalNodeCol] = useState(randomNodeColArray[4]);

  const [numStartNodes, setStartNumNodes] = useState(4);

  const [savedGrid1, setSavedGrid1] = useState([]);
  const [savedGrid2, setSavedGrid2] = useState([]);
  const [savedGrid3, setSavedGrid3] = useState([]);
  const [savedGrid4, setSavedGrid4] = useState([]);

  const [gridLayout, setGridLayout] = useState([]);

  useEffect(() => {
    createGrid();
  }, [rowCount, colCount]);

  const createGrid = () => {
    let gridsForAllStartNodes = [];

    const wallDensity = Math.floor(rowCount * colCount * 0.5);

    const walls = new Set();

    while (walls.size !== wallDensity) {
      walls.add([
        Math.floor(Math.random() * rowCount),
        Math.floor(Math.random() * colCount),
      ]);
    }

    for (let i = 0; i < numStartNodes; i++) {
      const grid = new Array(rowCount);

      for (let row = 0; row < rowCount; row++) {
        grid[row] = new Array(colCount);
      }

      createNodeMatrix(grid);

      setGridLayout(grid);

      createWalls(grid, walls);

      createAdjacentNodeMatrix(grid);

      gridsForAllStartNodes.push(grid);
    }

    setSavedGrid1(gridsForAllStartNodes[0]);
    setSavedGrid2(gridsForAllStartNodes[1]);
    setSavedGrid3(gridsForAllStartNodes[2]);
    setSavedGrid4(gridsForAllStartNodes[3]);
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

  const createWalls = (grid, walls) => {
    walls.forEach((element) => {
      grid[element[0]][element[1]].isWall = true;
    });
    grid[startNodeRow1][startNodeCol1].isWall = false;
    grid[startNodeRow2][startNodeCol2].isWall = false;
    grid[startNodeRow3][startNodeCol3].isWall = false;
    grid[startNodeRow4][startNodeCol4].isWall = false;
    grid[goalNodeRow][goalNodeCol].isWall = false;
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
                isStartNode3,
                isStartNode4,
                isGoalNode,
                isWall,
              } = col;
              return (
                <Node
                  key={colIndex}
                  isStartNode1={isStartNode1}
                  isStartNode2={isStartNode2}
                  isStartNode3={isStartNode3}
                  isStartNode4={isStartNode4}
                  isGoalNode={isGoalNode}
                  row={rowIndex}
                  col={colIndex}
                  isWall={isWall}
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
    this.isStartNode3 =
      this.row === startNodeRow3 &&
      this.col === startNodeCol3 &&
      numStartNodes >= 3;
    this.isStartNode4 =
      this.row === startNodeRow4 &&
      this.col === startNodeCol4 &&
      numStartNodes >= 4;
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

  const calculatePaths = () => {
    var grid1 = savedGrid1;
    var grid2 = savedGrid2;
    var grid3 = savedGrid3;
    var grid4 = savedGrid4;

    var gridStartMap = {
      1: grid1[startNodeRow1][startNodeCol1],
      2: grid2[startNodeRow2][startNodeCol2],
    };

    var gridGoalMap = {
      1: grid1[goalNodeRow][goalNodeCol],
      2: grid2[goalNodeRow][goalNodeCol],
    };

    if (grid3) {
      gridStartMap[3] = grid3[startNodeRow3][startNodeCol3];
      gridGoalMap[3] = grid3[goalNodeRow][goalNodeCol];
      if (grid4) {
        gridStartMap[4] = grid4[startNodeRow4][startNodeCol4];
        gridGoalMap[4] = grid4[goalNodeRow][goalNodeCol];
      }
    }

    let algoMap = {};
    let algoPathLengths = [];
    let algoPathCompleted = [];

    for (let i = 1; i < numStartNodes + 1; i++) {
      let algoType = Math.floor(Math.random() * 6);
      // let algoType = 5;
      switch (algoType) {
        case 0:
          var algo = Astar(gridStartMap[i], gridGoalMap[i]);
          break;
        case 1:
          var algo = BidirectionalSearch(gridStartMap[i], gridGoalMap[i]);
          break;
        case 2:
          var algo = BreadthFirstSearch(gridStartMap[i], gridGoalMap[i]);
          break;
        case 3:
          var algo = DepthFirstSearch(gridStartMap[i], gridGoalMap[i]);
          break;
        case 4:
          var algo = Dijkstra(gridStartMap[i], gridGoalMap[i]);
          break;
        case 5:
          var algo = GreedyBestFirstSearch(gridStartMap[i], gridGoalMap[i]);
          break;
        default:
          return;
      }
      algoMap[i] = algo;
      algoPathLengths.push(algo.path.length);
      if (algo.pathIsFound) {
        algoPathCompleted.push(algo.path.length);
      }
    }

    console.log(algoMap[1]);
    console.log(algoMap[2]);
    console.log(algoMap[3]);
    console.log(algoMap[4]);

    let pathMaxLength = Math.max(...algoPathLengths);
    let pathMinCompleted = Math.min(...algoPathCompleted);

    let anyPathFound = false;
    let minIndex = {};

    let lengthToDraw = 0;

    if (algoPathCompleted.length < 1) {
      lengthToDraw = pathMaxLength;
    } else {
      anyPathFound = true;
      lengthToDraw = pathMinCompleted;
      for (let [key, value] of Object.entries(algoMap)) {
        if (algoMap[key].pathIsFound) {
          if (algoMap[key].path.length === pathMinCompleted) {
            minIndex[key] = value;
          }
        }
      }
    }

    visualizePaths(algoMap, minIndex, lengthToDraw, anyPathFound);
  };

  const visualizePaths = (algoMap, minIndex, lengthToDraw, anyPathFound) => {
    for (let i = 0; i <= lengthToDraw; i++) {
      if (i === lengthToDraw) {
        if (anyPathFound) {
          setTimeout(() => {
            drawWinnerPath(minIndex);
          }, 50 * i);
        }
      } else {
        setTimeout(() => {
          if (algoMap[1].path.length > i) {
            const node = algoMap[1].path[i];
            document
              .getElementById(`node-${node.row}-${node.col}`)
              .classList.add("node-start-1", "node-current");
          }
          if (algoMap[2].path.length > i) {
            const node2 = algoMap[2].path[i];
            document
              .getElementById(`node-${node2.row}-${node2.col}`)
              .classList.add("node-start-2", "node-current");
          }
          if (algoMap[3]) {
            if (algoMap[3].path.length > i) {
              const node3 = algoMap[3].path[i];
              document
                .getElementById(`node-${node3.row}-${node3.col}`)
                .classList.add("node-start-3", "node-current");
            }
          }
          if (algoMap[4]) {
            if (algoMap[4].path.length > i) {
              const node4 = algoMap[4].path[i];
              document
                .getElementById(`node-${node4.row}-${node4.col}`)
                .classList.add("node-start-4", "node-current");
            }
          }
        }, 50 * i);
      }
    }
  };

  const drawWinnerPath = (winnerAlgoMap) => {
    for (let [key, value] of Object.entries(winnerAlgoMap)) {
      if (Object.keys(winnerAlgoMap).length === 1) {
        let path = winnerAlgoMap[key].pathToGoal;
        for (let i = 0; i < path.length; i++) {
          const node = path[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add(`node-winner-${key}`);
        }
      } else {
        let path = winnerAlgoMap[key].pathToGoal;
        for (let i = 0; i < path.length; i++) {
          const node = path[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add(`node-winner-tie`);
        }
      }
    }
  };

  return (
    <div>
      <button className="buttonContainer" onClick={calculatePaths}>
        VISUALIZE
      </button>
      <div className="gridContainer">{drawGrid}</div>
    </div>
  );
};
