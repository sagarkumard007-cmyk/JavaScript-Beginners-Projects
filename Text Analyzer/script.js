// Get elements from HTML
const input = document.querySelector("#input");
const letters = document.querySelector("#letters");
const words = document.querySelector("#words");
const vowels = document.querySelector("#vowels");
const characters = document.querySelector("#characters");
const reset = document.querySelector("#reset");

// This function runs whenever we type
input.addEventListener("input", function () {
  const text = input.value;

  // Characters = everything we type, including spaces
  characters.textContent = text.length;

  // Letters = only A-Z letters
  const onlyLetters = text.match(/[a-z]/gi);
  letters.textContent = onlyLetters ? onlyLetters.length : 0;

  // Vowels = a, e, i, o, u
  const onlyVowels = text.match(/[aeiou]/gi);
  vowels.textContent = onlyVowels ? onlyVowels.length : 0;

  // Words
  const cleanText = text.trim();

  if (cleanText === "") {
    words.textContent = 0;
  } else {
    words.textContent = cleanText.split(/\s+/).length;
  }
});

// Reset everything
reset.addEventListener("click", function () {
  input.value = "";

  letters.textContent = 0;
  words.textContent = 0;
  vowels.textContent = 0;
  characters.textContent = 0;
});
