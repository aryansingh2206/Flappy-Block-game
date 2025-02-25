const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 400;

// Player properties
const player = {
    x: 100,
    y: 200,
    width: 40,
    height: 40,
    dy: 0, // Vertical speed (gravity)
    gravity: 0.5, // Gravity effect
    lift: -8, // How much the player moves up when pressing a key
    color: "red"
};

// Obstacle properties
const obstacles = [];
const obstacleWidth = 50;
const obstacleGap = 150;
let frameCount = 0;
let score = 0;

// Handle key press for gliding up
document.addEventListener("keydown", () => {
    player.dy = player.lift;
});

// Function to update the game
function update() {
    player.dy += player.gravity;
    player.y += player.dy;

    // Prevent player from falling off the screen
    if (player.y > canvas.height - player.height) player.y = canvas.height - player.height;
    if (player.y < 0) player.y = 0;

    // Create new obstacles
    if (frameCount % 100 === 0) {
        let obstacleHeight = Math.random() * (canvas.height / 2);
        obstacles.push({ x: canvas.width, y: 0, width: obstacleWidth, height: obstacleHeight });
        obstacles.push({ x: canvas.width, y: obstacleHeight + obstacleGap, width: obstacleWidth, height: canvas.height - obstacleHeight - obstacleGap });
    }

    // Move obstacles
    obstacles.forEach(obstacle => obstacle.x -= 3);

    // Remove off-screen obstacles
    if (obstacles.length > 0 && obstacles[0].x < -obstacleWidth) {
        obstacles.shift();
        obstacles.shift();
        score++;
    }

    // Check for collisions
    obstacles.forEach(obstacle => {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            alert("Game Over! Score: " + score);
            document.location.reload();
        }
    });

    frameCount++;
}

// Function to draw the game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    ctx.fillStyle = "green";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
