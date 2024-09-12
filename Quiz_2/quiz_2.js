import {questionList} from "./quiz_2_question.js"; 

// variables

let mathQuestionsObj = JSON.parse(JSON.stringify(questionList));
//const quizContainer = document.querySelector("Quiz-Container");
const question = document.getElementById("question");
const options = document.getElementById("answer");
const submitButton = document.getElementById("submit");
const score = document.getElementById("score");
let index = 0;
let count = 0;



renderQuestion(index);
submitButton.addEventListener("click", () => {
getSelectedAnswer(index);
disableRadioButtons();
score.style.opacity = 1;
if (index+1 < mathQuestionsObj.length) {
  index++
  renderQuestion(index);
} else {
  submitButton.disabled = true;
}
});

console.log(mathQuestionsObj.length);

//functions

function renderQuestion(i){
  question.innerText = mathQuestionsObj[i].question;
  options.innerHTML ="";
  mathQuestionsObj[i].options.forEach(element => {options.innerHTML += `<li><input type="radio" name="choice" value="${element[0]}"> ${element}</li>`});
}

function getSelectedAnswer(index){
  const radios = document.getElementsByName("choice");
  let selectedAnswer;
  for (let i=0; i<radios.length; i++){
    if (radios[i].checked) {
      selectedAnswer = radios[i].value;
      break;
    }
  }
  if (selectedAnswer === mathQuestionsObj[index].answer) {
    count++
  }
  score.innerText = `分数: ${count}/4`
}

function disableRadioButtons() {
  const radios = document.getElementsByName("choice");
  for (let i=0; i<radios.length; i++){
    radios[i].disabled = true;
  }
}

