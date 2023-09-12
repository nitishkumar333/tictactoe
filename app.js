// const music = new Audio("music.mp3");
// const audioTurn = new Audio("ting.mp3");
// let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let boxesSelected = 0;

const changeTurn = ()=>{
    return turn === "X"?"O":"X";
}

const checkWin = ()=>{
    const boxtext = document.querySelectorAll(".boxtext");
    let wins = [[0,1,2,16.67,10,0],[3,4,5,50,10,0],[6,7,8,83,10,0],[0,3,6,10,16.67,90],[1,4,7,10,50,90],[2,5,8,10,83,90],[0,4,8,15,15,45],[2,4,6,15,85,135]];
    wins.forEach(e=>{
        if(boxtext[e[0]].innerText===boxtext[e[1]].innerText && boxtext[e[1]].innerText===boxtext[e[2]].innerText && boxtext[e[0]].innerText!==""){
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Wins!";
            isgameover = true;
            document.querySelector(".line").style.top = `${e[3]}%`;
            document.querySelector(".line").style.left = `${e[4]}%`;
            document.querySelector(".line").style.transform = `rotate(${e[5]}deg)`;
            if(e[5]==45||e[5]==135)
            document.querySelector(".line").style.width = "105%";
            else
            document.querySelector(".line").style.width = "80%";
            const lineAnim = document.querySelector(".line");
            lineAnim.addEventListener("transitionend",()=>{
                document.querySelector(".popup-container").style.visibility = "visible";
                document.querySelector(".popup-container").style.opacity = "1";
                document.querySelector(".popup").style.transform = "translateY(0%)";
            });
        }
    });
}

//game logic
let boxes = document.querySelectorAll(".box");
boxes.forEach(box=>{
    const boxtext = box.querySelector(".boxtext");
    box.addEventListener("click",()=>{
        if(boxtext.innerText==""){
            console.log(boxesSelected);
            boxesSelected++;
            boxtext.innerText = turn;
            turn  = changeTurn();
            checkWin();
            if(!isgameover){
                document.querySelector(".info").innerText = "Turn for "+turn;
            }
            if(boxesSelected === 9){
                document.querySelector(".popup-container").style.visibility = "visible";
                document.querySelector(".popup-container").style.opacity = "1";
                document.querySelector(".popup").style.transform = "translateY(0%)";
            }
        }
    });
});

reset.addEventListener("click",()=>{
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach(element=>{
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    boxesSelected = 0;
    document.querySelector(".line").style.width = "0%";
    document.querySelector(".info").innerText = "Turn for "+turn;
    document.querySelector(".popup").style.transform = "translateY(100%)";
    document.querySelector(".popup-container").style.opacity = "0";
    document.querySelector(".popup-container").addEventListener("transitionend",()=>{
        document.querySelector(".popup-container").style.visibility = "hidden";
    });
});