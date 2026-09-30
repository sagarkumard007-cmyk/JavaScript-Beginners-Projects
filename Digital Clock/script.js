const timeElement = document.querySelector("#time");
const dateElement = document.querySelector("#date");
const weekdayElement = document.querySelector("#weekday");
const periodElement = document.querySelector("#period");
const greetingElement = document.querySelector("#greeting");
const timezoneElement = document.querySelector("#timezone");
const secondsProgress = document.querySelector("#seconds-progress");

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: "long",
  day: "numeric",
  year: "numeric"
});

const weekdayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "long"
});

function updateClock() {
  const now = new Date();
  const parts = timeFormatter.formatToParts(now);
  const hours = parts.find((part) => part.type === "hour")?.value ?? "00";
  const minutes = parts.find((part) => part.type === "minute")?.value ?? "00";
  const seconds = parts.find((part) => part.type === "second")?.value ?? "00";
  const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value ?? "";

  timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  periodElement.textContent = dayPeriod;
  dateElement.textContent = dateFormatter.format(now);
  weekdayElement.textContent = weekdayFormatter.format(now);
  timezoneElement.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ");
  secondsProgress.style.width = `${(now.getSeconds() / 59) * 100}%`;

  const hour = now.getHours();
  greetingElement.textContent =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}

updateClock();
setInterval(updateClock, 1000);
