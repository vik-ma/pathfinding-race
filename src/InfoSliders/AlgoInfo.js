export const AlgoInfo = [
  {
    id: "SLIDER-DEFAULT",
    title: <h1 className="infoTitle">Information</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Pathfinding Algorithms</h2>
        <p>asd</p>
        <h2 className="infoSubTitle">Start Nodes</h2>
        <p>
          These nodes are the start nodes:{" "}
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
          start nodes are not considered impassable by other algorithms and the
          different algorithms will not affect each other in any way.
        </p>
        <h2 className="infoSubTitle">Goal Node</h2>
        <p>asd</p>
        <h2 className="infoSubTitle">Walls</h2>
        <p>
          These darker nodes are wall nodes:{" "}
          <div className="node node-wall infoNode"></div>
          <br />
          Pathfinding algorithms can not pass through these nodes. <br />
          They also can not skip through two wall nodes placed diagonally next
          to each other if 'Allow Diagonal Movement' setting is turned on.
        </p>
        <h2 className="infoSubTitle">Settings</h2>
        <p>
          TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
          TEST TEST TEST TEST
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