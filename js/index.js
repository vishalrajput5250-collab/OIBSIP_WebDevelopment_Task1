//Game constant & variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio();  //"food.mp3"
const gameOverSound = new Audio();  //"gameover.mp3"
const moveSound = new Audio();  //move.mp3
const musicSound = new Audio();  //music.mp3
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };



// Game function
function main(ctimes) {
    window.requestAnimationFrame(main);
    // console.log(ctimes);
    if ((ctimes - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctimes;
    gameEngine();
}

function isCollide(snake) {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

}

function gameEngine() {
    // part 1: updating the sanke array & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over, Press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }
    // if you have eaten the food increment the sore and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {

        foodSound.play();
        score++;

        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });

        let a = 2;
        let b = 16;

        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }
    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2: Display the snake & food
    //  Display the snake 
    board.innerHTML = "";

    snakeArr.forEach((e, index) => {

        let snakeElement = document.createElement("div");

        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }

        board.appendChild(snakeElement);
    });


    //  Display the snake
    let foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");

    board.appendChild(foodElement);

}

// // Main logic start here
window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {

    moveSound.play();

    switch (e.key) {

        case "ArrowUp":
            inputDir = { x: 0, y: -1 };
            break;

        case "ArrowDown":
            inputDir = { x: 0, y: 1 };
            break;

        case "ArrowLeft":
            inputDir = { x: -1, y: 0 };
            break;

        case "ArrowRight":
            inputDir = { x: 1, y: 0 };
            break;
    }
});














