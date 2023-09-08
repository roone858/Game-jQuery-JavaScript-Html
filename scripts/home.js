const kidsImages = [
  "../assets/image/home/kids/1-2.webp",
  "../assets/image/home/kids/2-2.webp",
  "../assets/image/home/kids/3-3.webp",
  "../assets/image/home/kids/4-2.webp",
];
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

$(document).ready(function () {
  const slider = $(".slider");

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

  $("#next-btn").on("click", () => {
    indexOne++;
    indexTow++;
    indexThree++;
    indexFour++;
    changeSlides();
  });
  $("#prev-btn").on("click", () => {
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
    slider.html("");
    slider.append(
      CreateSliderIcon(imagesSrc[indexOne].src, imagesSrc[indexOne].text)
    );
    slider.append(
      CreateSliderIcon(imagesSrc[indexTow].src, imagesSrc[indexTow].text)
    );
    slider.append(
      CreateSliderIcon(imagesSrc[indexThree].src, imagesSrc[indexThree].text)
    );
    slider.append(
      CreateSliderIcon(imagesSrc[indexFour].src, imagesSrc[indexFour].text)
    );
  }
  function CreateSliderIcon(src, text) {
    const card = $("<div>").addClass("icon-card");
    const cardImg = $("<img>").attr("src", src);
    const cardSpan = $("<span>").text(text);
    card.append(cardImg, cardSpan);
    return card;
  }

    const panelBtns = $(".panels .dynamic-ads .btns button");
  
    panelBtns.on("click", function() {
      panelBtns.removeClass("open-ads-btn");
  
      $(this).addClass("open-ads-btn");
  
      const index = panelBtns.index(this);
  
      $(".panels .dynamic-ads").css("background-image", `url(${kidsImages[index]})`);
    });
 
  
});
