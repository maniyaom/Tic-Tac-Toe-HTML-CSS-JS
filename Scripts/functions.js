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

function toggle() {
    if (toggleDark == false) {
        document.querySelector(".switch").children[0].style.marginLeft = "25px";
        document.querySelector(".switch").children[0].style.backgroundColor = "gray";
        toggleDark = true;
    }
    else {
        document.querySelector(".switch").children[0].removeAttribute("style");
        toggleDark = false;
    }
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
        return "Draw";
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

function addCircle(i){
    let node = document.createElement("span");
    node.setAttribute("class", "dot");
    i.appendChild(node)
    i.setAttribute("style", "cursor : revert");
}

function addCross(i){
    let node1 = document.createElement("span");
    node1.setAttribute("class", "cross-1");
    let node2 = document.createElement("span");
    node2.setAttribute("class", "cross-2");
    i.appendChild(node1);
    i.appendChild(node2);
    i.setAttribute("style", "cursor : revert");
}

function findBlankSquares(){
    blankSquares = []
    for (const i of squares){
        if(i.innerHTML == ''){
            blankSquares.push(i.getAttribute("id"))
        }
    }
    return blankSquares;
}

function changeLevel(){
    if(pvp == false && findBlankSquares().length == 9){
        botLevel = document.getElementById("bot-level-selection-box").value;
        document.querySelector("#easy-medium-hard-text").innerHTML = "Level : "+botLevel;
        if(botLevel == "Easy")
            botLevel = 0;
        else if(botLevel == "Medium")
            botLevel = (Math.floor(Math.random() * 2)) + 1;
        
        else if(botLevel == "Hard")
            botLevel = 2;
        console.log(botLevel);
    }
}

function displayResult(name, value) {
    if (value == true) {
        document.querySelector(".turn").innerHTML = name + " Won the game.";
        document.querySelector(".pop-up").children[0].innerHTML = name + " Won.";
    }
    else {
        document.querySelector(".turn").innerHTML = "Draw";
        document.querySelector(".pop-up").children[0].innerHTML = "Draw";
    }
    alertBox = true;
    document.querySelector(".pop-up").style.display = "flex";
    document.querySelector(".parent").style.opacity = "0.2";
    document.querySelector(".header").style.opacity = "0.2";
    stopGame = true;
    winningAudio.play();
}

function restartGame(id) {
    if(pvp != undefined){
        clickEffect(id)
        document.querySelector(".pop-up").style.display = "none";
        document.querySelector(".parent").style.opacity = "1";
        document.querySelector(".header").style.opacity = "1";
        document.querySelector(".turn").innerHTML = "Turn : " + player1Name;
        player1 = true;
        stopGame = false;
        alertBox = false;
        for (const i of squares) {
            i.innerHTML = ""
            i.removeAttribute("style");
        }
        if(pvp == false)
            botLevel = document.getElementById("bot-level-selection-box").value;
    }
}

function winPossibleInNextTurn(symbol,blankSquares){
    let ele = '';
        cols = document.querySelectorAll(".col");

        // Checks for column
        for (const i of cols){
            let count = 0;
            for (let j=0; j < i.children.length; j++){
                if(i.children[j].innerHTML.includes(symbol)){
                    count++;
                }
                else{
                    ele = i.children[j];
                }
            }
            if(count == 2){
                if(blankSquares.includes(ele.getAttribute("id")))
                    return ele;
            }
        }

        // Checks for rows
        for (let i = 0; i < 3; i++) {
            let count = 0;
            for (const j of cols) {
                if (j.children[i].innerHTML.includes(symbol)) {
                    count++;
                }
                else{
                    ele = j.children[i];
                }
            }
            if(count == 2){
                if(blankSquares.includes(ele.getAttribute("id")))
                    return ele;
            }
        }

        // Checks For Diagonal Element
        let i = 0;
        for (let k = 0; k < 2; k++,i=2) {
            count = 0
            for (let j = 0; j < 3; j++) {
                if (cols[j].children[i].innerHTML.includes(symbol)) {
                    count++;
                }
                else{
                    ele = cols[j].children[i];
                }
                
                if(k == 0){
                    i++;
                }
                else{
                    i--;
                }
            }

            if(count == 2){
                if(blankSquares.includes(ele.getAttribute("id")))
                    return ele;
            }
        }
    return undefined;
}

function playrandom(blankSquares){
    let x = Math.floor((Math.random() * (blankSquares.length - 1)) + 1);
    
    addCross(document.getElementById(blankSquares[x]));
    player1 = true;
}

function runBot(level){
    let blankSquares = findBlankSquares();
    let a1 = document.querySelector("#a1");
    let b2 = document.querySelector("#b2");
    let c3 = document.querySelector("#c3");

    if(level == 0){
        playrandom(blankSquares);
    }
    else{
        if(winPossibleInNextTurn(player2Symbol,blankSquares) == undefined){
            if(winPossibleInNextTurn(player1Symbol,blankSquares) == undefined){
                if(blankSquares.length == 8 && b2.innerHTML.includes(player1Symbol) && level == 2)
                    addCross(a1);
                else if(blankSquares.length == 6 && a1.innerHTML.includes(player2Symbol) && c3.innerHTML.includes(player1Symbol) && level == 2)
                    addCross(document.querySelector("#c1"));
                else
                    playrandom(blankSquares);
                player1 = true;
            }
            else{
                let ele = winPossibleInNextTurn(player1Symbol,blankSquares);
                addCross(ele);
                player1 = true;
            }
        }
        else{
            let ele = winPossibleInNextTurn(player2Symbol,blankSquares);
            addCross(ele);
            player1 = true;
        }
    }
}