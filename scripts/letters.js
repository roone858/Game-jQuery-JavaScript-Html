const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabetData = [
  {
    letter: "A",
    phonetic_sound: "./",
    examples: ["apple", "ant", "alligator"],
    images: ["./sss/sss/s", ".//aa/s/s/s"],
  },
  {
    letter: "B",
    phonetic_sound: "bee",
    examples: ["banana", "ball", "butterfly"],
  },
  {
    letter: "C",
    phonetic_sound: "see",
    examples: ["cat", "cake", "car"],
  },
  {
    letter: "D",
    phonetic_sound: "dee",
    examples: ["dog", "duck", "door"],
  },
  {
    letter: "E",
    phonetic_sound: "ee",
    examples: ["elephant", "egg", "eleven"],
  },
  {
    letter: "F",
    phonetic_sound: "eff",
    examples: ["flower", "fish", "fire"],
  },
  {
    letter: "G",
    phonetic_sound: "jee",
    examples: ["grape", "giraffe", "guitar"],
  },
  {
    letter: "H",
    phonetic_sound: "aych",
    examples: ["house", "hat", "heart"],
  },
  {
    letter: "I",
    phonetic_sound: "eye",
    examples: ["ice cream", "igloo", "island"],
  },
  {
    letter: "J",
    phonetic_sound: "jay",
    examples: ["juice", "jellyfish", "jump"],
  },
  {
    letter: "K",
    phonetic_sound: "kay",
    examples: ["kite", "koala", "king"],
  },
  {
    letter: "L",
    phonetic_sound: "ell",
    examples: ["lion", "laptop", "leaf"],
  },
  {
    letter: "M",
    phonetic_sound: "em",
    examples: ["monkey", "moon", "mountain"],
  },
  {
    letter: "N",
    phonetic_sound: "en",
    examples: ["nest", "nose", "net"],
  },
  {
    letter: "O",
    phonetic_sound: "oh",
    examples: ["octopus", "orange", "ocean"],
  },
  {
    letter: "P",
    phonetic_sound: "pee",
    examples: ["penguin", "piano", "pencil"],
  },
  {
    letter: "Q",
    phonetic_sound: "kyoo",
    examples: ["queen", "quilt", "quack"],
  },
  {
    letter: "R",
    phonetic_sound: "arr",
    examples: ["robot","rainbow" , "rocket"],
  },
  {
    letter: "S",
    phonetic_sound: "ess",
    examples: ["sun", "snake", "star"],
  },
  {
    letter: "T",
    phonetic_sound: "tee",
    examples: ["turtle", "tree", "train"],
  },
  {
    letter: "U",
    phonetic_sound: "you",
    examples: ["umbrella", "unicorn", "under"],
  },
  {
    letter: "V",
    phonetic_sound: "vee",
    examples: ["volcano", "violin", "van"],
  },
  {
    letter: "W",
    phonetic_sound: "double-you",
    examples: ["whale", "wolf", "water"],
  },
  {
    letter: "X",
    phonetic_sound: "eks",
    examples: ["xylophone", "box", "fox"],
  },
  {
    letter: "Y",
    phonetic_sound: "why",
    examples: ["yellow", "yarn", "yo-yo"],
  },
  {
    letter: "Z",
    phonetic_sound: "zee",
    examples: ["zebra", "zipper", "zoo"],
  },
];

const gameContainer = document.getElementById("game-container");

alphabetData.forEach((letterObj) => {
  const letterElement = createLetterElement(letterObj);
  gameContainer.appendChild(letterElement);
});

const lessonContainer = document.getElementById("lesson-container");

function createLetterElement(letterObj) {
  const letterElement = document.createElement("div");
  letterElement.className = "letter";
  letterElement.textContent = letterObj.letter;
  letterElement.addEventListener("click", () => {
    const dataContainer = createDataContainer(letterObj);
    const dragContainer = createDragContainer();
    const mcqContainer = createMCQContainer();
    const nextButton = createNextButton();
    const prevButton = createPrevButton();
    gameContainer.style.display = "none";
    lessonContainer.replaceChildren(dataContainer);
    lessonContainer.appendChild(dragContainer);
    lessonContainer.appendChild(mcqContainer);
    lessonContainer.appendChild(prevButton);
    lessonContainer.appendChild(nextButton);
  });
  return letterElement;
}

function createDataContainer(letterObj) {
  var dataContainer = document.createElement("div");
  dataContainer.className = "data-container";

  var leftDiv = document.createElement("div");
  leftDiv.className = "left";

  var imgLeft = document.createElement("img");
  imgLeft.src = `./assets/image/lettersPage/letters/${letterObj.letter}.png`;
  imgLeft.alt = "";

  leftDiv.appendChild(imgLeft);

  var rightDiv = document.createElement("div");
  rightDiv.className = "right";

  var shapeDiv = document.createElement("div");
  shapeDiv.className = "shape";
  shapeDiv.style.display = "flex";
  shapeDiv.style.alignItems = "center";
  shapeDiv.style.flexDirection = "column";

  var imgShape = document.createElement("img");
  
  imgShape.src = `./assets/image/lettersPage/images/${letterObj.examples[0]}.png`;
  imgShape.alt = "";

  var h1Shape = document.createElement("h1");
  h1Shape.textContent = letterObj.examples[0];

  shapeDiv.appendChild(imgShape);
  shapeDiv.appendChild(h1Shape);

  rightDiv.appendChild(shapeDiv);

  dataContainer.appendChild(leftDiv);
  dataContainer.appendChild(rightDiv);

  return dataContainer;
}

function createDragContainer() {
  var dragContainer = document.createElement("div");
  dragContainer.className = "drag-container d-none";
  var h1Drag = document.createElement("h1");
  h1Drag.textContent = "drag and drop container";

  dragContainer.appendChild(h1Drag);

  return dragContainer;
}

function createMCQContainer() {
  var mcqContainer = document.createElement("div");
  mcqContainer.className = "mcq-container d-none";

  var h4MCQ = document.createElement("h4");
  h4MCQ.textContent = "mcq container";

  mcqContainer.appendChild(h4MCQ);

  return mcqContainer;
}

function createNextButton() {
  var buttonElement = document.createElement("button");
  buttonElement.onclick = function () {
    onNextClick(this);
  };
  buttonElement.dataset.flag = "0";
  buttonElement.id = "nxt-btn";
  buttonElement.textContent = "Next";

  return buttonElement;
}
function createPrevButton() {
  var buttonElement = document.createElement("button");
  buttonElement.onclick = function () {
    onPrevClick(this);
  };
  buttonElement.dataset.flag = "0";
  buttonElement.id = "prev-btn";
  buttonElement.textContent = "Previous";

  return buttonElement;
}

function onNextClick(btn) {
  const dataContainer = document.querySelector(".data-container");
  const dragContainer = document.querySelector(".drag-container");
  const mcqContainer = document.querySelector(".mcq-container");
  let flag = parseInt(btn.getAttribute("data-flag"));
  switch (flag) {
    case 0:
      dataContainer.classList.add("d-none");
      dragContainer.classList.remove("d-none");
      flag++;
      break;
    case 1:
      dragContainer.classList.add("d-none");
      mcqContainer.classList.remove("d-none");
      flag++;
      break;

    case 2:
      //return to home page
      break;
    default:
      break;
  }

  btn.setAttribute("data-flag", flag);
}
function onPrevClick(btn) {
  const dataContainer = document.querySelector(".data-container");
  const dragContainer = document.querySelector(".drag-container");
  const mcqContainer = document.querySelector(".mcq-container");
  const nextBtn = document.getElementById("nxt-btn");
  const prevBtn = document.getElementById("prev-btn");
  let flag = parseInt(
    document.getElementById("nxt-btn").getAttribute("data-flag")
  );
  switch (flag) {
    case 0:
      gameContainer.style.display = "flex";
      dataContainer.classList.add("d-none");
      nextBtn.classList.add("d-none");
      prevBtn.classList.add("d-none");
      // return to home page
      break;
    case 1:
      dragContainer.classList.add("d-none");
      dataContainer.classList.remove("d-none");
      flag--;
      break;
    case 2:
      mcqContainer.classList.add("d-none");
      dragContainer.classList.remove("d-none");
      flag--;
    default:
      break;
  }
  document.getElementById("nxt-btn").setAttribute("data-flag", flag);
}
