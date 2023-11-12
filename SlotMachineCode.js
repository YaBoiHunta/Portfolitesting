// Define an array of symbols
var symbols = ["🍎", "🍊", "🍋", "🍒", "🍇", "🍉", "🍓", "🍑", "🍈", "🍌", "🍐", "🍍"];

// For each reel
for (var i = 1; i <= 5; i++) {
    // For each symbol in the reel
    for (var j = 1; j <= 3; j++) {
        // Get the div element representing the symbol
        var symbolDiv = document.getElementById("symbol" + i + j);
        
        // Randomly select a symbol from the array
        var symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Set the innerHTML of the div to the selected symbol
        symbolDiv.innerHTML = symbol;
    }
}


// Add a click event listener to the spin button
spinButton.addEventListener('click', function() {
    // If the user's current balance is less than their current bet, return from the function immediately
    if (currentBalance < currentBet) {
        alert("You can't afford your current bet.");
        return;
    }

    // Deduct the user's current bet amount from their balance
    currentBalance -= currentBet;

    // Set the text content of the HTML element to the user's current balance
    balanceElement.textContent = currentBalance;

    // Rest of the code...
});


// Add a click event listener to the spin button
spinButton.addEventListener('click', function() {
    // For each reel
    for (let i = 1; i <= 5; i++) {
        // Start spinning the reel
        let reel = document.getElementById("reel" + i);
        reel.classList.add("spinning");

        // Start a continuous interval that randomizes the symbols on the reel
        let intervalId = setInterval(function() {
            // For each symbol in the reel
            for (let j = 1; j <= 3; j++) {
                // Get the div element representing the symbol
                let symbolDiv = document.getElementById("symbol" + i + j);
                
                // Randomly select a symbol from the array
                let symbol = symbols[Math.floor(Math.random() * symbols.length)];
                
                // Set the innerHTML of the div to the selected symbol
                symbolDiv.innerHTML = symbol;
            }
        }, 100); // Interval in milliseconds

        // Set a timeout with a delay of 2 seconds for the first reel, and an additional 1 second for each subsequent reel
        setTimeout(function() {
            // Stop the reel
            reel.classList.remove("spinning");

            // Clear the interval
            clearInterval(intervalId);
        }, 2000 + (i - 1) * 1000); // Delay in milliseconds
    }
});

// Assume we have a variable to store the user's current bet amount
let currentBet = 5;
// Get the HTML element where the bet amount is displayed
let betNumberElement = document.getElementById("BetNumber");

// Add a double bet button that will double the users bet for the next spin.
// Get the double bet button element
// Get the double bet button element
let doubleBetButton = document.getElementById("DoubleBet");

// Add a click event listener to the double bet button
doubleBetButton.addEventListener('click', function() {
    // Double the user's current bet
    currentBet *= 2;

    // Update the HTML bet element with the new bet amount
    betNumberElement.textContent = currentBet;
});

// Create a half bet button that will half the users bet for the next spin.
// Get the half bet button element
let halfBetButton = document.getElementById("HalfBet");

// Add a click event listener to the half bet button
halfBetButton.addEventListener('click', function() {
    // Half the user's current bet, but not less than 5
    currentBet = Math.max(currentBet / 2, 5);

    // Update the HTML bet element with the new bet amount
    betNumberElement.textContent = currentBet;
});

// Create a triple bet button that will triple the users bet for the next spin.

// Get the triple bet button element
let tripleBetButton = document.getElementById("Triplebet");

// Add a click event listener to the triple bet button
tripleBetButton.addEventListener('click', function() {
    // Triple the user's current bet
    currentBet *= 3;

    // Update the HTML bet element with the new bet amount
    betNumberElement.textContent = currentBet;
});







// Create a clear bet button that will reset the bet amount to 0 and update the Html element.

// Get the clear bet button element
let clearBetButton = document.getElementById("clearBet");

// Add a click event listener to the clear bet button
clearBetButton.addEventListener('click', function() {
    currentBet = 0;
    betNumberElement.textContent = currentBet;
});



