const cookie = document.getElementById("cookie");
const clickerCounter = document.getElementById("clicker__counter");
const clickRate = document.getElementById("click__rate");
const topRate = document.getElementById("top__rate");

let speed = 0;
let topSpeed = 0;

cookie.onclick = () => {
    clickerCounter.textContent = Number(clickerCounter.textContent) + 1;

    if (Number(clickerCounter.textContent) % 2 === 0) {
        cookie.width += 20;
        cookie.height += 20;
    } else {
        cookie.width -= 20;
        cookie.height -= 20;
    }

    let nowClickTime = new Date();

    let timeSinceLastClick = (nowClickTime - lastClickTime) / 1000;

    speed = 1 / timeSinceLastClick;
    
    clickRate.textContent = speed.toFixed(2);

    if (speed > topSpeed) {
        topSpeed = speed.toFixed(2);
    }

    topRate.textContent = topSpeed;

    lastClickTime = nowClickTime;
    
}

let lastClickTime = new Date();