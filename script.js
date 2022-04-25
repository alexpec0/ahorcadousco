/* se obtienen del html estos 3 elementos y se gusrdan en las variables con el mismo nombre */
const wordContainer = document.getElementById('wordContainer'); /* el contenedor de la palabra */
const startButton = document.getElementById('startButton'); /* el boton para empezar */
const usedLettersElement = document.getElementById('usedLetters'); /* el lugar conde se van a ir almacenando las letras usadas */



let canvas = document.getElementById('canvas'); /* se iniciliza un canvas se usa el canvas del html  */
let ctx = canvas.getContext('2d'); /*para inicializar el canvas se debe llamar al canvas y utilizar el metodo getcontext con 2 
                                    dimensiones */
ctx.canvas.width  = 0; /* se setea el ancho del cqnvas en cero  */
ctx.canvas.height = 0; /* se setea el alto de canvas en cero */

/* valores que se van a utilizar para ir dibujando las partes del muñeco ahorcado a medida que se cometen errores */

const bodyParts = [
    [4,2,1,1], /* cabeza */
    [4,3,1,2], /* torso  */
    [3,5,1,1], /* pierna izquierda */
    [5,5,1,1], /* pierna derecha */
    [3,3,1,1], /* brazo izquierdo */
    [5,3,1,1] /* brazo derecho  */
];

/* variables de juego  */

let selectedWord; /* palabra a adivinar */
let usedLetters; /* letras utilizadas */
let mistakes; /* ver errores */
let hits; /* aciertos */

const addLetter = letter => { /* función que agrega la letra ya utilizada */
    const letterElement = document.createElement('span'); /* se crea un elemento span y este elemento */
    letterElement.innerHTML = letter.toUpperCase(); /* pone la letra en mayúscula  */
    usedLettersElement.appendChild(letterElement); /* a used letter elemnt se le agrega este nuevo elemento que es la
                                                    letra ya utilizada */ 
}

const addBodyPart = bodyPart => { /* función que pinta el ahorcado */
    ctx.fillStyle = '#fff'; /* se llena de color blanco para que el muñeco se dibuje de color blanco */
    ctx.fillRect(...bodyPart); /* se le pasa el array de la parte del cuerpo en ese momento para que se dibuje la parte
                                del cuerpo del ahorcado */
};

const wrongLetter = () => { /* función wrongletter */
    addBodyPart(bodyParts[mistakes]); /* se llama la función addbodypart, se agrega una parte del cuerpo, pasandole un array
     del array de bodyparts segun en el momento en el que esté comparado con el número de errores */
    mistakes++; // se suma un error
    if(mistakes === bodyParts.length) endGame(); /* si los errores son iguales a la cantidad de partes del cuerpo se llama a la función
                                endfame y se reinicia el juego */
}

const endGame = () => { /* función end game */
    document.removeEventListener('keydown', letterEvent); /*se elimina el event listener para que el usuario no siga
            agregando más letras */
    startButton.style.display = 'block'; /* y se vuelve a ostrar el start button para que el usuario pueda volver a iniciar el juego */
}

const correctLetter = letter => { /* función si adivina una letra */
    const { children } =  wordContainer; /* se va al contenedor de la palabra y se optienen todos los span */
    for(let i = 0; i < children.length; i++) { /* se itera sobre esos children usando un for loop hasta que se agoten todos
                los children es decir hasta que i sea menor que el largo del array */
        if(children[i].innerHTML === letter) { /* ahora si, el span que se ve en ese momento es igual a la letra ingresada*/
            children[i].classList.toggle('hidden');/* entonces solo en ese caso esa letra se saca de la clase hiden para que el
                usuario vea la letra*/
            hits++; // se suma unn acierto
        }
    }
    if(hits === selectedWord.length) endGame(); /* se llama a la función endgame. Se pregunta si la partida ya terminó, la partida termina cuando la 
            la cantidad dee aciertos sea igual a la longitud de la palabra es decir al número de letras que tenga
            la palabra  */
}

const letterInput = letter => { /* cuando el usuario ingresa una letra se hacen 2 preguntas*/
    if(selectedWord.includes(letter)) { /* si la palabra que se está adivinando tiene esa letra */
        correctLetter(letter); /* si sí la tiene se llama la función correctletter */
    } else {
        wrongLetter(); /* ahora si el usuario elige una letra incorrecta se llama a la función wrongletter */
    }
    addLetter(letter); // se llama la función que agrega la letra utilizada
    usedLetters.push(letter); /* a letras usadas se le agrega la letra que se acaba de pulsar, esté bien o esté mal */
};

const letterEvent = event => { //recibe el evento que se ejecutó
    let newLetter = event.key.toUpperCase(); /*se guarda en la variable new letter lo que hay dentro de event key que es la 
                                             letra que se tocó y se pone en mayúscula para luego conpararlo con la letra
                                             que estaba guardada en mayúsculal también*/
    if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) { /* se pregunta, si la tecla que tocó el usuario es una
    tecla de letra es decir estpa entre la A y la Z , por medio de una expresión regular,si concuerda con la expresion regular
    nos da verdadero, luego se pregunta si ya se usó esa letra por medio de used letters y si si se usó ya entonces noo se cuenta */
        letterInput(newLetter); /* si no se ha usado la letra entonces se pone la nueva letra que acaba de ingresar el usuario por
        medio de la función letterinput */
    };
};

const drawWord = () => { //no toma ningún argumento. pinta la palabra 
    selectedWord.forEach(letter => { /* se toma la palabra seleccionada que es un array de caracteres y se itera cada una
                                        de las letras */
        const letterElement = document.createElement('span'); /* crea un elemento de tipo span y se guarda en letterelement */
        letterElement.innerHTML = letter.toUpperCase(); /* se hace que el contenido sea la letra una por una todas en mayúscula */
        letterElement.classList.add('letter'); /* se le agrega la clase letter */
        letterElement.classList.add('hidden'); /* se le garega la clase hidden para que no se vean las letras */
        wordContainer.appendChild(letterElement); /* se toma el contenedor de la letra y se le agrega la letra */
    });
};

const selectRandomWord = () => { /* se usa una palabra aleatoria */
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase(); /* se selecciona una palabra de nuestro array de 
    palabras , en lla variable word se guarda words y se selecicona al azar un valor entre 0 y 1 aleatorio y se multiplica
    por el largo del array y se saca a upercase para que la palabra quede escrita toda en mayuscula  */
    selectedWord = word.split(''); /* se hace un split para que la palabra quede separada en distintos caracteres */
};
/* se declara la función para dinujar al ahorcado */
const drawHangMan = () => { /*no toma ningún argumento  */
    ctx.canvas.width  = 120; /* ancho */
    ctx.canvas.height = 160; /* alto */
    ctx.scale(20, 20); /* se usa para que los pixeles se vean más grandes */
    ctx.clearRect(0, 0, canvas.width, canvas.height); /* se borra todo lo que haya */
    ctx.fillStyle = '#c59e24'; /* se pinta la parte donde va colgado el ahorcado */
    ctx.fillRect(0, 7, 4, 1); /* se selecciona el canvas y se llama al metodo fillrect que va a utilizar ese color de arriba
                                para colorear los pixeles y se le dice que en la posición cero de x y en la posición
                                7 de Y y luego se dibujan 4 pixeles en X y 1 en Y */
    ctx.fillRect(1, 0, 1, 8); /* en la posicion 1 de X y en la 0 de Y se pinta 1 pixel de X y 8 de Y */
    ctx.fillRect(2, 0, 3, 1); /* en la pisicion 2 de x y 0 de Y se pintan 3 pixel de X y 1 pixel de Y */
    ctx.fillRect(4, 1, 1, 1); /* en a posicion 4 de     x    y 1 de Y  se pinta 1 pixel de X y 1 pixel de Y */
};
/* se declara la función startgame para iniciar el juego */
const startGame = () => { /* no toma ningún argumento */
    /* lo que se hace es limpiar todas las variables del juego, como hacer un reinicio */
    usedLetters = []; /* las letras usadas se reinician */
    mistakes = 0; /* lo errores se reinician */
    hits = 0; /* los aciertos se reinician */
    wordContainer.innerHTML = ''; /* el contenedor de la palabra se deja vacío  */
    usedLettersElement.innerHTML = ''; /* las letras usadas tambien vacias */
    startButton.style.display = 'none'; /* se esconde el boton start para que no se vuelva a dar clic */
    drawHangMan(); /* función para dibujar el ahorcado */
    selectRandomWord(); /* función que elige una palabra aleatoria  */
    drawWord(); /* función que pinta la palabra */
    document.addEventListener('keydown', letterEvent); /* se agrega un eventlistener al documento que indica que cuando
                se apriete una tecla se llama a la función letterevent  */
};

startButton.addEventListener('click', startGame); /* para empezar el juego al startbutton se le agrega un eventlistener que es al dar 
                                                     clic se le pasa la función start game  */