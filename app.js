let allBtns = document.querySelectorAll(".boxes");

let reStart = document.querySelector(".btn");

let h3 = document.querySelector("h3");

let Xwon = document.querySelector(".x");
let Owon = document.querySelector(".o");


let Xcount = 0;
let Ocount = 0;


let gameState = ["", "", "", "", "", "", "", "", ""];

let gameStart = true;

let currentPlayer = "X";




h3.innerHTML = `Player's <b>${currentPlayer}</b> turn!`;

const winningCon =  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



for(btn of allBtns){
    btn.addEventListener("click", cellClick);
}

function cellClick() {

    let cellIndex = this.getAttribute('data-cell-index');

    // console.log(this);

    if(gameState[cellIndex] != "" && !gameStart){
        return;
    }

    cellPlayed(this, cellIndex);
    checkWinner();
}

function cellPlayed(cell, cellIndex){
    gameState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;
}

function checkWinner(){
    let roundWon = false;
    for(let i=0; i < winningCon.length; i++){
        const condition = winningCon[i];
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]]; 

        if (a == "" || b == "" || c == ""){
            continue;
        }

        if (a === b && b === c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        if(currentPlayer == "X"){
            Xcount++;
            Xwon.innerHTML = `<b>X</b> won = ${Xcount}`;
            
        } else {
            Ocount++;
            Owon.innerHTML = `<b>O</b> won = ${Ocount}`;
        }
        
        h3.innerHTML = `<b>${currentPlayer}</b> has won!`;
        gameStart = false;
    } 
    else if (!gameState.includes("")) {
        h3.innerHTML = "Game ended in a Draw!";
        gameStart = false;
    } 
    else {
        playerChange();
    }
}

function playerChange(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    h3.innerHTML = `Player's <b>${currentPlayer}</b> turn!`;
}


reStart.addEventListener("click", ()=> {
    gameStart = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", ""];
    h3.innerHTML = `Player's <b>${currentPlayer}</b> turn!`;
    allBtns.forEach(cell => cell.innerText = "");
})
