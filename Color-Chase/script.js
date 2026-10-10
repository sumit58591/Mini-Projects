const main = document.querySelector('main');
const btn = document.querySelector('button');
const box = document.createElement('div');
const overlay = document.querySelector('#overlay');
const score = document.querySelector('#score');
let timer = document.querySelector('#timer');


box.classList.add('box');
let time = 0;
let interval; 
let currScore = 0;
let isClicked = false;

const randomColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    
    return `rgb(${r}, ${g}, ${b})`;
}

const randomBox = () => {
    main.append(box);
    box.style.backgroundColor = randomColor();

    let mainH = main.clientHeight - box.offsetHeight;
    let mainW = main.clientWidth - box.offsetWidth;
        
    const rX = Math.random() * mainW;
    const rY = Math.random() * mainH;

    box.style.top = `${rY}px`;
    box.style.left = `${rX}px`;
    isClicked = false;
};


btn.addEventListener('click', () => {
    randomBox();
    clearInterval(interval);
    interval = setInterval(() => {
        time += 1;
        timer.textContent = time;
        randomBox();
    }, 2000);
    
    setTimeout(() => {
        clearInterval(interval);
        overlay.style.display = "flex";
        setTimeout(() => {
            time = 0;
            timer.textContent = time;
            score.textContent = 0;
            overlay.style.display = "none";
            main.innerHTML = "";
            isClicked = false;
        }, 3000);
    }, 10000);

});

box.addEventListener('click', () => {
    if(isClicked) return;
    currScore += 1;
    score.textContent = currScore;
    isClicked = true;
});