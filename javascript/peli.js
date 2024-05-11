let currentQuestionIndex = 0;

const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const trueButton = document.getElementById('true-button');
const falseButton = document.getElementById('false-button');

previousButton.addEventListener('click', goToPreviousQuestion);
nextButton.addEventListener('click', goToNextQuestion);

document.getElementById('true-button').addEventListener('click', function() {
    checkAnswer(true);
});

document.getElementById('false-button').addEventListener('click', function() {
    checkAnswer(false);
});

const questions = [
    {
        question: "Valojen käyttö polkupyörässä on tärkeää pimeällä",
        answer: true,
        imageUrl: "../images/tien_säännöt-valot1.png"
    },
    {
        question: "Polkupyörässä ei kannata käyttää heijastimia",
        answer: false,
        imageUrl: "../images/tien_säännöt-valot&heijastimet1.png"
    },
    {
        question: "Turvavyötä pitäisi aina käyttää autossa",
        answer: true,
        imageUrl: "../images/tien_säännöt-turvavyö1.png"
    },
    {
        question: "Tasoristeystä lähestyessä pitää olla aina erityisen varovainen",
        answer: true,
        imageUrl: "../images/tien_säännöt-tasoristeys1.png"
    },
    {
        question: "Suojatietä ylittäessä pitää aina tarkkailla molempiin suuntiin",
        answer: true,
        imageUrl: "../images/tien_säännöt-tarkkaavaisuus1.png"
    },
    {
        question: "Suuntamerkkiä ei tarvitse käyttää kaistaa vaihtaessa tai kääntyessä",
        answer: false,
        imageUrl: "../images/tien_säännöt-suuntamarkki1.png"
    },
    {
        question: "Suojatietä pitää aina käyttää kun ylittää tien",
        answer: true,
        imageUrl: "../images/tien_säännöt-suojatie1.png"
    },
    {
        question: "Stop merkin kohdalle ei tarvitse pysähtyä",
        answer: false,
        imageUrl: "../images/tien_säännöt-stop1.png"
    },
    {
        question: "Pyöräilijät voi käyttää kävelytietä pyörällä ajaessa",
        answer: false,
        imageUrl: "../images/tien_säännöt-pyörätie1.png"
    },
    {
        question: "Pyörä kannattaa aina lukita, kun jättää sen parkkiin",
        answer: true,
        imageUrl: "../images/tien_säännöt-pyöräparkki1.png"
    },
    {
        question: "",
        answer: false,
        imageUrl: "../images/tien_säännöt-peli1.png"
    },
    {
        question: "",
        answer: false,
        imageUrl: "../images/tien_säännöt-mäenlasku1.png"
    },
    {
        question: "",
        answer: false,
        imageUrl: "../images/tien_säännöt-liukkaus1.png"
    },
    {
        question: "",
        answer: false,
        imageUrl: "../images/tien_säännöt-liikennevalot1.png"
    },
    {
        question: "",
        answer: false,
        imageUrl: "../images/tien_säännöt-kypärän_käyttö1.2.png"
    },
    {
        question: "",
        answer: false,
        imageUrl: "../images/tien_säännöt-katso1.png"
    },
    {
        question: "",
        answer: false,
        imageUrl: "../images/tien_säännöt-heijastin1.png"
    },
    {
        question: "",
        answer: false,
        imageUrl: "../images/tien_säännöt-bussipysäkki1.png"
    },
];

const answeredQuestions = Array.from({ length: questions.length }, () => ({
    answered: false,
    correct: false,
    userAnswer: null
}));

displayQuestion();
function displayQuestion() {
    const imageElement = document.getElementById('question-image');
    const answerObject = answeredQuestions[currentQuestionIndex];
    const textElement = document.getElementById('question-Text');
    imageElement.src = questions[currentQuestionIndex].imageUrl;
    textElement.textContent = questions[currentQuestionIndex].question;
    trueButton.classList.remove('correct', 'incorrect');
    falseButton.classList.remove('correct', 'incorrect');
    if (!answerObject.answered) {
        trueButton.disabled = false;
        falseButton.disabled = false;
    } else {
        updateButtonStyling();
    }
}

function checkAnswer(playerGuess) {
    if (answeredQuestions[currentQuestionIndex].answered) {
        return;
    }
    const correctAnswer = questions[currentQuestionIndex].answer;
    const answerObject = answeredQuestions[currentQuestionIndex];
    if (playerGuess === correctAnswer) {
        answerObject.correct = true;
    }
    answerObject.answered = true;
    answerObject.userAnswer = playerGuess;
    updateButtonStyling();
}

function updateButtonStyling() {
    const answerObject = answeredQuestions[currentQuestionIndex];
    if (answerObject.answered) {
        if (answerObject.correct) {
            if (answerObject.userAnswer === true) {
                trueButton.classList.add('correct');
            } else {
                falseButton.classList.add('correct');
            }
        } else {
            if (answerObject.userAnswer === true) {
                trueButton.classList.add('incorrect');
            } else {
                falseButton.classList.add('incorrect');
            }
        }
    } else {
        trueButton.classList.remove('correct', 'incorrect');
        falseButton.classList.remove('correct', 'incorrect');
    }
    trueButton.disabled = true;
    falseButton.disabled = true;
}

toggleNavigationButtons();
function toggleNavigationButtons() {
    previousButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
}

function goToPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        toggleNavigationButtons();
    }
}

function goToNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        toggleNavigationButtons();
    }
}