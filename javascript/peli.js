let currentQuestionIndex = 0;
let currentInfoIndex = 0;
let score = 0;

let isInformationScreenVisible = true;
let isGameScreenVisible = false;
let isTutorialScreenVisible = true;

const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const playButton = document.getElementById('play-button');

const infoPreviousButton = document.getElementById('info_previous-button');
const infoNextButton = document.getElementById('info_next-button');

const trueButton = document.getElementById('true-button');
const falseButton = document.getElementById('false-button');
let scoreElement = document.getElementById('score');

trueButton.addEventListener('click', function() {
    checkAnswer(true);
});

falseButton.addEventListener('click', function() {
    checkAnswer(false);
});

const info = [
    {
        text: "Tien ylittäminen: Kun haluat ylittää tien, käytä aina suojatietä, jos sellainen on lähellä. Ennen kuin astut tielle, katso molempiin suuntiin ja varmista, että autot ovat pysähtyneet ja on turvallista ylittää. Muista: katso ensin vasemmalle, sitten oikealle ja vielä kerran vasemmalle.",
        imageUrl: "../images/tien_saannot-suojatie1.png"
    },
    {
        text: "Pyöräily: Jos pyöräilet, muista käyttää aina kypärää. Se suojaa päätäsi, jos kaadut. Pyöräillessäsi kulje pyörätietä tai tien oikeaa reunaa. Muista myös näyttää kädelläsi suuntamerkkiä, kun käännyt. Näin muut tietävät, minne olet menossa.",
        imageUrl: "../images/tien_saannot-kyparan_kaytto1.2.png"
    },
    {
        text: "Kävely: Kun kävelet, kulje jalkakäytävällä tai tien vasemmassa reunassa, jos jalkakäytävää ei ole. Tämä auttaa näkemään vastaantulevat autot paremmin. Ole aina tarkkana ja vältä leikkimistä tiellä.",
        imageUrl: "../images/tien_saannot-pyoratie1.png"
    },
    {
        text: "Liikennevalot: Liikennevalot kertovat, milloin voit kävellä ja milloin täytyy odottaa. Kun valo on vihreä, voit ylittää tien, mutta silti on hyvä katsoa, että autot todella pysähtyvät. Jos valo on punainen, odota, vaikka muita ihmisiä menisi tien yli.",
        imageUrl: "../images/tien_saannot-liikennevalot1.png"
    },
    {
        text: "Autossa matkustaminen: Kun matkustat autossa, käytä aina turvavyötä. Se pitää sinut turvassa, jos auto joutuu onnettomuuteen. Pienempien lasten on hyvä käyttää turvaistuinta, joka sopii heidän kokoonsa.",
        imageUrl: "../images/tien_saannot-turvavyo1.png"
    },
    {
        text: "Kuuntele aikuisia: Muista kuunnella vanhempia ja opettajia, kun he neuvovat liikenteessä. Heidän ohjeensa auttavat sinua pysymään turvassa.",
        imageUrl: "../images/tien_saannot-peli1.png"
    }
]

const questions = [
    {
        question: "Valojen käyttö polkupyörässä on tärkeää pimeällä",
        answer: true,
        imageUrl: "../images/tien_saannot-valot1.png"
    },
    {
        question: "Polkupyörässä ei kannata käyttää heijastimia",
        answer: false,
        imageUrl: "../images/tien_saannot-valot&heijastimet1.png"
    },
    {
        question: "Turvavyötä pitäisi aina käyttää autossa",
        answer: true,
        imageUrl: "../images/tien_saannot-turvavyo1.png"
    },
    {
        question: "Tasoristeystä lähestyessä pitää olla aina erityisen varovainen",
        answer: true,
        imageUrl: "../images/tien_saannot-tasoristeys1.png"
    },
    {
        question: "Suojatietä ylittäessä pitää aina tarkkailla molempiin suuntiin",
        answer: true,
        imageUrl: "../images/tien_saannot-tarkkaavaisuus1.png"
    },
    {
        question: "Suuntamerkkiä ei tarvitse käyttää kaistaa vaihtaessa tai kääntyessä",
        answer: false,
        imageUrl: "../images/tien_saannot-suuntamarkki1.png"
    },
    {
        question: "Suojatietä pitää aina käyttää kun ylittää tien",
        answer: true,
        imageUrl: "../images/tien_saannot-suojatie1.png"
    },
    {
        question: "Stop merkin kohdalle ei tarvitse pysähtyä",
        answer: false,
        imageUrl: "../images/tien_saannot-stop1.png"
    },
    {
        question: "Kävelijät voi kävellä pyörätiellä, jos haluaa",
        answer: false,
        imageUrl: "../images/tien_saannot-pyoratie1.png"
    },
    {
        question: "Pyörä kannattaa aina lukita, kun jättää sen parkkiin",
        answer: true,
        imageUrl: "../images/tien_saannot-pyoraparkki1.png"
    },
    {
        question: "Mäkeä laskiessa kannattaa katsoa, että ketään ei ole edessä",
        answer: true,
        imageUrl: "../images/tien_saannot-maenlasku1.png"
    },
    {
        question: "Liukkaalla kelillä kannattaa liikkua varovaisesti",
        answer: true,
        imageUrl: "../images/tien_saannot-liukkaus1.png"
    },
    {
        question: "Tietä ylittäessä kannattaa katsoa suoraan alaspäin",
        answer: false,
        imageUrl: "../images/tien_saannot-katso1.png"
    },
    {
        question: "Heijastimen käyttö on tärkeää pimeällä",
        answer: true,
        imageUrl: "../images/tien_saannot-heijastin1.png"
    },
    {
        question: "Aikuisten ja opettajien neuvoja ei kannata kuunnella liikenteessä",
        answer: false,
        imageUrl: "../images/tien_saannot-bussipysakki1.png"
    },
];

const answeredQuestions = Array.from({ length: questions.length }, () => ({
    answered: false,
    correct: false,
    userAnswer: null
}));

displayQuestion();
displayInfo();

function toggleTutorialScreen() {
    const informationScreen = document.getElementById('information-screen');
    const gameContainer = document.getElementById('game-container');
    const tutorialScreen = document.getElementById('tutorial-screen');
    isTutorialScreenVisible = !isTutorialScreenVisible;
    if(isInformationScreenVisible) {
        informationScreen.style.display = !isTutorialScreenVisible ? 'flex' : 'none';
    }
    else if(isGameScreenVisible) {
        gameContainer.style.display = !isTutorialScreenVisible ? 'flex' : 'none';
    }
    tutorialScreen.style.display = isTutorialScreenVisible ? 'flex' : 'none';
}

function goToGame() {
    toggleTutorialScreen();
}

function startGame() {
    const informationScreen = document.getElementById('information-screen');
    const gameContainer = document.getElementById('game-container');
    isInformationScreenVisible = false;
    isGameScreenVisible = true;
    informationScreen.style.display = 'none';
    gameContainer.style.display = 'flex';
}

function displayInfo() {
    const imageElement = document.getElementById('info-image');
    const textElement = document.getElementById('info-text');
    imageElement.src = info[currentInfoIndex].imageUrl;
    textElement.textContent = info[currentInfoIndex].text;
}

function displayQuestion() {
    const imageElement = document.getElementById('question-image');
    const answerObject = answeredQuestions[currentQuestionIndex];
    const textElement = document.getElementById('question-Text');
    imageElement.src = questions[currentQuestionIndex].imageUrl;
    textElement.textContent = questions[currentQuestionIndex].question;
    resetButtonStyles();
    if (answerObject.answered) {
        updateButtonStyling();
    } else {
        trueButton.disabled = false;
        falseButton.disabled = false;
    }
    toggleNavigationButtons();
}

function checkAnswer(playerGuess) {
    if (answeredQuestions[currentQuestionIndex].answered) {
        return;
    }
    const correctAnswer = questions[currentQuestionIndex].answer;
    const answerObject = answeredQuestions[currentQuestionIndex];
    answerObject.answered = true;
    answerObject.userAnswer = playerGuess;
    answerObject.correct = (playerGuess === correctAnswer);
    updateButtonStyling();

    if (answerObject.correct) {
        score++;
    }
    scoreElement.textContent = `Pisteet: ${score}/15`;
    toggleNavigationButtons();
}

function updateButtonStyling() {
    const answerObject = answeredQuestions[currentQuestionIndex];
    resetButtonStyles();
    if (answerObject.answered) {
        if (answerObject.correct) {
            if (answerObject.userAnswer === true) {
                trueButton.classList.add('correct_green');
            } else {
                falseButton.classList.add('incorrect_green');
            }
        } else {
            if (answerObject.userAnswer === true) {
                trueButton.classList.add('correct_red');
            } else {
                falseButton.classList.add('incorrect_red');
            }
        }
    }
    trueButton.disabled = true;
    falseButton.disabled = true;
}

function resetButtonStyles() {
    trueButton.classList.remove('correct', 'incorrect', 'correct_green', 'correct_red', 'incorrect_green', 'incorrect_red');
    falseButton.classList.remove('correct', 'incorrect', 'correct_green', 'correct_red', 'incorrect_green', 'incorrect_red');
    trueButton.style.backgroundImage = "url('../images/Oikein.png')";
    falseButton.style.backgroundImage = "url('../images/Vaarin.png')";
}

toggleNavigationButtons();
toggleInfoNavigationButtons();

function toggleNavigationButtons() {
    previousButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    
    const answerObject = answeredQuestions[currentQuestionIndex];
    if (answerObject.answered) {
        nextButton.style.display = currentQuestionIndex === questions.length ? 'none' : 'inline-block';
    } else {
        nextButton.style.display = 'none';
    }
}

function toggleInfoNavigationButtons() {
    infoPreviousButton.style.display = currentInfoIndex === 0 ? 'none' : 'inline-block';
    infoNextButton.style.display = currentInfoIndex === info.length - 1 ? 'none' : 'inline-block';
    if(currentInfoIndex == info.length - 1) {
        playButton.style.display = 'block';
    }
    else {
        playButton.style.display = 'none';
    }
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
    else {
        localStorage.setItem('score', score);
        window.location.href = "../pages/EndScreen.html";
    }
}

function previousInfoScreen() {
    if(currentInfoIndex > 0) {
        currentInfoIndex--;
        displayInfo();
        toggleInfoNavigationButtons();
    }
}

function nextInfoScreen() {
    if(currentInfoIndex < info.length - 1) {
        currentInfoIndex++;
        displayInfo();
        toggleInfoNavigationButtons();
    }
}