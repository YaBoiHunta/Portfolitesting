// Array of card suits
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

// Array of card values
const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

/**
 * Function to create a card element.
 * @param {string} suit - The suit of the card.
 * @param {string} value - The value of the card.
 * @returns {object} - The card element.
 */
const createCardElement = (suit, value) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.classList.add(suit.toLowerCase());
    cardElement.classList.add(`value-${value}`);
    cardElement.textContent = `${value} of ${suit}`;
    return cardElement;
};

// Array to hold the deck of cards
const deck = [];

// Loop through each suit
for (const suit of suits) {
    // Loop through each value
    for (const value of values) {
        // Push a new card element to the deck
        deck.push(createCardElement(suit, value));
    }
}

// Get the deck container element
const deckContainer = document.getElementById('deck');

// Append each card element to the deck container
for (const cardElement of deck) {
    deckContainer.appendChild(cardElement);
}

// Assign numerical values to the cards
const cardValues = {
    'Ace': 11, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'Jack': 10, 'Queen': 10, 'King': 10
};

// Function to deal a card
function dealCard(deck) {
    return deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
}

// Function to calculate the score of a hand
function calculateScore(hand) {
    let score = hand.reduce((sum, card) => sum + cardValues[card.value], 0);
    let aces = hand.filter(card => card.value === 'Ace').length;
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    return score;
}

// Function to determine if a hand is busted
function isBusted(hand) {
    return calculateScore(hand) > 21;
}

// Function to handle the player's turn
function playerTurn(deck, hand) {
    let card = dealCard(deck);
    hand.push(card);
    return hand;
}

// Function to handle the dealer's turn
function dealerTurn(deck, hand) {
    while (calculateScore(hand) < 17) {
        hand.push(dealCard(deck));
    }
    return hand;
}

// Function to determine the winner
function determineWinner(playerHand, dealerHand) {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (playerScore > 21) return 'Dealer';
    if (dealerScore > 21) return 'Player';
    if (playerScore > dealerScore) return 'Player';
    if (dealerScore > playerScore) return 'Dealer';
    return 'Draw';
}

// Function to start a new game
function startGame() {
    let deck = createDeck();
    let playerHand = [dealCard(deck), dealCard(deck)];
    let dealerHand = [dealCard(deck), dealCard(deck)];
    // Continue with the game...
}

// Add this to your JavaScript
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
    // Clear the deck container
    while (deckContainer.firstChild) {
        deckContainer.removeChild(deckContainer.firstChild);
    }

    // Start a new game and deal the cards
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }

    const playerHand = [dealCard(deck), dealCard(deck)];
    const dealerHand = [dealCard(deck), dealCard(deck)];

    // Display the dealt cards
    for (const card of playerHand) {
        deckContainer.appendChild(createCardElement(card.suit, card.value));
    }
    for (const card of dealerHand) {
        deckContainer.appendChild(createCardElement(card.suit, card.value));
    }
});


    