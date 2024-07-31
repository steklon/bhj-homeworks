function preventLinkClick(event) {
  event.preventDefault();
}

function openList(index, dropdownList) {
  dropdownList[index].classList.toggle("dropdown__list_active");
  indexCount = index;
}

function selectLink(element, dropdownList) {
  let links = dropdownList.querySelectorAll(".dropdown__item");

  links.forEach( link => {
    link.addEventListener("click", preventLinkClick);
    
    link.addEventListener("click", () => {
      element.textContent = link.textContent;
      dropdownList.classList.remove("dropdown__list_active");
    })
  })
}

(() => {
  const dropdownValue = document.querySelectorAll(".dropdown__value");
  const dropdownList = document.querySelectorAll(".dropdown__list");

  dropdownValue.forEach((element, index) => {
    element.addEventListener("click", () => {
      openList(index, dropdownList);
      selectLink(element, dropdownList[index]);
    })
  });
})();