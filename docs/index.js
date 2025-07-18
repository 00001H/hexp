"use strict";
const num = document.getElementById("num");
const resp = document.getElementById("resp");
const stats = document.getElementById("stats");
const conf = document.getElementById("conf");
const ctick = document.getElementById("current");
const ttick = document.getElementById("target");
let current_answer;
let win = 0;
let lose = 0;
let dark = true;
let easy = true;
let easier = 0;
let puzzleset_easier = 0;
let allnums = [];
const BASE = 16;
const MAX_DIGITS = 2;
const MAX_ANS = (BASE ** MAX_DIGITS) - 1;
function refresh_nums() {
    const interval = [1, 16, 10][easier];
    for (let i = 0; i <= MAX_ANS; i += interval) {
        allnums.push(i);
    }
    puzzleset_easier = easier;
}
function updstats() {
    let sstats = `+${win} -${lose}`;
    if (lose) {
        sstats += ` (${(win / lose).toFixed(2)})`;
    }
    stats.textContent = sstats;
}
function setclass(e, c, on) {
    if (on) {
        e.classList.add(c);
    }
    else {
        e.classList.remove(c);
    }
}
function unixdash(conf, letter) {
    return conf ? letter : "-";
}
function updconf() {
    setclass(document.body, "darkmode", dark);
    setclass(document.body, "easymode", easy);
    conf.textContent = unixdash(!dark, "l") + unixdash(easy, "h") + (easier ? `e${easier}` : "--");
    if (easier !== puzzleset_easier) {
        allnums = [];
        win = 0;
        lose = 0;
        newpuzzle();
    }
}
function newpuzzle() {
    resp.value = "";
    if (allnums.length === 0) {
        refresh_nums();
    }
    num.textContent = (current_answer = allnums[Math.floor(Math.random() * allnums.length)]).toString(BASE).padStart(2, "0").toUpperCase();
    ttick.style.left = `${current_answer * 100 / MAX_ANS}%`;
}
newpuzzle();
updstats();
updconf();
addEventListener("keyup", (e) => {
    if (e.key === "F1") {
        dark = !dark;
        updconf();
    }
    else if (e.key === "F2") {
        easy = !easy;
        updconf();
    }
    else if (e.key === "F4") {
        easier = (easier + 1) % 3;
        updconf();
    }
});
resp.addEventListener("input", () => {
    const num = Number(resp.value);
    if (Number.isNaN(num)) {
        ctick.style.visibility = "hidden";
    }
    else {
        ctick.style.visibility = "visible";
        ctick.style.left = `${num * 100 / MAX_ANS}%`;
    }
});
resp.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const num = Number(resp.value);
        if (Number.isNaN(num)) {
            resp.value = "";
        }
        else if (num === current_answer) {
            ++win;
            updstats();
            newpuzzle();
        }
        else {
            ++lose;
            updstats();
        }
    }
});
