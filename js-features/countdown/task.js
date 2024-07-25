const timer = document.getElementById("timer");

const timerId = setInterval(() => {
  timer.textContent = Number(timer.textContent) - 1

  if (Number(timer.textContent) < 0) {
    clearInterval(timerId);
    alert("Вы победили в конкурсе!")
    timer.textContent = 0
  }
}, 1000);