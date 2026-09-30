const dob = document.getElementById("dob");
const calculateBtn = document.getElementById("calculate");
const resetBtn = document.getElementById("reset");
const result = document.getElementById("result");
const resultMessage = document.getElementById("result-message");
const resultValues = {
  years: document.querySelector('[data-unit="years"]'),
  months: document.querySelector('[data-unit="months"]'),
  days: document.querySelector('[data-unit="days"]')
};

dob.max = new Date().toISOString().split("T")[0];

function showError(message) {
  result.classList.add("error");
  resultMessage.textContent = message;
  resultMessage.hidden = false;
}

function clearError() {
  result.classList.remove("error");
  resultMessage.hidden = true;
  resultMessage.textContent = "";
}

function updateResult(age, months, days) {
  clearError();
  resultValues.years.textContent = age;
  resultValues.months.textContent = months;
  resultValues.days.textContent = days;
}

function calculateAge() {
  const dobValue = dob.value;

  if (!dobValue) {
    showError("Please select your birth date");
    return;
  }

  const today = new Date();
  const birthDate = new Date(`${dobValue}T00:00:00`);

  if (birthDate > today) {
    showError("Birth date cannot be in the future");
    return;
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    const previousMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    days += previousMonthDays;
    months--;
  }

  if (months < 0) {
    age--;
    months += 12;
  }

  updateResult(age, months, days);
}

calculateBtn.addEventListener("click", calculateAge);

dob.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateAge();
  }
});

resetBtn.addEventListener("click", function () {
  dob.value = "";
  result.classList.remove("error");
  resultMessage.hidden = true;
  updateResult(0, 0, 0);
});

updateResult(0, 0, 0);
