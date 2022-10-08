import React, {
  useState,
  useEffect,
  useContext,
  forwardRef,
  useImperativeHandle,
  useTransition,
} from "react";
import { AppContext } from "../Helpers/AppContext";
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
  } = useContext(AppContext);

  //Hook to launch visualizer from GameMenu component
  useImperativeHandle(ref, () => ({
    visualize() {
      setVisIsOngoing(true);
      calculatePaths();
    },
  }));

  //"Loading Grid" message if grid takes too long to render
  const [isPending, startTransition] = useTransition();

  //Grids for every contending pathfinding algorithm
  const [savedGrid1, setSavedGrid1] = useState([]);
  const [savedGrid2, setSavedGrid2] = useState([]);
  const [savedGrid3, setSavedGrid3] = useState([]);
  const [savedGrid4, setSavedGrid4] = useState([]);

  //Stores the grid's dimensions
  const [gridLayout, setGridLayout] = useState([]);

  //Messagebox to show that visualizer has skipped visualizing the rest when no paths were found
  const [showNoPathFoundMsg, setShowNoPathFoundMsg] = useState(false);

  //Time until visualizer skips
  //100 turns = 5 seconds for fast visualizer setting
  const visualizerSkipTime = 100;

  //Randomize up to five unique row indices
  const createNodeRows = () => {
    const randomNodeRow = new Set();
    while (randomNodeRow.size < numStartNodes + 1) {
      randomNodeRow.add(Math.floor(Math.random() * rowCount));
    }
    const randomNodeArray = Array.from(randomNodeRow);
    return randomNodeArray;
  };

  //Randomize up to five unique columns indices
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

  //Assign uniquely randomized rows/column indices to Goal and Start Nodes
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
    startTransition(() => {
      createGrid();
    });
  }, []);

  const createGrid = () => {
    //Randomize which nodes (row, column) on the grid will be walls
    const wallDensity = Math.floor(rowCount * colCount * wallDensityValue);

    const walls = new Set();

    while (walls.size !== wallDensity) {
      walls.add([
        Math.floor(Math.random() * rowCount),
        Math.floor(Math.random() * colCount),
      ]);
    }

    const gridsForAllStartNodes = [];
    //Create same grid for every contending pathfinding algorithm
    for (let i = 0; i < numStartNodes; i++) {
      const grid = new Array(rowCount);

      for (let row = 0; row < rowCount; row++) {
        grid[row] = new Array(colCount);
      }

      createNodeMatrix(grid);
      setGridLayout(grid);
      createWalls(grid, walls);
      createAdjacentNodeList(grid);
      gridsForAllStartNodes.push(grid);
    }

    setSavedGrid1(gridsForAllStartNodes[0]);
    setSavedGrid2(gridsForAllStartNodes[1]);
    setSavedGrid3(gridsForAllStartNodes[2]);
    setSavedGrid4(gridsForAllStartNodes[3]);
  };

  //Create every node on the grid as a gridElement object with its corresponding row and column index
  const createNodeMatrix = (grid) => {
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        grid[row][col] = new gridElement(row, col);
      }
    }
  };

  //Add list of adjacent nodes to each node
  const createAdjacentNodeList = (grid) => {
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
    //Assure that Goal/Start Nodes do not become walls
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

  //Create grid on screen
  const drawGrid = (
    <div>
      {gridLayout.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const {
                //Props to assign correct color to special nodes
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

  //Values of every node in the grid
  function gridElement(row, col) {
    this.row = row;
    this.col = col;

    //Booleans to represent if node is Goal or Start Nodes
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

    this.isWall = false;

    //Boolean for whether or not 'Allow Diagonal Movement' setting has been turned on
    this.allowDiagonals = allowDiagonal;

    //Variable to mark if node has been visited by pathfinding algorithms
    this.isVisited = false;
    //Used by Bidirectional Search only
    this.isVisitedBidirectional = false;

    //Variable to store the node that led the pathfinding algorithm to this node
    //Will create a Linked List of nodes in order to draw connected path from Start Node to Goal Node onto the grid
    this.previousNode = undefined;
    //Used by Bidirectional Search only
    this.previousNodeBidirectional = undefined;

    //Default priority value for every node
    //Used for Priority Queue based pathfinding algorithms
    this.distance = Infinity;

    //List of node's adjacent nodes
    this.adjacentNodes = [];
    this.addAdjacentNodes = function (grid) {
      let row = this.row;
      let col = this.col;
      //Only adds non-wall adjacent nodes to the list
      if (row > 0 && !grid[row - 1][col].isWall)
        this.adjacentNodes.push(grid[row - 1][col]);
      if (row < rowCount - 1 && !grid[row + 1][col].isWall)
        this.adjacentNodes.push(grid[row + 1][col]);
      if (col > 0 && !grid[row][col - 1].isWall)
        this.adjacentNodes.push(grid[row][col - 1]);
      if (col < colCount - 1 && !grid[row][col + 1].isWall)
        this.adjacentNodes.push(grid[row][col + 1]);

      if (this.allowDiagonals) {
        //Adds diagonally adjacent non-wall nodes if setting is turned on
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

  //Function to launch pathfinding algorithms
  const calculatePaths = () => {
    var grid1 = savedGrid1;
    var grid2 = savedGrid2;
    var grid3 = savedGrid3;
    var grid4 = savedGrid4;

    //Create HashMaps storing each contender's Goal and Start Nodes (row, column)
    //Key corresponds to contender's number
    var gridStartMap = {
      1: grid1[startNodeRow1][startNodeCol1],
      2: grid2[startNodeRow2][startNodeCol2],
    };
    var gridGoalMap = {
      1: grid1[goalNodeRow][goalNodeCol],
      2: grid2[goalNodeRow][goalNodeCol],
    };
    if (grid3) {
      //If number of contestants are 3 or more
      gridStartMap[3] = grid3[startNodeRow3][startNodeCol3];
      gridGoalMap[3] = grid3[goalNodeRow][goalNodeCol];
      if (grid4) {
        //If number of contestants are 4
        gridStartMap[4] = grid4[startNodeRow4][startNodeCol4];
        gridGoalMap[4] = grid4[goalNodeRow][goalNodeCol];
      }
    }

    //HashMap to store every contender's result after pathfinding algorithms has executed
    //Key corresponds to contender's number
    let algoMap = {};

    //List to store how long the paths were for all contenders
    //(How many total nodes the pathfinding algorithms visited)
    let algoPathLengths = [];
    //List to store how long the paths were for all contenders who found the Goal Node
    let algoPathCompleted = [];

    for (let i = 1; i < algoList.length + 1; i++) {
      //Loop through all contenders in the field
      const algoType = algoList[i - 1];
      switch (algoType) {
        //Launch specific pathfinding algorithm assigned to contender
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
      //Save result of pathfinding algorithm in algoMap HashMap to corresponding key
      algoMap[i] = algo;
      //Save how many nodes the pathfinding algorithm visited
      algoPathLengths.push(algo.path.length);
      if (algo.pathIsFound) {
        //Save how many nodes the pathfinding algorithm visited if Goal Node was found
        algoPathCompleted.push(algo.path.length);
      }
    }

    //Console log every contender for debugging purposes
    // console.log(algoMap[1]);
    // console.log(algoMap[2]);
    // console.log(algoMap[3]);
    // console.log(algoMap[4]);

    //Longest path taken of all contending algorithms
    const pathMaxLength = Math.max(...algoPathLengths);
    //Shortest path taken of all contending algorithms who found the Goal Node
    const pathMinCompleted = Math.min(...algoPathCompleted);

    //HashMap storing the contender who found the Goal Node after visiting the least amount of nodes
    //(Incase there is a tie for first place)
    //Key corresponds to contender's number
    let minIndex = {};

    //Integer to determine how many "turns" the pathfinding visualizer should draw
    let lengthToDraw = 0;

    //If any contenders found the Goal Node
    let anyPathFound = false;

    if (algoPathCompleted.length < 1) {
      //If no contenders found the Goal Node
      //Visualize only the longest path taken by all contending algorithms if it's below visualizerSkipTime treshold
      lengthToDraw = Math.min(pathMaxLength, visualizerSkipTime);
    } else {
      anyPathFound = true;
      //If at least one contender found the Goal Node
      //Visualize until the first contender reaches the Goal Node
      lengthToDraw = pathMinCompleted;
      for (let [key, value] of Object.entries(algoMap)) {
        if (algoMap[key].pathIsFound) {
          if (algoMap[key].path.length === pathMinCompleted) {
            //Store the winning contender(s) path length with their corresponding number as key
            minIndex[key] = value;
          }
        }
      }
    }

    //Store the results of all contenders in calculatedAlgoMap useState
    setCalculatedAlgoMap({
      1: algoMap[1],
      2: algoMap[2],
      ...(algoMap[3] && { 3: algoMap[3] }), //If 3 or more contenders
      ...(algoMap[4] && { 4: algoMap[4] }), //If 4 contenders
    });

    //Execute visualizer
    visualizePaths(algoMap, minIndex, lengthToDraw, anyPathFound);
  };

  const visualizePaths = (algoMap, minIndex, lengthToDraw, anyPathFound) => {
    for (let i = 0; i <= lengthToDraw; i++) {
      //Every loop, the visualizer will draw one turn for all contending pathfinding algortihms
      if (i === lengthToDraw) {
        //The last node to get visualized
        if (anyPathFound) {
          //If any contender has reached the Goal Node
          setTimeout(() => {
            document
              .getElementById(`node-${goalNodeRow}-${goalNodeCol}`)
              .classList.remove(
                `node-${goalNodeRow}-${goalNodeCol}`,
                "node-current"
              );

            void document.getElementById(`node-${goalNodeRow}-${goalNodeCol}`)
              .offsetWidth;

            document
              .getElementById(`node-${goalNodeRow}-${goalNodeCol}`)
              .classList.add(
                `node-${goalNodeRow}-${goalNodeCol}`,
                "node-current"
              );

            drawWinnerPath(minIndex);
          }, visualizerSpeed * i);
        } else {
          //If no contender reached the Goal Node
          setTimeout(() => {
            setRenderWinnerMsg(true);
            setWinnerAlgo({ 5: "No Path Found" });
            if (lengthToDraw === visualizerSkipTime) {
              //Show messagebox saying rest of visualization was skipped
              setShowNoPathFoundMsg(true);
            }
            setVisIsOngoing(false);
            setVisIsFinished(true);
          }, visualizerSpeed * i);
        }
      } else {
        //For every turn except for last
        setTimeout(() => {
          if (algoMap[1].path.length > i) {
            //If visited by Contender 1 and Contender 1 still has turns to be visualized
            const node = algoMap[1].path[i];
            const classNames = document.getElementById(
              `node-${node.row}-${node.col}`
            ).className;
            //Add new visual background color based on contender to current node
            const newClass = getNewNodeClass(1, classNames);

            //Add animation to show which node was just visited
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
            //If visited by Contender 2 and Contender 2 still has turns to be visualized
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
            //If there are 3 or more contenders
            if (algoMap[3].path.length > i) {
              //If visited by Contender 3 and Contender 3 still has turns to be visualized
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
            //If there are 4 contenders
            if (algoMap[4].path.length > i) {
              //If visited by Contender 4 and Contender 4 still has turns to be visualized
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
        }, visualizerSpeed * i); //Add timeout based on Visualizer Speed setting between every turn
      }
    }
  };

  //Draw the connecting path from Start Node to Goal Node for the winner(s)
  const drawWinnerPath = (winnerAlgoMap) => {
    for (let [key, value] of Object.entries(winnerAlgoMap)) {
      if (Object.keys(winnerAlgoMap).length === 1) {
        //If there is only one winner
        let path = winnerAlgoMap[key].pathToGoal;
        for (let i = 0; i < path.length; i++) {
          setWinnerAlgo({ [key]: winnerAlgoMap[key].algoName });
          setRenderWinnerMsg(true);
          setVisIsFinished(true);
          setVisIsOngoing(false);
          //Add border in color corresponding to contender
          const node = path[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add(`node-winner-${key}`);
        }
      } else {
        //If there is a tie
        let path = winnerAlgoMap[key].pathToGoal;
        for (let i = 0; i < path.length; i++) {
          //Store all winning contenders in winnerAlgo useState
          setWinnerAlgo((prevState) => ({
            ...prevState,
            [key]: winnerAlgoMap[key].algoName,
          }));
          setRenderWinnerMsg(true);
          setVisIsFinished(true);
          setVisIsOngoing(false);
          //Add dark grey border to every winning contender
          const node = path[i];
          document
            .getElementById(`node-${node.row}-${node.col}`)
            .classList.add(`node-winner-tie`);
        }
      }
    }
  };

  //Function to return new 'node-visited' CSS class based on which contenders the node has already been visited by
  function getNewNodeClass(algoNum, classNames) {
    switch (algoNum) {
      //---Examples for case 1 only---
      case 1:
        //When the contender visiting the current node is Contender 1
        if (classNames.includes("2")) {
          //If the current node has already been visited by Contender 2
          if (classNames.includes("3")) {
            //If the current node has already been visited by Contender 2 and Contender 3
            if (classNames.includes("4")) {
              //If the current node has already been visited by Contender 2, Contender 3 and Contender 4
              return "node-visited-1-2-3-4";
            }
            return "node-visited-1-2-3";
          }
          if (classNames.includes("4")) {
            //If the current node has already been visited by Contender 2 and Contender 4
            return "node-visited-1-2-4";
          }
          return "node-visited-1-2";
        }
        if (classNames.includes("3")) {
          //If the current node has already been visited by Contender 3
          if (classNames.includes("4")) {
            //If the current node has already been visited by Contender 3 and Contender 4
            return "node-visited-1-3-4";
          }
          return "node-visited-1-3";
        }
        if (classNames.includes("4")) {
          //If the current node has already been visited by Contender 4
          return "node-visited-1-4";
        }
        //If the current node has not previously been visited by any other contender
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
      {/* Draw "Loading Grid" message if grid takes too long to load */}
      {isPending ? (
        <div className="loadingContainer">
          Loading Grid...<div className="loadingGridSpinner"></div>
        </div>
      ) : (
        <div className="gridContainer">{drawGrid}</div>
      )}
    </div>
  );
});
