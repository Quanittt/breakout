const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btn_start = document.getElementById("btn_start");

// Ball's position
let x = canvas.width / 2;
let y = canvas.height - 40;
let dx = 2;
let dy = -2;

// Function for ball's moving
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    y += dy;
    x += dx;
    
    // ball's ricochet
    if (x + dx > canvas.width - 10 || x + dx < 10) {
        dx = -dx;
    }
    
    if (y + dy > canvas.height - 10 || y + dy < 10) {
        dy = -dy;
    }      
}
setInterval(draw, 10);
btn_start.addEventListener("click", () => {
});

ctx.beginPath();
ctx.rect(20, 20, 100, 20);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();


ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();
