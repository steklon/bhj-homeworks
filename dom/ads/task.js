function toggleRotator(rotatorCaseList, activeIndex) {
  return function() {
    let caseList = rotatorCaseList;

    caseList.forEach((element) => {
      element.classList.remove("rotator__case_active");
    })
    
    if (!caseList[activeIndex]) {
      activeIndex = 0;
    }
    
    caseList[activeIndex].classList.add('rotator__case_active');
    caseList[activeIndex].style.color = caseList[activeIndex].dataset.color;
    // let duration = rotatorCaseList[activeIndex].dataset.speed;
    activeIndex++;
  }
}

(() => {
  const rotators = document.querySelectorAll(".rotator");
  let activeIndex = 1;

  rotators.forEach((rotator) => {
    const rotatorCaseList = [...rotator.children];
    rotatorCaseList[0].style.color = rotatorCaseList[0].dataset.color;
    setInterval(toggleRotator(rotatorCaseList, activeIndex), 1000);
  });
})();