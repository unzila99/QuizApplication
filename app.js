


var questionNumber = document.querySelector(".question-number");
var questionText = document.querySelector(".question-text");
var optionContainer = document.querySelector(".option-container");
var answersIndicatorContainer = document.querySelector(".answers-indicator");
var homeBox = document.querySelector(".home-box");
var quizBox = document.querySelector(".quiz-box");
var resultBox = document.querySelector(".result-box");


var questionCounter = 0;
var currentQuestion;
var availableQuestions = [];
var availableOptions = [];
var correctAnswers = 0;
var attempt = 0;



// push the question into  availableQuestions Array
function setAvailableQuestions(){
    var totalQuestion = quiz.length;
    for(var i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

// Set question number and options
function getNewQuestion(){
    // Set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) +  " of " +  quiz.length;

    // Set question text
    var questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    
    var index1 = availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    
    // set options 
    // get the length of options
    var optionLen = currentQuestion.options.length
    for(var i=0; i<optionLen; i++){
        availableOptions.push(i)
    }

    optionContainer.innerHTML = '';
    var animationDelay = 0.15;
    for(var i=0; i<optionLen; i++){

        var optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        var index2 = availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);
        var option = document.createElement("div");
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option"
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++
}

// Get the result of current attempt questions
function getResult(element){
    var id = parseInt(element.id);
    if(id === currentQuestion.answer){
        // Set the green color to the correct option.
        element.classList.add("correct");
        //Add the indicator to correct the mark.
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        // Set the red color to the Incorrect option.
        element.classList.add("wrong");
        //Add the indicator to wrong the mark.
        updateAnswerIndicator("wrong");

        // If the answer is incorrect show the correct option by adding color on correct option
        var optionLen = optionContainer.children.length;
        for(var i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickableOption();
}

// Make all options unclickable whenthe user once select the option.
function  unclickableOption(){
    var optionLen = optionContainer.children.length;
    for(var i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("Already-selected")
    }
}

function answersIndicator(){
    answersIndicatorContainer.innerHTML = '';
    var totalquestion = quiz.length;
    for(var i=0; i<totalquestion; i++){
        var indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    // Hide quizBox
    quizBox.classList.add("hide");
    // Show resultBox
    resultBox.classList.remove("hide");
    quizResult();
}

function  quizResult(){
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML =  attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML =  attempt-correctAnswers;
    var percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

function ResetQuiz(){
     questionCounter = 0;
     correctAnswers = 0;
     attempt = 0;
}

function TryAgainQuiz(){
    // Hide the ResultBox
    resultBox.classList.add("hide");
    // Show the QuiztBox
    quizBox.classList.remove("hide");
    ResetQuiz();
    StartQuiz();
}

function GoToHome(){
    // Hide ResultBox
    resultBox.classList.add("hide");
    // Show HomeBox
    homeBox.classList.remove("hide");
    ResetQuiz();
}

// #### Starting Point #### //

function StartQuiz(){
    // hide HomeBox
    homeBox.classList.add("hide");
    //Show QuizBox
    quizBox.classList.remove("hide");
    // First we will set all questions in availableQuestions
    setAvailableQuestions();
    // Second we will call the  getNewQuestion(); function
    getNewQuestion();
    answersIndicator();
} 
