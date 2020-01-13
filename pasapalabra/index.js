let items = document.querySelectorAll('div[class^="item"]:not(.item-container)');
let startBtn = document.querySelector('.welcome #start');
let enterBtn = document.querySelector('.question #enter');
let currentQuestion = 0;
const NO_ANSWER = "NO ANSWER";
const CORRECT = "CORRECT";
const ERROR = "ERROR";
const PASAPALABRA = "pasapalabra"
let playerName = "";
let shiftCounter = 0;

let answers = [
    { letter: "a", result: NO_ANSWER},
    { letter: "b", result: NO_ANSWER},
    { letter: "c", result: NO_ANSWER},
    { letter: "d", result: NO_ANSWER},
    { letter: "e", result: NO_ANSWER},
    { letter: "f", result: NO_ANSWER},
    { letter: "g", result: NO_ANSWER},
    { letter: "h", result: NO_ANSWER},
    { letter: "i", result: NO_ANSWER},
    { letter: "j", result: NO_ANSWER},
    { letter: "k", result: NO_ANSWER},
    { letter: "l", result: NO_ANSWER},
    { letter: "m", result: NO_ANSWER},
    { letter: "n", result: NO_ANSWER},
    { letter: "ñ", result: NO_ANSWER},
    { letter: "o", result: NO_ANSWER},
    { letter: "p", result: NO_ANSWER},
    { letter: "q", result: NO_ANSWER},
    { letter: "r", result: NO_ANSWER},
    { letter: "s", result: NO_ANSWER},
    { letter: "t", result: NO_ANSWER},
    { letter: "u", result: NO_ANSWER},
    { letter: "v", result: NO_ANSWER},
    { letter: "w", result: NO_ANSWER},
    { letter: "x", result: NO_ANSWER},
    { letter: "y", result: NO_ANSWER},
    { letter: "z", result: NO_ANSWER}
];

startBtn.addEventListener('click', function() {
    let input = document.querySelector('.welcome > .form > .answer');

    if ( input.value !== "" ) 
    {
        playerName = input.value;
        let welcome = document.querySelector('.welcome');
        let question = document.querySelector('.question');
        let questionTitle = document.querySelector('.question > .title');
        let questionText = document.querySelector('.question > .text');
        let itemA = document.querySelector('.item-a');

        let questionValues = questions[currentQuestion].question.split(".");

        questionTitle.innerHTML = questionValues[0];
        questionText.innerHTML = questionValues[1];

        welcome.classList.add('hidden');
        question.classList.remove('hidden');
        itemA.classList.add('current');
    }
});

enterBtn.addEventListener('click', function() {
    const answer = document.querySelector('.question > .form > .answer').value.toLocaleLowerCase();
    let question = document.querySelector('.question');
    
    if ( answer !== "" ) 
    {
        if ( answer === questions[currentQuestion].answer )
        {
            // Respuesta correcta
            let correct = document.querySelector('.center-container > .correct');
            // Mostrar cartel correcto 1 segundo
            showResult(question, correct);
            // Actualizar Answers
            answers[currentQuestion].result = CORRECT;
            // Buscar siguiente item no respondido
            nextItem('correct');
        }
        else if ( answer === PASAPALABRA )
        {
            // Respuesta Pasapalabra
            nextItem();
            // Parar juego
        }
        else
        {
            // Respuesta incorrecta
            let error = document.querySelector('.center-container > .error');
            // Mostrar cartel error y parar juego
            showResult(question, error);
            // Actualizar Answers
            answers[currentQuestion].result = ERROR;
            // Buscar siguiente item no respondido
            nextItem('error');
        }

        shiftCounter++;

        if ( !endGame() ) {
            let questionTitle = document.querySelector('.question > .title');
            let questionText = document.querySelector('.question > .text');
            let input = document.querySelector('.question > .form > .answer');

            let questionValues = questions[currentQuestion].question.split(".");

            questionTitle.innerHTML = questionValues[0];
            questionText.innerHTML = questionValues[1];
            input.value = "";
        }
        else
        {
            setTimeout(function() {
                let endGamePanel = document.querySelector('.center-container > .end-game');
                let endGameTitle = document.querySelector('.end-game > .title');
                let endGameText = document.querySelector('.end-game > .text');
                
                question.classList.add('hidden');
                endGameTitle.innerHTML = "<strong>¡Fin del juego!</strong><br>¡Enhorabuena " + playerName + "!";
                endGameText.innerHTML = "Has completado el juego en " + shiftCounter + " turnos";
                endGamePanel.classList.remove('hidden');
            }, 1001);
        }

        
    }
});

function nextItem(className = "")
{
    let item = document.querySelector('.current');
    let newItem = true;

    item.classList.remove('current');
    if ( className )item.classList.add(className);

    let tempCounter = 0;

    do
    {
        item = item.nextElementSibling;
        if ( item === null )
        {
            item = document.querySelector('.item-a');
        }
        currentQuestion++;
        if ( currentQuestion >= questions.length )
        {
            currentQuestion = 0;
        }
        tempCounter++;
        if ( tempCounter > questions.length )
        {
            newItem = false;
            break;
        }
    } while ( item.classList.contains('error') || item.classList.contains('correct') )

    if ( newItem ) {
        item.classList.add('current');
    }
}

function showResult(question, result)
{
    setTimeout(function() {
        result.classList.add('hidden');
        question.classList.remove('hidden');
    }, 1000);

    question.classList.add('hidden');
    result.classList.remove('hidden');
}

function endGame()
{
    for (let i = 0; i < answers.length; i++)
    {
        if ( answers[i].result === NO_ANSWER || answers[i].result === PASAPALABRA )
        {
            return false;
        }
    }

    return true;
}