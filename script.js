const questionsContainer = document.getElementById("question_container");
const optionContainer = document.getElementById("options_container");
const submitBtn = document.getElementById("submitBtn");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

fetch("questions.json")
  .then((responce) => responce.json())
  .then((questions) => startQuiz(questions));

function startQuiz(questions) {
  displayQuestion(questions[currentQuestionIndex]);
  submitBtn.addEventListener("click", function () {
    const selectedOption = document.querySelector(
      `input[name="option"]:checked`
    );
    if (selectedOption) {
      const userAnswer = selectedOption.value;
      const correctAnswer = questions[currentQuestionIndex].correctAnswer;
      if (userAnswer === correctAnswer) {
        score++;
      }
      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]);
      } else {
        endQuiz();
      }
      scoreElement.textContent = score;
    }
  });
}

function displayQuestion(questionObj) {
  questionsContainer.textContent = questionObj.question;

  optionContainer.innerHTML = "";
  questionObj.options.forEach((option, index) => {
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "option";
    radioBtn.style.cursor = "pointer";
    radioBtn.value = option;
    radioBtn.id = `option${index}`;
    const label = document.createElement("label");
    label.textContent = option;
    label.htmlFor = `option${index}`;
    label.style.cursor = "pointer";

    optionContainer.appendChild(radioBtn);
    optionContainer.appendChild(label);
  });
}

function endQuiz() {
  questionsContainer.innerHTML = `<h2>Quiz Completed!</h2>`;
  optionContainer.innerHTML = "";
}
