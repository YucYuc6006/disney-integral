// Game Variables
let dustCount = 0;
let dustPerSecond = 0;

// Upgrade Costs and Status
const upgrades = {
  mickeyHat: { cost: 10, purchased: false },
  vanellopeKart: { cost: 50, purchased: false },
  elsaCastle: { cost: 200, purchased: false },
  genieLamp: { cost: 500, purchased: false },
  lightningBoost: { cost: 750, purchased: false },
  mauiHook: { cost: 1000, purchased: false }
};

// DOM Elements
const dustCountElement = document.getElementById("dust-count");
const dustPerSecondElement = document.getElementById("dust-per-second");
const collectButton = document.getElementById("collect-button");
const buyMickeyHatButton = document.getElementById("buy-mickey-hat");
const buyVanellopeKartButton = document.getElementById("buy-vanellope-kart");
const buyElsaCastleButton = document.getElementById("buy-elsa-castle");
const buyGenieLampButton = document.getElementById("buy-genie-lamp");
const buyLightningBoostButton = document.getElementById("buy-lightning-boost");
const buyMauiHookButton = document.getElementById("buy-maui-hook");

// Collect Pixie Dust
collectButton.addEventListener("click", () => {
  dustCount++;
  updateUI();
});

// Mickey's Sorcerer Hat
buyMickeyHatButton.addEventListener("click", () => {
  if (dustCount >= upgrades.mickeyHat.cost && !upgrades.mickeyHat.purchased) {
    dustCount -= upgrades.mickeyHat.cost;
    dustPerSecond += 1;
    upgrades.mickeyHat.purchased = true;
    updateUI();
  }
});

// Vanellope's Candy Kart
buyVanellopeKartButton.addEventListener("click", () => {
  if (dustCount >= upgrades.vanellopeKart.cost && !upgrades.vanellopeKart.purchased) {
    dustCount -= upgrades.vanellopeKart.cost;
    upgrades.vanellopeKart.purchased = true;
    collectButton.addEventListener("click", () => dustCount += 1); // Adds +1 per click
    updateUI();
  }
});

// Elsa's Ice Castle
buyElsaCastleButton.addEventListener("click", () => {
  if (dustCount >= upgrades.elsaCastle.cost && !upgrades.elsaCastle.purchased) {
    dustCount -= upgrades.elsaCastle.cost;
    upgrades.elsaCastle.purchased = true;
    dustPerSecond *= 1.5; // Multiply production by 1.5
    updateUI();
  }
});

// Genie's Lamp
buyGenieLampButton.addEventListener("click", () => {
  if (dustCount >= upgrades.genieLamp.cost && !upgrades.genieLamp.purchased) {
    dustCount -= upgrades.genieLamp.cost;
    upgrades.genieLamp.purchased = true;
    setInterval(() => {
      const randomBonus = Math.floor(Math.random() * 100) + 50; // Random bonus between 50-150
      dustCount += randomBonus;
      alert(`Genie granted you ${randomBonus} Pixie Dust!`);
      updateUI();
    }, 30000); // Grants bonus every 30 seconds
    updateUI();
  }
});

// Lightning McQueen's Nitro Boost
buyLightningBoostButton.addEventListener("click", () => {
  if (dustCount >= upgrades.lightningBoost.cost && !upgrades.lightningBoost.purchased) {
    dustCount -= upgrades.lightningBoost.cost;
    upgrades.lightningBoost.purchased = true;
    setInterval(() => {
      let boostActive = true;
      collectButton.addEventListener("click", () => {
        if (boostActive) dustCount += 4; // Adds +5 total per click
      });
      setTimeout(() => boostActive = false, 10000); // Lasts 10 seconds
    }, 60000); // Activates every 60 seconds
    updateUI();
  }
});

// Maui's Fish Hook
buyMauiHookButton.addEventListener("click", () => {
  if (dustCount >= upgrades.mauiHook.cost && !upgrades.mauiHook.purchased) {
    dustCount -= upgrades.mauiHook.cost;
    upgrades.mauiHook.purchased = true;
    dustPerSecond += 5; // Adds passive generation
    updateUI();
  }
});

// Update UI
function updateUI() {
  dustCountElement.textContent = dustCount;
  dustPerSecondElement.textContent = dustPerSecond;

  // Enable/Disable Buttons
  buyMickeyHatButton.disabled = dustCount < upgrades.mickeyHat.cost || upgrades.mickeyHat.purchased;
  buyVanellopeKartButton.disabled = dustCount < upgrades.vanellopeKart.cost || upgrades.vanellopeKart.purchased;
  buyElsaCastleButton.disabled = dustCount < upgrades.elsaCastle.cost || upgrades.elsaCastle.purchased;
  buyGenieLampButton.disabled = dustCount < upgrades.genieLamp.cost || upgrades.genieLamp.purchased;
  buyLightningBoostButton.disabled = dustCount < upgrades.lightningBoost.cost || upgrades.lightningBoost.purchased;
  buyMauiHookButton.disabled = dustCount < upgrades.mauiHook.cost || upgrades.mauiHook.purchased;
}

// Automate Dust Generation
setInterval(() => {
  dustCount += dustPerSecond;
  updateUI();
}, 1000);
