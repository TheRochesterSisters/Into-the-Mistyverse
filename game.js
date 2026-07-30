let currentMap = null;
const maps = {
  Forest: {
    background: '#1b2836',
    ground: '#243b2f',
    trees: '#3b4f63'
  },

  Swamp: {
    background: '#1a2420',
    ground: '#2f3e35',
    trees: '#4a5c4f'
  },

  Moor: {
    background: '#2b2f3a',
    ground: '#4a4f5c',
    trees: '#6b7080'
  }
};
function chooseMap(name) {
  currentMap = maps[name];

  // hide map menu
  document.getElementById('mapSelect').style.display = 'none';

  // show character menu
  document.getElementById('characterSelect').style.display = 'block';
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = null; // will be set after character selection

// Character data
const characters = {
  Mistyleaf: {
    name: 'Mistyleaf',
    width: 45,
    height: 25,
    speed: 3,
    baseColor: '#d8e0e6',   // silver tabby
    stripeColor: '#a9b0b6'
    frame: 0
  },

  Morningdew: {
    name: 'Morningdew',
    width: 45,
    height: 25,
    speed: 3,
    baseColor: '#b7e3ff',   // soft blue-gray
    stripeColor: '#7fb6d4'
  },

  Flag: {
    name: 'Flag',
    width: 45,
    height: 25,
    speed: 3,
    baseColor: '#f2d7a2',   // sandy tan
    stripeColor: '#c9a86f'
  },

  Sundew: {
    name: 'Sundew',
    width: 45,
    height: 25,
    speed: 3,
    baseColor: '#6b9e5c',   // leafy green
    stripeColor: '#4f7c45'
  },

  Moondrift: {
    name: 'Moondrift',
    width: 45,
    height: 25,
    speed: 3,
    baseColor: '#cfc9ff',   // pale moon-lavender
    stripeColor: '#a59ad6'
  }
};


// Called when user clicks a character
function chooseCharacter(name) {
  const data = characters[name];

  player = {
    ...data,
    x: 100,
    y: 300
  };

  // hide menu
  document.getElementById('characterSelect').style.display = 'none';

  // start game
  gameLoop();
}

const keys = {};

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);

function update() {
  if (!player) return;

  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;
  if (keys['ArrowUp']) player.y -= player.speed;
  if (keys['ArrowDown']) player.y += player.speed;

  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

function drawBackground() {
  if (!currentMap) return;

  // sky/background
  ctx.fillStyle = currentMap.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ground
  ctx.fillStyle = currentMap.ground;
  ctx.fillRect(0, 350, canvas.width, 100);

  // trees / terrain shapes
  ctx.fillStyle = currentMap.trees;
  for (let i = 0; i < 6; i++) {
    const x = i * 140 + 40;
    ctx.fillRect(x, 250, 30, 120);
  }
}


function drawPlayer() {
  if (!player) return;

  ctx.fillStyle = player.baseColor;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.strokeStyle = player.stripeColor;
  ctx.lineWidth = 2;

  for (let y = 8; y <= 20; y += 6) {
    ctx.beginPath();
    ctx.moveTo(player.x + 5, player.y + y);
    ctx.lineTo(player.x + 40, player.y + y);
    ctx.stroke();
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = '14px sans-serif';
  ctx.fillText(player.name, player.x - 10, player.y - 10);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  update();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

