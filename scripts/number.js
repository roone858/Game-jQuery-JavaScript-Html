var animalsData = {
  1: {
    sound: "./assets/sound/numbers/num1lion.mp3",
    img: "./assets/image/numbersPage/lion.png",
  },
  2: {
    sound: "./assets/sound/numbers/num2zebra.mp3",
    img: "./assets/image/numbersPage/zebra.png",
  },
  3: {
    sound: "./assets/sound/numbers/num3giraffe.mp3",
    img: "./assets/image/numbersPage/giraffe.png",
  },
  4: {
    sound: "./assets/sound/numbers/num4monkey.mp3",
    img: "./assets/image/numbersPage/monkey.png",
  },
  5: {
    sound: "./assets/sound/numbers/num5tiger.mp3",
    img: "./assets/image/numbersPage/tiger.png",
  },
  6: {
    sound: "./assets/sound/numbers/num6camel.mp3",
    img: "./assets/image/numbersPage/camel.png",
  },
  7: {
    sound: "./assets/sound/numbers/num7elephant.mp3",
    img: "./assets/image/numbersPage/elephant.png",
  },
  8: {
    sound: "./assets/sound/numbers/num8penguin.mp3",
    img: "./assets/image/numbersPage/penguin.png",
  },
  9: {
    sound: "./assets/sound/numbers/num9hippo.mp3",
    img: "./assets/image/numbersPage/hippo.png",
  },
};
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

function lesson(number) {
     const container = document.querySelector(".container");
     document.getElementById("numsImgs").style.display = "none";
  container.style.display = "flex";

  
  var numId = number.id;
  var selectedImg = document.getElementById("selectedImg");

  selectedImg.setAttribute("src", number.src);

  var imgNum = numId.slice(3);
  var selectedSound = document.getElementById("selectedSound");
  selectedSound.src = animalsData[imgNum].sound;
  selectedSound.play();


  animalsImgs.innerHTML = "";
  var i = 1;
  setInterval(() => {
       if (i <= imgNum) {
            var selectedAnimal = document.createElement("img");
            selectedAnimal.src = animalsData[imgNum].img;
            selectedAnimal.setAttribute("class", "selectedAnimals");
            selectedAnimal.setAttribute("id", "selectedAnimal1");
            animalsImgs.append(selectedAnimal);
            i++;
          }
     }, 1000);
     const nextButton = createNextButton();
     const prevButton = createPrevButton();
     const div = document.querySelector(".btns");
     
     div.replaceChildren(prevButton);
     div.appendChild(nextButton);
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
  const dataContainer = document.querySelector(".container");
  const mainContainer = document.getElementById("numsImgs");
  const mcqContainer = document.querySelector(".mcq-container");
  const btns = document.querySelector(".btns");
  let flag = parseInt(
    document.getElementById("nxt-btn").getAttribute("data-flag")
  );
  switch (flag) {
    case 0:
      mainContainer.style.display = "flex";
      dataContainer.style = "display : none ;";

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
