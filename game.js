const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 100,
  y: 300,
  width: 50,
  height: 50,
  color: "red",
  vx: 0,
  vy: 0,
  onGround: false,
};

const gravity = 0.5;
const moveSpeed = 5;
const jumpPower = -12;

const keys = {
  left: false,
  right: false,
  up: false,
};

// スマホ用ボタンイベント
document.getElementById("leftBtn").addEventListener("touchstart", () => keys.left = true);
document.getElementById("leftBtn").addEventListener("touchend", () => keys.left = false);
document.getElementById("rightBtn").addEventListener("touchstart", () => keys.right = true);
document.getElementById("rightBtn").addEventListener("touchend", () => keys.right = false);
document.getElementById("jumpBtn").addEventListener("touchstart", jump);
document.getElementById("jumpBtn").addEventListener("touchend", () => {});

function jump() {
  if (player.onGround) {
    player.vy = jumpPower;
    player.onGround = false;
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
  if (e.key === "ArrowUp") jump();
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
});

function update() {
  // 横移動
  if (keys.left) player.vx = -moveSpeed;
  else if (keys.right) player.vx = moveSpeed;
  else player.vx = 0;

  player.x += player.vx;

  // 重力とジャンプ
  player.vy += gravity;
  player.y += player.vy;

  // 地面との当たり判定
  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.vy = 0;
    player.onGround = true;
  } else {
    player.onGround = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
