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

$(document).ready(function () {
  const gameContainer = $("#game-container");
  const lessonContainer = $("#lesson-container");

  alphabetData.forEach((letterObj) => {
    const letterElement = createLetterElement(letterObj);
    gameContainer.append(letterElement);
  });

  function createLetterElement(letterObj) {
    const letterElement = $("<div>").addClass("letter").text(letterObj.letter);
    letterElement.on("click", () => {
      const dataContainer = createDataContainer(letterObj);
      const dragContainer = createDragContainer(letterObj);
      const mcqContainer = createMCQContainer(letterObj);
      const nextButton = createNextButton();
      const prevButton = createPrevButton();

      const sound = createAudioElement(
        `./assets/sound/letters/${letterObj.letter.toLowerCase()}.mp3`
      );
      sound.get(0).play();

      const btns = $("<div>").addClass("btns");
      btns.append(prevButton);
      btns.append(nextButton);
      gameContainer.css("display", "none");
      lessonContainer.empty();
      lessonContainer.append(dataContainer);
      lessonContainer.append(dragContainer);
      lessonContainer.append(mcqContainer);
      lessonContainer.append(btns);
    });
    return letterElement;
  }

  function createDataContainer(letterObj) {
    var dataContainer = $("<div>").addClass("data-container");

    var leftDiv = $("<div>").addClass("left");
    const sound = createAudioElement(
      `./assets/sound/letters/${letterObj.letter.toLowerCase()}.mp3`
    );
    var imgLeft = $("<img>")
      .attr("src", `./assets/image/lettersPage/letters/${letterObj.letter}.png`)
      .attr("alt", letterObj.letter)
      .on("click", function () {
        sound.get(0).play();
      });
    var tip = $("<p>").addClass("mb-auto").text("Click to Listen");
    leftDiv.append(imgLeft, tip);

    var rightDiv = $("<div>").addClass("right");

    var shapeDiv = $("<div>").addClass("shape").css({
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    });

    var img = $("<img>")
      .attr(
        "src",
        `./assets/image/lettersPage/images/${letterObj.examples[0]}.png`
      )
      .attr("alt", "");

    var word = $("<h1>")
      .css({
        fontSize: "4rem",
        color: "black",
      })
      .text(
        letterObj.examples[0].toUpperCase()[0] + letterObj.examples[0].slice(1)
      );

    shapeDiv.append(img, word);
    rightDiv.append(shapeDiv);
    dataContainer.append(leftDiv, rightDiv);

    return dataContainer;
  }

  function createDragContainer(letterObj) {
    var dragContainer = $("<div>").addClass("drag-container d-none");
    var div = $("<div>").append(createDragGameStructure(letterObj.examples[0]));

    dragContainer.append(div);
    return dragContainer[0];
  }
  function createDragGameStructure(word) {
    var scoreSection = $("<section>").addClass("score");
    var correctSpan = $("<span>").addClass("correct").text("0");
    var totalSpan = $("<span>").addClass("total").text(word.length);
    var playAgainButton = $("<button>")
      .attr("id", "play-again-btn")
      .text("Play Again");

    scoreSection.append(correctSpan, "/", totalSpan, playAgainButton);

    var draggableItemsSection = $("<section>").addClass("draggable-items");
    const letters = word.split("");
    const randomIndices = generateUniqueRandomIndices(letters.length - 1);

    letters.forEach((letter, idx) => {
      const draggableDiv = $("<div>")
        .addClass("draggable")
        .attr("ondragstart", "getDragLetter(this)")
        .attr("draggable", "true")
        .attr("data-letter", letters[randomIndices[idx]])
        .text(letters[randomIndices[idx]]);
      draggableItemsSection.append(draggableDiv);
    });

    var matchingPairsSection = $("<section>")
      .addClass("matching-pairs")
      .attr("data-word", word);

    for (let index = 0; index < letters.length; index++) {
      const matchingPairDiv = $("<div>")
        .addClass("matching-pair droppable")
        .attr("ondragover", "event.preventDefault()")
        .attr("ondrop", "insertDropLetter(this)")
        .attr("data-letter", letters[index]);
      matchingPairsSection.append(matchingPairDiv);
    }

    const image = $("<img>")
      .attr("src", `./assets/image/lettersPage/images/${word}.png`)
      .css("height", "200px");

    var fragment = document.createDocumentFragment();
    fragment.appendChild(scoreSection[0]);
    fragment.appendChild(draggableItemsSection[0]);
    fragment.appendChild(matchingPairsSection[0]);
    fragment.appendChild(image[0]);

    return fragment;
  }

  function createMCQContainer(letterObj) {
    var mcqContainer = createDivElement("mcq-container d-none");

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
    const audioElement = $("<audio>").attr("src", src);
    return audioElement;
  }

  function createDivElement(className) {
    const divElement = $("<div>").addClass(className);
    return divElement[0];
  }

  function createImageElement(src) {
    const imageElement = $("<img>").attr("src", src);
    return imageElement[0];
  }

  function createOptionElement(text, correctSound, wrongSound, correctWord) {
    const option = $("<p>").text(text);

    option.on("click", function () {
      if ($(this).text() != correctWord) {
        $(this).css("background-color", "red");
        wrongSound[0].play();
      } else {
        $(this).css("background-color", "green");
        correctSound[0].play();
      }
    });

    return option[0];
  }

  // function generateUniqueRandomIndices(count) {
  //   const randomIndices = [];
  //   while (randomIndices.length < count) {
  //     const randomIndex = Math.floor(Math.random() * 26); // Adjust this number based on your needs
  //     if (!randomIndices.includes(randomIndex)) {
  //       randomIndices.push(randomIndex);
  //     }
  //   }
  //   return randomIndices;
  // }

function createNextButton() {
  var buttonElement = $("<button>")
  .attr("id", "nxt-btn")
  .attr("data-flag", "0")
  .text("Next")
  .on("click", function () {
    onNextClick(this);
  });
  buttonElement.addClass("btn btn-warning btn-lg")
return buttonElement[0];
  // var buttonElement = document.createElement("button");
  // buttonElement.onclick = function () {
  //   onNextClick(this);
  // };
  // buttonElement.dataset.flag = "0";
  // buttonElement.id = "nxt-btn";
  // buttonElement.textContent = "Next";

  //   return buttonElement[0];
  }

  function createPrevButton() {
    var buttonElement = $("<button>")
      .attr("id", "prev-btn")
      .attr("data-flag", "0")
      .text("Previous")
      
      .on("click", function () {
        onPrevClick(this);
      });
      buttonElement.addClass("btn btn-warning btn-lg")
      
    return buttonElement[0];
  }

  function onNextClick(btn) {
    const dataContainer = $(".data-container");
    const dragContainer = $(".drag-container");
    const mcqContainer = $(".mcq-container");

    let flag = parseInt($(btn).attr("data-flag"));

    switch (flag) {
      case 0:
        dataContainer.addClass("d-none");
        dragContainer.removeClass("d-none");
        flag++;
        break;
      case 1:
        dragContainer.addClass("d-none");
        mcqContainer.removeClass("d-none");
        $("#nxt-btn").addClass("disabled")
        flag++;
        break;
      case 2:
        // Handle any additional cases if needed
        break;
      default:
        // Handle default case if needed
        break;
    }

    $(btn).attr("data-flag", flag);
  }

  function onPrevClick(btn) {
    const dataContainer = $(".data-container");
    const dragContainer = $(".drag-container");
    const mcqContainer = $(".mcq-container");
    const btns = $(".btns");
    let flag = parseInt($("#nxt-btn").attr("data-flag"));
    switch (flag) {
      case 0:
        $("#game-container").css("display", "flex");
        dataContainer.addClass("d-none");
        btns.addClass("d-none");
        break;
      case 1:
        dragContainer.addClass("d-none");
        dataContainer.removeClass("d-none");
        flag--;
        break;
      case 2:
        $("#nxt-btn").removeClass("disabled")
        mcqContainer.addClass("d-none");
        dragContainer.removeClass("d-none");
        flag--;
        break;
      default:
        break;
    }
    $("#nxt-btn").attr("data-flag", flag);
  }
});
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
      createAudioElement("./assets/sound/correct.mp3").get(0).play();
      document
        .querySelectorAll(".dropped div")
        .forEach(
          (ele) => (ele.style = "background-color : green; margin : 0px;")
        );
    }
  } else {
    createAudioElement("./assets/sound/wrong.mp3").get(0).play();
  }
}

function getDragLetter(img) {
  draggingLetter = img;
}

function createAudioElement(src) {
  const audioElement = $("<audio>").attr("src", src);
  return audioElement;
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
