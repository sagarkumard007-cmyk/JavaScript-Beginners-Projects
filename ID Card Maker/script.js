
// ========================================
// GET FORM ELEMENTS
// ========================================

const profileImage = document.getElementById("profileImage");

const rollNumber = document.getElementById("rollNumber");

const studentName = document.getElementById("studentName");

const studentAge = document.getElementById("studentAge");

const course = document.getElementById("course");

const collegeName = document.getElementById("collegeName");


// ========================================
// GET CARD ELEMENTS
// ========================================

const cardImage = document.getElementById("cardImage");

const cardName = document.getElementById("cardName");

const cardRoll = document.getElementById("cardRoll");

const cardAge = document.getElementById("cardAge");

const cardCourse = document.getElementById("cardCourse");

const cardCollege = document.getElementById("cardCollege");


// ========================================
// GET BUTTONS
// ========================================

const generateBtn = document.getElementById("generateBtn");

const resetBtn = document.getElementById("resetBtn");

const downloadBtn = document.getElementById("downloadBtn");


// ========================================
// GENERATE CARD
// ========================================

generateBtn.addEventListener("click", function () {

    // Get values from form

    const nameValue = studentName.value;

    const rollValue = rollNumber.value;

    const ageValue = studentAge.value;

    const courseValue = course.value;

    const collegeValue = collegeName.value;


    // Put values into card

    cardName.innerText = nameValue;

    cardRoll.innerText = rollValue;

    cardAge.innerText = ageValue;

    cardCourse.innerText = courseValue;

    cardCollege.innerText = collegeValue;

});


// ========================================
// PROFILE IMAGE
// ========================================

profileImage.addEventListener("change", function () {

    // Get selected file

    const file = profileImage.files[0];


    // Check whether image is selected

    if (file) {

        // Create FileReader

        const reader = new FileReader();


        // When image is loaded

        reader.onload = function (event) {

            cardImage.src = event.target.result;

        };


        // Read image

        reader.readAsDataURL(file);

    }

});


// ========================================
// RESET
// ========================================

resetBtn.addEventListener("click", function () {

    // Reset card values

    cardName.innerText = "Your Name";

    cardRoll.innerText = "--------";

    cardAge.innerText = "--";

    cardCourse.innerText = "Your Course";

    cardCollege.innerText = "Your College";

    // Remove image

    cardImage.src = "";

});


// ========================================
// DOWNLOAD CARD AS PDF
// ========================================

downloadBtn.addEventListener("click", function () {

    // Select the student card
    const card = document.getElementById("studentCard");


    // Convert card into image
    html2canvas(card, {
        scale: 2
    }).then(function (canvas) {

        // Convert canvas into image
        const imageData = canvas.toDataURL("image/png");


        // Get jsPDF
        const { jsPDF } = window.jspdf;


        // Create PDF
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });


        // A4 page size
        const pageWidth = 210;
        const pageHeight = 297;


        // Card image size
        const cardWidth = 120;

        const cardHeight =
            (canvas.height * cardWidth) / canvas.width;


        // Center card horizontally
        const x = (pageWidth - cardWidth) / 2;


        // Center card vertically
        const y = (pageHeight - cardHeight) / 2;


        // Add card image to PDF
        pdf.addImage(
            imageData,
            "PNG",
            x,
            y,
            cardWidth,
            cardHeight
        );


        // Download PDF
        pdf.save("student-card.pdf");

    });

});



