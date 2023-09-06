const imagesSrc = [
  {
    src: "./assets/image/home/icons/1a.webp",
    text: "Stuffed Animals",
  },
  {
    src: "./assets/image/home/icons/2a.webp",
    text: "Remote Control & Play Vehicles",
  },
  {
    src: "./assets/image/home/icons/3a.webp",
    text: "Building & Learning",
  },
  {
    src: "./assets/image/home/icons/5.webp",
    text: "Video Games",
  },
];

const slider = document.querySelector(".slider");

let indexOne = 0,
  indexTow = 1,
  indexThree = 2,
  indexFour = 3;
changeSlides();
setInterval(() => {
  indexOne++;
  indexTow++;
  indexThree++;
  indexFour++;
  changeSlides();
}, 8000);

document.getElementById("next-btn").addEventListener("click", () => {
  indexOne++;
  indexTow++;
  indexThree++;
  indexFour++;
  changeSlides();
});
document.getElementById("prev-btn").addEventListener("click", () => {
  let pointer = indexOne;
  indexOne = indexFour;
  indexFour = indexThree;
  indexThree = indexTow;
  indexTow = pointer;
  changeSlides();
});

function changeSlides() {
  if (indexOne > 3) indexOne = 0;
  if (indexTow > 3) indexTow = 0;
  if (indexThree > 3) indexThree = 0;
  if (indexFour > 3) indexFour = 0;
  if (indexOne < 0) indexOne = 3;
  if (indexTow < 0) indexTow = 2;
  if (indexThree < 0) indexThree = 1;
  if (indexFour < 0) indexFour = 0;
  slider.innerHTML = "";
  slider.appendChild(
    CreateSliderIcon(imagesSrc[indexOne].src, imagesSrc[indexOne].text)
  );
  slider.appendChild(
    CreateSliderIcon(imagesSrc[indexTow].src, imagesSrc[indexTow].text)
  );
  slider.appendChild(
    CreateSliderIcon(imagesSrc[indexThree].src, imagesSrc[indexThree].text)
  );
  slider.appendChild(
     CreateSliderIcon(imagesSrc[indexFour].src, imagesSrc[indexFour].text)
   );
}
function CreateSliderIcon(src, text) {
  const card = document.createElement("div");
  card.setAttribute("class", "icon-card");
  const cardImg = document.createElement("img");
  cardImg.setAttribute("src", "./assets/ss/s");
  const cardSpan = document.createElement("span");
  cardSpan.innerText = text;
  cardImg.setAttribute("src", src);
  card.appendChild(cardImg);
  card.appendChild(cardSpan);
  return card;
}

const kidsImages = [
  "../assets/image/home/kids/1-2.webp",
  "../assets/image/home/kids/2-2.webp",
  "../assets/image/home/kids/3-3.webp",
  "../assets/image/home/kids/4-2.webp",
];
const panelBtns = document.querySelectorAll(
  ".panels .dynamic-ads .btns button "
);
panelBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    panelBtns.forEach((btn) => btn.classList.remove("open-ads-btn"));
    btn.classList.add("open-ads-btn");
    document.querySelector(
      ".panels .dynamic-ads"
    ).style.backgroundImage = `url(${kidsImages[index]})`;
  });
});
