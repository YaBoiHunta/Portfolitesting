// Define a deck of cards
let deck = [
    'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',
    'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',
    'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',
    'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
];

// Create a function to shuffle the deck
function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Create functions to deal cards to the player and the dealer
let playerHand = [];
let dealerHand = [];

function dealCard(hand) {
    hand.push(deck.pop());
}

// Create a function to calculate the score of a hand
function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    for (let card of hand) {
        if (card === 'A') {
            score += 11;
            aceCount += 1;
        } else if (['K', 'Q', 'J'].includes(card)) {
            score += 10;
        } else {
            score += parseInt(card);
        }
    }

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount -= 1;
    }

    return score;
}

// Add event listeners to the buttons to handle the player's actions
document.getElementById('hitButton').addEventListener('click', function() {
    dealCard(playerHand);
    // Update the player's hand on the screen
    // Check if the player has busted
});

document.getElementById('standButton').addEventListener('click', function() {
    // Dealer takes their turn
    // Compare the player's hand to the dealer's hand
});

// Implement the event listeners for the double down, split, and surrender buttons