class IdleGame {
    constructor() {
        this.resources = {
            stone: 0,
            water: 0,
            wood: 0,
            food: 0
        };
    }

    mine() {
        this.resources.stone++;
        document.getElementById('stoneCount').textContent = this.resources.stone;
    }

    gatherWater() {
        this.resources.water++;
        document.getElementById('waterCount').textContent = this.resources.water;
    }

    chop() {
        this.resources.wood++;
        document.getElementById('woodCount').textContent = this.resources.wood;
    }

    hunt() {
        this.resources.food++;
        document.getElementById('foodCount').textContent = this.resources.food;
    }

    getResources() {
        return this.resources;
    }
    updateResourceDisplay() {
        document.getElementById('stoneCount').textContent = this.resources.stone;
        document.getElementById('waterCount').textContent = this.resources.water;
        document.getElementById('woodCount').textContent = this.resources.wood;
        document.getElementById('foodCount').textContent = this.resources.food;
    }
    
}


// Usage:
const game = new IdleGame();

document.getElementById('mineButton').addEventListener('click', () => {
    game.mine();
    game.updateResourceDisplay();
});
document.getElementById('waterButton').addEventListener('click', () => {
    game.gatherWater();
    game.updateResourceDisplay();
});
document.getElementById('chopButton').addEventListener('click', () => {
    game.chop();
    game.updateResourceDisplay();
});
document.getElementById('huntButton').addEventListener('click', () => {
    game.hunt();
    game.updateResourceDisplay();
});