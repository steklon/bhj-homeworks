const book = document.getElementById("book");
const bookControlFontSize = document.querySelectorAll(".book__control_font-size");
const bookControlColor = document.querySelectorAll(".book__control_color");
const bookControlBackground = document.querySelectorAll(".book__control_background");

const background = {
  conteiner: bookControlBackground,
  dataText: [
    "black", 
    "gray", 
    "white",
  ],
  styleList: [
    "book_bg-black", 
    "book_bg-gray", 
    "book_bg-white",  
  ],
  activeStyle: "color_active",
};

const color = {
  conteiner: bookControlColor,
  dataText: [
    "black", 
    "gray", 
    "whitesmoke",
  ],
  styleList: [
    "book_color-black", 
    "book_color-gray", 
    "book_color-whitesmoke", 
  ],
  activeStyle: "color_active",
};

const size = {
  conteiner: bookControlFontSize,
  dataText: [
    "small", 
    null, 
    "big", 
  ],
  styleList: [
    "book_fs-small", 
    null, 
    "book_fs-big", 
  ],
  activeStyle: "font-size_active",
};

function bookManagement(data) {
  data.conteiner.forEach((elements) => {
    let elementsChild = [...elements.children];

    elementsChild.forEach((element) => {
      if (element.tagName === "A") {
        element.addEventListener("click", (e) => {
          e.preventDefault();
          elementsChild.forEach(el => el.classList.remove(data.activeStyle));
          element.classList.add(data.activeStyle);
          book.classList.remove(data.styleList[0], data.styleList[1], data.styleList[2]);
  
            if (element.dataset.textColor === data.dataText[0] 
              || element.dataset.bgColor === data.dataText[0] 
              || element.dataset.size === data.dataText[0]) {
              book.classList.add(data.styleList[0]);
            }
  
            if (element.dataset.textColor === data.dataText[1] 
              || element.dataset.bgColor === data.dataText[1]) {
              book.classList.add(data.styleList[1]);
            }
  
            if (element.dataset.textColor === data.dataText[2] 
              || element.dataset.bgColor === data.dataText[2] 
              || element.dataset.size === data.dataText[2]) {
              book.classList.add(data.styleList[2]);
            }
        })
      }
    })
  })
};

bookManagement(background);
bookManagement(color);
bookManagement(size);