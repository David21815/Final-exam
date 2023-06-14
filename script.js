const questions = [
    {
        question:"In which Italian city can you find the Colosseum?",
        answers: [
            {text:"Venice", correct:false},
            {text:"Rome", correct:true},
            {text:"Naples", correct:false},
            {text:"Milan", correct:false},
        ]
    },
    {
        question:"Which of the following tag represents the header of a section in HTML5?",
        answers: [
            {text:"section", correct:false},
            {text:"article", correct:false},
            {text:"aside", correct:false},
            {text:"header", correct:true},
        ]
    },
    {
        question:"What is the longest river in the world?",
        answers: [
            {text:"Amazon river", correct:false},
            {text:"Nile", correct:true},
            {text:"Yellow river", correct:false},
            {text:"Congo  river", correct:false},
        ]
    },
    {
        question:"Which country is the footballer Cristiano Ronaldo from?",
        answers: [
            {text:"Portugal", correct:true},
            {text:"Spain", correct:false},
            {text:"Germany", correct:false},
            {text:"Brazil", correct:false},
        ]
    },
    {
        question:"What does the Richter scale measure?",
        answers: [
            {text:"Wind speed", correct:false},
            {text:"Temperature", correct:false},
            {text:"Tornado Strength", correct:false},
            {text:"Earthquake intensity", correct:true},
        ]
    },
    {
        question:"Apart from water, what is the most popular drink in the world?",
        answers: [
            {text:"Tea", correct:true},
            {text:"Coffee", correct:false},
            {text:"Beer", correct:false},
            {text:"Orange Juice", correct:false},
        ]
    },
    {
        question:"How high is Mount Everest?",
        answers: [
            {text:"5,849 m", correct:false},
            {text:"6,849 m", correct:false},
            {text:"8,849 m", correct:true},
            {text:"7,849 m", correct:false},
        ]
    },
    {
        question:"Bootstrap lays out content according to a grid system with how many possible columns?",
        answers: [
            {text:"6", correct:false},
            {text:"10", correct:false},
            {text:"4", correct:false},
            {text:"12", correct:true},
        ]
    },
    {
        question:"In which continent are Chile, Argentina and Brazil?",
        answers: [
            {text:"Europe", correct:false},
            {text:"South America", correct:true},
            {text:"North America", correct:false},
            {text:"Asia", correct:false},
        ]
    },
    {
        question:"Which is the easiest way to tell the age of many trees?",
        answers: [
            {text:"To measure the width of the tree", correct:false},
            {text:"To count the rings on the trunk", correct:true},
            {text:"To count the number of leaves", correct:false},
            {text:"To measure the height of the tree", correct:false},
        ]
    },
    {
        question:"Which of the following animals can run the fastest?",
        answers: [
            {text:"Cheetah", correct:true},
            {text:"Leopard", correct:false},
            {text:"Tiger", correct:false},
            {text:"Lion", correct:false},
        ]
    },
    {
        question:"What is the most points that a player can score with a single throw in darts?",
        answers: [
            {text:"20", correct:false},
            {text:"40", correct:false},
            {text:"60", correct:true},
            {text:"80", correct:false},
        ]
    },
    {
        question:"The two biggest exporters of beers in Europe are Germany and …",
        answers: [
            {text:"Spain", correct:false},
            {text:"France", correct:false},
            {text:"Italy", correct:false},
            {text:"Belgium", correct:true},
        ]
    },
    {
        question:"What is the rarest type of blood in the human body?",
        answers: [
            {text:"AB negative", correct:true},
            {text:"O positive", correct:false},
            {text:"B negative", correct:false},
            {text:"A positive", correct:false},
        ]
    },
    {
        question:"Bootstrap 5 often specifies fonts and border sizes in terms of REMs. What is a REM equal to?",
        answers: [
            {text:"12 pixels", correct:false},
            {text:"The text height on the HTML element", correct:true},
            {text:"1 pixel", correct:false},
            {text:"0.1 pixel", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next question";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btnn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
