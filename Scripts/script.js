let player1Name;
let player2Name;
let player1 = true;  // Keep track of the turn of the player
let stopGame = true;  // Stop the game
let submit = false;
let alertBox = false;
let toggleDark = false;
let pvp = undefined; // Player Vs Player
let player1Symbol = 'dot';
let player2Symbol = 'cross-1';
let botLevel;

let squares = document.querySelectorAll(".square");
const winningAudio = new Audio('media/winning-sound.wav');
let colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

if(colorScheme == true){
    toggle();
}

document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', event => {
    if(event.key != 'Enter'){
        event.preventDefault();
    }
});

function clickOnSubmit() {
    player1Name = document.querySelector("#player1").value;
    player2Name = document.querySelector("#player2").value;

    if (player1Name == undefined || player1Name == '') {
        player1Name = "Player - 1";
    }
    if ((player2Name == '' || player2Name == undefined) && pvp == true) {
        player2Name = "Player - 2";
    }
    else if((player2Name == '' || player2Name == undefined) && pvp == false){
        player2Name = "Bot";
    }

    if(pvp != undefined)
        document.querySelector(".turn").innerHTML = "Turn : " + player1Name;

    if (submit == false && pvp != undefined) {
        stopGame = false;
        document.querySelector("#submitBtn").innerHTML = "Restart";
        submit = true;
    }
    else {
        restartGame("#submitBtn");
    }
    player1Symbol = 'dot';
    player2Symbol = 'cross-1';

    if(pvp == false && submit == true){
        botLevel = document.getElementById("bot-level-selection-box").value;
        document.querySelector("#easy-medium-hard-text").innerHTML = "Level : "+botLevel;
        if(botLevel == "Easy")
            botLevel = 0;
        else if(botLevel == "Medium")
            botLevel = (Math.floor(Math.random() * 2)) + 1;
        
        else if(botLevel == "Hard")
            botLevel = 2;
    }
}

document.querySelector("#submitBtn").addEventListener("click", (e) => {
    e.preventDefault();
    clickOnSubmit();
})

document.querySelector("#pvp-btn").addEventListener("click",(event) => {
    event.preventDefault();
    document.querySelector("#user-choice-pvp-bot").setAttribute("style","display : none");
    document.querySelector("#player1").setAttribute("style","display : block");
    document.querySelector("#player2").setAttribute("style","display : block");
    document.querySelector("#submitBtn").setAttribute("style","display : block");
    pvp = true;
})

document.querySelector("#bot-btn").addEventListener("click",(event) => {
    event.preventDefault();
    document.querySelector("#user-choice-pvp-bot").setAttribute("style","display : none");
    document.querySelector("#player1").setAttribute("style","display : block");
    document.querySelector("#bot-level-selection-box").setAttribute("style","display : block");
    document.querySelector("#submitBtn").setAttribute("style","display : block");
    pvp = false;
})

document.querySelector('body').addEventListener("keypress",function(event){
    if(event.key == 'Enter'){
        event.preventDefault();
        if(event.key == 'Enter' && alertBox == false){
            clickOnSubmit();
        }
        else if(event.key == 'Enter' && alertBox == true){
            restartGame("#replyBtn");
        }
    }
})

let c = 'a'
let d = 1

for (const i of squares) {
    i.setAttribute("id", c + d)
    d = d + 1;

    if (d == 4) {
        c = String.fromCharCode(c.charCodeAt() + 1);
        d = 1
    }
}


for (const i of squares) {
    i.addEventListener("click", (event) => {
        if (stopGame == false) {
            if (i.hasChildNodes()) {
                if (i.firstChild.tagName == "SPAN") {
                    console.log("Skip")
                }
            }
            else {
                if (player1 == true) {
                    addCircle(i)
                    player1 = false;
                    document.querySelector(".turn").innerHTML = "Turn : " + player2Name;
                    let x = winner(player1Symbol);
                    let y = winner(player2Symbol);
                    if (x == true) {
                        displayResult(player1Name, true);
                    }
                    else if (y == true) {
                        displayResult(player2Name, true);
                    }
                    else if (y == "Draw") {
                        displayResult("Draw", false);
                    }
                    
                    // Uncomment this section for play with bot
                    if(x != true && y != true && y != "Draw" && pvp == false){
                        document.querySelector(".turn").innerHTML = "Turn : " + player1Name;
                        runBot(level = botLevel);
                    }
                    
                    x = winner(player1Symbol);
                    y = winner(player2Symbol);
                    if (x == true) {
                        displayResult(player1Name, true);
                    }
                    else if (y == true) {
                        displayResult(player2Name, true);
                    }
                    else if (y == "Draw") {
                        displayResult("Draw", false);
                    }
                }

                else if(pvp == true){
                    addCross(i);
                    player1 = true;
                    document.querySelector(".turn").innerHTML = "Turn : " + player1Name;
                    let x = winner(player1Symbol);
                    let y = winner(player2Symbol);
                    if (x == true) {
                        displayResult(player1Name, true);
                    }
                    else if (y == true) {
                        displayResult(player2Name, true);
                    }
                    else if (y == "Draw") {
                        displayResult("Draw", false);
                    }
                }
            }
        }
    });
}