const keypad = document.querySelector(".keypad");
let text = document.querySelector(".screen");
let key = new Array(5);
let keyPad = [" 1", "2abc", "3def", "4ghi", "5jkl", "6mno", "7pqrs", "8tuv", "9wxyz", "*+", "0 ", " #"]; 
let pressCnt = 1, prevKeyInd = null, prevTimeStamp = 0;

createKeys();

function createKeys() {
    for (let i = 1; i < key.length; ++i) {
        key[i] = new Array(4);
    }
    let keyInd = 0;
    //We create the phone buttons and draw the associated characters on them.
    for (let i = 1; i < key.length; ++i) {
        const row = document.createElement("tr");
        for (let j = 1; j < key[i].length; ++j) {
            key[i][j] = document.createElement("td");
            key[i][j].id = keyInd;
            key[i][j].textContent = keyPad[keyInd];
            key[i][j].addEventListener("click", function () {write(event, this.id)})
            row.appendChild(key[i][j]);
            ++keyInd;
        }
        keypad.appendChild(row);
    }
}

function write(e, keyInd) {
    let timeStamp = e.timeStamp;
    /* We check if the user presses on the same button more than one time within a second.
    If yes, we scroll until the desired character from the button pressed and display it.
    If no, we just display the character from the position 1 of the button pressed */
    if (keyInd === prevKeyInd && timeStamp - prevTimeStamp < 1000) {
        ++pressCnt;
        if (pressCnt >= keyPad[keyInd].length) {
            pressCnt = 0;
        }
        text.innerHTML = text.innerHTML.slice(0, -1) + keyPad[keyInd][pressCnt];
    } else {
        pressCnt = 1;
        text.innerHTML += keyPad[keyInd][pressCnt];
    }
    //If the height of the text exceeds the height of the display, we hide the top overflow.
    if (text.clientHeight < text.scrollHeight) {
        text.scrollTop = text.scrollHeight - text.clientHeight;
    }
    prevKeyInd = keyInd;
    prevTimeStamp = timeStamp;
}
