// Get a reference to the canvas
const canvas = document.getElementById('lifeCanvas');
const ctx = canvas.getContext('2d');

// Define the size of the grid
const numRows = 50;
const numCols = 50;
const cellSize = 10;

// Create the 2D array of cells
const cells = [];
for (let row = 0; row < numRows; row++) {
  const cellRow = [];
  for (let col = 0; col < numCols; col++) {
    cellRow.push({ alive: false, row, col });
  }
  cells.push(cellRow);
}

// Function to count the number of alive cells
function countAliveCells() {
  let count = 0;
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (cells[row][col].alive) {
        count++;
      }
    }
  }
  return count;
}

// Function to draw the grid
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cell = cells[row][col];
      ctx.beginPath();
      ctx.rect(col * cellSize, row * cellSize, cellSize, cellSize);
      ctx.fillStyle = cell.alive ? 'black' : 'white';
      ctx.fill();
      ctx.stroke();
    }
  }
}

// Function to calculate the next state of the grid
function nextState() {
  // Create a copy of the current state
  const copy = JSON.parse(JSON.stringify(cells));

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      // Count the cell's live neighbors
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const newRow = row + i;
          const newCol = col + j;
          if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
            neighbors += cells[newRow][newCol].alive ? 1 : 0;
          }
        }
      }

      // Apply the rules of the Game of Life
      if (cells[row][col].alive && (neighbors < 2 || neighbors > 3)) {
        copy[row][col].alive = false;
      } else if (!cells[row][col].alive && neighbors === 3) {
        copy[row][col].alive = true;
      }
    }
  }

  // Replace the current state with the new state
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      cells[row][col].alive = copy[row][col].alive;
    }
  }

  // Redraw the grid
  drawGrid();
}

// Add a click event listener to the canvas
canvas.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const col = Math.floor(x / cellSize);
  const row = Math.floor(y / cellSize);
  cells[row][col].alive = !cells[row][col].alive;
  drawGrid();
});

// Call drawGrid initially to draw the initial state of the grid
drawGrid();

// Get a reference to the button
const logAliveButton = document.getElementById('logAliveButton');

// Add an event listener to the button
logAliveButton.addEventListener('click', function() {
  console.log(countAliveCells());
});

// Get a reference to the button
const randomButton = document.getElementById('RandomButton');

// Add an event listener to the button
randomButton.addEventListener('click', function() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      cells[row][col].alive = Math.random() < 0.5;
    }
  }
  drawGrid();
});

// Get a reference to the button
const clearButton = document.getElementById('clearButton');

// Add an event listener to the button
clearButton.addEventListener('click', function() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      cells[row][col].alive = false;
    }
  }
  drawGrid();
});

// Get a reference to the buttons
const startButton = document.getElementById('StartButton');
const stopButton = document.getElementById('StopButton');

let gameInterval = null; // to store the interval ID

// Add an event listener to the start button
startButton.addEventListener('click', function() {
  if (gameInterval === null) { // prevent multiple intervals
    gameInterval = setInterval(nextState, 76);
  }
});

// Add an event listener to the stop button
stopButton.addEventListener('click', function() {
  if (gameInterval !== null) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
});

// Get a reference to the slider
const speedSlider = document.getElementById('speedSlider');

// Update the simulation speed when the slider value changes
speedSlider.addEventListener('input', function() {
  // Stop the current simulation
  if (gameInterval !== null) {
    clearInterval(gameInterval);
    gameInterval = null;
  }

  // Start a new simulation with the new speed
  gameInterval = setInterval(nextState, speedSlider.value);
});