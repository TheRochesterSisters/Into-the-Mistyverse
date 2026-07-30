const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Mistyleaf (silver tabby)
const mistyleaf = {
  name: 'Mistyleaf',
  x: 100,
  y: 300,
  width: 45,
  height: 25,
  speed: 3,
  baseColor: '#d8e0e6',   // silver-gray
  stripeColor: '#a9b0b6'  // darker tabby stripes
};

const keys = {};

// keyboard input
window.addEventListener('keydown', e => {
  keys[e.key] = true;
});

window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

function update() {
  if (keys['ArrowLeft']) mistyleaf.x -= mistyleaf.speed;
  if (keys['ArrowRight']) mistyleaf.x += mistyleaf.speed;
  if (keys['ArrowUp']) mistyleaf.y -= mistyleaf.speed;
  if (keys['ArrowDown']) mistyleaf.y += mistyleaf.speed;

  mistyleaf.x = Math.max(0, Math.min(canvas.width - mistyleaf.width, mistyleaf.x));
  mistyleaf.y = Math.max(0, Math.min(canvas.height - mistyleaf.height, mistyleaf.y));
}

function drawBackground() {
  ctx.fillStyle = '#1b2836';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#243b2f';
  ctx.fillRect(0, 350, canvas.width, 100);

  ctx.fillStyle = '#3b4f63';
  for (let i = 0; i < 6; i++) {
    const x = i * 140 + 40;
    ctx.fillRect(x, 250, 30, 120);
  }
}

function drawMistyleaf() {
  // body
  ctx.fillStyle = mistyleaf.baseColor;
  ctx.fillRect(mistyleaf.x, mistyleaf.y, mistyleaf.width, mistyleaf.height);

  // tabby stripes (simple lines)
  ctx.strokeStyle = mistyleaf.stripeColor;
  ctx.lineWidth = 2;

  // three stripes across her back
  ctx.beginPath();
  ctx.moveTo(mistyleaf.x + 5, mistyleaf.y + 8);
  ctx.lineTo(mistyleaf.x + 40, mistyleaf.y + 8);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(mistyleaf.x + 5, mistyleaf.y + 14);
  ctx.lineTo(mistyleaf.x + 40, mistyleaf.y + 14);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(mistyleaf.x + 5, mistyleaf.y + 20);
  ctx.lineTo(mistyleaf.x + 40, mistyleaf.y + 20);
  ctx.stroke();

  // name label
  ctx.fillStyle = '#ffffff';
  ctx.font = '14px sans-serif';
  ctx.fillText(mistyleaf.name, mistyleaf.x - 10, mistyleaf.y - 10);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  update();
  drawMistyleaf();
  requestAnimationFrame(gameLoop);
}

gameLoop();
