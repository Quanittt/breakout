const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
    
ctx.beginPath();
ctx.rect(20, 20, 100, 20);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(75, 75, 15, 0, 2 * Math.PI);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(160, 10, 100, 40);
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.closePath();