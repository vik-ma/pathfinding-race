# Pathfinding Race

Pathfinding Race is not only a pathfinding visualizer, but also a game! Multiple pathfinding algorithms will battle it out on a randomized grid, and the game is in correctly guessing which contender will reach the Goal Node first!

The game offers a more fun and intuitive way to learn about pathfinding algorithms compared to ordinary pathfinding visualizers!

![Pathfinding Race Preview](pathfinding-race-preview.gif)

### **[Play it now, hosted on GitHub Pages!](https://vik-ma.github.io/pathfinding-race/)**

The project is made in React and requires JavaScript to be played.

## How To Play
**In the app, simply click on the contender you think will win in the list above
the grid and the visualizer will start!**
          
Your choice will be marked in golden-beige color, and once the
visualizer finishes, the correct choice will be marked in green.

**Click the 'New Map' button to generate a new randomized grid and
play again!**

If you don't want to make a prediction, click the 'Just Visualize'
button to just watch the match unfold instead.

The contending algorithms do not affect each other in any way, and if
a node on the grid gets visited by more than one contender, the node
will split its coloring to represent every visited contender.

**Click the 'Information' button in the app to learn more about the game.**

## Pathfinding Algorithms
The six pathfinding algorithms implemented in this app are:
- **Breadth First Search**
- **Depth First Search**
- **Dijkstra's Algorithm**
- **A-Star Search**
- **Greedy Best-First Search**
- **Bidirectional Breadth First Search**

You can read more about each algorithm by clicking the 'Information' button in the app.

## Settings Menu
In the Settings Menu you can customize:
- The number of rows in the grid
- The number of columns in the grid
- The number of contending pathfinding algorithms
- The density of walls around the grid
- The speed of the pathfinding visualization

You can also:
- Allow diagonal movement of pathfinding algorithms
- Disable specific pathfinding algorithms from being assigned to the contenders
