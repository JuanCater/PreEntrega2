// JavaScript para el juego del ahorcado
// Define tus variables y funciones aquí

// Palabra a adivinar
var word = "javascript";

// Arreglo de letras adivinadas
var guessedLetters = [];

// Número máximo de intentos
var maxAttempts = 6;

// Intentos restantes
var attempts = maxAttempts;

// Obtener elementos del DOM
var wordContainer = document.getElementById("word-container");
var guessesContainer = document.getElementById("guesses");
var attemptsContainer = document.getElementById("attempts");
var letterInput = document.getElementById("letter-input");
var guessButton = document.getElementById("guess-button");

// Inicializar el juego
function initializeGame() {
  // Reiniciar variables
  guessedLetters = [];
  attempts = maxAttempts;

  // Limpiar elementos del DOM
  wordContainer.innerHTML = "";
  guessesContainer.innerHTML = "";
  attemptsContainer.textContent = attempts;

  // Mostrar guiones para cada letra de la palabra
  for (var i = 0; i < word.length; i++) {
    var dash = document.createElement("span");
    dash.textContent = "_ ";
    wordContainer.appendChild(dash);
  }

  // Limpiar campo de entrada de letra
  letterInput.value = "";
  letterInput.disabled = false;
  guessButton.disabled = false;

  // Enfocar campo de entrada de letra
  letterInput.focus();
}

// Verificar si la letra ingresada es válida y realizar adivinanza
function guessLetter() {
  var letter = letterInput.value.toLowerCase();

  // Verificar si la letra ya fue adivinada
  if (guessedLetters.includes(letter)) {
    alert("¡Ya has adivinado esa letra!");
    return;
  }

  // Agregar letra adivinada al arreglo
  guessedLetters.push(letter);

  // Actualizar lista de letras adivinadas
  guessesContainer.textContent = guessedLetters.join(" ");

  // Verificar si la letra adivinada está en la palabra
  var wordLetters = word.split("");
  var correctGuess = false;
  for (var i = 0; i < wordLetters.length; i++) {
    if (wordLetters[i] === letter) {
      correctGuess = true;
      // Reemplazar guión por la letra adivinada
      wordContainer.children[i].textContent = letter;
    }
  }

  // Verificar si se adivinó la palabra completa
  var guessedWord = Array.from(wordContainer.children)
    .map(function (element) {
      return element.textContent;
    })
    .join("");
  if (guessedWord === word) {
    alert("¡Felicidades, has adivinado la palabra!");
    letterInput.disabled = true;
    guessButton.disabled = true;
  }

  // Verificar si la letra adivinada es incorrecta
  if (!correctGuess) {
    attempts--;
    attemptsContainer.textContent = attempts;

    // Verificar si se alcanzó el número máximo de intentos
    if (attempts === 0) {
      alert("¡Has perdido! La palabra era: " + word);
      letterInput.disabled = true;
      guessButton.disabled = true;
    }
  }

  // Limpiar campo de entrada de letra
  letterInput.value = "";

  // Enfocar campo de entrada de letra
  letterInput.focus();
}

// Event listeners
guessButton.addEventListener("click", guessLetter);

// Inicializar el juego al cargar la página
initializeGame();
