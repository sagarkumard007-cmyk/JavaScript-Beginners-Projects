// ========================================
// GET HTML ELEMENTS
// ========================================

const fromValue = document.getElementById("fromValue");

const fromUnit = document.getElementById("fromUnit");

const result = document.getElementById("result");

const toUnit = document.getElementById("toUnit");

const convertBtn = document.getElementById("convertBtn");

const resetBtn = document.getElementById("resetBtn");

const swapBtn = document.getElementById("swapBtn");

const resultText = document.getElementById("resultText");

const resultDescription =
    document.getElementById("resultDescription");

const statusText =
    document.getElementById("statusText");

const statusDescription =
    document.getElementById("statusDescription");

const statusIcon =
    document.querySelector(".status-icon");


// ========================================
// CONVERT BUTTON
// ========================================

convertBtn.addEventListener("click", convertTemperature);


// ========================================
// CONVERSION FUNCTION
// ========================================

function convertTemperature() {

    // Get input value
    const value = Number(fromValue.value);

    // Get selected units
    const from = fromUnit.value;

    const to = toUnit.value;


    // Check if input is empty
    if (fromValue.value === "") {

        alert("Please enter a temperature.");

        return;
    }


    // Kelvin cannot be below 0
    if (from === "kelvin" && value < 0) {

        alert("Kelvin temperature cannot be below 0.");

        return;
    }


    // First convert the input to Celsius
    let celsius;


    if (from === "celsius") {

        celsius = value;

    } else if (from === "fahrenheit") {

        celsius = (value - 32) * 5 / 9;

    } else if (from === "kelvin") {

        celsius = value - 273.15;
    }


    // Now convert Celsius to target unit
    let convertedValue;


    if (to === "celsius") {

        convertedValue = celsius;

    } else if (to === "fahrenheit") {

        convertedValue = (celsius * 9 / 5) + 32;

    } else if (to === "kelvin") {

        convertedValue = celsius + 273.15;
    }


    // Round result
    convertedValue =
        Math.round(convertedValue * 100) / 100;


    // Show result
    result.value = convertedValue;


    // Get unit symbol
    const fromSymbol = getSymbol(from);

    const toSymbol = getSymbol(to);


    // Update result card
    resultText.textContent =
        `${convertedValue} ${toSymbol}`;


    resultDescription.textContent =
        `${value} ${fromSymbol} is equal to ${convertedValue} ${toSymbol}`;


    // Update temperature status
    updateTemperatureStatus(celsius);
}


// ========================================
// GET SYMBOL
// ========================================

function getSymbol(unit) {

    if (unit === "celsius") {

        return "°C";

    } else if (unit === "fahrenheit") {

        return "°F";

    } else {

        return "K";
    }
}


// ========================================
// TEMPERATURE STATUS
// ========================================

function updateTemperatureStatus(celsius) {

    if (celsius >= 35) {

        statusText.textContent = "Very Hot";

        statusDescription.textContent =
            "Extremely High Temperature";

        statusIcon.textContent = "🔥";

    } else if (celsius >= 25) {

        statusText.textContent = "Hot";

        statusDescription.textContent =
            "High Temperature";

        statusIcon.textContent = "☀️";

    } else if (celsius >= 15) {

        statusText.textContent = "Comfortable";

        statusDescription.textContent =
            "Pleasant Temperature";

        statusIcon.textContent = "😊";

    } else if (celsius >= 5) {

        statusText.textContent = "Cool";

        statusDescription.textContent =
            "Low Temperature";

        statusIcon.textContent = "🌤️";

    } else {

        statusText.textContent = "Cold";

        statusDescription.textContent =
            "Very Low Temperature";

        statusIcon.textContent = "❄️";
    }
}


// ========================================
// SWAP BUTTON
// ========================================

swapBtn.addEventListener("click", function () {

    // Store current values
    const oldFromUnit = fromUnit.value;

    const oldToUnit = toUnit.value;


    // Swap units
    fromUnit.value = oldToUnit;

    toUnit.value = oldFromUnit;


    // Convert automatically
    if (fromValue.value !== "") {

        convertTemperature();
    }

});


// ========================================
// RESET BUTTON
// ========================================

resetBtn.addEventListener("click", function () {

    // Reset input
    fromValue.value = "";

    // Reset result
    result.value = "";

    // Reset units
    fromUnit.value = "celsius";

    toUnit.value = "fahrenheit";


    // Reset result card
    resultText.textContent = "0 °F";

    resultDescription.textContent =
        "Enter a temperature to convert";


    // Reset status
    statusText.textContent = "Ready";

    statusDescription.textContent =
        "Enter a temperature";

    statusIcon.textContent = "🌡️";

});