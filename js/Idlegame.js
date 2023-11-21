class IdleGame {
    constructor() {
        this.resources = {
            stone: 0,
            water: 0,
            wood: 0,
            food: 0
        };
        this.upgrades = {
            stone: 1,
            water: 1,
            wood: 1,
            food: 1
        };
        this.upgradeCosts = {
            stone: 10,
            water: 10,
            wood: 10,
            food: 10
        };
        
        

    }

    mine() {
        this.resources.stone += this.upgrades.stone;
        document.getElementById('stoneCount').textContent = this.resources.stone;
    }

    gatherWater() {
        this.resources.water += this.upgrades.water;
        document.getElementById('waterCount').textContent = this.resources.water;
    }

    chop() {
        this.resources.wood += this.upgrades.wood;
        document.getElementById('woodCount').textContent = this.resources.wood;
    }

    hunt() {
        this.resources.food += this.upgrades.food;
        document.getElementById('foodCount').textContent = this.resources.food;
    }

      upgradeResource(resource) {
        if (this.resources[resource] >= this.upgradeCosts[resource]) {
            this.resources[resource] -= this.upgradeCosts[resource];
            this.upgrades[resource]++;
            this.upgradeCosts[resource] *= 2; // Increase the cost for the next upgrade
            document.getElementById(`${resource}UpgradeCount`).textContent = this.upgrades[resource];
            document.getElementById(`${resource}UpgradeCost`).textContent = this.upgradeCosts[resource];
        } else {
            alert(`You need ${this.upgradeCosts[resource]} ${resource} to upgrade!`);
        }
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

document.getElementById('stoneUpgradeButton').addEventListener('click', () => {
    game.upgradeResource('stone');
    game.updateResourceDisplay();
});
document.getElementById('waterUpgradeButton').addEventListener('click', () => {
    game.upgradeResource('water');
    game.updateResourceDisplay();
});
document.getElementById('woodUpgradeButton').addEventListener('click', () => {
    game.upgradeResource('wood');
    game.updateResourceDisplay();
});
document.getElementById('foodUpgradeButton').addEventListener('click', () => {
    game.upgradeResource('food');
    game.updateResourceDisplay();
}); 