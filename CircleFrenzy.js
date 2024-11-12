// CircleFrenzy.js
/* SUGGESTIONS ARE AT BOTTOM OF JS FILE. */

// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game variables
let playerX = canvas.width / 2;
let playerY = canvas.height / 2;
let playerRadius = 20;
let playerSpeed = 5;

let enemyRadius = 20;
let enemySpeed = 3;
let enemies = [];

let score = 0;
let gameOver = false;

// Touch event variables
let touchX, touchY;

// Event listeners
canvas.addEventListener('touchstart', (e) => {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
});

// Game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(playerX, playerY, playerRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Update player position
  if (touchX && touchY) {
    playerX += (touchX - playerX) / playerSpeed;
    playerY += (touchY - playerY) / playerSpeed;
  }

  // Create enemies
  if (Math.random() < 0.1) {
    enemies.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: Math.random() * enemySpeed * (Math.random() < 0.5 ? -1 : 1),
      speedY: Math.random() * enemySpeed * (Math.random() < 0.5 ? -1 : 1)
    });
  }

  // Update enemies
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    // Collision detection
    if (Math.hypot(playerX - enemy.x, playerY - enemy.y) < playerRadius + enemyRadius) {
      gameOver = true;
    }

    // Draw enemy
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemyRadius, 0, 2 * Math.PI);
    ctx.fill();

    // Remove off-screen enemies
    if (enemy.x < 0 || enemy.x > canvas.width || enemy.y < 0 || enemy.y > canvas.height) {
      enemies.splice(i, 1);
      score++;
    }
  }

  // Draw score
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10);

  // Game over screen
  if (gameOver) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '48px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 50);
  } else {
    requestAnimationFrame(update);
  }
}

update();

/* SUGGESTIONS */
/***
 * SUGGESTION 1: Increase Difficulty.
 * 
// Increase enemy speed and spawn rate
if (score > 10) {
    enemySpeed = 5;
}

if (score > 20) {
    enemySpeed = 7;
    // Increase spawn rate
    if (Math.random() < 0.2) {
        enemies.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: Math.random() * enemySpeed * (Math.random() < 0.5 ? -1 : 1),
            speedY: Math.random() * enemySpeed * (Math.random() < 0.5 ? -1 : 1)
        });
    }
}
 * 
 **/

/***
 * SUGGESTION 2: Power-ups.
 * 
// Power-up circle
if (Math.random() < 0.01) {
    powerUps.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        type: Math.random() < 0.5 ? 'invincibility' : 'scoreBoost'
    });
}

// Draw power-ups
for (let i = 0; i < powerUps.length; i++) {
    const powerUp = powerUps[i];
    ctx.fillStyle = powerUp.type === 'invincibility' ? 'green' : 'yellow';
    ctx.beginPath();
    ctx.arc(powerUp.x, powerUp.y, enemyRadius, 0, 2 * Math.PI);
    ctx.fill();
}

// Collision detection with power-ups
for (let i = 0; i < powerUps.length; i++) {
    const powerUp = powerUps[i];
    if (Math.hypot(playerX - powerUp.x, playerY - powerUp.y) < playerRadius + enemyRadius) {
        // Apply power-up effect
        if (powerUp.type === 'invincibility') {
            // Temporary invincibility
            gameOver = false;
            invincibility = true;
            setTimeout(() => {
                invincibility = false;
            }, 3000);
        } else if (powerUp.type === 'scoreBoost') {
            // Increased scoring
            score += 5;
        }
        powerUps.splice(i, 1);
    }
}
 * 
 **/

/***
 * SUGGESTION 3: Sound Effects.
 * 
// Sound effects
const collisionSound = new Audio('collision.mp3');
const powerUpSound = new Audio('powerup.mp3');
const gameOverSound = new Audio('gameover.mp3');

// Play sound effects
if (gameOver) {
    gameOverSound.play();
}

if (Math.hypot(playerX - enemy.x, playerY - enemy.y) < playerRadius + enemyRadius) {
    collisionSound.play();
}

if (powerUp.type === 'invincibility' || powerUp.type === 'scoreBoost') {
    powerUpSound.play();
}
 * 
 **/

/***
 * SUGGESTION 4: Leaderboard.
 * 
// Store score in local storage
localStorage.setItem('highScore', score);

// Retrieve high score
const highScore = localStorage.getItem('highScore');

// Display leaderboard
ctx.font = '24px Arial';
ctx.fillStyle = 'black';
ctx.textAlign = 'left';
ctx.textBaseline = 'top';
ctx.fillText(`High Score: ${highScore}`, 10, 50);
 * 
 **/

