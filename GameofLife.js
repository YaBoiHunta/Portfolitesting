// Define the size of the grid
const numRows = 10;
const numCols = 10;

// Create the 2D array of cells
const cells = [];
for (let row = 0; row < numRows; row++) {
  const cellRow = [];
  for (let col = 0; col < numCols; col++) {
    cellRow.push({ alive: false, row, col });
  }
  cells.push(cellRow);
}

// Render the grid as a html canvas element.
const canvas = document.getElementById("lifeCanvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;
canvas.width = numCols * cellSize;

