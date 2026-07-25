// 1. Perguntas Didáticas de Português com Explicativo (Dica)
const questions = [
  {
    question: "Na palavra infeliz, o elemento in- é:",
    explanation: "💡 Lembre-se: O prefixo é a parte da palavra que vem antes do radical!",
    answers: [
      { text: "Sufixo", correct: false },
      { text: "Prefixo", correct: true },
      { text: "Radical", correct: false },
      { text: "Desinência", correct: false }
    ]
  },
  {
    question: "Na palavra floricultura, o elemento -icultura é:",
    explanation: "💡 Lembre-se: O sufixo é a parte da palavra que vem depois do radical!",
    answers: [
      { text: "Prefixo", correct: false },
      { text: "Radical", correct: false },
      { text: "Sufixo", correct: true },
      { text: "Desinência", correct: false }
    ]
  },
  {
    question: "Por quantos morfemas é formada a palavra GATO?",
    explanation: "💡 A palavra gato é formada por dois morfemas; gato = gat- + -o!",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false }
    ]
  },
  {
    question: "Qual das opções abaixo NÃO é um elemento mórfico?",
    explanation: "💡 Um fonema é a menor unidade sonora de uma língua e não é um elemento mórfico!",
    answers: [
      { text: "Desinência", correct: false },
      { text: "Vogal temática", correct: false },
      { text: "Radical", correct: false },
      { text: "Fonema", correct: true }
    ]
  },
  {
    question: "Qual das opções abaixo NÃO pertence à mesma família de palavras do radical “flor-”?",
    explanation: "💡 O radical da palavra floresta é florest-",
    answers: [
      { text: "Floresta", correct: true },
      { text: "Floral", correct: false },
      { text: "Floricultura", correct: false },
      { text: "Florista", correct: false }
    ]
  },
  {
    question: "Em partíssemos, a desinência -sse- indica:",
    explanation: "💡 Na palavra 'partíssemos', a desinência '-sse-' indica o modo e o tempo",
    answers: [
      { text: "Número e pessoa", correct: false },
      { text: "Modo e tempo", correct: true },
      { text: "Gênero e número", correct: false },
      { text: "Apenas número", correct: false }
    ]
  },
  {
    question: "Toda palavra possui obrigatoriamente prefixo e sufixo?",
    explanation: "💡 Não é necessário que toda palavra possua prefixo e sufixo.",
    isBoolean: true, // Define o layout de 2 quadrados lado a lado
    answers: [
      { text: "SIM", correct: false },
      { text: "NÃO", correct: true }
    ]
  },
  {
    question: "A análise correta da palavra 'deslealdade' é?",
    explanation: "💡 Na palavra 'deslealdade', o prefixo é 'des-', o radical é 'leal' e o sufixo é '-dade'.",
    answers: [
      { text: "Radical + desinência verbal", correct: false },
      { text: "Prefixo + radical + sufixo", correct: true },
      { text: "Apenas radical", correct: false },
      { text: "Prefixo + vogal temática + desinência", correct: false }
    ]
  },
  {
    question: "Em pedreiro, o elemento -eiro é?",
    explanation: "💡 Na palavra 'pedreiro', o elemento '-eiro' é um sufixo.",
    answers: [
      { text: "Prefixo", correct: false },
      { text: "Sufixo", correct: true },
      { text: "Desinência", correct: false },
      { text: "Vogal temática", correct: false }
    ]
  },
  {
    question: "Assinale a alternativa em que o elemento destacado é uma vogal temática",
    explanation: "💡 O 'a' em cantar é uma vogal temática",
    answers: [
      { text: "cant'a'r", correct: true },
      { text: "menin'a's", correct: false },
      { text: "feliz'mente'", correct: false },
      { text: "'in'feliz", correct: false }
    ]
  }
];

// 2. Elementos DOM
const welcomeBox = document.getElementById("welcome-box");
const startForm = document.getElementById("start-form");
const usernameInput = document.getElementById("username-input");

const quizBox = document.getElementById("quiz-box");
const displayUsername = document.getElementById("display-username");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackText = document.getElementById("feedback-text");
const progressBar = document.getElementById("progress-bar");
const nextButton = document.getElementById("next-btn");
const timerText = document.getElementById("timer-text");

const resultBox = document.getElementById("result-box");
const resultIcon = document.getElementById("result-icon");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

// Configuração do Timer
const TIME_LIMIT = 15; // Tempo em segundos para cada pergunta
let timeLeft = TIME_LIMIT;
let timerInterval = null;

// 3. Iniciar com o Nome do Aluno
startForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userName = usernameInput.value.trim();

  if (userName) {
    displayUsername.innerText = userName;
    welcomeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    startQuiz();
  }
});

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  
  // Atualiza barra de progresso
  const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  // Aplica classe de grade caso a pergunta seja do tipo Sim/Não
  if (currentQuestion.isBoolean) {
    optionsElement.classList.add("boolean-grid");
  } else {
    optionsElement.classList.remove("boolean-grid");
  }

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn-option");

    // Adiciona estilização específica para SIM e NÃO
    if (currentQuestion.isBoolean) {
      if (answer.text.toUpperCase().includes("SIM")) {
        button.classList.add("btn-yes");
      } else {
        button.classList.add("btn-no");
      }
    }

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    optionsElement.appendChild(button);
  });

  startTimer();
}

function resetState() {
  clearInterval(timerInterval);
  nextButton.classList.add("hide");
  feedbackText.classList.add("hide");
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

function startTimer() {
  timeLeft = TIME_LIMIT;
  timerText.innerText = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timeOut();
    }
  }, 1000);
}

function timeOut() {
  const currentQuestion = questions[currentQuestionIndex];
  
  // Revela explicação pedagógica indicando que o tempo acabou
  feedbackText.innerText = "⏰ Tempo esgotado! " + currentQuestion.explanation;
  feedbackText.classList.remove("hide");

  // Destaca a resposta correta e desabilita os botões
  Array.from(optionsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.classList.remove("hide");
}

function selectAnswer(e) {
  clearInterval(timerInterval); // Para o contador assim que responder
  
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const currentQuestion = questions[currentQuestionIndex];

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Revela explicação pedagógica
  feedbackText.innerText = currentQuestion.explanation;
  feedbackText.classList.remove("hide");

  // Destaca a certa e desabilita cliques
  Array.from(optionsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.classList.remove("hide");
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  clearInterval(timerInterval);
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");

  let percentage = (score / questions.length) * 100;

  if (percentage >= 80) {
    scoreElement.innerHTML = `Sensacional, <strong>${userName}</strong>!<br>Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas!<br>Você é um Mestre da Língua Portuguesa! 🎈`;
  } else if (percentage >= 50) {
    scoreElement.innerHTML = `Muito bem, <strong>${userName}</strong>!<br>Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br>Continue estudando para tirar nota 10! 📖`;
  } else if (percentage > 30) {
    scoreElement.innerHTML = `Estude mais, <strong>${userName}</strong>!<br>Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br>Continue estudando para tirar nota 10! 📖`;
  } else {
    scoreElement.innerHTML = `Bom intento, <strong>${userName}</strong>!<br>Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong>.<br>Que tal jogar de novo para praticar mais? 😉`;
  }
}

// 4. Listeners
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

restartButton.addEventListener("click", startQuiz);
