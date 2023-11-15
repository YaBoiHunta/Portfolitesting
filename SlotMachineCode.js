// Define an array of symbols
let symbols = ["🍎", "🍊", "🍋", "🍒", "🍇", "🍉", "🍓", "🍑", "🍈", "🍌", "🍐", "🍍"];
// Define the initial balance, bet and win amount for the user.

let currentBalance = 1000;
let balanceElement = document.getElementById("BalanceNumber");
let currentBet = 5; // Default bet amount
let betNumberElement = document.getElementById("BetNumber");

// Define the winning combinations
let winningCombinations = [
    { symbols: ["🍎", "🍎", "🍎"], multiplier: 50 },
    { symbols: ["🍊", "🍊", "🍊"], multiplier: 30 },
    { symbols: ["🍋", "🍋", "🍋"], multiplier: 20 },
    { symbols: ["🍒", "🍒", "🍒"], multiplier: 10 },
    { symbols: ["🍇", "🍇", "🍇"], multiplier: 10 },
    { symbols: ["🍉", "🍉", "🍉"], multiplier: 50},
    { symbols: ["🍓", "🍓", "🍓"], multiplier: 102 },
    { symbols: [ "🍑", "🍑", "🍑"], multiplier: 120 },
    { symbols: ["🍈", "🍈", "🍈"], multiplier: 100 },
    { symbols: ["🍌", "🍌", "🍌"], multiplier: 90 },
    { symbols: ["🍐", "🍐", "🍐"], multiplier: 80 },
    { symbols: ["🍍", "🍍", "🍍"], multiplier: 70 },

    // Add more winning combinations as needed
];

let winningMessageElement = document.getElementById("WinningMessage");
let LosingMessageElement = document.getElementById("LosingMessage");

// Update the balance and bet displays initially

balanceElement.textContent = currentBalance;
betNumberElement.textContent = currentBet;

// Define the spin button and its event listener
let spinButton = document.getElementById("spinButton");
spinButton.addEventListener('click', spin);

// Define the bet buttons and their event listeners
let doubleBetButton = document.getElementById("DoubleBet");
doubleBetButton.addEventListener('click', function() {
    currentBet *= 2;
    betNumberElement.textContent = currentBet;
});

let halfBetButton = document.getElementById("HalfBet");
halfBetButton.addEventListener('click', function() {
    currentBet = Math.max(Math.floor(currentBet / 2), 5);
    betNumberElement.textContent = currentBet;
});

let tripleBetButton = document.getElementById("TripleBet");
tripleBetButton.addEventListener('click', function() {
    currentBet *= 3;    
    betNumberElement.textContent = currentBet;
});

let clearBetButton = document.getElementById("ClearBet");
clearBetButton.addEventListener('click', function() {
    currentBet = 5;
    betNumberElement.textContent = currentBet;
});

// This is a spin function that can be used to spin the reels.

/**
 * Spins the slot machine reels and deducts the current bet amount from the user's balance.
 * If the user's current balance is less than their current bet, the function returns immediately.
 */
function spin() {
    // If the user's current balance is less than their current bet, return from the function immediately
    if (currentBalance < currentBet) {
        alert("You can't afford your current bet.");
        return;
    }

    // Deduct the user's current bet amount from their balance
    currentBalance -= currentBet;

    // Set the text content of the HTML element to the user's current balance
    balanceElement.textContent = currentBalance;

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

        setTimeout(function() {
            // Stop the reel
            reel.classList.remove("spinning");

            // Stop the interval that was randomizing the symbols on the reel
            clearInterval(intervalId);

            // If this is the last reel, check if the user won
            if (i === 5) {
                checkWin();
            }
        }, 2000 + 1000 * (i - 1)); // Delay in milliseconds // Delay in milliseconds
    }
};

function checkWin() {
    // Get the symbols on the reels
    let reelSymbols = [];
    for (let i = 1; i <= 5; i++) {
        let reel = [];
        for (let j = 1; j <= 3; j++) {
            let symbolDiv = document.getElementById("symbol" + i + j);
            reel.push(symbolDiv.innerHTML);
        }
        reelSymbols.push(reel);
    }

    // Check for horizontal winning combinations
    for (let combination of winningCombinations) {
        for (let reel of reelSymbols) {
            if (reel.join('') === combination.symbols.join('')) {
                win(combination);
                return;
            }
        }
    }

    // Check for vertical winning combinations
for (let i = 0; i < 3; i++) {
    let column = [reelSymbols[0][i], reelSymbols[1][i], reelSymbols[2][i]];
    for (let combination of winningCombinations) {
        if (column.join('') === combination.symbols.join('')) {
            win(combination);
            return;
        }
    }
}

    // Check for diagonal winning combinations
    let diagonals = [
        [reelSymbols[0][0], reelSymbols[1][1], reelSymbols[2][2]],
        [reelSymbols[0][2], reelSymbols[1][1], reelSymbols[2][0]]
    ];
    for (let combination of winningCombinations) {
        for (let diagonal of diagonals) {
            if (diagonal.join('') === combination.symbols.join('')) {
                win(combination);
                return;
            }
        }
    }

    // If no winning combinations are found, show a message to the user
    winningMessageElement.textContent = "You lost!";
}
function win(combination) {
    // If a winning combination is found, multiply the user's bet by the multiplier and add it to their balance
    let winAmount = currentBet * combination.multiplier;
    currentBalance += winAmount;

    // Update the balance displayed on the screen
    balanceElement.textContent = currentBalance;

    // Show a message to the user
    winningMessageElement.textContent = "You won     " + winAmount + "!";
}
