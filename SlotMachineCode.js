// Define an array of symbols
var symbols = ["🍎", "🍊", "🍋", "🍒", "🍇", "🍉", "🍓", "🍑", "🍈", "🍌", "🍐", "🍍"];

let currentBalance = 1000;
let currentBet = 5;


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



// Get the HTML element where the balance is displayed
let balanceElement = document.getElementById("BalanceNumber");

// Update the balance display initially
balanceElement.textContent = currentBalance;

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

            // Stop the interval that was randomizing the symbols on the reel
            clearInterval(intervalId);

            // If it's the last reel, check the result after a short delay
            if (i === 5) {
                setTimeout(function() {
                    // Get the symbols on the winning line
                    let winningLineSymbols = [
                        document.getElementById("symbol11").textContent,
                        document.getElementById("symbol21").textContent,
                        document.getElementById("symbol31").textContent,
                    ];

                    // Check if the symbols match any of the winning combinations
                    for (let combination of winningCombinations) {
                        if (JSON.stringify(winningLineSymbols) === JSON.stringify(combination.symbols)) {
                            // Calculate the win amount
                            let winAmount = currentBet * combination.multiplier;

                            // Add the win amount to the user's balance
                            currentBalance += winAmount;

                            // Update the balance displayed on the screen
                            balanceElement.textContent = currentBalance;

                            break;
                        }
                    }
                }, 1000); // Delay in milliseconds, adjust as needed
            }
        }, 2000 + 1000 * (i - 1)); // Delay in milliseconds
    }
});



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
let tripleBetButton = document.getElementById("Triple_bet");

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
    currentBet = 5;
    betNumberElement.textContent = currentBet;
});

// Define the winning combinations
let winningCombinations = [
    { symbols: ["🍎", "🍎", "🍎"], multiplier: 50 },
    { symbols: ["🍊", "🍊", "🍊"], multiplier: 30 },
    { symbols: ["🍋", "🍋", "🍋"], multiplier: 20 },
    { symbols: ["🍒", "🍒", "🍒"], multiplier: 10 },
    { symbols: ["🍇", "🍇", "🍇"], multiplier: 5 },
    { symbols: ["🍉", "🍉", "🍉"], multiplier: 3 },
    { symbols: ["🍓", "🍓", "🍓"], multiplier: 2 },
    { symbols: [ "🍑", "🍑", "🍑"], multiplier: 1 },
    { symbols: ["🍈", "🍈", "🍈"], multiplier: 1 },
    { symbols: ["🍌", "🍌", "🍌"], multiplier: 1 },
    { symbols: ["🍐", "🍐", "🍐"], multiplier: 1 },
    { symbols: ["🍍", "🍍", "🍍"], multiplier: 1 },

    // Add more winning combinations as needed
];

