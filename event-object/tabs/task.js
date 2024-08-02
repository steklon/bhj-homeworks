function contentActive(element, index, navElements, tabContentElements) {
  const blockContentsParent = element.target.closest('.tab__navigation').nextElementSibling;
  const blockContentElements = [...blockContentsParent.querySelectorAll('.tab__content')];
  
  blockContentElements.forEach((e) => e.classList.remove('tab__content_active'));
  navElements.forEach((e) => e.classList.remove('tab_active'));
  
  navElements[index].classList.add('tab_active');
  tabContentElements[index].classList.add('tab__content_active');
}

(() => {
  const navElements = [...document.querySelectorAll('.tab')];
  const tabContentElements = [...document.querySelectorAll('.tab__content')];
  
  navElements.forEach((element, index) => element.addEventListener('click', (e) => {
    contentActive(e, index, navElements, tabContentElements);
  }));
}) ();


// (() => {
//   const tab = document.querySelectorAll(".tab");
//   const tabContent = document.querySelectorAll(".tab__content")
  
//   tab.forEach((element, index) => {
//     element.addEventListener("click", () => {
//       tab.forEach(e => e.classList.remove("tab_active"));
//       element.classList.add("tab_active");

//       tabContent.forEach(i => i.classList.remove("tab__content_active"));
//       tabContent[index].classList.add("tab__content_active");
//     })
//   })
// })();