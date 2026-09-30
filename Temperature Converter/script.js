const input = document.querySelector(".input-value");
const output = document.querySelector(".output-value");
const convertBtn = document.querySelector("#convertButton");
const result = document.querySelector("#result");
const resetbtn=document.querySelector("#resetButton")


convertBtn.addEventListener("click", function () {

    const inputValue = parseFloat(input.value);

    // Check empty input
    if (isNaN(inputValue)) {
        result.innerHTML = "Please enter a temperature.";
        return;
    }

    // Celsius → Fahrenheit
    const celtToFahren = (inputValue * 9) / 5 + 32;

    // Show result inside output input
    output.value = celtToFahren;

    // Show result below
    result.innerHTML = celtToFahren + " °F";

});
resetbtn.addEventListener("click",function() {
    output.value = ""
    input.value=""

    // Show result below
    result.innerHTML = "";

  
});
