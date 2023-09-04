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
    examples: ["rainbow", "robot", "rocket"],
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
     lessonContainer.innerHTML = `
<section >

<div class="lesson-container">
     <div class="left">
          <img src="./assets/image/lettersPage/letters/${letterObj.letter}.png" alt="">
     </div>
     <div class="right">

          <div class="shape" style="display: flex; align-items: center; flex-direction: column;">
               <img src="./assets/image/lettersPage/images/apple.png" alt="">
               <h1>Apple</h1>
          </div>
     </div>
</div>

<div class="drag-container d-none">
     <h1> drag and drop container</h1>
</div>

<div class="mcq-container d-none">
     <h4>mcq container</h4>
</div>

<button onclick=" onNextClick(this) "  data-flag="0" id="nxt-btn">Next</button>
</section>

`;
  });
  return letterElement;
}

function onNextClick(btn) {
  const lessonContainer = document.querySelector(".lesson-container");
  const dragContainer = document.querySelector(".drag-container");
  const mcqContainer = document.querySelector(".mcq-container");
  let flag = parseInt(btn.getAttribute("data-flag"));
  if (flag == 0) {
    lessonContainer.classList.add("d-none");
    dragContainer.classList.remove("d-none");
  }
  if (flag == 1) {
    dragContainer.classList.add("d-none");
    mcqContainer.classList.remove("d-none");
  }

  if (flag == 2) lessonContainer.textContent = "the end";
  flag++;
  btn.setAttribute("data-flag", flag);
}
