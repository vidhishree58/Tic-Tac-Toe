let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let moveCount = 0;
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// RESET GAME
const resetGame = () => {
    turnO = true;
    moveCount = 0;
    gameOver = false;
    msgContainer.classList.add("hide");

    for (let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
};

// BOX CLICK
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver) return;

        if (turnO) {
            box.innerText = "O";
            box.style.color = "navy";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "maroon";
            turnO = true;
        }

        box.disabled = true;
        moveCount++;

        checkWinner();
        checkDraw();
    });
});

// CHECK WINNER
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            return;
        }
    }
};

// SHOW WINNER
const showWinner = (winner) => {
    msg.innerText = `Winner is ${winner} 🎉`;
    msgContainer.classList.remove("hide");
    gameOver = true;

    for (let box of boxes) {
        box.disabled = true;
    }
};

// CHECK DRAW
const checkDraw = () => {
    if (moveCount === 9 && !gameOver) {
        msg.innerText = "Game Draw 🤝";
        msgContainer.classList.remove("hide");
        gameOver = true;

        for (let box of boxes) {
            box.disabled = true;
        }
    }
};

// BUTTON EVENTS
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);