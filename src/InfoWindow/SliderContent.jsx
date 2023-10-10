//Array where every element is an object storing the Title and Content of every slide in InfoWindow
export const SliderContent = [
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
          starting positions of every contending algorithm is different every
          map. Every contender is randomly assigned one out of six different
          pathfinding algorithms.
          <br />
          <br />
          <strong>
            You can read more about the six implemented pathfinding algorithms
            in the following slides!
          </strong>
        </p>
        <h2 className="infoSubTitle">How To Play</h2>
        <p>
          <strong>
            Simply click on the contender you think will win in the list above
            the grid and the visualizer will start!
          </strong>{" "}
          Your choice will be marked in golden-beige color, and once the
          visualizer finishes, the correct choice will be marked in green.
          <br />
          <br />
          <strong>
            Click the 'New Map' button to generate a new randomized grid and
            play again!
          </strong>
          <br />
          <br />
          If you don't want to make a prediction, click the 'Just Visualize'
          button to just watch the match unfold instead.
          <br />
          <br />
          The contending algorithms do not affect each other in any way, and if
          a node on the grid gets visited by more than one contender, the node
          will split its coloring to represent every visited contender.
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
            Breadth First Search, Depth First Search, Dijkstra's Algorithm,
            <br /> A-Star Search, Greedy Best-First Search
          </strong>{" "}
          and <strong>Bidirectional Search.</strong>
          <br />
          <br />
          The grid is an unweighted graph, which means the distance to every
          immediately adjacent node is always the same. If the 'Allow Diagonal
          Movement' setting is turned on, diagonally adjacent nodes will also
          carry the same distance.
          <br />
          <br />
          An important thing to note is how the pathfinding algorithms will
          choose which adjacent node to visit first, and in what order the rest
          are visited. <br />
          In this app, the order is as follows:{" "}
          <strong>
            North, South, West, East, North-West, South-West, South-East,
            North-East.
          </strong>{" "}
          <br />
          For some pathfinding algorithms, this will have very little to no
          impact, but{" "}
          <strong>
            for Depth First Search, this completely determines the path it will
            take.
          </strong>
        </p>
        <h2 className="infoSubTitle">Settings Menu</h2>
        <p>
          You can access the Settings menu by clicking the 'Settings' button.
          <br />
          <br />
          In the Settings menu, you can customize the{" "}
          <strong>amount of rows and columns</strong> the grid has,{" "}
          <strong>how many contending algorithms</strong> there are, the{" "}
          <strong>density of walls</strong> around the grid and the{" "}
          <strong>speed of the visualizer.</strong>
          <br />
          <br />
          You can also <strong>
            disable specific pathfinding algorithms
          </strong>{" "}
          from being assigned to the contenders, and{" "}
          <strong>turn on diagonal movement</strong> of pathfinding algorithms
          as well.
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
          <strong>These are the Start Nodes:</strong>
        </p>{" "}
        <div className="node node-visited-1 node-start-1 menuNode infoNode">
          1
        </div>{" "}
        <div className="node node-visited-2 node-start-2 menuNode infoNode">
          2
        </div>{" "}
        <div className="node node-visited-3 node-start-3 menuNode infoNode">
          3
        </div>{" "}
        <div className="node node-visited-4 node-start-4 menuNode infoNode">
          4
        </div>
        <p>
          Each contender will get randomly assigned a starting position on the
          grid along with a pathfinding algorithm. The visualizer will draw the
          different contenders' path in the same color as their Start Nodes.{" "}
          <br />
          <br />
          Start Nodes are not considered impassable by other contenders.
        </p>
        <h2 className="infoSubTitle infoSubTitleNodes">Goal Node</h2>
        <p>
          <strong>This is the Goal Node:</strong>
        </p>{" "}
        <div className="node node-goal menuNode infoNode infoNodeGoal">G</div>
        <br />
        <p>
          The visualizer will stop once the first pathfinding algorithm finds
          the Goal Node. The end result of all contenders will then be displayed
          at the top.
          <br />
          <br />
          If no algorithms can find the Goal Node, due to walls completely
          blocking it off, the visualizer will stop after a few seconds and skip
          the rest of the visualization, in order to not waste time.
        </p>
        <h2 className="infoSubTitle infoSubTitleNodes">Walls</h2>
        <p>
          <strong>These darker nodes are Wall Nodes:</strong>
        </p>{" "}
        <div className="node node-wall infoNode infoNodeWall"></div>
        <p>
          Pathfinding algorithms can not pass through these nodes. <br />
          <br />
          If 'Allow Diagonal Movement' setting is turned on, pathfinding
          algorithms can also not diagonally "skip" through two walls placed
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
          The Breadth First Search algorithm traverses the grid "layer by layer"
          out from the start node using a queue system.
        </p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p>
          Beginning from the Start Node, every non-wall adjacent node gets added
          into a queue.
          <br />
          Next, the first node added to the queue gets popped out of the queue.{" "}
          <br />
          The node is marked as visited and checked if it is the Goal Node, if
          not, all of its non-wall, unvisited adjacent nodes gets added to the
          end of the queue.
          <br />
          Then, the node at the first position in the queue gets popped out
          again and the process is repeated until the Goal Node is found, or
          until there are no more connected nodes to explore (Goal Node is
          walled off).
        </p>
        <h2 className="infoSubTitle">Performance</h2>
        <p>
          Breadth First Search is very slow on average, as no optimizations or
          heuristics are being applied to alter the direction it takes when
          searching for the Goal Node.
          <br />
          <br />
          On average, Breadth First Search is, along with Dijkstra's Algorithm,
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
        <p>
          The Depth First Search algorithm will always attempt to traverse the
          grid in a specific direction. When its not able to, it will instead
          attempt different directions, in a specific order. If there are no
          available adjacent nodes at its current position, it will backtrack
          and continue from the most recently available adjacent node.
        </p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p>
          Beginning from the Start Node, the algorithm will begin its search in
          the direction of the first added adjacent node. <br />
          It will mark the node as visited, check if it's the Goal Node, and
          will then create a list of all non-wall, unvisited adjacent nodes and
          repeat the process of visiting the first added adjacent node.
          <br />
          When it reaches a node which has no non-wall, unvisited adjacent
          nodes, it backtracks to the next node in the most recent list of
          adjacent nodes and continues its search from there until either the
          Goal Node is found or there are no more nodes to visit.
          <br />
          <br />
          In this app, the list of adjacent nodes are always added in the order
          of:{" "}
          <strong>
            North, South, West, East, North-West, South-West, South-East,
            North-East.
          </strong>{" "}
          This is the order of the directions that the Depth First Search
          algorithm will attempt to traverse the grid in.
        </p>
        <h2 className="infoSubTitle">Performance</h2>
        <p>
          The speed of the Depth First Search algorithm is highly inconsistent.
          It is one of the fastest algorithms when the Goal Node happens to line
          up with the direction the algorithm takes. But when the Goal Node, for
          example, lays in the opposite direction of the path it takes, it
          becomes one of the slowest algorithms in this app.
        </p>
      </>
    ),
  },
  {
    id: "SLIDER-DIJKSTRA",
    title: <h1 className="infoTitle">Dijkstra's Algorithm</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Description</h2>
        <p>
          Dijkstra's Algorithm is an algorithm made for graphs where adjacent
          nodes can have different distances between them (Weighted graphs).
          <br />
          <br />
          Since this grid is an unweighted graph (The distance to every adjacent
          node is always the same), Dijkstra's Algorithm will behave pretty much
          like the Breadth First Search algorithm.
        </p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p>
          Dijkstra's Algorithm uses a queue system just like Breadth First
          Search, but unlike Breadth First Search, Dijkstra's Algorithm will
          utilize a priority queue rather than a normal queue where items are
          added in chronological order.
          <br />
          Every adjacent node gets added to the queue along with a priority
          value. The priority value is calculated by taking the total distance
          traveled from the Start Node to the current node plus the distance to
          the specific adjacent node.
          <br />
          The adjacent nodes are then enqueued based on priority value (Lower
          value equals higher priority).
          <br />
          <br />
          Since this grid is an unweighted graph, the distance to every adjacent
          node is always 1. Therefore, Dijkstra's Algorithm will always end up
          searching "layer by layer", just like Breadth First Search.
        </p>
        <h2 className="infoSubTitle">Performance</h2>
        <p>
          On average, Dijkstra's Algorithm is, along with Breadth First Search,
          the slowest pathfinding algorithm implemented in this app.
        </p>
      </>
    ),
  },
  {
    id: "SLIDER-ASTAR",
    title: <h1 className="infoTitle">A-Star Search</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Description</h2>
        <p>
          A-Star Search algorithm is an improved version of Dijkstra's
          Algorithm, where a heuristic function that measures the distance
          between the current node's adjacent nodes and the Goal Node is added,
          making the algorithm much faster.
        </p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p>
          Just like Dijkstra's Algorithm, the A-Star Search algorithm uses a
          priority queue. The difference is that the priority value is now also
          influenced by a heuristic function that calculates the distance
          between the current node's adjacent nodes and the Goal Node.
          <br />
          Since this is an unweighted grid, the heuristic value is going to be
          the most important thing influencing the path the algorithm will take.
          <br />
          The adjacent nodes closer to the Goal Node will always produce a lower
          heuristic value, and thus get a higher priority in the queue.
          <br />
          <br />
          In this app, the implemented heuristic function is the Manhattan
          Distance, for both A-Star Search and Greedy Best-First Search.
        </p>
        <h2 className="infoSubTitle">Performance</h2>
        <p>
          A-Star Search is fast, but is usually slower than Greedy Best-First
          Search, making it, on average, the second fastest algorithm
          implemented in this app.
        </p>
      </>
    ),
  },
  {
    id: "SLIDER-GBFS",
    title: <h1 className="infoTitle">Greedy Best-First Search</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Description</h2>
        <p>
          Greedy Best-First Search uses a priority queue based on the heuristic
          distance towards the Goal Node, just like the A-Star Search. Unlike
          A-Star Search, though, it does not include the total distance traveled
          component from Dijkstra's Algorithm when calculating the priority
          value.
        </p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p>
          Like Dijkstra's Algorithm and A-Star Search, Greedy Best-First Search
          uses a priority queue, except the only thing influencing the priority
          value is a heuristic function measuring the distance between the
          current node's adjacent nodes and the Goal Node.
          <br />
          <br />
          In practice, this means that out of all unvisited adjacent nodes, the
          one with the shortest mathematical distance to the Goal Node will be
          chosen first.
          <br />
          <br />
          The main difference from A-Star Search is that when multiple unvisited
          adjacent nodes share the shortest heuristic distance, A-Star Search
          will visit all of these nodes before moving closer to the Goal Node,
          whereas Greedy Best-First Search can move on after visiting just one.
        </p>
        <h2 className="infoSubTitle">Performance</h2>
        <p>
          Greedy Best-First Search is really fast, and on average the fastest
          pathfinding algorithm implemented in this app.
          <br />
          <br />
          It can, however, choose very suboptimal paths when there are many
          walls in the way of the Goal Node.
        </p>
      </>
    ),
  },
  {
    id: "SLIDER-BIDIR",
    title: <h1 className="infoTitle">Bidirectional Search</h1>,
    text: (
      <>
        <h2 className="infoSubTitle">Description</h2>
        <p>
          Bidirectional Search will, instead of searching for the Goal Node from
          the Start Node, launch two separate pathfinding algorithms. One is
          launched from the Start Node and the other from the Goal Node. The
          algorithm will then look for an intersection of the two paths.
        </p>
        <h2 className="infoSubTitle">How It Works</h2>
        <p>
GreedyBestFirstSearch          In this app, Bidirectional Search is a regular Breadth First Search
          applied from both the Start Node and the Goal Node.
          <br />
          <br />
          The algorithm will alternate between the Breadth First Search
          algorithm originating from the Start Node to the one originating from
          the Goal Node.
          <br />
          After one side has visited a node, the other side will visit a node
          next.
          <br />
          Instead of checking if the Goal Node has been found, the algorithm
          will check if the current node has been visited by the other side.
        </p>
        <h2 className="infoSubTitle">Performance</h2>
        <p>
          Bidirectional Breadth First Search is an optimized and faster version
          of Breadth First Search. Generally, the bigger the grid gets, the
          faster Bidirectional Search becomes (Compared to regular Breadth First
          Search).
          <br />
          <br />
          It is consistently the most average performing pathfinding algorithm
          implemented in this app, since the heuristic function of A-Star Search and
          Greedy Best-First Search is generally more efficient than this
          optimization of the Breadth First Search algorithm.
        </p>
      </>
    ),
  },
];
