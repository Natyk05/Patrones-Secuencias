let currentSequence = [];
let correctAnswer;
let lives = 3;
let score = 0;
let difficulty = "normal";

function updateLives() {
    let livesContainer = document.getElementById("lives");
    livesContainer.innerHTML = "";
    for (let i = 0; i < lives; i++) {
        let heart = document.createElement("img");
        heart.src = "heart.png"; // Asegúrate de tener una imagen de corazón
        heart.style.height = "70px";
        heart.style.width = "70px";
        
        heart.classList.add("heart");
        livesContainer.appendChild(heart);
    }
}

function generateSequence() {
    let start = Math.floor(Math.random() * 50) + 10;
    let currentSequence = [];
    
    if (difficulty === "normal") {
        let step = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < 4; i++) {
            currentSequence.push(start + i * step);
        }
        correctAnswer = start + 4 * step;
    } else if (difficulty === "dificil") {
        let step = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < 3; i++) {
            currentSequence.push(start * Math.pow(step, i));
        }
        correctAnswer = start * Math.pow(step, 3);
    } else if (difficulty === "experto") {
        let sequenceType = Math.floor(Math.random() * 2);
        if (sequenceType === 0) {
            console.log("Cuadratica")
            // Secuencia cuadrática
            for (let i = 0; i < 4; i++) {
                currentSequence.push(start + i * i);
            }
            correctAnswer = start + 4 * 4;
        } else if (sequenceType === 1) {
            console.log("Fibonacci")
            // Sucesión de Fibonacci
            currentSequence = [start, start];
            for (let i = 2; i < 4; i++) {
                currentSequence.push(currentSequence[i - 1] + currentSequence[i - 2]);
            }
            correctAnswer = currentSequence[3] + currentSequence[2];
        }
    }
    
    document.getElementById("sequence").innerText = currentSequence.join(", ") + ", ?";
    generateOptions(correctAnswer);
}

/**
 * Genera opciones de respuesta para la secuencia numérica.
 * @param {number} correct - La respuesta correcta que debe incluirse entre las opciones.
 */
function generateOptions(correct) {
    // Crear un conjunto para almacenar las opciones, iniciando con la respuesta correcta.
    let options = new Set([correct]);
    console.log(correct)

    // Generar opciones adicionales hasta tener un total de 4.
    while (options.size < 4) {
        // Generar un número aleatorio entre -5 y 4 y sumarlo a la respuesta correcta.
        options.add(correct + (Math.floor(Math.random() * 10) - 5));
    }

    // Convertir el conjunto en un array y mezclar aleatoriamente las opciones.
    let optionsArray = Array.from(options).sort(() => Math.random() - 0.5);

    // Obtener el contenedor de opciones en el DOM.
    let optionsContainer = document.getElementById("options");
    // Limpiar cualquier contenido previo.
    optionsContainer.innerHTML = "";

    // Crear un botón para cada opción y agregarlo al contenedor.
    optionsArray.forEach(num => {
        let button = document.createElement("button");
        button.innerText = num;
        button.onclick = () => checkAnswer(num, button);
        optionsContainer.appendChild(button);
    });
}

/**
 * Verifica si la opción seleccionada es correcta y actualiza el estado del juego.
 * @param {number} selected - La opción seleccionada por el usuario.
 * @param {HTMLElement} button - El botón que el usuario ha clicado.
 */
function checkAnswer(selected, button) {
    console.log(selected)
    console.log(correctAnswer)
    
    if (selected === correctAnswer) {
        // Incrementar la puntuación.
        score += 10;
        // Añadir la clase 'correct' para indicar una respuesta correcta.
        button.classList.add("correct");
        // Después de un breve retraso, eliminar la clase y generar una nueva secuencia.
        setTimeout(() => {
            button.classList.remove("correct");
            generateSequence();
        }, 500);
    } else {
        // Decrementar las vidas.
        // lives--;
        // Añadir la clase 'wrong' para indicar una respuesta incorrecta.
        button.classList.add("wrong");
        // Después de un breve retraso, eliminar la clase 'wrong'.
        setTimeout(() => button.classList.remove("wrong"), 500);
        // Actualizar la visualización de las vidas.
        updateLives();
        // Si no quedan vidas, finalizar el juego.
        if (lives === 0) {
            setTimeout(() => {
                alert("Juego terminado. Puntaje final: " + score);
                location.reload();
            }, 500);
        }
    }
}


document.getElementById("difficulty-selector").addEventListener("change", (event) => {
    difficulty = event.target.value;
    score = 0;
    lives = 3;
    updateLives();
    generateSequence();
});

document.addEventListener("DOMContentLoaded", () => {
    updateLives();
    generateSequence();
});
