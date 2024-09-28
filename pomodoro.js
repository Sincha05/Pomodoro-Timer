let timer;
let isWorking = true;
let timeLeft = 25 * 60; 

const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const stopButton = document.getElementById('stopButton');
const sessionType = document.getElementById('sessionType');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function switchSession() {
    isWorking = !isWorking;
    timeLeft = isWorking ? 25 * 60 : 5 * 60; 
    sessionType.textContent = isWorking ? 'Work Session' : 'Break Session';
    updateDisplay();
}

function startTimer() {
    if (!timer) {
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = null;
                switchSession();
                startTimer(); 
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    isWorking = true;
    timeLeft = 25 * 60; 
    sessionType.textContent = 'Work Session';
    updateDisplay();
}

function stopTimer(){
  clearInterval(timer);
    timer = null;
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
stopButton.addEventListener('click', stopTimer);

updateDisplay();
