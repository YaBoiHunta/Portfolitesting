const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];

const dealerScoreElement = document.getElementById('dealerHandScore');
const playerScoreElement = document.getElementById('playerHandScore');

const dealerHandContainer = document.getElementById('dealer-hand');
const playerHandContainer = document.getElementById('player-hand');

const startButton = document.getElementById('start-button');
const hitButton = document.getElementById('hitButton');
const standButton = document.getElementById('standButton');

startButton.addEventListener('click', startGame);
hitButton.addEventListener('click', handleHit);
standButton.addEventListener('click', handleStand);

let playerHand;
let dealerHand;

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
    let score = hand.reduce((sum, card) => sum + cardValues[card.value], 0);
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
    if (playerScore > 21) return 'Dealer';
    if (dealerScore > 21) return 'Player';
    if (playerScore > dealerScore) return 'Player';
    if (dealerScore > playerScore) return 'Dealer';
    return 'Draw';
}

function startGame() {
    hitButton.disabled = false;
    standButton.disabled = false;

    while (dealerHandContainer.firstChild) {
        dealerHandContainer.removeChild(dealerHandContainer.firstChild);
    }
    while (playerHandContainer.firstChild) {
        playerHandContainer.removeChild(playerHandContainer.firstChild);
    }
    dealerScoreElement.textContent = '';
    playerScoreElement.textContent = '';

    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }

    playerHand = [dealCard(deck), dealCard(deck)];
    dealerHand = [dealCard(deck), dealCard(deck)];

    for (const card of playerHand) {
        playerHandContainer.appendChild(createCardElement(card.suit, card.value));
    }
    for (const card of dealerHand) {
        dealerHandContainer.appendChild(createCardElement(card.suit, card.value));
    }
    playerScoreElement.textContent = `Score: ${calculateScore(playerHand)}`;
    dealerScoreElement.textContent = `Score: ${calculateScore(dealerHand)}`;
}

function handleHit() {
    playerHand = playerTurn(deck, playerHand);
    playerHandContainer.appendChild(createCardElement(playerHand[playerHand.length - 1].suit, playerHand[playerHand.length - 1].value));
    playerScoreElement.textContent = `Score: ${calculateScore(playerHand)}`;
    if (isBusted(playerHand)) {
        dealerScoreElement.textContent += ' - Player busted!';
        hitButton.disabled = true;
        standButton.disabled = true;
    }
}

function handleStand() {
    dealerHand = dealerTurn(deck, dealerHand);
    while (dealerHandContainer.firstChild) {
        dealerHandContainer.removeChild(dealerHandContainer.firstChild);
    }
    for (const card of dealerHand) {
        dealerHandContainer.appendChild(createCardElement(card.suit, card.value));
    }
    dealerScoreElement.textContent = `Score: ${calculateScore(dealerHand)}`;
    if (isBusted(dealerHand)) {
        dealerScoreElement.textContent += ' - Dealer busted!';
    }
    hitButton.disabled = true;
    standButton.disabled = true;
}