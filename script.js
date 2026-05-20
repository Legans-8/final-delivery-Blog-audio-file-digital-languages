
document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("myAudio");
    if (audio) {
        audio.volume = 0.3;
    }    
});

// Función para el reproductor de música
function toggleMusic() {
    var audio = document.getElementById("myAudio");
    var btn = document.getElementById("retro-play");
    
    if (audio.paused) {
        audio.play();
        btn.innerHTML = "[■]";
        btn.style.color = "var(--glitch-magenta)"; 
    } else {
        audio.pause();
        btn.innerHTML = "[►]"; 
        btn.style.color = "var(--text-color)"; 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const covers = document.querySelectorAll('.album-cover');
    const tooltip = document.getElementById('retro-tooltip');

    covers.forEach(cover => {
        cover.addEventListener('mouseenter', function(e) {
            this.style.filter = 'none'; 
            tooltip.style.display = 'block';
            tooltip.innerText = this.alt; 
        });

        cover.addEventListener('mousemove', function(e) {
            tooltip.style.left = (e.pageX + 15) + 'px';
            tooltip.style.top = (e.pageY + 15) + 'px';
        });

        cover.addEventListener('mouseleave', function(e) {
            this.style.filter = ''; 
            tooltip.style.display = 'none';
        });
    });
});

/*SNAKE.EXE (V1.0)*/

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("snakeGame");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    const scoreElement = document.getElementById("snakeScore");
    const startMsg = document.querySelector(".retro-start-msg");
    const box = 10; 
    let score = 0;
    let gameInterval;
    let isGameRunning = false;

    let snake = [];
    let food = {};
    let d = ""; // Dirección actual

    // Pantalla de espera inicial
    function initScreen() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#000000";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.fillText("INSERT COIN", canvas.width / 2, canvas.height / 2);
    }

    // Posicionamiento inicial del juego
    function resetGame() {
        snake = [];
        snake[0] = { x: 8 * box, y: 8 * box };
        score = 0;
        scoreElement.innerText = score;
        d = "";
        spawnFood();
    }

    // Generador aleatorio de "datos" (la comida)
    function spawnFood() {
        food = {
            x: Math.floor(Math.random() * 17) * box,
            y: Math.floor(Math.random() * 17) * box
        };
    }

    // Captura de teclado (Event Listener)
    document.addEventListener("keydown", direction);
    function direction(event) {
        let key = event.keyCode;
        
        // Evitar que la página haga scroll cuando usas las flechas o la barra espaciadora
        if([32, 37, 38, 39, 40].indexOf(key) > -1) {
            event.preventDefault();
        }

        // Iniciar juego con barra espaciadora
        if (key == 32 && !isGameRunning) {
            startGame();
            return;
        }

        // Lógica de movimiento (evita que la serpiente se de la vuelta sobre sí misma)
        if (key == 37 && d != "RIGHT") d = "LEFT";
        else if (key == 38 && d != "DOWN") d = "UP";
        else if (key == 39 && d != "LEFT") d = "RIGHT";
        else if (key == 40 && d != "UP") d = "DOWN";
    }

    // Detector de colisiones con su propio cuerpo
    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x == array[i].x && head.y == array[i].y) return true;
        }
        return false;
    }

    // El motor de renderizado principal (se ejecuta cada 100ms)
    function draw() {
        // Limpiar el fondo
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar la serpiente (Negro y Gris)
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = (i == 0) ? "#000000" : "#222222"; // Cabeza negra, cuerpo gris oscuro
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            
            // Borde blanco para diferenciar los segmentos
            ctx.strokeStyle = "#ffffff";
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        // Dibujar la comida (Fucsia neón de alto contraste)
        ctx.fillStyle = "#ff00ff"; 
        ctx.fillRect(food.x, food.y, box, box);

        // Posición actual de la cabeza
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // Calcular siguiente posición
        if (d == "LEFT") snakeX -= box;
        if (d == "UP") snakeY -= box;
        if (d == "RIGHT") snakeX += box;
        if (d == "DOWN") snakeY += box;

        // Si la serpiente come el punto fucsia
        if (snakeX == food.x && snakeY == food.y) {
            score += 10;
            scoreElement.innerText = score;
            spawnFood();
        } else {
            // Elimina la cola si no comió nada (movimiento)
            snake.pop(); 
        }

        let newHead = { x: snakeX, y: snakeY };

        // Lógica de GAME OVER (Si choca contra paredes o contra sí misma)
        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(gameInterval);
            isGameRunning = false;
            
            // UI de Game Over
            startMsg.style.display = "block";
            startMsg.innerText = "SISTEMA CAÍDO - ESPACIO PARA REBOOT";
            
            ctx.fillStyle = "rgba(0,0,0,0.85)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#00ffff"; // Cyan
            ctx.font = "bold 16px monospace";
            ctx.fillText("FATAL ERROR", canvas.width / 2, canvas.height / 2);
            return;
        }

        // Añadir la nueva cabeza al principio del array
        snake.unshift(newHead);
    }

    // Arranque del sistema
    function startGame() {
        isGameRunning = true;
        startMsg.style.display = "none";
        resetGame();
        if(gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(draw, 100); // 100ms = Velocidad retro desafiante
    }

    initScreen();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
    const shoutForm = document.getElementById("shoutForm");
    const shoutFeed = document.getElementById("shoutFeed");
    const shoutUser = document.getElementById("shoutUser");
    const shoutText = document.getElementById("shoutText");

    if (!shoutForm || !shoutFeed) return; // Aborta si no encuentra los elementos

    // Desplazar el scroll hacia abajo automáticamente al cargar
    shoutFeed.scrollTop = shoutFeed.scrollHeight;

    shoutForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Evita que la página se recargue

        // Extraer valores y limpiarlos un poco
        const user = shoutUser.value.trim() || "ANÓNIMO";
        const msg = shoutText.value.trim();

        if (msg === "") return; // No enviar mensajes vacíos

        // Obtener la hora local en formato [HH:MM]
        const now = new Date();
        const timeStr = "[" + 
                        now.getHours().toString().padStart(2, '0') + ":" + 
                        now.getMinutes().toString().padStart(2, '0') + 
                        "]";

        // Crear la estructura HTML del nuevo comentario
        const newShout = document.createElement("div");
        newShout.classList.add("shout");
        
        newShout.innerHTML = `
            <span class="shout-time">${timeStr}</span> 
            <b class="shout-name">${user}:</b> 
            <span class="shout-msg">${msg}</span>
        `;

        // Inyectar al final del contenedor
        shoutFeed.appendChild(newShout);

        // Hacer auto-scroll hacia el nuevo mensaje
        shoutFeed.scrollTop = shoutFeed.scrollHeight;

        // Limpiar la caja de texto (dejamos el nombre de usuario por conveniencia)
        shoutText.value = "";
        shoutText.focus();
    });
});
