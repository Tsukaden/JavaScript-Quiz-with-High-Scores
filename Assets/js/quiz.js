

var currentQindex = 0;
var time = questions.length * 15; 
var timer;

// all our dom elements , write query selectors for all of the following
// questions div, timer el, options, submit btn, start bt, initials, feedback
var questionsElement = document.querySelector('.questions');
var timerElement = document.querySelector("#timer");
var optionsElement = document.querySelector("#options");
var submitElement = document.querySelector("#submit");
var startElement = document.querySelector(".start");
var initialsElement = document.querySelector("#initials");
var quizElement = document.querySelector("#quiz");
var timeElement = document.querySelector("#time");
var endElement = document.querySelector(".endScreen");
var timerDiv = document.querySelector('.timer.show');
var scoreElement = document.querySelector("#score");
var outputElement = document.querySelector("#output");
var scoreClickElement = document.querySelector("#scoreClick");
var score = document.getElementById('score').textContent;
var initials = document.getElementById('initials').value;


function startQuiz () {

    // hide the start screen
    var st = "show"
    if (st === "show") {
            st = "hide";
            startElement.setAttribute("class", "hide");
          }
    
    // unhide questions div
    var qu = "hide"
    if (qu === "hide") { 
            qu = "show";
           questionsElement.setAttribute("class", "show");
          };


    // start timer
    var startTime = setInterval(function() {
        time--;
        timeElement.textContent = `${time} seconds`
        if (time <= 0) {
            time = 0
            endGame()
            clearInterval(startTime);
        } else if (currentQindex === questions.length) {
            endGame();
            clearInterval(startTime);
        }
    
    }, 1000);
    

    
    askQ();

};





function askQ() {
    if (currentQindex >= questions.length) {
        endGame();
        return;
    }
    var currentQ = questions[currentQindex];
    var questionTitle = document.querySelector('#question-title');
    questionTitle.textContent = currentQ.title;
    optionsElement.innerHTML = "";
    for (var i = 0; i < currentQ.options.length; i++){
        var option = currentQ.options[i];
        var optionsButt = document.createElement('button');
        optionsButt.setAttribute('class', 'option');
        optionsButt.setAttribute('value', option);
        optionsButt.textContent = i + 1 + '. ' + option;
        
        optionsElement.appendChild(optionsButt);
    }
};

quizElement.addEventListener("click",  function() {
    startQuiz();

});

    // function qClicked() {}       
    // decrement the time
    function qClicked(event) {
    var selected = event.target;
    if (selected.matches(".option")) {
      var selectedOption = selected.value;
      var currentQ = questions[currentQindex];
      if (selectedOption === currentQ.answer) {
        currentQindex++;
        askQ();
      } else {
        time -= 10;
        timeElement.textContent = `${time} seconds`;
      }}
    };



function endGame() {
    console.log('game end')
    var qushow = "show"
    if (qushow === "show") { 
            qushow = "hide";
           questionsElement.setAttribute("class", "hide");
          };
    var ending = "hide"
    if (ending === "hide") { 
         ending = "show";
                 endElement.setAttribute("class", "show");
         };          
         timerDiv.style.display = 'none';
         scoreElement.textContent = `${time}`;
};
submitElement.textContent = 'Save Initials';
submitElement.onclick = () => {
    var userInput = initialsElement.value;
    localStorage.setItem("userInitials", userInput);
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    highscores.push({ initials: userInput, score: time });
    localStorage.setItem('highscores', JSON.stringify(highscores));
    displayScore();
};

  function displayScore() {
    var savedInitials = localStorage.getItem("userInitials")
    if (outputElement) { 
        outputElement.textContent = `${savedInitials}`;
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
    outputElement.innerHTML = '';

    highscores.forEach(highscore => {
        var li = document.createElement('li');
        li.textContent = `${highscore.initials} - ${highscore.score}`;
        outputElement.appendChild(li);
  })}};


 scoreClickElement.onclick = () => {
    window.location.href = "highscore.html";
    displayScore();
  };

var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
highscores.push({ initials, score });
localStorage.setItem('highscores', JSON.stringify(highscores));

optionsElement.onclick = qClicked;