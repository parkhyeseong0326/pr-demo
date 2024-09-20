const stageSize = 15;

for(let i=0; i < stageSize*stageSize; i++) {
    const box = document.createElement("div");
    document.querySelector(".grid").appendChild(box);
}

const grid = document.querySelector(".grid");
const stage = document.querySelectorAll(".grid div");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const display = document.querySelector("#display");

let playerLoc = stageSize*(stageSize-2)+7;
let invadersLoc = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];
let gameInterval;

function makePlayer() { 
    stage[playerLoc].classList.add("player");
}
function movePlayer(e) { 
    stage[playerLoc].classList.remove("player");
    switch (e.keyCode) {
        case 37:
            if (playerLoc % stageSize !==0) {playerLoc--;}
            break;
        case 39:
            if (playerLoc % stageSize < stageSize-1) {playerLoc++;}
            break;
    }
    stage[playerLoc].classList.add("player");
}

function makeInvader() {
    invadersLoc.forEach(function(invader){
        stage[invader].classList.add("invader");
    })
}

function moveInvader() {
    invadersLoc.forEach(function(invader) {
        stage[invader].classList.remove("invader");
    })
    for(let i=0; i < invadersLoc.length; i++) {
        invadersLoc[i]++;
        stage[invadersLoc[i]].classList.add("invader");
    }
}

function gameStart() {
    stage[playerLoc].classList.remove("player");
    invadersLoc.forEach(function(invader) {
        stage[invader].classList.remove("invader");
    });
    display.innerText = ""
    playerLoc = stageSize*(stageSize-2)+7
    invadersLoc = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ]
    makePlayer();
    makeInvader();
    displayStatus();
    gameInterval = setInterval(gameRun, 1000);
    gameRun();
    document.addEventListener("keyup", movePlayer);
}

function gameStop() {
    clearInterval(gameInterval);
    document.removeEventListener("keyup", movePlayer);
}

function gameRun() {
    moveInvader();
}

function displayStatus() {
    display.innerText = invadersLoc.length + "/" + invadersLoc.length
}

startBtn.addEventListener("click", gameStart);
stopBtn.addEventListener("click", gameStop);

let bulletId;
let bulletLoc = playerLoc;

function moveBullet() {
    stage[bulletLoc].classList.remove("bullet");
    bulletLoc -= stageSize;
    stage[bulletLoc].classList.add("bullet");
}

function shoot(e) {
    let id;
    let bulletLoc = playerLoc;
    function moveBullet() {
        stage[bulletLoc].classList.remove("bullet");
        bulletLoc -= stageSize;
        if(bulletLoc < 0) {
            clearInterval(id);
            return;
        }
        stage[bulletLoc].classList.add("bullet");
        if(stage[bulletLoc].classList.contains("invader")) {
            stage[bulletLoc].classList.remove("invader")
            stage[bulletLoc].classList.remove("bullet")
            stage[bulletLoc].classList.add("boom")
        }
    }
    if (e.key === "ArrowUp") {
        id = setInterval(moveBullet, 300)
    }
}
document.addEventListener("keydown", shoot);