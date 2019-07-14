var countdown = 0;
var seconds = 1500;
var workTime = 25;
var breakTime = 5;
var isBreak = true;
var isPaused = true;


var startBtn = document.querySelector("#start-btn");
var resetBtn = document.querySelector("#reset");
var timerDisplay = document.querySelector(".timerDisplay");
var workMin = document.querySelector("#work-min");
var breakMin = document.querySelector("#break-min");
var status = document.querySelector("#status");


const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  isPaused = !isPaused;
  if (!isPaused){
    countdown = setInterval(timer, 1000);
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  seconds = workTime * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
});


function timer() {
  seconds--;
  console.log(seconds);
  if (seconds <= 0) {
  clearInterval(countdown);
  // alarm commands
  seconds = (isBreak ? breakTime : workTime) * 60;
  isBreak = !isBreak;
  countdown = setInterval(timer, 1000);
  }
}


var increment = 1;
var incrementClasses =
{ "#work-plus": function () {workTime = Math.min(workTime + increment, 60)},
  "#work-minus": function () {workTime = Math.max(workTime - increment, 5)},
  "#break-plus": function () {breakTime = Math.min(breakTime + increment, 60)},
  "#break-minus": function () {breakTime = Math.max(breakTime - increment, 5)}
}

for (var key in incrementClasses) {
  if (incrementClasses.hasOwnProperty(key)) {
    document.querySelector(key).onclick = incrementClasses[key];
  }
}

function showTime(){
  minutes = Math.floor(seconds / 60);
  remainderSecs = seconds % 60;
  timerDisplay.innerHTML = `${minutes}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
}

function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startBtn.innerHTML = "Start";
  } else if (isPaused && countdown !== 0){
    startBtn.innerHTML = "Continue";
  } else {
    startBtn.innerHTML = "Pause";
  }
}


function updateHTML() {
  showTime();
  buttonDisplay();
  status.textContent = "Keep Working";
  workMin.textContent = workTime;
  breakMin.textContent = breakTime;
}


document.onclick = updateHTML;

window.setInterval(updateHTML, 100);
