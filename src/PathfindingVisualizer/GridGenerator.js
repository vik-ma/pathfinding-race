import React, { useState, useEffect, useContext } from "react";
import { GridContext } from "../Helpers/GridContexts";
import { Node } from "./Node";

export const GridGenerator = () => {
  const { isGridRendered, setIsGridRendered } = useContext(GridContext);
  const rowCount = 8;
  const colCount = 14;

  const [gridLayout, setGridLayout] = useState([]);

  useEffect(() => {
    createGrid();
  }, []);

  const createGrid = () => {
    const grid = new Array(rowCount);

    for (let row = 0; row < rowCount; row++) {
      grid[row] = new Array(colCount);
    }

    createNode(grid);

    setGridLayout(grid);
  };

  const createNode = (grid) => {
    for (let row = 0; row < rowCount; row++) {
      for (let col = 0; col < colCount; col++) {
        grid[row][col] = new gridElement(row, col);
      }
    }
  };

  const drawGrid = (
    <div>
      {gridLayout.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              return <Node key={colIndex} />;
            })}
          </div>
        );
      })}
    </div>
  );

  function gridElement(row, col) {
    this.row = row;
    this.col = col;
  }

  return <div className="gridContainer">{drawGrid}</div>;
};
