const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let draggingLetter;
const alphabetData = [
  {
    letter: "A",
    phonetic_sound: "./",
    examples: ["apple", "ant", "alligator"],
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
    examples: ["robot", "rainbow", "rocket"],
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
    const dragContainer = createDragContainer(letterObj);
    const mcqContainer = createMCQContainer(letterObj);
    const nextButton = createNextButton();
    const prevButton = createPrevButton();

    const sound = createAudioElement(
      `./assets/sound/letters/${letterObj.letter.toLowerCase()}.mp3`
    );
    sound.play();
    const btns = document.createElement("btns");
    btns.className = "btns";
    btns.appendChild(prevButton);
    btns.appendChild(nextButton);
    gameContainer.style.display = "none";
    lessonContainer.replaceChildren(dataContainer);
    lessonContainer.appendChild(dragContainer);
    lessonContainer.appendChild(mcqContainer);
    lessonContainer.appendChild(btns);
  });
  return letterElement;
}

function createDataContainer(letterObj) {
  var dataContainer = document.createElement("div");
  dataContainer.className = "data-container";

  var leftDiv = document.createElement("div");
  leftDiv.className = "left";
  const sound = createAudioElement(
    `./assets/sound/letters/${letterObj.letter.toLowerCase()}.mp3`
  );
  var imgLeft = document.createElement("img");
  imgLeft.src = `./assets/image/lettersPage/letters/${letterObj.letter}.png`;
  imgLeft.alt = letterObj.letter;
  imgLeft.addEventListener("click", () => {
    sound.play();
  });
  const tip = document.createElement("p");
  tip.textContent = "Click to Listen";
  leftDiv.appendChild(imgLeft);
  leftDiv.appendChild(tip);

  var rightDiv = document.createElement("div");
  rightDiv.className = "right";

  var shapeDiv = document.createElement("div");
  shapeDiv.className = "shape";
  shapeDiv.style.display = "flex";
  shapeDiv.style.alignItems = "center";
  shapeDiv.style.flexDirection = "column";

  var img = document.createElement("img");

  img.src = `./assets/image/lettersPage/images/${letterObj.examples[0]}.png`;
  img.alt = "";

  var word = document.createElement("h1");
  word.style = "font-size:4rem ;color:black";
  word.textContent =
    letterObj.examples[0].toUpperCase()[0] + letterObj.examples[0].slice(1);
  shapeDiv.appendChild(img);
  shapeDiv.appendChild(word);
  rightDiv.appendChild(shapeDiv);
  dataContainer.appendChild(leftDiv);
  dataContainer.appendChild(rightDiv);

  return dataContainer;
}

function createDragContainer(letterObj) {
  var dragContainer = document.createElement("div");
  dragContainer.className = "drag-container d-none";
  var div = document.createElement("div");
  div.appendChild(createDragGameStructure(letterObj.examples[0]));

  dragContainer.appendChild(div);
  return dragContainer;
}

function createDragGameStructure(word) {
  var scoreSection = document.createElement("section");
  scoreSection.className = "score";

  var correctSpan = document.createElement("span");
  correctSpan.className = "correct";
  correctSpan.textContent = "0";

  var totalSpan = document.createElement("span");
  totalSpan.className = "total";
  totalSpan.textContent = word.length;

  var playAgainButton = document.createElement("button");
  playAgainButton.id = "play-again-btn";
  playAgainButton.textContent = "Play Again";

  scoreSection.appendChild(correctSpan);
  scoreSection.appendChild(document.createTextNode("/"));
  scoreSection.appendChild(totalSpan);
  scoreSection.appendChild(playAgainButton);

  var draggableItemsSection = document.createElement("section");
  draggableItemsSection.className = "draggable-items";
  const letters = word.split("");
  const randomIndices = generateUniqueRandomIndices(letters.length - 1);
  letters.forEach((letter, idx) => {
    draggableItemsSection.innerHTML += `  <div class = "draggable"  ondragstart="getDragLetter(this)"  draggable="true" data-letter=${
      letters[randomIndices[idx]]
    } >${letters[randomIndices[idx]]}</div> `;
  });

  var matchingPairsSection = document.createElement("section");
  matchingPairsSection.className = "matching-pairs";
  matchingPairsSection.setAttribute("data-word", word);
  for (let index = 0; index < letters.length; index++) {
    matchingPairsSection.innerHTML += `
    <div 
    class="matching-pair droppable" 
    ondragover="event.preventDefault()"
    ondrop="insertDropLetter(this)" data-letter=${letters[index]} 
    > </div>
    `;
  }
  const image = document.createElement("img");
  image.src = `./assets/image/lettersPage/images/${word}.png`;
  image.style = "height:200px ";
  var fragment = document.createDocumentFragment();
  fragment.appendChild(scoreSection);
  fragment.appendChild(draggableItemsSection);
  fragment.appendChild(matchingPairsSection);
  fragment.appendChild(image);

  return fragment;
}
function insertDropLetter(div) {
  var correctSpan = document.querySelector(".correct");
  if (
    div.getAttribute("data-letter") ==
    draggingLetter.getAttribute("data-letter")
  ) {
    draggingLetter.style = "margin : 0px ";
    div.appendChild(draggingLetter);
    if (!div.classList.contains("dropped"))
      correctSpan.textContent = Number(correctSpan.textContent) + 1;
    div.classList.add("dropped");

    if (
      correctSpan.textContent ==
      document.querySelector(".matching-pairs").getAttribute("data-word").length
    ) {
      createAudioElement("./assets/sound/correct.mp3").play();
      document.querySelectorAll(".dropped div").forEach(ele => ele.style="background-color : green; margin : 0px;")
    }
  }
  else {
    createAudioElement("./assets/sound/wrong.mp3").play();
  }
}
function getDragLetter(img) {
  draggingLetter = img;
}

function createMCQContainer(letterObj) {
  var mcqContainer = document.createElement("div");
  mcqContainer.className = "mcq-container d-none";

  const mcqContent = createMcq(letterObj);

  mcqContainer.appendChild(mcqContent);

  return mcqContainer;
}

function createMcq(letterObj) {
  const correctSound = createAudioElement("./assets/sound/correct.mp3");
  const wrongSound = createAudioElement("./assets/sound/wrong.mp3");

  const imageContainer = createDivElement("animalImg");
  const image = createImageElement(
    `./assets/image/lettersPage/images/${letterObj.examples[0]}.png`
  );
  imageContainer.appendChild(image);

  const optionsContainer = createDivElement("options-container");
  const randomIndices = generateUniqueRandomIndices(2);

  const options = [];
  for (let i = 0; i < 3; i++) {
    const option = createOptionElement(
      letterObj.examples[randomIndices[i]],
      correctSound,
      wrongSound,
      letterObj.examples[0]
    );
    options.push(option);
  }

  const randomOptionsIndices = generateUniqueRandomIndices(2);
  optionsContainer.appendChild(options[randomOptionsIndices[0]]);
  optionsContainer.appendChild(options[randomOptionsIndices[1]]);
  optionsContainer.appendChild(options[randomOptionsIndices[2]]);

  const fragment = document.createDocumentFragment();
  fragment.appendChild(imageContainer);
  fragment.appendChild(optionsContainer);

  return fragment;
}

function createAudioElement(src) {
  const audioElement = document.createElement("audio");
  audioElement.src = src;
  return audioElement;
}

function createDivElement(className) {
  const divElement = document.createElement("div");
  divElement.classList.add(className);
  return divElement;
}

function createImageElement(src) {
  const imageElement = document.createElement("img");
  imageElement.src = src;
  return imageElement;
}

function createOptionElement(text, correctSound, wrongSound, correctWord) {
  const option = document.createElement("p");
  option.textContent = text;
  option.addEventListener("click", () => {
    if (option.textContent != correctWord) {
      option.style.backgroundColor = "red";
      wrongSound.play();
    } else {
      option.style.backgroundColor = "green";
      correctSound.play();
    }
  });
  return option;
}

function generateUniqueRandomIndices(count) {
  const randomIndices = [];
  while (randomIndices.length < count) {
    const randomIndex = Math.floor(Math.random() * 26); // Adjust this number based on your needs
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }
  return randomIndices;
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
  const btns = document.querySelector(".btns");

  let flag = parseInt(
    document.getElementById("nxt-btn").getAttribute("data-flag")
  );
  switch (flag) {
    case 0:
      gameContainer.style.display = "flex";
      dataContainer.classList.add("d-none");
      btns.classList.add("d-none");
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

function generateUniqueRandomIndices(endIndex) {
  const availableIndices = Array.from({ length: endIndex + 1 }, (_, i) => i);
  const uniqueIndices = [];
  while (availableIndices.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const uniqueIndex = availableIndices.splice(randomIndex, 1)[0];
    uniqueIndices.push(uniqueIndex);
  }

  return uniqueIndices;
}
