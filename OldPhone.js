const keypad = document.querySelector(".keypad");
let key = new Array(5);

createKeys();

function createKeys() {
    for (let i = 1; i < key.length; ++i) {
        key[i] = new Array(4);
    }
    for (let i = 1; i < key.length; ++i) {
        const row = document.createElement("tr");
        for (let j = 1; j < key[i].length; ++j) {
            key[i][j] = document.createElement("td");
            row.appendChild(key[i][j]);
        }
        keypad.appendChild(row);
    }
}