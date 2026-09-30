const colorBox = document.querySelector(".colorbox");
const colorCode = document.querySelector(".color-code");
const generateBtn = document.getElementById("generate");
const resetBtn = document.getElementById("reset");
const copyBtn = document.getElementById("copy");

const characters = "0123456789ABCDEF";
const defaultColor = "#356984";

function generateColor() {
  let color = "#";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    color += characters[randomIndex];
  }

  colorBox.style.backgroundColor = color;
  colorCode.textContent = color;
  document.body.style.background = `linear-gradient(135deg, ${color}22, #f3e8ff)`;
}

function resetColor() {
  colorBox.style.backgroundColor = defaultColor;
  colorCode.textContent = defaultColor;
  document.body.style.background = "linear-gradient(135deg, #eef4ff, #f3e8ff)";
}

async function copyColorCode() {
  const color = colorCode.textContent.trim();

  try {
    await navigator.clipboard.writeText(color);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1200);
  } catch (error) {
    copyBtn.textContent = "Failed";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1200);
  }
}

generateBtn.addEventListener("click", generateColor);
resetBtn.addEventListener("click", resetColor);
copyBtn.addEventListener("click", copyColorCode);