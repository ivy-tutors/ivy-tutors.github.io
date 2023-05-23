fetch('assets/json/tests/' + sessionStorage.examID + '.json')
.then((response) => response.json())
.then((dataJSON) => {
  const quizData = dataJSON

  const quiz = document.getElementById("quiz");
  let answerElements = document.querySelectorAll(".answer");
  const questionElement = document.getElementById("question");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const img = document.getElementById("image");
  const submitButton = document.getElementById("submit");
  
  let currentQuiz = 0;
  let score = 0;
  
  const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
  };
  
  const getSelected = () => {
    let answer;
    let answerElements = document.querySelectorAll(".answer");
    answerElements.forEach((answerElement) => {
      if (answerElement.checked) answer = answerElement.id;
    });
    return answer;
  };
  
  const loadQuiz = () => {
    deselectAnswers();
    let answerElements = document.querySelectorAll(".answer");
    answerElements.forEach((answer) => (answer.addEventListener('click', () => {answer.checked = true})))
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerHTML = currentQuizData.question;
    if(currentQuizData.image != undefined){
      img.src = currentQuizData.image;
      img.hidden = false;
    } else {
      img.hidden = true;
    }
    a_text.innerHTML = '<input type="radio" name="answer" id="a" class="answer"/> ' + currentQuizData.a;
    b_text.innerHTML = '<input type="radio" name="answer" id="b" class="answer"/> ' + currentQuizData.b;
    c_text.innerHTML = '<input type="radio" name="answer" id="c" class="answer"/> ' + currentQuizData.c;
    d_text.innerHTML = '<input type="radio" name="answer" id="d" class="answer"/> ' + currentQuizData.d;
  };
  
  loadQuiz();
  
  submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
      if (answer === quizData[currentQuiz].correct) score++;
      currentQuiz++;
      if (currentQuiz < quizData.length) {img.hidden = true; loadQuiz();}
      else {
        if(score / quizData.length < 0.6){
          quiz.style = 'text-align:center'
          quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly.</h2>  
            <p>Don't fret: this was a tough diagnostic exam! We would strongly recommend enrolling or registering for a course in this subject. Mastery is only one class away!</p> 
          `
          document.getElementById('registration').hidden = false
          setTimeout(() => {
            quiz.innerHTML = quiz.innerHTML + '<p><a href="tests.html">Want to take another exam?</a></p> '
          }, 10000)
        } else if(score / quizData.length < 0.9){
          quiz.style = 'text-align:center'
          quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly.</h2>  
            <p>Not bad! It looks like there might be some rust with some concepts, though. We would still recommend enrolling or registering for a course in this subject.</p>  
          `
          document.getElementById('registration').hidden = false
          setTimeout(() => {
            quiz.innerHTML = quiz.innerHTML + '<p><a href="tests.html">Want to take another exam?</a></p> '
          }, 10000)
        } else {
          quiz.style = 'text-align:center'
          quiz.innerHTML = `
            <h2>You answered ${score}/${quizData.length} questions correctly.</h2>  
            <p>Wow! Well done. Consider enrolling in an advanced course with us!</p>  
          `
          document.getElementById('registration').hidden = false
          setTimeout(() => {
            quiz.innerHTML = quiz.innerHTML + '<p><a href="tests.html">Want to take another exam?</a></p> '
          }, 10000)
        }
      
      }
    }
  });
})