const score = localStorage.getItem('score');
document.getElementById('score-display').textContent = `Pisteet: ${score}/15`;
function returnToMenu() {
    window.location.href = "../index.html";
}