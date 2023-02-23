const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const hoursDisplay = document.getElementById('hoursDisplay');
const minutesDisplay = document.getElementById('minutesDisplay');
const secondsDisplay = document.getElementById('secondsDisplay');
const presets = document.querySelectorAll('.preset');
let countdownInterval;

function startCountdown() {
  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours < 0 || minutes < 0 || seconds < 0) {
    alert('Lütfen geçerli bir saat, dakika ve saniye girin.');
    return;
  }
  
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  
  if (totalSeconds === 0) {
    alert('Süre sıfır olamaz.');
    return;
  }
  
  updateDisplay(totalSeconds);
  
  countdownInterval = setInterval(() => {
    totalSeconds -= 1;
    
    if (totalSeconds < 0) {
      clearInterval(countdownInterval);
      document.getElementById('alert-sound').play(); // sesi çal
      alert('Süre doldu!');
      return;
    }
    
    updateDisplay(totalSeconds);
  }, 1000);
}

function updateDisplay(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  hoursDisplay.textContent = padTime(hours);
  minutesDisplay.textContent = padTime(minutes);
  secondsDisplay.textContent = padTime(seconds);
}

function padTime(time) {
  return time < 10 ? `0${time}` : time;
}

startButton.addEventListener('click', startCountdown);

resetButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
  hoursInput.value = '';
  minutesInput.value = '';
  secondsInput.value = '';
  hoursDisplay.textContent = '00';
  minutesDisplay.textContent = '00';
  secondsDisplay.textContent = '00';
});

presets.forEach(preset => {
  preset.addEventListener('click', () => {
    const hours = preset.dataset.hours;
    const minutes = preset.dataset.minutes;
    const seconds = preset.dataset.seconds;
    hoursInput.value = hours;
    minutesInput.value = minutes;
    secondsInput.value = seconds;
  });
});
