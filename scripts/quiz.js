const mixedQuestions = [
  {
    question: "What is the 7th letter in the English alphabet?",
    options: ["G", "H", "I", "J"],
    correctAnswer: "H",
  },
  {
    question: "What is the result of 5 + 3?",
    options: ["7", "8", "9", "10"],
    correctAnswer: "8",
  },
  {
    question: "What letter comes after 'L'?",
    options: ["M", "N", "O", "P"],
    correctAnswer: "M",
  },
  {
    question: "What is 6 multiplied by 4?",
    options: ["16", "24", "32", "36"],
    correctAnswer: "24",
  },
  {
    question: "What is the 3rd letter in the word 'BANANA'?",
    options: ["A", "B", "N", "C"],
    correctAnswer: "N",
  },
  {
    question: "What is 9 divided by 3?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "3",
  },
  {
    question: "What letter comes before 'F'?",
    options: ["D", "E", "G", "H"],
    correctAnswer: "E",
  },
  {
    question: "What is 12 divided by 6?",
    options: ["2", "3", "4", "5"],
    correctAnswer: "2",
  },
  {
    question: "What is the result of 7 - 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
  },
  {
    question: "What letter comes after 'R'?",
    options: ["Q", "S", "T", "U"],
    correctAnswer: "S",
  },
];

const header = document.querySelector(".question-container header");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const result_msg = document.querySelector(".result_msg");
const result_mark = document.querySelector(".result_content img");
const result_page = document.querySelector(".result_page ");
const u_prcnt = document.querySelector(".u_prcnt");
const prcnt_bar = document.querySelector(".prcnt_bar .fill");
const prcnt_bar_lvl = document.querySelector(".prcnt_bar_lvl");
const form = document.querySelector(".form-inner .row");
const questionContainer = document.querySelector(".question-container");
let step = 0;
let userChoices = {};

createFourOptions(step, mixedQuestions[step].options);
function createChoice(radioNum, name, value) {
  const col = document.createElement("div");
  col.classList.add("col-md-6");
  const bounce = document.createElement("div");
  bounce.classList.add("bounce-left");
  bounce.classList.add("radio-field");
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.classList.add(radioNum);
  radio.classList.add("checkmark");
  radio.name = name;
  radio.value = value;
  window.getComputedStyle(radio, "::before");
  const img = document.createElement("img");
  img.src = "./assets/image/quiz/question-sign.png";
  img.alt = value;
  const label = document.createElement("label");
  label.textContent = value;
  bounce.append(radio);
  //   bounce.append(img);
  bounce.append(label);
  col.appendChild(bounce);

  return col;
}

prevBtn.classList.add("d-none");
prevBtn.addEventListener("click", () => {
  step--;
  createFourOptions(step, mixedQuestions[step].options);
  if (step == 0) prevBtn.classList.add("d-none");
  console.log(step);
});

nextBtn.addEventListener("click", () => {
  if (!getAnswer(step)) return;
  step++;
  step == 9 && (nextBtn.textContent = "Submit!");
  step <= 9
    ? createFourOptions(step, mixedQuestions[step].options)
    : showResultPage();
  step > 0 && prevBtn.classList.remove("d-none");
});

function getAnswer(questionNumber) {
  const checked = document.querySelector(".radio-field input:checked");
  if (checked)
    return (userChoices = { ...userChoices, [questionNumber]: checked.value });
  else return false;
}
function createFourOptions(questionNumber, options) {
  header.textContent = mixedQuestions[step].question;
  form.replaceChildren(createChoice("radio1", questionNumber, options[0]));
  form.appendChild(createChoice("radio2", questionNumber, options[1]));
  form.appendChild(createChoice("radio3", questionNumber, options[2]));
  form.appendChild(createChoice("radio4", questionNumber, options[3]));
}
function showResultPage() {
  result_page.classList.remove("d-none");
  questionContainer.classList.add("d-none");
  const result = correctingTest(userChoices);
  console.log(result);
  const { color, message, level } = resultColorAndMessageAndLevel(result);
  u_prcnt.textContent = result + "%";
  u_prcnt.style.color = color;
  prcnt_bar.style.width = result + "%";
  prcnt_bar.style.backgroundColor = color;
  result_msg.textContent = message;
  result_msg.style.color = color;
  prcnt_bar_lvl.textContent = level;
  prcnt_bar_lvl.style.color = color;
}

function correctingTest(usersInputs) {
  const correctsArray = generateCorrectAnswer(mixedQuestions);
  const result = correctsArray.filter(
    (correct, index) => usersInputs[index] == correct
  );
  return (result.length * 100) / mixedQuestions.length;
}

function generateCorrectAnswer(mixedQuestions) {
  return mixedQuestions.map((q, index) => {
    return q.correctAnswer;
  });
}

function resultColorAndMessageAndLevel(result) {
  let color;
  let message;
  let level;
  if (result < 50) {
    color = "red";
    message = "You Failed!";
    level = "Low";
    result_mark.src = "./assets/image/quiz/cross.png";
  }
  if (result < 80 && result >= 50) {
    color = "rgb(255, 89, 0)";
    message = "Could have done better!";
    level = "Medium";
    result_mark.src = "./assets/image/quiz/warning.png";
  }
  if (result >= 80) {
    color = "green";
    message = "Wow! You are Brilliant!";
    level = "High";
    result_mark.src = "./assets/image/quiz/check.png";
  }
  return { color, message, level };
}
