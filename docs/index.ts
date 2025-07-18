const num = document.getElementById("num") as HTMLLabelElement;
const resp = document.getElementById("resp") as HTMLInputElement;
resp.value = "";
const stats = document.getElementById("stats") as HTMLLabelElement;
const conf = document.getElementById("conf") as HTMLLabelElement;
const ctick = document.getElementById("current") as HTMLElement;
const ttick = document.getElementById("target") as HTMLElement;
let current_answer: number;
let win: number = 0;
let lose: number = 0;
let dark: boolean = true;
let easy: boolean = true;
const allnums: number[] = [];
const MAX_ANS = 255;
function refresh_nums(){
    for(let i=0;i<=MAX_ANS;++i){allnums.push(i);}
}
function updstats(){
    let sstats = `+${win} -${lose}`;
    if(lose){
        sstats += ` (${(win/lose).toFixed(2)})`;
    }
    stats.textContent = sstats;
}
function setclass(e: HTMLElement,c: string,on: boolean){
    if(on){
        e.classList.add(c);
    }else{
        e.classList.remove(c);
    }
}
function updconf(){
    setclass(document.body,"darkmode",dark);
    setclass(document.body,"easymode",easy);
    conf.textContent = (dark?"-":"l")+(easy?"e":"-");
}
function newpuzzle(){
    if(allnums.length===0){
        refresh_nums();
    }
    num.textContent = (current_answer = allnums[Math.floor(Math.random()*allnums.length)]).toString(16).padStart(2,"0").toUpperCase();
    ttick.style.left = `${current_answer*100/MAX_ANS}%`;
}
newpuzzle();
updstats();
updconf();
addEventListener("keyup",(e) => {
    if(e.key === "F1"){
        dark = !dark;
        updconf();
    }else if(e.key === "F2"){
        easy = !easy;
        updconf();
    }else if(e.key === "F4"){
        resp.focus();
    }
});
resp.addEventListener("input",() => {
    const num = Number(resp.value);
    if(Number.isNaN(num)){
        ctick.style.visibility = "hidden";
    }else{
        ctick.style.visibility = "visible";
        ctick.style.left = `${num*100/MAX_ANS}%`;
    }
});
resp.addEventListener("keyup",(e) => {
    if(e.key === "Enter"){
        const num = Number(resp.value);
        if(Number.isNaN(num)){
            resp.value = "";
        }else if(num===current_answer){
            ++win;
            updstats();
            newpuzzle();
            resp.value = "";
        }else{
            ++lose;
            updstats();
        }
    }
});
