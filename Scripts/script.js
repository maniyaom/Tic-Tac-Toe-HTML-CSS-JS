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
    event.preventDefault();
    if(event.key == 'Enter' && alertBox == false){
        clickOnSubmit();
    }
    else if(event.key == 'Enter' && alertBox == true){
        restartGame("#replyBtn");
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
                    let node = document.createElement("span");
                    node.setAttribute("class", "dot");
                    i.appendChild(node)
                    player1 = false;
                    i.setAttribute("style", "cursor : revert");
                    document.querySelector(".turn").innerHTML = "Turn : " + player2Name;
                    let x = winner("dot");
                    if (x == true) {
                        displayResult(player1Name, true);
                    }
                    x = winner("cross-1");
                    if (x == true) {
                        displayResult(player2Name, true);
                    }
                    else if (x == "Tie") {
                        displayResult("Tie", false);
                    }
                }
                else {
                    let node1 = document.createElement("span");
                    node1.setAttribute("class", "cross-1");

                    let node2 = document.createElement("span");
                    node2.setAttribute("class", "cross-2");

                    i.appendChild(node1);
                    i.appendChild(node2);
                    player1 = true;
                    i.setAttribute("style", "cursor : revert");
                    document.querySelector(".turn").innerHTML = "Turn : " + player1Name;
                    let x = winner("dot");
                    if (x == true) {
                        displayResult(player1Name, true);
                    }
                    x = winner("cross-1");
                    if (x == true) {
                        displayResult(player2Name, true);
                    }
                    else if (x == "Tie") {
                        displayResult("Tie", false);
                    }
                }
            }
        }
    });
}