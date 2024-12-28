const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Set game variables
let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 }
];
let food = { x: 300, y: 300 };
let direction = 'right';
let score = 0;

// Draw game elements
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10);
}

// Update game state
function update() {
  // Move snake
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }
  switch (direction) {
    case 'up':
      snake[0].y -= 10;
      break;
    case 'down':
      snake[0].y += 10;
      break;
    case 'left':
      snake[0].x -= 10;
      break;
    case 'right':
      snake[0].x += 10;
      break;
  }

  // Check for collision with food
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * (canvas.width - 10)) + 10,
      y: Math.floor(Math.random() * (canvas.height - 10)) + 10
    };
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
  }

  // Check for collision with wall or self
  if (snake[0].x < 0 || snake[0].x > canvas.width - 10 || snake[0].y < 0 || snake[0].y > canvas.height - 10) {
    alert('Game Over!');
    return;
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      alert('Game Over!');
      return;
    }
  }
}

// Handle user input
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      direction = 'up';
      break;
    case 'ArrowDown':
      direction = 'down';
      break;
    case 'ArrowLeft':
      direction = 'left';
      break;
    case 'ArrowRight':
      direction = 'right';
      break;
  }
});

// Main game loop
setInterval(() => {
  update();
  draw();
}, 100);