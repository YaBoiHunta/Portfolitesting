const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

const dealerScoreElement = document.getElementById('dealerHandScore');
const playerScoreElement = document.getElementById('playerHandScore');

const dealerHandContainer = document.getElementById('dealer-hand');
const playerHandContainer = document.getElementById('player-hand');

const startButton = document.getElementById('start-button');
const hitButton = document.getElementById('hitButton');
const standButton = document.getElementById('standButton');
// Add these variables to your JavaScript
let playerMoney = 1000;
let playerBet = 0;

const playerMoneyElement = document.getElementById('blackJackBalance');
const betInput = document.getElementById('betInput');
const placeBetButton = document.getElementById('placeBetButton');
const playerBetElement = document.getElementById('playerBet');

let deck = [];

startButton.addEventListener('click', startGame);
hitButton.addEventListener('click', handleHit);
standButton.addEventListener('click', handleStand);

let playerHand;
let dealerHand;

placeBetButton.addEventListener('click', placeBet);

function updateBetDisplay() {
    playerBetElement.textContent = `Bet: $${playerBet}`;
}

function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    deck.sort(() => Math.random() - 0.5);
    return deck;
}

function createCardElement(suit, value) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.classList.add(suit.toLowerCase());
    cardElement.classList.add(`value-${value}`);
    cardElement.textContent = `${value} of ${suit}`;
    return cardElement;
}

function dealCard(deck) {
    return deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
}

function calculateScore(hand) {
    let score = hand.reduce((sum, card) => {
        if (card.value === 'Ace') {
            return sum + 11;
        } else if (['Jack', 'Queen', 'King'].includes(card.value)) {
            return sum + 10;
        } else {
            return sum + parseInt(card.value);
        }
    }, 0);
    
    let aces = hand.filter(card => card.value === 'Ace').length;
    
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }
    
    return score;
}

function isBusted(hand) {
    return calculateScore(hand) > 21;
}

function playerTurn(deck, hand) {
    let card = dealCard(deck);
    hand.push(card);
    return hand;
}

function dealerTurn(deck, hand) {
    while (calculateScore(hand) < 17) {
        hand.push(dealCard(deck));
    }
    return hand;
}

function determineWinner(playerHand, dealerHand) {
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (playerScore > 21) {
        return 'Dealer';
    } else if (dealerScore > 21) {
        return 'Player';
    } else if (playerScore > dealerScore) {
        return 'Player';
    } else if (dealerScore > playerScore) {
        return 'Dealer';
    } else {
        return 'Draw';
    }
}

function startGame() {
     // Check if the player's bet is more than their money
     if (playerBet > playerMoney) {
        alert('You cannot bet more money than you have!');
        return;
    }

    // Reset hands and scores
    clearHandContainers();

    playerHand = [];
    dealerHand = [];
    playerScoreElement.textContent = 'Score: 0';
    dealerScoreElement.textContent = 'Score: 0';

    // Create and shuffle deck
    deck = createDeck();

    // Deal initial cards
    playerHand = playerTurn(deck, playerHand);
    dealerHand = playerTurn(deck, dealerHand);

    // Display initial cards
    playerHandContainer.appendChild(createCardElement(playerHand[0].suit, playerHand[0].value));
    dealerHandContainer.appendChild(createCardElement(dealerHand[0].suit, dealerHand[0].value));

    // Update scores
    playerScoreElement.textContent = `Score: ${calculateScore(playerHand)}`;
    dealerScoreElement.textContent = `Score: ${calculateScore(dealerHand)}`;

    // Enable "Hit" and "Stand" buttons
    hitButton.disabled = false;
    standButton.disabled = false;
}

function handleHit() {
    // Deal a new card to the player and add it to their hand
    const newCard = dealCard(deck);
    playerHand.push(newCard);

    // Create a new card element for the dealt card
    const newCardElement = createCardElement(newCard.suit, newCard.value);

    // Append the new card element to the player's hand container
    playerHandContainer.appendChild(newCardElement);

    // Update the player's score display
    playerScoreElement.textContent = `Score: ${calculateScore(playerHand)}`;

    // Check if the player's hand is busted
    if (isBusted(playerHand)) {
        // If the player's hand is busted, display a message and disable the "Hit" and "Stand" buttons
        dealerScoreElement.textContent += ' - Player busted!';
        hitButton.disabled = true;
        standButton.disabled = true;
    }
}

function handleStand() {
    // Play out the dealer's turn
    dealerHand = dealerTurn(deck, dealerHand);

    // Update the dealer's hand display
    while (dealerHandContainer.firstChild) {
        dealerHandContainer.removeChild(dealerHandContainer.firstChild);
    }
    for (const card of dealerHand) {
        dealerHandContainer.appendChild(createCardElement(card.suit, card.value));
    }

    // Update the dealer's score display
    dealerScoreElement.textContent = `Score: ${calculateScore(dealerHand)}`;

    // Check if the dealer's hand is busted
    if (isBusted(dealerHand)) {
        dealerScoreElement.textContent += ' - Dealer busted!';
    }

    // Determine the winner
    const winner = determineWinner(playerHand, dealerHand);
    dealerScoreElement.textContent += ` - ${winner} wins!`;

    // Disable the "Hit" and "Stand" buttons
    hitButton.disabled = true;
    standButton.disabled = true;
}
function updateMoneyAndBetDisplays() {
    playerMoneyElement.textContent = `Money: $${playerMoney}`;
    playerBetElement.textContent = `Bet: $${playerBet}`;
}

function placeBet() {
    // Get the bet amount from the input
    const betAmount = Number(betInput.value);

    // Check if the bet amount is valid
    if (betAmount > playerMoney) {
        alert('You cannot bet more money than you have!');
        return;
    } else if (betAmount <= 0) {
        alert('You must bet a positive amount!');
        return;
    }

    // Update the player's money and bet amounts
    playerMoney -= betAmount;
    playerBet = betAmount;

    updateBetDisplay();

    // Update the money and bet displays
    updateMoneyAndBetDisplays();

    // Clear the bet input field
    betInput.value = '';
}

function handleStand() {
    // Play out the dealer's turn
    dealerHand = dealerTurn(deck, dealerHand);

    // Update the dealer's hand display
    while (dealerHandContainer.firstChild) {
        dealerHandContainer.removeChild(dealerHandContainer.firstChild);
    }
    for (const card of dealerHand) {
        dealerHandContainer.appendChild(createCardElement(card.suit, card.value));
    }

    // Update the dealer's score display
    dealerScoreElement.textContent = `Score: ${calculateScore(dealerHand)}`;

    // Check if the dealer's hand is busted
    if (isBusted(dealerHand)) {
        dealerScoreElement.textContent += ' - Dealer busted!';
    }

    // Determine the winner
    const winner = determineWinner(playerHand, dealerHand);
    dealerScoreElement.textContent += ` - ${winner} wins!`;

    // Update the player's money based on the result
    if (winner === 'Player') {
        playerMoney += playerBet * 2;
    }
    playerBet = 0;

    // Update the money and bet displays
    updateMoneyAndBetDisplays();

    // Disable the "Hit" and "Stand" buttons
    hitButton.disabled = true;
    standButton.disabled = true;
}


function clearHandContainers() {
    while (playerHandContainer.firstChild) {
        playerHandContainer.removeChild(playerHandContainer.firstChild);
    }
    while (dealerHandContainer.firstChild) {
        dealerHandContainer.removeChild(dealerHandContainer.firstChild);
    }
}


function resetGame() {
    // Reset player's money and bet
    playerMoney = 1000;
    playerBet = 0;

    // Clear the hand containers
    clearHandContainers();

    // Enable the "Hit" and "Stand" buttons
    hitButton.disabled = false;
    standButton.disabled = false;

    // Update the money and bet displays
    updateMoneyAndBetDisplays();
}

function startGame() {
    // Check if the player's bet is more than their money
    if (playerBet > playerMoney) {
        alert('You cannot bet more money than you have!');
        return;
    }

    // Deduct the bet amount from the player's money
    playerMoney -= playerBet;

    // Reset hands and scores
    clearHandContainers();

    playerHand = [];
    dealerHand = [];
    playerScoreElement.textContent = 'Score: 0';
    dealerScoreElement.textContent = 'Score: 0';

    // Create and shuffle deck
    deck = createDeck();

    // Deal initial cards
    playerHand = playerTurn(deck, playerHand);
    dealerHand = playerTurn(deck, dealerHand);

    // Display initial cards
    playerHandContainer.appendChild(createCardElement(playerHand[0].suit, playerHand[0].value));
    dealerHandContainer.appendChild(createCardElement(dealerHand[0].suit, dealerHand[0].value));

    // Update scores
    playerScoreElement.textContent = `Score: ${calculateScore(playerHand)}`;
    dealerScoreElement.textContent = `Score: ${calculateScore(dealerHand)}`;

    // Enable "Hit" and "Stand" buttons
    hitButton.disabled = false;
    standButton.disabled = false;
}

function placeBet() {
    // Get the bet amount from the input
    const betAmount = Number(betInput.value);

    // Check if the bet amount is valid
    if (betAmount > playerMoney) {
        alert('You cannot bet more money than you have!');
        return;
    } else if (betAmount <= 0) {
        alert('You must bet a positive amount!');
        return;
    }

    // Set the player's bet amount
    playerBet = betAmount;

    // Deduct the bet amount from the player's money
    playerMoney -= playerBet;

    updateBetDisplay();

    // Update the money and bet displays
    updateMoneyAndBetDisplays();

    // Clear the bet input field
    betInput.value = '';
}
