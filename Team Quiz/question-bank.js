/*
 * Question management
 *
 * Add, edit, or remove questions in this file. Every question must contain:
 * id, category, question, options, and answer (the zero-based correct option).
 */
const QUESTION_BANK = {
    "General Knowledge": [
        {
            id: "general-1",
            question: "Which is the largest planet in our Solar System?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: 2
        },
        {
            id: "general-2",
            question: "What is the capital city of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            answer: 2
        },
        {
            id: "general-3",
            question: "How many continents are there?",
            options: ["Five", "Six", "Seven", "Eight"],
            answer: 2
        }
    ],
    Science: [
        {
            id: "science-1",
            question: "What gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
            answer: 1
        },
        {
            id: "science-2",
            question: "What is the chemical symbol for gold?",
            options: ["Ag", "Gd", "Go", "Au"],
            answer: 3
        },
        {
            id: "science-3",
            question: "Which organ pumps blood around the human body?",
            options: ["Lungs", "Brain", "Heart", "Liver"],
            answer: 2
        },
        {
            id: "science-4",
            question: "How many main blood groups are there in humans?",
            options: ["1", "5", "3", "4"],
            answer: 3
        }
    ],
    Mathematics: [
        {
            id: "math-1",
            question: "What is 12 × 8?",
            options: ["86", "96", "108", "112"],
            answer: 1
        },
        {
            id: "math-2",
            question: "What is the square root of 144?",
            options: ["10", "11", "12", "14"],
            answer: 2
        },
        {
            id: "math-3",
            question: "A triangle has angles of 60° and 60°. What is the third angle?",
            options: ["30°", "45°", "60°", "90°"],
            answer: 2
        }
    ],
    History: [
        {
            id: "history-1",
            question: "Who was the first person to walk on the Moon?",
            options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Michael Collins"],
            answer: 1
        },
        {
            id: "history-2",
            question: "The pyramids of Giza were built in which country?",
            options: ["Mexico", "Greece", "Egypt", "Peru"],
            answer: 2
        },
        {
            id: "history-3",
            question: "Which ancient civilization created democracy in Athens?",
            options: ["Romans", "Greeks", "Vikings", "Persians"],
            answer: 1
        }
    ],
    "Computer Science": [
        {
            id: "computer-1",
            question: "What does HTML stand for?",
            options: ["HyperText Markup Language", "HighText Machine Language", "Home Tool Markup Language", "Hyperlink Text Management Language"],
            answer: 0
        },
        {
            id: "computer-2",
            question: "Which device is used to store data permanently?",
            options: ["RAM", "CPU", "SSD", "Cache"],
            answer: 2
        },
        {
            id: "computer-3",
            question: "Which language is primarily used to style web pages?",
            options: ["HTML", "CSS", "SQL", "Python"],
            answer: 1
        }
    ],
    English: [
        {
            id: "english-1",
            question: "Which word is a synonym for 'rapid'?",
            options: ["Slow", "Quick", "Quiet", "Small"],
            answer: 1
        },
        {
            id: "english-2",
            question: "What is the plural of 'child'?",
            options: ["Childs", "Childes", "Children", "Childrens"],
            answer: 2
        },
        {
            id: "english-3",
            question: "Which word is an adjective?",
            options: ["Beautiful", "Run", "Quickly", "Happiness"],
            answer: 0
        }
    ],
    "Current Affairs": [
        {
            id: "current-1",
            question: "Which organization is responsible for setting international public health guidance?",
            options: ["WHO", "WTO", "UNESCO", "FIFA"],
            answer: 0
        },
        {
            id: "current-2",
            question: "What does GDP measure?",
            options: ["A country's total economic output", "A country's population", "A country's land area", "A country's rainfall"],
            answer: 0
        },
        {
            id: "current-3",
            question: "Which technology is used to create tamper-resistant digital ledgers?",
            options: ["Bluetooth", "Blockchain", "Compiler", "Router"],
            answer: 1
        }
    ]
};

QUESTION_BANK["Mixed Quiz"] = Object.keys(QUESTION_BANK)
    .filter((category) => category !== "Mixed Quiz")
    .flatMap((category) => QUESTION_BANK[category].slice(0, 1));

function getQuestions(category) {
    const questions = QUESTION_BANK[category] || QUESTION_BANK["General Knowledge"];
    questions.forEach(validateQuestion);
    return questions.map((question) => ({ ...question, options: [...question.options] }));
}

function validateQuestion(question) {
    if (!question || typeof question.question !== "string" || !question.question.trim() ||
        !Array.isArray(question.options) || question.options.length < 2 ||
        question.options.some((option) => typeof option !== "string" || !option.trim()) ||
        !Number.isInteger(question.answer) || question.answer < 0 ||
        question.answer >= question.options.length) {
        throw new Error(`Invalid question "${question && question.id ? question.id : "unknown"}". Answers must use a valid zero-based option index.`);
    }
    return question;
}

function addQuestion(category, question, options, answer) {
    const newQuestion = {
        id: `${typeof category === "string" ? category.toLowerCase().replace(/\s+/g, "-") : "question"}-${Date.now()}`,
        question,
        options: Array.isArray(options) ? [...options] : options,
        answer
    };
    if (!category) throw new Error("A question needs a category.");
    validateQuestion(newQuestion);
    if (!QUESTION_BANK[category]) QUESTION_BANK[category] = [];
    QUESTION_BANK[category].push(newQuestion);
    return newQuestion;
}

function updateQuestion(category, questionId, changes) {
    const questions = QUESTION_BANK[category];
    const index = questions ? questions.findIndex((question) => question.id === questionId) : -1;
    if (index === -1) throw new Error(`Question "${questionId}" was not found.`);

    const updatedQuestion = {
        ...QUESTION_BANK[category][index],
        ...changes
    };
    validateQuestion(updatedQuestion);
    QUESTION_BANK[category][index] = updatedQuestion;
    return updatedQuestion;
}

function removeQuestion(category, questionId) {
    const questions = QUESTION_BANK[category];
    const index = questions ? questions.findIndex((question) => question.id === questionId) : -1;
    if (index === -1) throw new Error(`Question "${questionId}" was not found.`);
    return questions.splice(index, 1)[0];
}
