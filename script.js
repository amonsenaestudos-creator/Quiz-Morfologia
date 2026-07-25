// 1. Perguntas Didáticas de Português com Explicativo (Dica)
const questions = [
  {
    question: "Qual das palavras abaixo é um SUBSTANTIVO (nome de um objeto)?",
    explanation: "💡 Lembre-se: Substantivo é tudo aquilo que dá nome às coisas, lugares ou objetos!",
    answers: [
      { text: "Correr", correct: false },
      { text: "Bonito", correct: false },
      { text: "Mochila", correct: true },
      { text: "Rápido", correct: false }
    ]
  },
  {
    question: "Qual frase está usando a pontuação correta para uma PERGUNTA?",
    explanation: "💡 Usamos o ponto de interrogação (?) sempre que fazemos uma pergunta!",
    answers: [
      { text: "Você quer brincar comigo.", correct: false },
      { text: "Você quer brincar comigo!", correct: false },
      { text: "Você quer brincar comigo?", correct: true },
      { text: "Você quer brincar comigo,", correct: false }
    ]
  },
  {
    question: "Qual é o PLURAL correto da palavra 'Cão'?",
    explanation: "💡 Palavras terminadas em 'ão' costumam fazer plural em 'ões' ou 'ães'!",
    answers: [
      { text: "Cãos", correct: false },
      { text: "Cães", correct: true },
      { text: "Cões", correct: false },
      { text: "Cãoses", correct: false }
    ]
  },
  {
    question: "O que é um ADJETIVO?",
    explanation: "💡 Adjetivo é a palavra que dá uma qualidade ou característica a algo!",
    answers: [
      { text: "Uma palavra que indica ação", correct: false },
      { text: "Uma qualidade, como 'Alegre' ou 'Grande'", correct: true },
      { text: "Um número de coisas", correct: false },
      { text: "O nome de uma cidade", correct: false }
    ]
  },
  {
    question: "Qual palavra está escrita de forma CORRETA?",
    explanation: "💡 Usamos 'M' antes de 'P' e 'B'!",
    answers: [
      { text: "Conpacto", correct: false },
      { text: "Tambor", correct: true },
      { text: "Tanbor", correct: false },
      { text: "Lamparina... ops, Lanparina", correct: false }
    ]
  },
  {
    question: "Qual destas palavras é um VERBO (indica uma ação)?",
    explanation: "💡 Verbo é tudo o que a gente pode fazer, praticar ou agir!",
    answers: [
      { text: "Pular", correct: true },
      { text: "Sapato", correct: false },
      { text: "Amarelo", correct: false },
      { text: "Escola", correct: false }
    ]
  },
  {
    question: "Qual é o SINÔNIMO (palavra com significado parecido) de 'Feliz'?",
    explanation: "💡 Sinônimos são palavras diferentes que querem dizer quase a mesma coisa!",
    answers: [
      { text: "Triste", correct: false },
      { text: "Alegre", correct: true },
      { text: "Bravo", correct: false },
      { text: "Cansado", correct: false }
    ]
  },
  {
    question: "Qual é o ANTÔNIMO (significado oposto) de 'Quente'?",
    explanation: "💡 Antônimo é o contrário de uma palavra!",
    answers: [
      { text: "Frio", correct: true },
      { text: "Morno", correct: false },
      { text: "Fogo", correct: false },
      { text: "Sol", correct: false }
    ]
  },
  {
    question: "Quantas SÍLABAS tem a palavra 'BO-NE-CA'?",
    explanation: "💡 Conte quantas vezes você abre a boca para falar a palavra!",
    answers: [
      { text: "2 sílabas", correct: false },
      { text: "3 sílabas", correct: true },
      { text: "4 sílabas", correct: false },
      { text: "1 sílaba", correct: false }
    ]
  },
  {
    question: "Em qual palavra usamos o 'Ç' (Cê-cedilha)?",
    explanation: "💡 Nunca usamos Ç no começo de palavras ou antes de 'E' e 'I'!",
    answers: [
      { text: "Coraçao", correct: false },
      { text: "Coração", correct: true },
      { text: "Çapatos", correct: false },
      { text: "Çirco", correct: false }
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

const resultBox = document.getElementById("result-box");
const resultIcon = document.getElementById("result-icon");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

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

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn-option");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    optionsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  feedbackText.classList.add("hide");
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

function selectAnswer(e) {
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