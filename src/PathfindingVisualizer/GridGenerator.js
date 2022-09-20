import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { GridContext } from "../Helpers/GridContexts";
import { Node } from "./Node";
import { BreadthFirstSearch } from "../Algorithms/BreadthFirstSearch";
import { DepthFirstSearch } from "../Algorithms/DepthFirstSearch";
import { Dijkstra } from "../Algorithms/Dijkstra";
import { Astar } from "../Algorithms/Astar";
import { GreedyBestFirstSearch } from "../Algorithms/GreedyBestFirstSearch";
import { BidirectionalSearch } from "../Algorithms/BidirectionalSearch";

export const GridGenerator = forwardRef((props, ref) => {
  const {
    rowCount,
    colCount,
    numStartNodes,
    wallDensityValue,
    algoList,
    setWinnerAlgo,
    setRenderWinnerMsg,
    setCalculatedAlgoMap,
    allowDiagonal,
    visualizerSpeed,
    setVisIsFinished,
    setVisIsOngoing,
  } = useContext(GridContext);

  useImperativeHandle(ref, () => ({
    visualize() {
      setVisIsOngoing(true);
      calculatePaths();
    },
  }));

  const [savedGrid1, setSavedGrid1] = useState([]);
  const [savedGrid2, setSavedGrid2] = useState([]);
  const [savedGrid3, setSavedGrid3] = useState([]);
  const [savedGrid4, setSavedGrid4] = useState([]);

  const [gridLayout, setGridLayout] = useState([]);

  const [showNoPathFoundMsg, setShowNoPathFoundMsg] = useState(false);
  //100 = 5 seconds
  const visualizerSkipTime = 100;

  const createNodeRows = () => {
    const randomNodeRow = new Set();

    while (randomNodeRow.size < numStartNodes + 1) {
      randomNodeRow.add(Math.floor(Math.random() * rowCount));
    }
    const randomNodeArray = Array.from(randomNodeRow);
    return randomNodeArray;
  };

  const createNodeCols = () => {
    const randomNodeCol = new Set();

    while (randomNodeCol.size < numStartNodes + 1) {
      randomNodeCol.add(Math.floor(Math.random() * colCount));
    }
    const randomNodeColArray = Array.from(randomNodeCol);
    return randomNodeColArray;
  };

  const [randomNodeRowArray] = useState(createNodeRows());
  const [randomNodeColArray] = useState(createNodeCols());

  const [goalNodeRow] = useState(randomNodeRowArray[0]);
  const [goalNodeCol] = useState(randomNodeColArray[0]);
  const [startNodeRow1] = useState(randomNodeRowArray[1]);
  const [startNodeCol1] = useState(randomNodeColArray[1]);
  const [startNodeRow2] = useState(randomNodeRowArray[2]);
  const [startNodeCol2] = useState(randomNodeColArray[2]);
  const [startNodeRow3] = useState(randomNodeRowArray[3]);
  const [startNodeCol3] = useState(randomNodeColArray[3]);
  const [startNodeRow4] = useState(randomNodeRowArray[4]);
  const [startNodeCol4] = useState(randomNodeColArray[4]);

  useEffect(() => {
    createGrid();
  }, []);

  const createGrid = () => {
    let gridsForAllStartNodes = [];

    const wallDensity = Math.floor(rowCount * colCount * wallDensityValue);

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
    grid[goalNodeRow][goalNodeCol].isWall = false;
    grid[startNodeRow1][startNodeCol1].isWall = false;
    grid[startNodeRow2][startNodeCol2].isWall = false;
    if (numStartNodes > 2) {
      grid[startNodeRow3][startNodeCol3].isWall = false;
      if (numStartNodes > 3) {
        grid[startNodeRow4][startNodeCol4].isWall = false;
      }
    }
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

    this.allowDiagonals = allowDiagonal;
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

    for (let i = 1; i < algoList.length + 1; i++) {
      let algoType = algoList[i - 1];
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
          var algo = GreedyBestFirstSearch(
            gridStartMap[i],
            gridGoalMap[i],
            rowCount * colCount
          );
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
      lengthToDraw = Math.min(pathMaxLength, visualizerSkipTime);
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

    setCalculatedAlgoMap({
      1: algoMap[1],
      2: algoMap[2],
      ...(algoMap[3] && { 3: algoMap[3] }),
      ...(algoMap[4] && { 4: algoMap[4] }),
    });

    visualizePaths(algoMap, minIndex, lengthToDraw, anyPathFound);
  };

  const visualizePaths = (algoMap, minIndex, lengthToDraw, anyPathFound) => {
    for (let i = 0; i <= lengthToDraw; i++) {
      if (i === lengthToDraw) {
        if (anyPathFound) {
          setTimeout(() => {
            drawWinnerPath(minIndex);
          }, visualizerSpeed * i);
        } else {
          setTimeout(() => {
            setRenderWinnerMsg(true);
            setWinnerAlgo({ 5: "No Path Found" });
            if (lengthToDraw === visualizerSkipTime) {
              setShowNoPathFoundMsg(true);
            }
            setVisIsOngoing(false);
            setVisIsFinished(true);
          }, visualizerSpeed * i);
        }
      } else {
        setTimeout(() => {
          if (algoMap[1].path.length > i) {
            const node = algoMap[1].path[i];
            const classNames = document.getElementById(
              `node-${node.row}-${node.col}`
            ).className;
            const newClass = getNewNodeClass(1, classNames);

            document
              .getElementById(`node-${node.row}-${node.col}`)
              .classList.remove(newClass, "node-current");

            void document.getElementById(`node-${node.row}-${node.col}`)
              .offsetWidth;

            document
              .getElementById(`node-${node.row}-${node.col}`)
              .classList.add(newClass, "node-current");
          }
          if (algoMap[2].path.length > i) {
            const node2 = algoMap[2].path[i];
            const classNames = document.getElementById(
              `node-${node2.row}-${node2.col}`
            ).className;
            const newClass = getNewNodeClass(2, classNames);

            document
            .getElementById(`node-${node2.row}-${node2.col}`)
            .classList.remove(newClass, "node-current");

          void document.getElementById(`node-${node2.row}-${node2.col}`)
            .offsetWidth;

            document
              .getElementById(`node-${node2.row}-${node2.col}`)
              .classList.add(newClass, "node-current");
          }
          if (algoMap[3]) {
            if (algoMap[3].path.length > i) {
              const node3 = algoMap[3].path[i];
              const classNames = document.getElementById(
                `node-${node3.row}-${node3.col}`
              ).className;
              const newClass = getNewNodeClass(3, classNames);

              document
              .getElementById(`node-${node3.row}-${node3.col}`)
              .classList.remove(newClass, "node-current");

            void document.getElementById(`node-${node3.row}-${node3.col}`)
              .offsetWidth;

              document
                .getElementById(`node-${node3.row}-${node3.col}`)
                .classList.add(newClass, "node-current");
            }
          }
          if (algoMap[4]) {
            if (algoMap[4].path.length > i) {
              const node4 = algoMap[4].path[i];
              const classNames = document.getElementById(
                `node-${node4.row}-${node4.col}`
              ).className;
              const newClass = getNewNodeClass(4, classNames);

              document
              .getElementById(`node-${node4.row}-${node4.col}`)
              .classList.remove(newClass, "node-current");

            void document.getElementById(`node-${node4.row}-${node4.col}`)
              .offsetWidth;

              document
                .getElementById(`node-${node4.row}-${node4.col}`)
                .classList.add(newClass, "node-current");
            }
          }
        }, visualizerSpeed * i);
      }
    }
  };

  const drawWinnerPath = (winnerAlgoMap) => {
    for (let [key, value] of Object.entries(winnerAlgoMap)) {
      if (Object.keys(winnerAlgoMap).length === 1) {
        let path = winnerAlgoMap[key].pathToGoal;
        for (let i = 0; i < path.length; i++) {
          if (i === path.length - 1) {
            setWinnerAlgo({ [key]: winnerAlgoMap[key].algoName });
            setRenderWinnerMsg(true);
            setVisIsFinished(true);
            setVisIsOngoing(false);
          }
          const node = path[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add(`node-winner-${key}`);
        }
      } else {
        let path = winnerAlgoMap[key].pathToGoal;
        for (let i = 0; i < path.length; i++) {
          if (i === path.length - 1) {
            setWinnerAlgo((prevState) => ({
              ...prevState,
              [key]: winnerAlgoMap[key].algoName,
            }));
            setRenderWinnerMsg(true);
            setVisIsFinished(true);
            setVisIsOngoing(false);
          }
          const node = path[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add(`node-winner-tie`);
        }
      }
    }
  };

  function getNewNodeClass(algoNum, classNames) {
    switch (algoNum) {
      case 1:
        if (classNames.includes("2")) {
          if (classNames.includes("3")) {
            if (classNames.includes("4")) {
              return "node-visited-1-2-3-4";
            }
            return "node-visited-1-2-3";
          }
          if (classNames.includes("4")) {
            return "node-visited-1-2-4";
          }
          return "node-visited-1-2";
        }
        if (classNames.includes("3")) {
          if (classNames.includes("4")) {
            return "node-visited-1-3-4";
          }
          return "node-visited-1-3";
        }
        if (classNames.includes("4")) {
          return "node-visited-1-4";
        }
        return "node-visited-1";
      case 2:
        if (classNames.includes("1")) {
          if (classNames.includes("3")) {
            if (classNames.includes("4")) {
              return "node-visited-1-2-3-4";
            }
            return "node-visited-1-2-3";
          }
          if (classNames.includes("4")) {
            return "node-visited-1-2-4";
          }
          return "node-visited-1-2";
        }
        if (classNames.includes("3")) {
          if (classNames.includes("4")) {
            return "node-visited-2-3-4";
          }
          return "node-visited-2-3";
        }
        if (classNames.includes("4")) {
          return "node-visited-2-4";
        }
        return "node-visited-2";
      case 3:
        if (classNames.includes("1")) {
          if (classNames.includes("2")) {
            if (classNames.includes("4")) {
              return "node-visited-1-2-3-4";
            }
            return "node-visited-1-2-3";
          }
          if (classNames.includes("4")) {
            return "node-visited-1-3-4";
          }
          return "node-visited-1-3";
        }
        if (classNames.includes("2")) {
          if (classNames.includes("4")) {
            return "node-visited-2-3-4";
          }
          return "node-visited-2-3";
        }
        if (classNames.includes("4")) {
          return "node-visited-3-4";
        }
        return "node-visited-3";
      case 4:
        if (classNames.includes("1")) {
          if (classNames.includes("2")) {
            if (classNames.includes("3")) {
              return "node-visited-1-2-3-4";
            }
            return "node-visited-1-2-4";
          }
          if (classNames.includes("3")) {
            return "node-visited-1-3-4";
          }
          return "node-visited-1-4";
        }
        if (classNames.includes("2")) {
          if (classNames.includes("3")) {
            return "node-visited-2-3-4";
          }
          return "node-visited-2-4";
        }
        if (classNames.includes("3")) {
          return "node-visited-3-4";
        }
        return "node-visited-4";
      default:
        return;
    }
  }

  return (
    <div>
      {showNoPathFoundMsg ? (
        <div className="noPathFoundContainer">
          <div className="noPathFoundMsg">
            No paths found, rest of visualization skipped.
          </div>
        </div>
      ) : null}
      <div className="gridContainer">{drawGrid}</div>
    </div>
  );
});
