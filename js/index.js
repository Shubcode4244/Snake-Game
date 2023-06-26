//game constants and variable
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("../resource/food.mp3");
const gameoversound = new Audio("../resource/gameover.mp3");
const movesound = new Audio("../resource/move.mp3");
const musicsound = new Audio("../resource/music.mp3");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakearr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };
//game function
function main(ctime) {
  window.requestAnimationFrame(main); //game loop
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function iscollide(snake) {
  // if you bump into your self
  for (let i = 1; i < snakearr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // you bumb itno the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  )
    return true;
}
function gameEngine() {
  // part-1:updateing the snack variable array & food
  if (iscollide(snakearr)) {
    gameoversound.play();
    musicsound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again");
    snakearr = [{ x: 13, y: 15 }];
    //  musicsound.play();
    score = 0;
  }
  // if you eaten the food the -> increment score and regenerate food
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodsound.play();
    score += 1;
    if (score > highscoreval) {
      highscoreval = score;
      localStorage.setItem("highscore", JSON.stringify(highscoreval));
      highscoreBox.innerHTML = "Hi Score: " + highscoreval;
    }
    scoreBox.innerHTML = "score: " + score;
    snakearr.unshift({
      x: snakearr[0].x + inputDir.x,
      y: snakearr[0].y + inputDir.y,
    }); // body me add karna
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  } // snankearr[0]== snake mundi

  // moving the snake
  for (let i = snakearr.length - 2; i >= 0; i--) {
    //const element = snakearr[i];
    // snakearr[i+1]=snakearr[i]; lke thus can't make
    snakearr[i + 1] = { ...snakearr[i] };
  }

  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;
  //part-2: display the snack and food ,update
  // display the snake->
  board.innerHTML = "";
  snakearr.forEach((e, index) => {
    snakeelement = document.createElement("div");
    snakeelement.style.gridRowStart = e.y;
    snakeelement.style.gridColumnStart = e.x;

    if (index == 0) {
      snakeelement.classList.add("head");
    } else {
      snakeelement.classList.add("snake");
    }
    board.appendChild(snakeelement);
  });
  // display the food->
  foodelement = document.createElement("div");
  foodelement.style.gridRowStart = food.y;
  foodelement.style.gridColumnStart = food.x;
  foodelement.classList.add("food");
  board.appendChild(foodelement);
}

//main logic start here
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
  highscoreval = 0;
  // highscoreval=0;
  localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(highscore);
  highscoreBox.innerHTML = "Hi Score: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //start the game
  movesound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
