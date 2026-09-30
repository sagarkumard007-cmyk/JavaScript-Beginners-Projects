
let randomNumber = Math.floor(Math.random() * 100) + 1;

let check = document.getElementById("submitBtn");

let resetBtn = document.getElementById("resetBtn");

check.addEventListener("click", () => {

  let input = document.getElementById("guessInput").value;
  let userInput = Number(input);

  if (input === "" || isNaN(userInput)) {

    document.getElementById("result").innerHTML =
      "Please enter a valid number.";

    return;
  }

  if (userInput < 1 || userInput > 100) {

    document.getElementById("result").innerHTML =
      "Please enter a number between 1 and 100.";

    return;

  } else if (userInput < randomNumber) {

    document.getElementById("result").innerHTML =
      "Too low! Try again.";

  } else if (userInput > randomNumber) {

    document.getElementById("result").innerHTML =
      "Too high! Try again.";

  } else {

    document.getElementById("result").innerHTML =
      "Congratulations! You guessed the number: " + userInput;
  }

});

resetBtn.addEventListener("click", () => {

  randomNumber = Math.floor(Math.random() * 100) + 1;

  document.getElementById("guessInput").value = "";

  document.getElementById("result").innerHTML = "";

});
