const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btn_start = document.getElementById("btn_start");
const bricks = [];

let right = false;
let left = false;
let interval = 0;

// Ball's position
let x = canvas.width / 2;
let y = canvas.height - 40;
let dx = 2;
let dy = -2;

// Paddle position & sizes
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;

const scorePointer = document.getElementById('scorePointer');
let scorePoint = 0;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function initialBricks() {
    for (let i = 0; i < 4; i++) {
        bricks[i] = [];
        for (let j = 0; j < 3; j++) {
            // Bricks position
            const brickX = i * (50 + paddleWidth) + 20;
            const brickY = j * (50 + paddleHeight) + 50;
            bricks[i][j] = { x: brickX, y: brickY, status: 1 };
        }
    }
}

// Bricks
function drawBricks() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            // Bricks position
            const brickX = i * (50 + paddleWidth) + 70;
            const brickY = j * (50 + paddleHeight) + 50;
            
            
            
            if (bricks[i][j].status === 1) {
                // Bricks drawing
                ctx.beginPath();
                ctx.rect(brickX, brickY, paddleWidth, paddleHeight);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Collision with bricks
function collisionWithBricks() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            const brick = bricks[i][j];

            if (brick.status === 1) {
                if (x > brick.x && x < brick.x + paddleWidth + 70 && y > brick.y && y < brick.y + paddleHeight) {
                    dy = -dy;
                    brick.status = 0;
                    scorePoint++;
                    scorePointer.innerHTML = `Score: ${scorePoint}`
                    // If you won
                    if (scorePoint == 12) {
                        alert('You won!');
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}


//Move the paddle
document.addEventListener("keydown", keyIsPressed, false);

function keyIsPressed(btn) {
    if (btn.key === "Right" || btn.key === "ArrowRight") {
        paddleX += 7;
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (btn.key === "Left" || btn.key === "ArrowLeft") {
        paddleX -= 7;
        paddleX = Math.max(paddleX - 7, 0); 
    }
}

// Function for ball's moving
function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // drawing a ball
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    drawPaddle();
    drawBricks();
    collisionWithBricks();
    
    //change ball's pos
    y += dy;
    x += dx;
    

    // ball's ricochet
    if (x + dx > canvas.width - 10 || x + dx < 10) {
        dx = -dx;
    }
    
    if (y + dy < 10) {
        dy = -dy;
    } 
    
    if (y + dy > canvas.height - 10) {
        if (x > paddleX && x < paddleX + paddleWidth && y - 30 < paddleY) {
            dy = -dy;
        } else {
            // If you lose
            alert('Game over');
            document.location.reload();
            clearInterval(interval); // Stop game with clearInterval()    
            dy = -dy;
        }
    }
}

// Start game with button
btn_start.addEventListener("click", () => {
    initialBricks()
    interval = setInterval(drawBall, 10);
    console.log(bricks);
});


