const hasTooltip = document.querySelectorAll(".has-tooltip");

function getPosition(el, tooltip) {
  let { left, top } = el.getBoundingClientRect();
  let height_ = top + 18;
  tooltip.style = `left: ${left}px; top: ${height_}px;`;
}

hasTooltip.forEach((element) => {
  let tooltip = document.createElement("div");
  tooltip.textContent = element.title;

  element.addEventListener("click", e => {
    e.preventDefault();
    let tooltipActive = document.querySelectorAll(".tooltip");

    tooltip.classList.add("tooltip");
    tooltip.classList.add("tooltip_active");
    getPosition(element, tooltip);

    element.insertAdjacentElement("beforeend", tooltip);

    if (tooltipActive.length > 1) {
      tooltipActive.forEach(el => el.remove());
      element.insertAdjacentElement("beforeend", tooltip);
    }

    if (tooltipActive.length === 1) {
      tooltipActive.forEach(el => el.remove());
    }
  })

  window.addEventListener("scroll", () => {
    getPosition(element, tooltip);
  })
})