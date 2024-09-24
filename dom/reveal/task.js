const reveal = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  for (let i = 0; i < reveal.length; i++) {
    let { top, bottom } = reveal[i].getBoundingClientRect();
    
    if (bottom < 0 || top > window.innerHeight) {
      reveal[i].classList.remove("reveal_active");
    } else {
      reveal[i].classList.add("reveal_active");
    }
  }
})