const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const progressBar = document.getElementById('progress-bar');
const timerElement = document.getElementById('timer');
const resultContainer = document.getElementById('result-container');
const categorySelector = document.getElementById('category');
 let questions = {
    science: [
      { question: "What is the chemical symbol for water?", answers: ["H2O", "O2", "CO2", "H2"], correct: "H2O" },
      { question: "What planet is closest to the Sun?", answers: ["Venus", "Mercury", "Earth", "Mars"], correct: "Mercury" },
      { question: "What gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: "Carbon Dioxide" },
      { question: "How many bones are there in the adult human body?", answers: ["206", "208", "198", "201"], correct: "206" },
      { question: "What is the powerhouse of the cell?", answers: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"], correct: "Mitochondria" },
      { question: "Which planet is known as the Red Planet?", answers: ["Venus", "Saturn", "Mars", "Jupiter"], correct: "Mars" },
      { question: "Which part of the brain controls heartbeat?", answers: ["Cerebrum", "Cerebellum", "Medulla", "Thalamus"], correct: "Medulla" },
      { question: "What is the speed of light in a vacuum?", answers: ["299,792 km/s", "150,000 km/s", "30,000 km/s", "1,000,000 km/s"], correct: "299,792 km/s" },
      { question: "What is the most abundant gas in Earth's atmosphere?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: "Nitrogen" }
    ],
    math: [
      { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: "4" },
      { question: "What is the square root of 16?", answers: ["2", "3", "4", "5"], correct: "4" },
      { question: "What is 12 x 12?", answers: ["144", "122", "120", "130"], correct: "144" },
      { question: "What is 100 divided by 5?", answers: ["20", "25", "10", "30"], correct: "20" },
      { question: "What is the value of Pi up to 2 decimal places?", answers: ["3.14", "2.72", "1.41", "3.21"], correct: "3.14" },
      { question: "What is 5 factorial (5!)?", answers: ["120", "60", "24", "10"], correct: "120" },
      { question: "How many degrees are in a right angle?", answers: ["45", "90", "180", "360"], correct: "90" },
      { question: "What is 7 cubed (7^3)?", answers: ["343", "49", "512", "729"], correct: "343" },
      { question: "Solve: 3x - 5 = 7. What is x?", answers: ["2", "3", "4", "5"], correct: "4" }
    ],
    history: [
      { question: "Who discovered America?", answers: ["Columbus", "Magellan", "Vespucci", "Cook"], correct: "Columbus" },
      { question: "In which year did World War II end?", answers: ["1944", "1945", "1946", "1947"], correct: "1945" },
      { question: "Who was the first President of the United States?", answers: ["George Washington", "Abraham Lincoln", "John Adams", "Thomas Jefferson"], correct: "George Washington" },
      { question: "What was the name of the ship that carried the Pilgrims to America?", answers: ["Mayflower", "Santa Maria", "Endeavour", "Victoria"], correct: "Mayflower" },
      { question: "Which ancient civilization built the pyramids?", answers: ["Romans", "Greeks", "Egyptians", "Babylonians"], correct: "Egyptians" },
      { question: "In which year did the Berlin Wall fall?", answers: ["1987", "1988", "1989", "1990"], correct: "1989" },
      { question: "Who wrote the Declaration of Independence?", answers: ["John Adams", "Thomas Jefferson", "Benjamin Franklin", "Alexander Hamilton"], correct: "Thomas Jefferson" },
      { question: "What year did the Titanic sink?", answers: ["1910", "1912", "1914", "1916"], correct: "1912" },
      { question: "Which empire was ruled by Genghis Khan?", answers: ["Roman", "Ottoman", "Mongol", "British"], correct: "Mongol" }
    ]
  };
  


  
  let shuffledQuestions, currentQuestionIndex, score, timer, timerInterval;
  
  function startQuiz() {
    score = 0;
    timer = 30;
    resultContainer.classList.add('hidden');
    nextButton.classList.add('hidden');
    shuffledQuestions = shuffle(questions[categorySelector.value]);
    currentQuestionIndex = 0;
    progressBar.style.width = '0%';
    displayQuestion();
    startTimer();
  }
  
  function displayQuestion() {
    resetState();
    const question = shuffledQuestions[currentQuestionIndex];
    questionContainer.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer;
      button.classList.add('btn');
      if (answer === question.correct) button.dataset.correct = true;
      button.addEventListener('click', selectAnswer);
      answerButtons.appendChild(button);
    });
    updateProgressBar();
  }
  
  function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) score++;
    Array.from(answerButtons.children).forEach(button => {
      button.disabled = true;
      if (button.dataset.correct) button.style.backgroundColor = 'green';
      else button.style.backgroundColor = 'red';
    });
    nextButton.classList.remove('hidden');
  }
  
  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  function showResult() {
    resultContainer.classList.remove('hidden');
    scoreDisplay.innerText = score;
    const highScore = Math.max(score, localStorage.getItem('highScore') || 0);
    localStorage.setItem('highScore', highScore);
    highScoreDisplay.innerText = highScore;
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      displayQuestion();
    } else {
      clearInterval(timerInterval);
      showResult();
    }
  }
  
  function startTimer() {
    timerElement.innerText = timer;
    timerInterval = setInterval(() => {
      if (timer > 0) {
        timer--;
        timerElement.innerText = timer;
      } else {
        clearInterval(timerInterval);
        showResult();
      }
    }, 1000);
  }
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  nextButton.addEventListener('click', nextQuestion);
  restartButton.addEventListener('click', startQuiz);
  categorySelector.addEventListener('change', startQuiz);
  window.onload = startQuiz;
  






