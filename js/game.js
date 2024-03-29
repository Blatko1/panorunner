const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const ASPECT_RATIO = CANVAS_WIDTH / CANVAS_HEIGHT
const GRAVITY = 1;
const GROUND_HEIGHT = CANVAS_HEIGHT * 0.7;

const jumpSprites = document.getElementsByClassName("jumpSprite");
let player = new Player({ x: 100, y: 100 }, 30, jumpSprites, null);

const groundTexture = document.getElementById("ground");
const backgrounds = document.getElementsByClassName("background");
let world = new World(groundTexture, backgrounds, 200);

let lastTime = performance.now();
let deltaTime = 1;
let secondTimer = performance.now();
let avgFPSTime = 0;
let frameCount = 0;
let FPSText = "FPS: ";

function mainLoop() {
  requestAnimationFrame(mainLoop);

  // Update
  player.update();
  world.update();

  // Draw
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  world.draw();
  player.draw();

  updateFPS();
}

function updateFPS() {
  let currentTime = performance.now();
  deltaTime = (currentTime - lastTime) / 1000.0;
  lastTime = currentTime;
  avgFPSTime += deltaTime;
  frameCount++;

  if (performance.now() - secondTimer > 1000) {
    FPSText = "FPS: " + (1.0 / (avgFPSTime / frameCount)).toFixed(2);
    secondTimer = performance.now();
    frameCount = 0;
    avgFPSTime = 0;
  }
  ctx.fillText(FPSText, 10, 10);
}

function changeBackground() {
  world.alternateBackground()
}

mainLoop();
setInterval(changeBackground, Math.random() * 5000 + 5000)