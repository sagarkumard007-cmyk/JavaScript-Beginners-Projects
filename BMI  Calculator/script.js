let weight = document.getElementById("weight");
let height = document.getElementById("height");

let calculateBtn = document.getElementById("calculateBtn");

let result = document.getElementById("result");
let category = document.getElementById("category");

calculateBtn.addEventListener("click", () => {

    let weightValue = Number(weight.value);
    let heightValue = Number(height.value);

    if (weightValue <= 0 || heightValue <= 0) {
        result.textContent = "Please enter valid values";
        category.textContent = "";
        return;
    }

    // cm ko meter me convert
    let heightInMeter = heightValue / 100;

    // BMI formula
    let bmi = weightValue / (heightInMeter * heightInMeter);

    result.textContent = `Your BMI is ${bmi.toFixed(2)}`;

    if (bmi < 18.5) {
        category.textContent = "Underweight";
    } 
    else if (bmi < 25) {
        category.textContent = "Normal Weight";
    } 
    else if (bmi < 30) {
        category.textContent = "Overweight";
    } 
    else {
        category.textContent = "Obesity";
    }

});