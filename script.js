// ==========================================
// 🔊 SISTEMA DE EFEITOS SONOROS (Web Audio API)
// ==========================================
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'tick') {
      // Som seco de relógio/metrónomo
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'correct') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(110, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'victory') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);

        noteOsc.type = 'triangle';
        noteOsc.frequency.setValueAtTime(freq, now + index * 0.12);
        noteGain.gain.setValueAtTime(0.15, now + index * 0.12);
        noteGain.gain.linearRampToValueAtTime(0.01, now + index * 0.12 + 0.25);

        noteOsc.start(now + index * 0.12);
        noteOsc.stop(now + index * 0.12 + 0.25);
      });
    }
  } catch (e) {
    console.log("Áudio não suportado ou bloqueado pelo navegador.");
  }
}

// ==========================================
// 📋 LISTA DE PERGUNTAS E MINIGAMES
// ==========================================
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
  
  // 🧩 MINIGAME 1: Puzzle (DESLEALDADE)
  {
    type: "puzzle",
    question: "Forme uma palavra com os morfemas a seguir:",
    explanation: "💡 Lembre-se: A estrutura correta é: Prefixo (DES-) + Radical (LEAL) + Sufixo (-DADE).",
    pieces: ["(-DADE)", "(DES-)", "(LEAL)"],
    correctOrder: ["(DES-)", "(LEAL)", "(-DADE)"]
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

  // 🔤 MINIGAME 2: Forca (RADICAL)
  {
    type: "hangman",
    question: "Adivinhe o elemento mórfico que contém o significado principal da palavra:",
    explanation: "💡 Lembre-se: O RADICAL é o elemento base que carrega o significado principal da palavra.",
    secretWord: "RADICAL",
    hint: "Dica: É a base essencial de toda palavra."
  },

  {
    question: "Por quantos morfemas é formada a palavra GATO?",
    explanation: "💡 A palavra gato é formada por dois morfemas: gat- + -o!",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "4", correct: false }
    ]
  },

  {
    question: "Desinência se junta __ de uma palavra para mostrar suas variações.",
    explanation: "💡 Lembre-se: IN- é um Prefixo e -MENTE é um Sufixo.",
    answers: [
      { text: "a) ao começo", correct: false },
      { text: "b) ao prefixo", correct: false },
      { text: "c) ao final", correct: true },
      { text: "d) ao meio", correct: false }
    ]
  },

  {
    question: "Qual das opções abaixo NÃO é um elemento mórfico?",
    explanation: "💡 Um fonema é a menor unidade sonora e não um elemento mórfico!",
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
    question: "Assinale a alternativa em que o elemento destacado é uma vogal temática",
    explanation: "💡 O 'a' em cantar é uma vogal temática",
    answers: [
      { text: "cant'a'r", correct: true },
      { text: "menin'a's", correct: false },
      { text: "feliz'mente'", correct: false },
      { text: "'in'feliz", correct: false }
    ]
  },

  {
    question: "Em partíssemos, a desinência -sse- indica:",
    explanation: "💡 Na palavra 'partíssemos', '-sse-' indica modo e tempo.",
    answers: [
      { text: "Número e pessoa", correct: false },
      { text: "Modo e tempo", correct: true },
      { text: "Gênero e número", correct: false },
      { text: "Apenas número", correct: false }
    ]
  },

  // 🃏 MINIGAME: Jogo da Memória
  {
    type: "memory",
    question: "Associe os termos abaixo:",
    explanation: "💡 O substantivo dá nome às coisas e Verbo indica ação.",
    cards: [
      { id: 1, text: "SUFIXO", matchId: 1 },
      { id: 2, text: "ÁVEL", matchId: 1 },
      { id: 3, text: "IN", matchId: 2 },
      { id: 4, text: "PREFIXO", matchId: 2 }
    ]
  },

  {
    question: "Toda palavra possui obrigatoriamente prefixo e sufixo?",
    explanation: "💡 Não é necessário que toda palavra possua prefixo e sufixo.",
    isBoolean: true,
    answers: [
      { text: "SIM", correct: false },
      { text: "NÃO", correct: true }
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
    type: "super-puzzle",
    question: "Forme uma palavra usando prefixo, radical, vogal temática e sufixo:",
    explanation: "💡 A palavra correta é: Prefixo (RE-) + Radical (ESTRUTURA) + Sufixo (-ÇÃ) + Desinência/Vogal (-O)!",
    morphemes: [
      { text: "ESTRUTURA", type: "radical" },
      { text: "-ÇÃ", type: "sufixo" },
      { text: "RE-", type: "prefixo" },
      { text: "-O", type: "desinencia" },
      { text: "DES-", type: "distrator" },
      { text: "-MENTE", type: "distrator" }
    ],
    correctOrder: ["RE-", "ESTRUTURA", "-ÇÃ", "-O"]
  }
];

// Elementos do DOM
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
const timerBox = document.getElementById("timer-box");

const resultBox = document.getElementById("result-box");
const resultIcon = document.getElementById("result-icon");
const resultTitle = document.getElementById("result-title");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

const correctCountEl = document.getElementById("correct-count");
const wrongCountEl = document.getElementById("wrong-count");
const percentageScoreEl = document.getElementById("percentage-score");

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

// Variáveis de controle dos minigames
let userPuzzleSelection = [];
let hangmanGuessedLetters = [];
let hangmanErrors = 0;
let memoryFlippedCards = [];
let memoryMatchedPairs = 0;
let superPuzzleSelected = [];

const TIME_LIMIT = 15;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

startForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userName = usernameInput.value.trim();

  if (userName) {
    playSound('click');
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
  
  const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;

  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  if (currentQuestion.type === "puzzle") {
    renderPuzzleQuestion(currentQuestion);
  } else if (currentQuestion.type === "hangman") {
    renderHangmanQuestion(currentQuestion);
  } else if (currentQuestion.type === "memory") {
    renderMemoryQuestion(currentQuestion);
  } else if (currentQuestion.type === "super-puzzle") {
    renderSuperPuzzleQuestion(currentQuestion);
  } else {
    renderStandardQuestion(currentQuestion);
  }

  startTimer();
}

// 1. Pergunta Tradicional
function renderStandardQuestion(currentQuestion) {
  if (currentQuestion.isBoolean) {
    optionsElement.classList.add("boolean-grid");
  } else {
    optionsElement.classList.remove("boolean-grid");
  }

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn-option");

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
}

// 2. Minigame: Quebra-cabeça (Puzzle)
function renderPuzzleQuestion(currentQuestion) {
  optionsElement.classList.remove("boolean-grid");
  userPuzzleSelection = [];

  const wrapper = document.createElement("div");
  wrapper.classList.add("minigame-wrapper");

  const dropZone = document.createElement("div");
  dropZone.classList.add("puzzle-dropzone");
  dropZone.innerText = "Clique nas peças na ordem correta...";

  const piecesContainer = document.createElement("div");
  piecesContainer.classList.add("puzzle-pieces-container");

  currentQuestion.pieces.forEach(pieceText => {
    const piece = document.createElement("button");
    piece.classList.add("btn-puzzle-piece");
    piece.innerText = pieceText;

    piece.addEventListener("click", () => {
      if (piece.classList.contains("selected")) return;

      playSound('click');
      piece.classList.add("selected");
      userPuzzleSelection.push(pieceText);

      if (userPuzzleSelection.length === 1) dropZone.innerText = "";

      const tag = document.createElement("span");
      tag.classList.add("puzzle-tag");
      tag.innerText = `${userPuzzleSelection.length}. ${pieceText}`;
      dropZone.appendChild(tag);

      if (userPuzzleSelection.length === currentQuestion.pieces.length) {
        clearInterval(timerInterval);
        if (timerBox) timerBox.classList.remove("warning");
        const isCorrect = userPuzzleSelection.every((val, i) => val === currentQuestion.correctOrder[i]);
        if (isCorrect) {
          dropZone.classList.add("puzzle-correct");
          score++;
          playSound('correct');
        } else {
          dropZone.classList.add("puzzle-wrong");
          playSound('wrong');
        }
        feedbackText.innerText = currentQuestion.explanation;
        feedbackText.classList.remove("hide");
        nextButton.classList.remove("hide");
      }
    });

    piecesContainer.appendChild(piece);
  });

  wrapper.appendChild(dropZone);
  wrapper.appendChild(piecesContainer);
  optionsElement.appendChild(wrapper);
}

// 3. Minigame: Jogo da Forca (Hangman)
function renderHangmanQuestion(currentQuestion) {
  optionsElement.classList.remove("boolean-grid");
  hangmanGuessedLetters = [];
  hangmanErrors = 0;

  const wrapper = document.createElement("div");
  wrapper.classList.add("minigame-wrapper");

  const wordDisplay = document.createElement("div");
  wordDisplay.classList.add("hangman-word");

  const keyboard = document.createElement("div");
  keyboard.classList.add("hangman-keyboard");

  function updateWordDisplay() {
    wordDisplay.innerHTML = "";
    let isComplete = true;
    for (let char of currentQuestion.secretWord) {
      const letterSpan = document.createElement("span");
      letterSpan.classList.add("hangman-letter");
      if (hangmanGuessedLetters.includes(char)) {
        letterSpan.innerText = char;
      } else {
        letterSpan.innerText = "_";
        isComplete = false;
      }
      wordDisplay.appendChild(letterSpan);
    }

    if (isComplete) {
      clearInterval(timerInterval);
      if (timerBox) timerBox.classList.remove("warning");
      score++;
      playSound('correct');
      disableKeyboard();
      feedbackText.innerText = "🎉 Adivinhou! " + currentQuestion.explanation;
      feedbackText.classList.remove("hide");
      nextButton.classList.remove("hide");
    }
  }

  function disableKeyboard() {
    Array.from(keyboard.children).forEach(btn => btn.disabled = true);
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  alphabet.forEach(letter => {
    const btn = document.createElement("button");
    btn.classList.add("btn-hangman-key");
    btn.innerText = letter;

    btn.addEventListener("click", () => {
      btn.disabled = true;
      hangmanGuessedLetters.push(letter);

      if (currentQuestion.secretWord.includes(letter)) {
        btn.classList.add("key-correct");
        playSound('click');
      } else {
        btn.classList.add("key-wrong");
        playSound('wrong');
        hangmanErrors++;
      }

      updateWordDisplay();

      if (hangmanErrors >= 5) {
        clearInterval(timerInterval);
        if (timerBox) timerBox.classList.remove("warning");
        disableKeyboard();
        feedbackText.innerText = `❌ Forca! A palavra era ${currentQuestion.secretWord}. ` + currentQuestion.explanation;
        feedbackText.classList.remove("hide");
        nextButton.classList.remove("hide");
      }
    });

    keyboard.appendChild(btn);
  });

  updateWordDisplay();
  wrapper.appendChild(wordDisplay);
  wrapper.appendChild(keyboard);
  optionsElement.appendChild(wrapper);
}

// 4. Minigame: Jogo da Memória
function renderMemoryQuestion(currentQuestion) {
  optionsElement.classList.remove("boolean-grid");
  memoryFlippedCards = [];
  memoryMatchedPairs = 0;

  const grid = document.createElement("div");
  grid.classList.add("memory-grid");

  const shuffledCards = [...currentQuestion.cards].sort(() => Math.random() - 0.5);

  shuffledCards.forEach(cardData => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.matchId = cardData.matchId;

    const front = document.createElement("div");
    front.classList.add("memory-card-front");
    front.innerText = "❓";

    const back = document.createElement("div");
    back.classList.add("memory-card-back");
    back.innerText = cardData.text;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => {
      if (card.classList.contains("flipped") || card.classList.contains("matched") || memoryFlippedCards.length >= 2) {
        return;
      }

      playSound('click');
      card.classList.add("flipped");
      memoryFlippedCards.push(card);

      if (memoryFlippedCards.length === 2) {
        const [card1, card2] = memoryFlippedCards;
        if (card1.dataset.matchId === card2.dataset.matchId) {
          card1.classList.add("matched");
          card2.classList.add("matched");
          memoryFlippedCards = [];
          memoryMatchedPairs++;
          playSound('correct');

          if (memoryMatchedPairs === currentQuestion.cards.length / 2) {
            clearInterval(timerInterval);
            if (timerBox) timerBox.classList.remove("warning");
            score++;
            feedbackText.innerText = "🧠 Excelente memória! " + currentQuestion.explanation;
            feedbackText.classList.remove("hide");
            nextButton.classList.remove("hide");
          }
        } else {
          playSound('wrong');
          setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            memoryFlippedCards = [];
          }, 900);
        }
      }
    });

    grid.appendChild(card);
  });

  optionsElement.appendChild(grid);
}

// 5. Minigame: Super Alquimia Morfológica
function renderSuperPuzzleQuestion(currentQuestion) {
  optionsElement.classList.remove("boolean-grid");
  superPuzzleSelected = [];

  const container = document.createElement("div");
  container.classList.add("super-puzzle-container");

  const flask = document.createElement("div");
  flask.classList.add("alchemy-flask");
  
  const flaskLabel = document.createElement("div");
  flaskLabel.classList.add("flask-label");

  const wordDisplay = document.createElement("div");
  wordDisplay.classList.add("synthesized-word");
  wordDisplay.innerText = "Clique nas peças para combinar...";

  flask.appendChild(flaskLabel);
  flask.appendChild(wordDisplay);

  const resetBtn = document.createElement("button");
  resetBtn.classList.add("btn-reset-flask");
  resetBtn.innerText = "🧹 Voltar";
  resetBtn.addEventListener("click", () => {
    playSound('click');
    superPuzzleSelected = [];
    wordDisplay.innerText = "Clique nas peças para combinar...";
    wordDisplay.classList.remove("glow");
    Array.from(grid.children).forEach(btn => btn.classList.remove("used"));
  });

  const grid = document.createElement("div");
  grid.classList.add("alchemy-grid");

  const shuffledMorphemes = [...currentQuestion.morphemes].sort(() => Math.random() - 0.5);

  shuffledMorphemes.forEach(item => {
    const chip = document.createElement("button");
    chip.classList.add("morpheme-chip", item.type);
    chip.innerText = item.text;

    chip.addEventListener("click", () => {
      if (chip.classList.contains("used") || superPuzzleSelected.length >= currentQuestion.correctOrder.length) return;

      playSound('click');
      chip.classList.add("used");
      superPuzzleSelected.push(item.text);

      wordDisplay.innerText = superPuzzleSelected.join("");
      wordDisplay.classList.add("glow");

      if (superPuzzleSelected.length === currentQuestion.correctOrder.length) {
        clearInterval(timerInterval);
        if (timerBox) timerBox.classList.remove("warning");

        const isCorrect = superPuzzleSelected.every((val, idx) => val === currentQuestion.correctOrder[idx]);

        if (isCorrect) {
          flask.classList.add("alchemy-success");
          score++;
          playSound('correct');
          feedbackText.innerText = "✨ REAÇÃO PERFEITA! " + currentQuestion.explanation;
        } else {
          flask.classList.add("alchemy-error");
          playSound('wrong');
          feedbackText.innerText = "💥 FALHA NA SÍNTESE! A combinação correta era: " + currentQuestion.correctOrder.join("") + ". " + currentQuestion.explanation;
        }

        Array.from(grid.children).forEach(btn => btn.classList.add("used"));
        resetBtn.disabled = true;

        feedbackText.classList.remove("hide");
        nextButton.classList.remove("hide");
      }
    });

    grid.appendChild(chip);
  });

  container.appendChild(flask);
  container.appendChild(resetBtn);
  container.appendChild(grid);
  optionsElement.appendChild(container);
}

function resetState() {
  clearInterval(timerInterval);
  if (timerBox) timerBox.classList.remove("warning");
  nextButton.classList.add("hide");
  feedbackText.classList.add("hide");
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

function startTimer() {
  timeLeft = TIME_LIMIT;
  timerText.innerText = timeLeft;
  if (timerBox) timerBox.classList.remove("warning");

  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.innerText = timeLeft;

    // Quando faltarem 5 segundos ou menos: ativa o som de 'tick' e o efeito visual de alarme
    if (timeLeft <= 5 && timeLeft > 0) {
      playSound('tick');
      if (timerBox) timerBox.classList.add("warning");
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (timerBox) timerBox.classList.remove("warning");
      timeOut();
    }
  }, 1000);
}

function timeOut() {
  playSound('wrong');
  if (timerBox) timerBox.classList.remove("warning");
  const currentQuestion = questions[currentQuestionIndex];
  feedbackText.innerText = "⏰ Tempo esgotado! " + currentQuestion.explanation;
  feedbackText.classList.remove("hide");

  if (!currentQuestion.type) {
    Array.from(optionsElement.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
  }

  nextButton.classList.remove("hide");
}

function selectAnswer(e) {
  clearInterval(timerInterval);
  if (timerBox) timerBox.classList.remove("warning");
  
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  const currentQuestion = questions[currentQuestionIndex];

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    playSound('correct');
  } else {
    selectedBtn.classList.add("wrong");
    playSound('wrong');
  }

  feedbackText.innerText = currentQuestion.explanation;
  feedbackText.classList.remove("hide");

  Array.from(optionsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.classList.remove("hide");
}

function handleNextButton() {
  playSound('click');
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  clearInterval(timerInterval);
  if (timerBox) timerBox.classList.remove("warning");
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");

  const total = questions.length;
  const wrong = total - score;
  const percentage = Math.round((score / total) * 100);

  correctCountEl.innerText = score;
  wrongCountEl.innerText = wrong;
  percentageScoreEl.innerText = `${percentage}%`;

  if (percentage >= 80) {
    resultIcon.innerText = "🏆";
    resultTitle.innerText = "Sensacional!";
    scoreElement.innerHTML = `Parabéns, <strong>${userName}</strong>!<br>Você dominou os conceitos da Morfologia! 🎈`;
    playSound('victory');
    triggerConfetti();
  } else if (percentage >= 50) {
    resultIcon.innerText = "📖";
    resultTitle.innerText = "Muito Bem!";
    scoreElement.innerHTML = `Bom trabalho, <strong>${userName}</strong>!<br>Continue praticando para alcançar os 100%! ⭐`;
    playSound('correct');
  } else {
    resultIcon.innerText = "💡";
    resultTitle.innerText = "Boa Tentativa!";
    scoreElement.innerHTML = `Não desista, <strong>${userName}</strong>!<br>Que tal dar uma revisada no assunto e tentar novamente? 😉`;
    playSound('wrong');
  }
}

function triggerConfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

restartButton.addEventListener("click", () => {
  playSound('click');
  startQuiz();
});
