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
    if (text.clientHeight < text.scrollHeight) {
        text.scrollTop = text.scrollHeight - text.clientHeight;
    }
    prevKeyInd = keyInd;
    prevTimeStamp = timeStamp;
}
