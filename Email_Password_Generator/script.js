// Get HTML elements
const email = document.getElementById("email");
const password = document.getElementById("password");

const emailBtn = document.getElementById("emailGenerate");
const passwordBtn = document.getElementById("passwordGenerate");

const copyEmail = document.getElementById("copyEmail");
const copyPassword = document.getElementById("copyPassword");

const reset = document.getElementById("reset");
const message = document.getElementById("message");

// Generate Email
function generateEmail() {
  let randomNumber = Math.floor(Math.random() * 10000);
  const names = [
  "rahul",
  "aman",
  "rohit",
  "vikas",
  "sahil",
  "arjun",
  "aditya",
  "karan",
  "akash",
  "raj",
  "sumit",
  "amit",
  "varun",
  "deepak",
  "anil",
  "mohit",
  "ravi",
  "nitin",
  "vivek",
  "manish"
];
  let randomIndex = Math.floor(Math.random() * names.length);

  let randomName = names[randomIndex];


  let emailAddress = randomName + randomNumber + "@gmail.com";

  email.value = emailAddress;
}

// Generate Password
function generatePassword(length) {
  const character =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@$%&*!";

  let newPassword = "";

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * character.length);

    newPassword += character[randomIndex];
  }

  password.value = newPassword;
}

// Show message
function showMessage(text) {
  message.innerText = text;

  setTimeout(function () {
    message.innerText = "";
  }, 1500);
}

// Email button
emailBtn.addEventListener("click", () => {
  generateEmail();
});

// Password button
passwordBtn.addEventListener("click", () => {
  generatePassword(8);
});

// Copy Email
copyEmail.addEventListener("click", () => {
  if (email.value === "") {
    showMessage("Generate an email first!");
    return;
  }

  navigator.clipboard.writeText(email.value);
  showMessage("Email copied!");
});

// Copy Password
copyPassword.addEventListener("click", () => {
  if (password.value === "") {
    showMessage("Generate a password first!");
    return;
  }

  navigator.clipboard.writeText(password.value);
  showMessage("Password copied!");
});

// Reset
reset.addEventListener("click", () => {
  email.value = "";
  password.value = "";

  showMessage("Reset successfully!");
});
