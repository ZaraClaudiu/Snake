const game = document.getElementById('game');
const btnReset = document.getElementById('btnReset');
let direction = 'r';
let interval = 250;
let food;
let snake = [];
let headSnake;
// with border
const w=400;
// height border
const h=600;
// the size of a piece of snake
const bw=10;

document.addEventListener('DOMContentLoaded', onLoad);
document.addEventListener('keydown', onKeyDown);
btnReset.addEventListener('click', onReset)

function onLoad(){
  createSnake(200, 300);
  generateFood();
}
 //reset game
function onReset() {
  game.innerHTML='';
  snake.length= 0;
  btnReset.disabled = true;
  interval= 250;
  direction = 'r';
  createSnake(200, 300);
  generateFood();
  timer = setInterval(gameLoop, interval);

}

function createSnake(left, top) {
  for(let i = 0; i < 4; i++) {
    let div = document.createElement('div');
    div.style.top = `${top}px`;
    div.style.left = `${left}px`;
    left = left-bw;
    snake.push(div);
    game.appendChild(div);
  }
  headSnake = snake[0];
}
let timer = setInterval(gameLoop, interval);

function gameLoop() {
  let t = parseInt(headSnake.style.top); //top
  let l = parseInt(headSnake.style.left);//left

  if(gameOver(t,l)) {
    clearInterval(timer);
    btnReset.disabled = false;
    alert('Game Over');
    return;
  }
//check if the coordinates of the food are the same as the coordinates of the headSnake
  if(headSnake.offsetLeft == food.offsetLeft &&
     headSnake.offsetTop==food.offsetTop) {
       snake.splice(1, 0, food);
       generateFood();
     }

  headSnake.oldT = t;
  headSnake.oldL = l;
  switch(direction) {
    case 'r':
      l=l+bw;
      break;
    case 'l':
      l=l-bw;
      break;
    case 'u':
      t=t-bw;
      break;
    case 'd':
      t=t+bw;
      break;
  }
  headSnake.style.top = `${t}px`;
  headSnake.style.left = `${l}px`;
  // move every element of the snake
    for (let i = 1; i < snake.length; i++) {
      let nextElementAfterHead = snake[i-1];
      t= parseInt(snake[i].style.top);
      l= parseInt(snake[i].style.left);
      snake[i].oldT=t;
      snake[i].oldL=l;
      snake[i].style.top = `${nextElementAfterHead.oldT}px`;
      snake[i].style.left = `${nextElementAfterHead.oldL}px`;

    }
}
function gameOver(t, l) {
  for(let i = 1; i < snake.length; i++) {
    if(snake[i].offsetLeft == l && snake[i].offsetTop == t) {
        return true;
    }
  }
  return t>=h || l<0 || t<0 || l>=w;
}

function onKeyDown(e) {
  switch(e.key) {
    case 'ArrowRight' :
      direction =  direction != 'l' ? 'r': direction;
      break;
    case 'ArrowLeft' :
      direction = direction != 'r' ? 'l' : direction;
      break;
    case 'ArrowUp' :
      direction = direction != 'd' ? 'u' : direction;
      break;
    case 'ArrowDown':
      direction = direction != 'u' ? 'd' :direction;
      break;
  }
}

function generateNumber(min, max) {
  return Math.ceil(min + Math.random()* (max - min));
}

function generateFood() {
  let d = document.createElement('div');

  //set random coordinates inside the border
  let t = 10*generateNumber(0, h/10-1);
  let l = 10*generateNumber(0, w/10-1);
  d.style.top = `${t}px`;
  d.style.left = `${l}px`;
  food = d;
  game.appendChild(d);
}
