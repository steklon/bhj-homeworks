function resetGeme(dead, lost) {
  dead.textContent = 0;
  lost.textContent = 0;
}

(() => {
  const holesClass = document.querySelectorAll(".hole");
  const dead = document.getElementById('dead');
  const lost = document.getElementById('lost');

  holesClass.forEach((hole) => {
    hole.addEventListener("click", () => {
      if (hole.classList.contains("hole_has-mole")) {
        dead.textContent = Number(dead.textContent) + 1;
      } else {
        lost.textContent = Number(lost.textContent) + 1;
      }

      if (Number(dead.textContent) === 10) {
        alert("Победа!");
        resetGeme(dead, lost);
      }

      if (Number(lost.textContent) === 5) {
        alert("Вы проиграли!");
        resetGeme(dead, lost);
      }
    });
  });
})();

