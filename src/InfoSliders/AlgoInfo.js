export const AlgoInfo = [
  {
    id: "SLIDER-INFO-1",
    title: <h1 className="infoTitle">Information</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">About</h2>
        <p>
          <div className="specialInfoText">
            This is a pathfinding visualizer where multiple pathfinding
            algorithms will race to the goal node, and you get to guess which
            algorithm will reach the goal node first!
          </div>
          <br />
          <br />
          The entire grid is randomized. The walls, the goal node, and the
          starting positions of every "contender" is different every map. Every
          "contender" also gets randomly assigned one of six different
          pathfinding algorithms.
          <br />
          <br />
          You can read more about all six implemented pathfinding algorithms in
          the following slides!
        </p>
        <h2 className="infoSubTitle">How To Play</h2>
        <p>The contending algorithms do not affect each other in any way</p>
      </>
    ),
  },
  {
    id: "SLIDER-INFO-2",
    title: <h1 className="infoTitle">Additional Information</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Pathfinding Algorithms</h2>
        <p>
          The six pathfinding algorithms implemented in this app are{" "}
          <div className="specialInfoText">
            Breadth First Search, Depth First Search, Dijkstra's Algortihm,
            <br /> A-Star Search, Greedy Best-First Search and Bidirectional
            Search.
          </div>
          <br />
          <br />
          An important thing to note 
          <br />
          <br />
        </p>
        <h2 className="infoSubTitle">Settings Menu</h2>
        <p>
          You can access the Settings menu by clicking the 'Settings' button.
          <br />
          <br />
          There you can customize the dimensions of the grid, how many different
          contending algorithms there are, the amount of walls, the speed of the
          visualizer and wether or not diagonal movement is allowed.
          <br />
          <br />
          You can also disable specific pathfinding algorithms from being
          randomly selected.
        </p>
      </>
    ),
  },
  {
    id: "SLIDER-NODES-INFO",
    title: <h1 className="infoTitle">Nodes</h1>,
    text: (
      <>
        <h2 className="infoSubTitle infoSubTitleNodes">Start Nodes</h2>
        <p>
          <div className="specialInfoText">
            These nodes are the start nodes:
          </div>{" "}
          <div className="node node-visited-1 node-start-1 titleBarNode infoNode">
            1
          </div>{" "}
          <div className="node node-visited-2 node-start-2 titleBarNode infoNode">
            2
          </div>{" "}
          <div className="node node-visited-3 node-start-3 titleBarNode infoNode">
            3
          </div>{" "}
          <div className="node node-visited-4 node-start-4 titleBarNode infoNode">
            4
          </div>
          <br />
          Each start node will get assigned a random pathfinding algorithm. The
          visualizer will draw out the paths the algorithms take from their
          respective start nodes in the same color. <br />
          <br />
          Start nodes are not considered impassable by other algorithms.
        </p>
        <h2 className="infoSubTitle infoSubTitleNodes">Goal Node</h2>
        <p>
          <div className="specialInfoText">This node is the goal node:</div>{" "}
          <div className="node node-goal titleBarNode infoNode">G</div>
          <br />
          The visualizer will stop when the first algorithm reaches the goal
          node. <br />
          <br />
          If no algorithms can find the goal node, the visualizer will stop
          after five seconds has passed, in order to not waste time simulating
          every node being visited.
        </p>
        <h2 className="infoSubTitle infoSubTitleNodes">Walls</h2>
        <p>
          <div className="specialInfoText">
            These darker nodes are wall nodes:
          </div>{" "}
          <div className="node node-wall infoNode"></div>
          <br />
          Pathfinding algorithms can not pass through these nodes. <br />
          <br />
          If 'Allow Diagonal Movement' setting is turned on, pathfinding
          algorithms can still not diagonally "skip" through two walls placed
          diagonally adjacent to each other.
        </p>
      </>
    ),
  },
  {
    id: "SLIDER-BFS",
    title: <h1 className="infoTitle">Breadth First Search</h1>,
    text: (
      <>
        Breadth First SearchBreadth First SearchBreadth First Search Breadth
        First SearchBreadth First SearchBreadth First SearchBreadth First Search
        Breadth First SearchBreadth First SearchBreadth First SearchBreadth
        First SearchBreadth First SearchBreadth First SearchBreadth First
        SearchBreadth First Search Breadth First Search
      </>
    ),
  },
  {
    id: "SLIDER-DFS",
    title: <h1 className="infoTitle">Depth First Search</h1>,
    text: (
      <>
        Depth First Search Depth First Search Depth First Search Depth First
        SearchDepth First SearchDepth First SearchDepth First Search Depth First
        Search Depth First SearchDepth First SearchDepth First Search Depth
        First SearchDepth First SearchvvDepth First Searchvv
      </>
    ),
  },
  {
    id: "SLIDER-DIJKSTRA",
    title: <h1 className="infoTitle">Dijkstra's Algorithm</h1>,
    text: (
      <>
        Dijkstra's Algoritm Dijkstra's Algoritm Dijkstra's Algoritm Dijkstra's
        AlgoritmDijkstra's AlgoritmDijkstra's AlgoritmDijkstra's
        AlgoritmDijkstra's AlgoritmDijkstra's Algoritm Dijkstra's Algoritm
        Dijkstra's Algoritm Dijkstra's Algoritm v Dijkstra's AlgoritmDijkstra's
        AlgoritmDijkstra's Algoritm
      </>
    ),
  },
  {
    id: "SLIDER-ASTAR",
    title: <h1 className="infoTitle">A-Star Search</h1>,
    text: (
      <>
        A-Star SearchA-Star SearchA-Star SearchA-Star SearchA-Star SearchA-Star
        SearchA-Star SearchA-Star SearchA-Star SearchA-Star Search A-Star
        SearchA-Star SearchA-Star SearchA-Star Search A-Star SearchA-Star
        SearchA-Star SearchA-Star SearchA-Star Search A-Star Search A-Star
        Search
      </>
    ),
  },
  {
    id: "SLIDER-GBFS",
    title: <h1 className="infoTitle">Greedy Best-First Search</h1>,
    text: (
      <>
        Greedy Best-First SearchGreedy Best-First SearchGreedy Best-First
        SearchGreedy Best-First Search Greedy Best-First Search Greedy
        Best-First Search Greedy Best-First SearchGreedy Best-First SearchGreedy
        Best-First SearchGreedy Best-First SearchGreedy Best-First SearchGreedy
        Best-First SearchGreedy Best-First SearchGreedy Best-First Search
      </>
    ),
  },
  {
    id: "SLIDER-BIDIR",
    title: <h1 className="infoTitle">Bidirectional Search</h1>,
    text: (
      <>
        Bidirectional SearchBidirectional SearchBidirectional
        SearchBidirectional SearchBidirectional SearchBidirectional
        SearchBidirectional SearchBidirectional SearchBidirectional
        SearchBidirectional SearchBidirectional SearchBidirectional
        SearchBidirectional SearchBidirectional SearchBidirectional
        SearchBidirectional SearchBidirectional SearchBidirectional
        SearchBidirectional SearchBidirectional SearchBidirectional
        SearchBidirectional SearchBidirectional SearchBidirectional
        SearchBidirectional Search
      </>
    ),
  },
];
