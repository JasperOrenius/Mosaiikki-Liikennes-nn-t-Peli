function startGame() {
    window.location.href = "pages/peli.html";
}

function showInstructions() {
    document.getElementById("start-button").style.display = "block";
    document.getElementById("instructions-button").style.display = "none";
    document.getElementById("text-overlay").innerText = "Tässä pelissä opetellaan Suomen liikennesääntöjä!";
}