let player1Name;
let player2Name;
let player1 = true;  // Keep track of the turn of the player
let stopGame = true;  // Stop the game
let submit = false;
let alertBox = false;
let toggleDark = false;
let squares = document.querySelectorAll(".square");
const winningAudio = new Audio('media/winning-sound.wav');
let colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

if(colorScheme == true){
    toggle();
}


function clickOnSubmit() {
    player1Name = document.querySelector("#player1").value;
    player2Name = document.querySelector("#player2").value;

    if (player1Name == "") {
        player1Name = "Player - 1";
    }
    if (player2Name == "") {
        player2Name = "Player - 2";
    }
    document.querySelector(".turn").innerHTML = "Turn : " + player1Name;

    if (submit == false) {
        stopGame = false;
        document.querySelector("#submitBtn").innerHTML = "Restart";
        submit = true;
    }
    else {
        restartGame("#submitBtn");
    }
}

document.querySelector("#submitBtn").addEventListener("click", (e) => {
    e.preventDefault();
    clickOnSubmit();
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
            if (player1Name == undefined) {
                player1Name = "Player - 1";
            }
            if (player2Name == undefined) {
                player2Name = "Player - 2";
            }

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
                    let x = winner("dot");
                    let y = winner("cross-1");
                    if (x == true) {
                        displayResult(player1Name, true);
                    }
                    else if (x == true) {
                        displayResult(player2Name, true);
                    }
                    else if (y == "Tie") {
                        displayResult("Tie", false);
                    }
                }
                else {
                    addCross(i);
                    player1 = true;
                    document.querySelector(".turn").innerHTML = "Turn : " + player1Name;
                    let x = winner("dot");
                    let y = winner("cross-1");
                    if (x == true) {
                        displayResult(player1Name, true);
                    }
                    else if (y == true) {
                        displayResult(player2Name, true);
                    }
                    else if (y == "Tie") {
                        displayResult("Tie", false);
                    }
                }
            }
        }
    });
}