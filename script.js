const boxes = document.querySelectorAll(".box"),
gameInfo = document.querySelector(".game-info"),
newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

 
function initgame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box , index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

initgame();

boxes.forEach((box , index) => {
    box.addEventListener("click" , () => {
        handleClick(index);
    })
});

function handleClick(index) {
    if(gameGrid[index]===""){
        boxes[index].innerText = currentPlayer ;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

function swapTurn(){
    if (currentPlayer == "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Playe - ${currentPlayer}`;
}
function checkGameOver(){
    let answer = "";
    winningPosition.forEach((positions) => {
        if((gameGrid[positions[0]] !== "" || gameGrid[positions[1]] !== "" || gameGrid[positions[1]] !== "") && (gameGrid[positions[0]] === gameGrid[positions[1]]) && (gameGrid[positions[1]] === gameGrid[positions[2]])){
            if(gameGrid[positions[0]] === "X")
                answer = "X";
            else    
                answer = "0";
            

            boxes[positions[0]].classList.add("win");
            boxes[positions[1]].classList.add("win");
            boxes[positions[2]].classList.add("win");

            //disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            
        }
    })

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there is no winner 
    let fillCount = 0 ;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    })
    if(fillCount === 9){
        gameInfo.innerText = `Game Tied` ;
        newGameBtn.classList.add("active");
    }
}
newGameBtn.addEventListener("click" , initgame);