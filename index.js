const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btn_start = document.getElementById("btn_start");

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
let paddleY = canvas.height - paddleHeight - 20;


function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
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
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    drawPaddle()
    
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
            // Game over
            alert('Game over');
            // document.location.reload();
            clearInterval(interval); // Stop game with clearInterval()    
        }
    }
}

//Start game with button
btn_start.addEventListener("click", () => {
    interval = setInterval(drawBall, 10);
});
