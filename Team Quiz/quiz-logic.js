(() => {
    const QUIZ_DURATION = 15 * 60;
    const categoryIcons = {
        "General Knowledge": "fa-globe",
        Science: "fa-flask",
        Mathematics: "fa-calculator",
        History: "fa-book",
        "Computer Science": "fa-laptop-code",
        English: "fa-language",
        "Current Affairs": "fa-newspaper",
        "Mixed Quiz": "fa-shuffle"
    };

    const params = new URLSearchParams(window.location.search);
    const selectedCategory = params.get("category") || "General Knowledge";

    function setupCategoryPage() {
        const cards = document.querySelectorAll(".card");
        if (!cards.length) return;

        cards.forEach((card) => {
            const title = card.querySelector("h3");
            const button = card.querySelector("button");
            if (!title || !button) return;

            const category = title.textContent.trim();
            const count = getQuestions(category).length;
            const countLabel = card.querySelector("small");
            if (countLabel) countLabel.textContent = `${count} Question${count === 1 ? "" : "s"}`;

            button.addEventListener("click", () => {
                window.location.href = `quiz.html?category=${encodeURIComponent(category)}`;
            });
        });
    }

    function setupQuizPage() {
        const questionTitle = document.querySelector(".question-title");
        if (!questionTitle) return;

        let questions;
        try {
            questions = getQuestions(selectedCategory);
        } catch (error) {
            questionTitle.textContent = error.message;
            return;
        }
        if (!questions.length) {
            questionTitle.textContent = "No questions are available for this category.";
            return;
        }

        const elements = {
            category: document.querySelector(".category span"),
            categoryIcon: document.querySelector(".category-icon i"),
            progressText: document.querySelector(".question-number span"),
            progressPercent: document.querySelector(".question-number span:last-child"),
            progressFill: document.querySelector(".progress-fill"),
            options: document.querySelector(".options"),
            questionGrid: document.querySelector(".question-grid"),
            previous: document.querySelector(".previous-btn"),
            next: document.querySelector(".next-btn"),
            timer: document.querySelector("#timer"),
            exit: document.querySelector(".exit-btn"),
            questionCard: document.querySelector(".question-card")
        };

        let currentIndex = 0;
        let remainingSeconds = QUIZ_DURATION;
        let timerId;
        let isFinished = false;
        const answers = Array(questions.length).fill(null);

        const renderGrid = () => {
            elements.questionGrid.innerHTML = "";
            questions.forEach((question, index) => {
                const button = document.createElement("button");
                button.className = "question-number-btn";
                button.type = "button";
                button.textContent = index + 1;
                button.addEventListener("click", () => {
                    currentIndex = index;
                    renderQuestion();
                });
                elements.questionGrid.appendChild(button);
            });
        };

        const renderQuestion = () => {
            const question = questions[currentIndex];
            const percent = Math.round(((currentIndex + 1) / questions.length) * 100);
            elements.category.textContent = selectedCategory;
            elements.categoryIcon.className = `fa-solid ${categoryIcons[selectedCategory] || "fa-circle-question"}`;
            elements.progressText.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
            elements.progressPercent.textContent = `${percent}%`;
            elements.progressFill.style.width = `${percent}%`;
            questionTitle.textContent = question.question;
            elements.options.innerHTML = "";

            question.options.forEach((option, optionIndex) => {
                const button = document.createElement("button");
                button.className = "option";
                button.type = "button";
                if (answers[currentIndex] === optionIndex) button.classList.add("selected");
                button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span><span></span>`;
                button.lastElementChild.textContent = option;
                button.addEventListener("click", () => {
                    answers[currentIndex] = optionIndex;
                    renderQuestion();
                });
                elements.options.appendChild(button);
            });

            elements.questionGrid.querySelectorAll(".question-number-btn").forEach((button, index) => {
                button.classList.toggle("active", index === currentIndex);
                button.classList.toggle("answered", answers[index] !== null);
            });
            elements.previous.disabled = currentIndex === 0;
            elements.next.innerHTML = currentIndex === questions.length - 1
                ? "Finish <i class=\"fa-solid fa-check\"></i>"
                : "Next <i class=\"fa-solid fa-arrow-right\"></i>";
        };

        const formatTime = () => {
            const minutes = Math.floor(remainingSeconds / 60).toString().padStart(2, "0");
            const seconds = (remainingSeconds % 60).toString().padStart(2, "0");
            elements.timer.textContent = `${minutes}:${seconds}`;
        };

        const finishQuiz = (timedOut = false) => {
            if (isFinished) return;
            isFinished = true;
            clearInterval(timerId);
            const answered = answers.filter((answer) => answer !== null).length;
            const score = answers.reduce((total, answer, index) =>
                total + (answer !== null && answer === questions[index].answer ? 1 : 0), 0);
            const wrong = answered - score;
            const unanswered = questions.length - answered;
            const percentage = Math.round((score / questions.length) * 100);

            elements.questionCard.innerHTML = `
                <div class="result-content">
                    <div class="category-icon"><i class="fa-solid fa-trophy"></i></div>
                    <h2 class="question-title">${timedOut ? "Time's up!" : "Quiz complete!"}</h2>
                    <p>You scored <strong>${score} / ${questions.length}</strong> (${percentage}%).</p>
                    <div class="result-stats" aria-label="Quiz results">
                        <div class="result-stat correct"><strong>${score}</strong><span>Correct</span></div>
                        <div class="result-stat wrong"><strong>${wrong}</strong><span>Wrong</span></div>
                        <div class="result-stat answered"><strong>${answered}</strong><span>Answered</span></div>
                        <div class="result-stat unanswered"><strong>${unanswered}</strong><span>Left</span></div>
                    </div>
                    <h3 class="review-title">Question review</h3>
                    <div class="answer-review"></div>
                    <div class="question-actions">
                        <button class="previous-btn" type="button" data-action="restart">Try Again</button>
                        <a class="next-btn result-link" href="Quiz Category.html">Choose Category</a>
                    </div>
                </div>`;

            const review = elements.questionCard.querySelector(".answer-review");
            questions.forEach((question, index) => {
                const selectedAnswer = answers[index];
                const item = document.createElement("div");
                const isCorrect = selectedAnswer !== null && selectedAnswer === question.answer;
                item.className = `answer-review-item ${selectedAnswer === null ? "unanswered" : isCorrect ? "correct" : "wrong"}`;
                item.innerHTML = `<span class="review-number">${index + 1}</span><span class="review-question"></span><span class="review-status"></span>`;
                item.querySelector(".review-question").textContent = question.question;
                item.querySelector(".review-status").textContent = selectedAnswer === null
                    ? "Not answered"
                    : isCorrect ? "Correct" : "Wrong";
                review.appendChild(item);
            });
            elements.questionCard.querySelector("[data-action='restart']").addEventListener("click", () => window.location.reload());
        };

        elements.previous.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex -= 1;
                renderQuestion();
            }
        });
        elements.next.addEventListener("click", () => {
            if (currentIndex === questions.length - 1) finishQuiz();
            else {
                currentIndex += 1;
                renderQuestion();
            }
        });
        elements.exit.addEventListener("click", () => {
            if (window.confirm("Exit this quiz? Your progress will be lost.")) {
                window.location.href = "Quiz Category.html";
            }
        });

        renderGrid();
        renderQuestion();
        formatTime();
        timerId = window.setInterval(() => {
            remainingSeconds -= 1;
            formatTime();
            if (remainingSeconds <= 0) finishQuiz(true);
        }, 1000);
    }

    setupCategoryPage();
    setupQuizPage();
})();
