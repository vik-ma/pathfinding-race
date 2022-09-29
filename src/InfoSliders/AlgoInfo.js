export const AlgoInfo = [
  {
    id: "SLIDER-INFO-1",
    title: <h1 className="infoTitle">Information</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">About</h2>
        <p>
          <strong>
            This is a pathfinding visualizer where multiple pathfinding
            algorithms will race to the Goal Node, and you get to guess which
            one will win!
          </strong>{" "}
          The algorithm that finds the Goal Node after visiting the least amount
          nodes wins!
          <br />
          <br />
          The entire grid is randomized. The walls, the goal node, and the
          starting positions of every "contender" is different every map. Every
          "contender" also gets randomly assigned one out of six different
          pathfinding algorithms.
          <br />
          <br />
          You can read more about the six implemented pathfinding algorithms in
          the following slides!
        </p>
        <br />
        <h2 className="infoSubTitle">How To Play</h2>
        <p>
          <strong>
            Simply click on the contender you will think win listed above the
            grid and the visualizer will start!
          </strong>{" "}
          Your choice will be marked in golden-beige color, and once the
          visualizer finishes, the correct choice will get marked in green.
          <br />
          <br />
          <strong>
            Click the 'New Map' button to generate a fresh new randomized grid
            and play again!
          </strong>
          <br />
          <br />
          If you don't want to make a prediction, click the 'Just Visualize'
          button to just watch the match unfold instead.
          <br />
          <br />
          The contending algorithms do not affect each other in any way, and if
          one node gets visited by more than one contender, the node will split
          its coloring to represent every visited contender.
        </p>
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
          The six pathfinding algorithms implemented in this app are <br />
          <strong>
            Breadth First Search, Depth First Search, Dijkstra's Algortihm,
            <br /> A-Star Search, Greedy Best-First Search
          </strong>{" "}
          and <strong>Bidirectional Search.</strong>
          <br />
          <br />
          The grid is an unweighted graph, which means the distance to every
          immediately adjacent node is always the same. If the 'Allow Diagonal
          Movement' setting is turned on, diagonally adjacent nodes will carry
          the same distance as the adjacent nodes in one of the four cardinal
          directions.
          <br />
          <br />
          An important thing to note is the order of which adjacent nodes the
          pathfinding algorithms will go through. In this app, the order is as
          follows:{" "}
          <strong>
            North, South, West, East, North-West, South-West, South-East,
            North-East.
          </strong>{" "}
          For some algorithms, this will have very little to no impact, but{" "}
          <strong>
            this does completely determine the paths which the Depth First
            Search algorithm takes.
          </strong>
        </p>
        <br />
        <h2 className="infoSubTitle">Settings Menu</h2>
        <p>
          You can access the Settings menu by clicking the 'Settings' button.
          <br />
          <br />
          In the Settings menu,{" "}
          <strong>
            you can customize the dimensions of the grid, how many different
            contending algorithms there are, the amount of walls, the speed of
            the visualizer and whether or not diagonal movement is allowed.
          </strong>
          <br />
          <br />
          You can also disable specific pathfinding algorithms from being
          assigned to the contenders.
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
          <strong>These nodes are the start nodes:</strong>
        </p>{" "}
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
        <p>
          Each contender will get assigned a random pathfinding algorithm. The
          visualizer will draw out the paths the algorithms take from their
          respective start nodes in the same color. <br />
          <br />
          Start nodes are not considered impassable by other algorithms.
        </p>
        <br />
        <h2 className="infoSubTitle infoSubTitleNodes">Goal Node</h2>
        <p>
          <strong>This node is the goal node:</strong>
        </p>{" "}
        <div className="node node-goal titleBarNode infoNode">G</div>
        <br />
        <p>
          The visualizer will stop when the first algorithm reaches the goal
          node. <br />
          <br />
          If no algorithms can find the goal node, the visualizer will stop
          after five seconds has passed, in order to not waste time simulating
          every node being visited.
        </p>
        <br />
        <h2 className="infoSubTitle infoSubTitleNodes">Walls</h2>
        <p>
          <strong>These darker nodes are wall nodes:</strong>
        </p>{" "}
        <div className="node node-wall infoNode"></div>
        <p>
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
        <h2 className="infoSubTitle">Description</h2>
        <p>
          The Breadth First Search algorithm traverses the grid using a queue
          system.
        </p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p>
          Beginning from the start node, every non-wall adjacent node gets added
          into a queue. <br />
          Then, the first node added to the queue gets popped out of the queue.{" "}
          <br />
          The node is marked as visited and checked if it is the Goal Node, if
          not, all of it's non-wall, non-visited adjacent nodes will be added to
          the back of the queue. <br />
          After that, the first node in the queue gets popped out again and the
          process is repeated until the Goal Node is found, or there are no more
          connected nodes to explore (Goal Node is not reachable).
          <br />
          <br />
          In practice, this means that the algorithm will traverse the grid
          "layer by layer" out from the start node.
        </p>
        <h2 className="infoSubTitle">Performance</h2>
        <p>
          Breadth First Search is a very slow on average, as no optimizations or
          heuristics are being done to alter the direction it takes when
          searching for the Goal Node.
          <br />
          <br />
          On average, Breadth First Search is, along with Dijkstra's Algorithm
          the slowest pathfinding algorithm implemented in this app.
        </p>
      </>
    ),
  },
  {
    id: "SLIDER-DFS",
    title: <h1 className="infoTitle">Depth First Search</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Description</h2>
        <p></p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p></p>
        <h2 className="infoSubTitle">Performance</h2>
        <p></p>
      </>
    ),
  },
  {
    id: "SLIDER-DIJKSTRA",
    title: <h1 className="infoTitle">Dijkstra's Algorithm</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Description</h2>
        <p></p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p></p>
        <h2 className="infoSubTitle">Performance</h2>
        <p></p>
      </>
    ),
  },
  {
    id: "SLIDER-ASTAR",
    title: <h1 className="infoTitle">A-Star Search</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Description</h2>
        <p></p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p></p>
        <h2 className="infoSubTitle">Performance</h2>
        <p></p>
      </>
    ),
  },
  {
    id: "SLIDER-GBFS",
    title: <h1 className="infoTitle">Greedy Best-First Search</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Description</h2>
        <p></p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p></p>
        <h2 className="infoSubTitle">Performance</h2>
        <p></p>
      </>
    ),
  },
  {
    id: "SLIDER-BIDIR",
    title: <h1 className="infoTitle">Bidirectional Search</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Description</h2>
        <p></p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p></p>
        <h2 className="infoSubTitle">Performance</h2>
        <p></p>
      </>
    ),
  },
];
