let currentQuestion = 0;
let score = 0;
let resetScore = 0;
let startoverQuestion = 0;

function incrementQuestion(){
  currentQuestion++;
}

function raiseScore(){
  score++;
}

function randomGood(){
  return exclamation["good"][Math.floor(Math.random() * exclamation["good"].length)]
}

function randomBad(){
  return exclamation["bad"][Math.floor(Math.random() * exclamation["bad"].length)]
}

function generateQuestion(){
  return `
      <div class="question-${currentQuestion}">
      <h2 class="question">${questionBank[currentQuestion].question}</h2>
      <form>
      <fieldset>
      <label class="option"><input type="radio" class="radio-button" name="option" value="1" required/>     
        <span id="opt1" class="optionText">${questionBank[currentQuestion].option1}</span>
      </label>
      <label class="option"><input type="radio" class="radio-button" name="option" value="2" required/>     
      <span id="opt2" class="optionText">${questionBank[currentQuestion].option2}</span>
      </label>
      <label class="option"><input type="radio" class="radio-button"
      name="option" value="3" required/> 
        <span id="opt3" class="optionText">${questionBank[currentQuestion].option3}</span>
      </label>
      <label class="option"><input type="radio" class="radio-button" name="option" value="4" required/>     
        <span id="opt4" class="optionText">${questionBank[currentQuestion].option4}</span>
      </label>
    </fieldset>
      <button id="submitButton" class="submit-btn" onclick="submitAnswer();">Submit</button>
      
    </form>
    </div>`;
}

//start the quiz
function startQuiz(){
  $('.titlePage').removeClass('hidden');
  $('.quizContainer').addClass('hidden');
  $('.answerPage').addClass('hidden');
  $('.resultPage').addClass('hidden');
  $('.startButton').click(function(){
      $('.titlePage').addClass('hidden');
      $('.quizContainer').removeClass('hidden');
      console.log('start button clicked');
  })
}
//render question in DOM
function renderQuestion () {
  $('.questionArea').html(generateQuestion(questionBank));
  $('.currentQuestion').text(currentQuestion + 1);
  $('.score').text(score);
  labelOnClick();
}

function labelOnClick(){
  $('fieldset').on('click', '.option', function(){
    $(this).addClass('clicked').siblings().removeClass('clicked');
    console.log("clicked ran")
  });
}

//let user choose answer,check they clicked something
function submitAnswer(){
  $('form').on('click', '.submit-btn', function(event){
    event.preventDefault();
    if($('input[name="option"]:checked').length == '0'){
      alert("Can't get out that easy. Just pick one.");
    } else {
      $('.answerPage').removeClass('hidden');
      $('.quizContainer').addClass('hidden');
      isAnswerCorrect();
      if (currentQuestion + 1 == questionBank.length){
        $(".next-btn").text("See results")
      }
    }
  });
}

function isAnswerCorrect(){
  let selected = $('input:checked');
  let answer = selected.val();
  let correctAnswer = `${questionBank[currentQuestion].answer}`;
  if (answer === correctAnswer){
    raiseScore();
    exclamationCorrect();
  } else {
    exclamationWrong();
  }
}

function exclamationCorrect(){
  $('.answerImgContainer img').attr('src', questionBank[currentQuestion].imgUrl).attr('alt', questionBank[currentQuestion].imgAlt);
  $('.exclamation').html(randomGood()) + '.';
  $('.answer').html(questionBank[currentQuestion].answerText) + '.';
}

function exclamationWrong(){
  $('.answerImgContainer img').attr('src', questionBank[currentQuestion].imgUrl).attr('alt', questionBank[currentQuestion].imgAlt);
  $('.exclamation').html(randomBad()) + '.';
  $('.answer').html(questionBank[currentQuestion].answerText) + '.';
}

//go to next question or final results
function nextQuestion(){
  $('.next-btn').on('click', function(event){
    event.preventDefault();
    incrementQuestion();
    $('.answerPage').addClass('hidden');
    if (currentQuestion < questionBank.length){
      $('.quizContainer').removeClass('hidden');
      renderQuestion();
    }
    else {
      $('.resultPage').removeClass('hidden');
      renderResults();
    }
  });
}

function renderResults(){
  $(".next-btn").text("Try Again")
  $('.score').text(score);
  restartQuiz();
  if (score <= 2){
    $('.resultImgContainer img').attr('src', exclamation["terribleImg"].imgUrl).attr('alt', exclamation["terribleImg"].imgAlt);
    $('.exclamation').html(exclamation["terrible"]);
  } else if (score >= 3 && score <= 5){
    $('.resultImgContainer img').attr('src', exclamation["badImg"].imgUrl).attr('alt', exclamation["badImg"].imgAlt);
    $('.exclamation').html(randomBad()) + '.';
  } else if (score >= 6 && score <= 8){
    $('.resultImgContainer img').attr('src', exclamation["goodImg"].imgUrl).attr('alt', exclamation["goodImg"].imgAlt);
    $('.exclamation').html(randomGood()) + '.';
  }  else {
    $('.resultImgContainer img').attr('src', exclamation["perfectImg"].imgUrl).attr('alt', exclamation["perfectImg"].imgAlt);
    $('.exclamation').html(exclamation["perfect"]);
  };
}

function restartQuiz () {
  $('.resultPage').on('click', '.next-btn', function (event) {
    location.reload();
  });
}
//restart quiz
function playQuiz(){
  startQuiz();
  renderQuestion();
  nextQuestion();
};

$(playQuiz);
