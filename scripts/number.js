var animalsData = {
  1: {
    sound: "./assets/sound/numbers/num1lion.mp3",
    img: "./assets/image/numbersPage/lion.png",
    counting: "./assets/sound/numbers/one.mp3",
    num: "./assets/image/numbersPage/1.png",
  },
  2: {
    sound: "./assets/sound/numbers/num2zebra.mp3",
    img: "./assets/image/numbersPage/zebra.png",
        counting: "./assets/sound/numbers/two.mp3",
    num: "./assets/image/numbersPage/2.png",
  },
  3: {
    sound: "./assets/sound/numbers/num3giraffe.mp3",
    img: "./assets/image/numbersPage/giraffe.png",
    counting: "./assets/sound/numbers/three.mp3",
    num: "./assets/image/numbersPage/3.png",
  },
  4: {
    sound: "./assets/sound/numbers/num4monkey.mp3",
    img: "./assets/image/numbersPage/monkey.png",
    counting: "./assets/sound/numbers/four.mp3",
    num: "./assets/image/numbersPage/4.png",
  },
  5: {
    sound: "./assets/sound/numbers/num5tiger.mp3",
    img: "./assets/image/numbersPage/tiger.png",
    counting: "./assets/sound/numbers/five.mp3",
    num: "./assets/image/numbersPage/5.png",
  },
  6: {
    sound: "./assets/sound/numbers/num6camel.mp3",
    img: "./assets/image/numbersPage/camel.png",
     counting: "./assets/sound/numbers/six.mp3",
    num: "./assets/image/numbersPage/6.png",
  },
  7: {
    sound: "./assets/sound/numbers/num7elephant.mp3",
    img: "./assets/image/numbersPage/elephant.png",
    counting: "./assets/sound/numbers/seven.mp3",
    num: "./assets/image/numbersPage/7.png",
  },
  8: {
    sound: "./assets/sound/numbers/num8penguin.mp3",
    img: "./assets/image/numbersPage/penguin.png",
    counting: "./assets/sound/numbers/eight.mp3",
    num: "./assets/image/numbersPage/8.png",
  },
  9: {
    sound: "./assets/sound/numbers/num9hippo.mp3",
    img: "./assets/image/numbersPage/hippo.png",
    counting: "./assets/sound/numbers/nine.mp3",
    num: "./assets/image/numbersPage/9.png",
  },
};
document.querySelector(".data-container").style.display="none"
$(document).ready(function () {
  function playMusic() {
    var numbersSoundTrack = document.getElementById("numbersSoundTrack");
    var soundIcon = document.getElementById("soundIcon");
    if (numbersSoundTrack.value == "off") {
      numbersSoundTrack.pause();
      numbersSoundTrack.value = "on";
      soundIcon.src = "./assets/image/audio-2.png";
    } else {
      numbersSoundTrack.play();
      numbersSoundTrack.value = "off";
      soundIcon.src = "./assets/image/audio-speaker-1.png";
    }
  }
  function goToHome() {
    open("index.html", "_self");
  }
});
function lesson(number) {
  const container = $(".lesson-container");
  $("#game-container").css("display", "none");
  $("#game-container").css("display", "none");
$(".data-container").css("display", "flex");

  container.css("display", "flex");

  var numId = number.id;
  var selectedImg = $("#selectedImg");

  selectedImg.attr("src", number.src);

  var imgNum = numId.slice(3);
  var selectedSound = $("#selectedSound");
  selectedSound.attr("src", animalsData[imgNum].sound);
  selectedSound[0].play();

  $("#animalsImgs").html("");
  var i = 1;
  setInterval(() => {
    if (i <= imgNum) {
      var selectedAnimal = $("<img>")
        .attr("src", animalsData[imgNum].img)
        .addClass("selectedAnimals")
        .attr("id", "selectedAnimal1");
      $("#animalsImgs").append(selectedAnimal);
      i++;
    }
  }, 1000);

  const prevButton = createPrevButton();
  const div = $(".btns");

  div.empty();
  div.append(prevButton);
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
  buttonElement.textContent = "Back";

  return buttonElement;
}

function onPrevClick(btn) {
  const mainContainer = document.querySelector(".lesson-container");
  const mcqContainer = document.querySelector(".mcq-container");
  const gameContainer = document.getElementById("game-container");
  gameContainer.style.display = "flex";
  mainContainer.style = "display : none ;";
  // let flag = parseInt(
  //   document.getElementById("nxt-btn").getAttribute("data-flag")
  // );
  // switch (flag) {
  //   case 0:
  //     gameContainer.style.display = "flex";
  //     mainContainer.style = "display : none ;";

  //     break;
  //   case 1:
  //     dragContainer.classList.add("d-none");
  //     mainContainer.classList.remove("d-none");
  //     flag--;
  //     break;
  //   case 2:
  //     mcqContainer.classList.add("d-none");
  //     dragContainer.classList.remove("d-none");
  //     flag--;
  //   default:
  //     break;
  // }
  // document.getElementById("nxt-btn").setAttribute("data-flag", flag);
}

function onNextClick(btn) {
  const dataContainer = document.querySelector(".data-container");
  const dragContainer = document.querySelector(".drag-container");
  const mcqContainer = document.querySelector(".mcq-container");
  // let flag = parseInt(btn.getAttribute("data-flag"));
  // switch (flag) {
  //   case 0:
  //     flag++;
  //     break;
  //   case 1:dsafdsf
  //     dragContainer.classList.add("d-none");
  //     mcqContainer.classList.remove("d-none");
  //     flag++;
  //     break;
  //   case 2:
  //     break;
  //   default:
  //     break;
  // }

  // btn.setAttribute("data-flag", flag);
}

function stopEveryThing() {
  var numArr = document.getElementById("game-container");
  numArr.style.display = "none";
  // var stopNumberSoundTrack = document.getElementById("numbersSoundTrack");
  // stopNumberSoundTrack.pause();
  var hideQuiz = document.getElementById("glowQuiz");
  hideQuiz.style.display = "none";
}
function randomnum() {
  for (var i = 0; ; i++) {
    var randomNum = Math.floor(Math.random() * 10);
    if (randomNum > 0) {
      break;
    }
  }
  return randomNum;
}
function randomindex() {
  for (var x = 0; x < 1; x++) {
    var randomIndex = Math.floor(Math.random() * 10);
    if (randomIndex < 1 || randomIndex > 4) {
      x--;
    }
  }
  return randomIndex;
}
function displayAnimalsQuestion(randomNum) {
  var animalsImgs = document.querySelector(".questions");
  animalsImgs.style.display = "inline-block";
  var animalNum = randomnum();
  var i = 1;
  setInterval(() => {
    if (i <= randomNum) {
      var child = document.createElement("img");
      child.src = animalsData[animalNum].img;
      // child.style.width = "33.33%";
      // child.style.height = "33.33%";
      // child.style.margin = "0%";
      // child.style.padding = "0%";
      // child.style.float = "left";
      animalsImgs.appendChild(child);
      i++;
    }
  }, 1000);
  var counted = document.getElementById("selectedSound");
  counted.src = animalsData[randomNum].counting;
  counted.play();
}
function selectRightChoice(randomNum) {
  var rightChoice = document.createElement("img");
  rightChoice.src = animalsData[randomNum].num;
  // rightChoice.style.width = "50%";
  // rightChoice.style.height = "50%";
  // rightChoice.style.margin = "0%";
  // rightChoice.style.padding = "0%";
  // rightChoice.style.float = "left";
  rightChoice.addEventListener("click", handleRightChoice);
  return rightChoice;
}
function createChoices(randomIndex, randomNum) {
  var choicesImgs = document.querySelector(".choicesImgs");
  choicesImgs.style.display = "inline-block";
  var rightChoice = selectRightChoice(randomNum);
  var randomArr = new Array();
  for (var j = 1; j <= 4; j++) {
    var wrongChoice = document.createElement("img");
    var randomNumImg = Math.floor(Math.random() * 10);
    if (j == randomIndex) {
      randomArr.push(randomNumImg);
      choicesImgs.appendChild(rightChoice);
    } else {
      if (
        randomNumImg == 0 ||
        randomNumImg == randomArr[0] ||
        randomNumImg == randomArr[1] ||
        randomNumImg == randomArr[2] ||
        randomNumImg == randomNum
      ) {
        j--;
      } else {
        randomArr.push(randomNumImg);
        wrongChoice.src = animalsData[randomArr[j - 1]].num;
 
        wrongChoice.addEventListener("click", handleWrongChoice);
        choicesImgs.appendChild(wrongChoice);
      }
    }
  }
}
function handleRightChoice() {
  document.getElementById("wrong").style.display = "none";
  document.getElementById("right").style.display = "inline-block";
  var answerSound = document.getElementById("selectedSound");
  answerSound.src = "./assets/sound/numbers/clap.mp3";
  answerSound.play();
}
function handleWrongChoice() {
  document.getElementById("right").style.display = "none";
  document.getElementById("wrong").style.display = "inline-block";
  var answerSound = document.getElementById("selectedSound");
  answerSound.src = "./assets/sound/numbers/fail.mp3";
  answerSound.play();
}
function reset() {
  // var animalsImgs = document.getElementById("animalsImgs");
  var animalsImgs = document.querySelector(".questions");

  animalsImgs.innerHTML = "";
  var choicesImgs = document.querySelector(".choicesImgs");
  var lessonContainer = document.querySelector(".lesson-container");
  choicesImgs.innerHTML = "";
  document.getElementById("selectedSound").pause();
  document.getElementById("right").style.display = "none";
  document.getElementById("wrong").style.display = "none";
  lessonContainer.style.display = "none"
}
// work with glowing quiz and Next button
function quiz() {
  reset();
  stopEveryThing();
  goBack();
  document.getElementById("next").style.display = "inline-block";
  // document.getElementById("backIcon").style.display = "inline-block";
  var randomNum = randomnum();
  var randomIndex = randomindex();
  displayAnimalsQuestion(randomNum);
  createChoices(randomIndex, randomNum);
}

function goBack() {
  // backIcon.addEventListener("click", function () {
  //   open("number.html", "_self");
  // });
}
