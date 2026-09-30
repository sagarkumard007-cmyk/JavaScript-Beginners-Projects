const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");
const millisecondsElement = document.querySelector("#milliseconds");
const progressFill = document.querySelector("#progressFill");
const statusText = document.querySelector("#statusText");
const startButton = document.querySelector("#startButton");
const startText = document.querySelector("#startText");
const startIcon = document.querySelector("#startIcon");
const resetButton = document.querySelector("#resetButton");
const lapButton = document.querySelector("#lapButton");
const lapsList = document.querySelector("#lapsList");
const emptyState = document.querySelector("#emptyState");
const lapCount = document.querySelector("#lapCount");

let elapsed = 0;
let lastLap = 0;
let timerId = null;
let lapNumber = 0;

function formatTime(value) {
  return String(value).padStart(2, "0");
}

function renderTime() {
  const totalSeconds = Math.floor(elapsed / 1000);
  minutesElement.textContent = formatTime(Math.floor(totalSeconds / 60) % 60);
  secondsElement.textContent = formatTime(totalSeconds % 60);
  millisecondsElement.textContent = formatTime(Math.floor(elapsed % 1000 / 10));
  progressFill.style.width = `${(elapsed % 60000) / 600}%`;
}

function setRunning(running) {
  if (running) {
    const startedAt = performance.now() - elapsed;
    timerId = setInterval(() => {
      elapsed = performance.now() - startedAt;
      renderTime();
    }, 10);
    statusText.textContent = "In the zone";
    startText.textContent = "Pause timer";
    startIcon.innerHTML = '<path d="M8 5v14M16 5v14"/>';
    lapButton.disabled = false;
  } else {
    clearInterval(timerId);
    timerId = null;
    statusText.textContent = elapsed ? "Paused for now" : "Ready to focus";
    startText.textContent = "Start timer";
    startIcon.innerHTML = '<path d="m8 5 11 7-11 7V5Z"/>';
    lapButton.disabled = !elapsed;
  }
}

function toggleTimer() {
  if (timerId) {
    setRunning(false);
  } else {
    setRunning(true);
  }
}

function recordLap() {
  if (!elapsed) return;
  lapNumber += 1;
  const lapElapsed = elapsed - lastLap;
  lastLap = elapsed;
  emptyState.hidden = true;
  const row = document.createElement("div");
  row.className = "lap-row";
  row.innerHTML = `<span class="lap-number">LAP ${formatTime(lapNumber)}</span><span class="lap-time">${formatTime(Math.floor(lapElapsed / 60000))}:${formatTime(Math.floor(lapElapsed / 1000) % 60)}.${formatTime(Math.floor(lapElapsed % 1000 / 10))}</span><span class="lap-time">${formatTime(Math.floor(elapsed / 60000))}:${formatTime(Math.floor(elapsed / 1000) % 60)}.${formatTime(Math.floor(elapsed % 1000 / 10))}</span>`;
  lapsList.prepend(row);
  lapCount.textContent = `${lapNumber} ${lapNumber === 1 ? "LAP" : "LAPS"}`;
}

function resetTimer() {
  setRunning(false);
  elapsed = 0;
  lastLap = 0;
  lapNumber = 0;
  renderTime();
  lapsList.querySelectorAll(".lap-row").forEach((row) => row.remove());
  emptyState.hidden = false;
  lapCount.textContent = "0 LAPS";
}

startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);
document.addEventListener("keydown", (event) => {
  if (event.target.matches("input, textarea, select")) return;
  if (event.code === "Space") {
    event.preventDefault();
    toggleTimer();
  }
  if (event.key.toLowerCase() === "l" && timerId) recordLap();
});

renderTime();
