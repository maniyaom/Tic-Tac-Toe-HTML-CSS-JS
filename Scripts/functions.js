let sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

function clickEffect(id) {
    let x = document.querySelector(id);
    x.style.transform = "scale(1.06)";

    sleep(100).then(() => {
        x.style.transform = "scale(1)";
    });
}

function winner(name) {
    let col = document.querySelectorAll(".col");
    let win = true;
    for (const i of col) {
        for (let j = 0; j < i.children.length; j++) {
            if (i.children[j].innerHTML.includes(name)) {
                win = true;
            }
            else {
                win = false;
                break;
            }
        }
        if (win == true) {
            return true;
        }
    }

    for (let i = 0; i < 3; i++) {
        for (const j of col) {
            if (j.children[i].innerHTML.includes(name)) {
                win = true;
            }
            else {
                win = false;
                break;
            }
        }
        if (win == true) {
            return true;
        }
    }

    // For Diagonal Elements
    let i = 0;
    for (let k = 0; k < 2; k++) {
        for (let j = 0; j < 3; j++) {
            if (col[j].children[i].innerHTML.includes(name)) {
                win = true;
            }
            else {
                win = false;
                break;
            }

            if (k == 0) {
                i++;
            }
            else {
                i--;
            }

        }
        i = 2;

        if (win == true) {
            return true;
        }
    }
    value = checkTie();
    if (value == true) {
        return "Tie";
    }
    else {
        return false;
    }
}

function checkTie() {
    let value = true;
    for (const i of squares) {
        if (i.innerHTML == '') {
            value = false;
            return false;
        }
    }
    return value;
}

function displayResult(name, value) {
    console.log(value);
    if (value == true) {
        document.querySelector(".turn").innerHTML = name + " Won the game.";
        document.querySelector(".pop-up").children[0].innerHTML = name + " Won.";
    }
    else {
        document.querySelector(".turn").innerHTML = "Tie";
        document.querySelector(".pop-up").children[0].innerHTML = "Tie";
    }
    document.querySelector(".pop-up").style.display = "flex";
    document.querySelector(".parent").style.opacity = "0.2";
    stopGame = true;
    winningAudio.play();
}

function restartGame(id) {
    clickEffect(id)
    document.querySelector(".pop-up").style.display = "none";
    document.querySelector(".parent").style.opacity = "1";
    document.querySelector(".turn").innerHTML = "Turn : " + player1Name;
    player1 = true;
    stopGame = false;
    for (const i of squares) {
        i.innerHTML = ""
        i.removeAttribute("style");
    }
}