// ELEMENTS

// TYPING TEXT SAMPLES
const textSamples = [

    "Modern interfaces should feel clean responsive and comfortable for users on every device.",

    "JavaScript allows developers to build interactive applications directly in the browser.",

    "Consistent practice is one of the best ways to improve typing speed and coding skills.",

    "Frontend development combines creativity logic and user experience into one workflow.",

    "Simple projects that are polished properly can become impressive portfolio pieces."

];

const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const noSpaceCount = document.getElementById("no-space-count");

const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");

// TYPING ELEMENTS
const generatedText = document.getElementById("generated-text");
const typingInput = document.getElementById("typing-input");

const timeDisplay = document.getElementById("time-display");
const currentWpmDisplay = document.getElementById("current-wpm");
const averageWpmDisplay = document.getElementById("average-wpm");

const restartBtn = document.getElementById("restart-btn");

const typingResult = document.querySelector(".typing-result");

// TYPING VARIABLES
let startTime = null;
let timerInterval = null;

let currentText = "";
let typingStarted = false;

// GENERATE RANDOM TEXT
function generateRandomText() {

    const randomIndex = Math.floor(
        Math.random() * textSamples.length
    );

    currentText = textSamples[randomIndex];

    generatedText.innerHTML = "";

    currentText.split("").forEach((char) => {

        const span = document.createElement("span");

        span.textContent = char;

        generatedText.appendChild(span);

    });

    updateCharacterState();

}

// START TIMER
function startTimer() {

    startTime = new Date();

    timerInterval = setInterval(() => {

        const currentTime = new Date();

        const seconds =
            Math.floor((currentTime - startTime) / 1000);

        timeDisplay.textContent = `${seconds}s`;

        updateWPM(seconds);

    }, 1000);

}

// UPDATE WPM
function updateWPM(seconds) {

    if (seconds === 0) return;

    const typedText = typingInput.value;

    // STANDARD WPM FORMULA
    const wordsTyped = typedText.length / 5;

    const minutes = seconds / 60;

    const wpm = Math.floor(wordsTyped / minutes);

    currentWpmDisplay.textContent = wpm;
    averageWpmDisplay.textContent = wpm;

    // CHARACTER MATCHING
    function updateCharacterState() {

        const typedChars = typingInput.value.split("");

        const textSpans = generatedText.querySelectorAll("span");

        textSpans.forEach((span, index) => {

            const typedChar = typedChars[index];

            // RESET
            span.classList.remove(
                "correct",
                "incorrect",
                "current"
            );

            // CURRENT CHARACTER
            if (typedChar == null) {

                if (index === typedChars.length) {
                    span.classList.add("current");
                }

            }

            // CORRECT
            else if (typedChar === span.textContent) {

                span.classList.add("correct");

            }

            // INCORRECT
            else {

                span.classList.add("incorrect");

            }

        });

    }

}

// START TYPING SESSION
typingInput.addEventListener("input", () => {

    // START TIMER ON FIRST INPUT
    if (!typingStarted) {

        typingStarted = true;

        startTimer();

    }

    checkTypingComplete();
    updateCharacterState();

});

// CHECK COMPLETE
function checkTypingComplete() {

    const typedText = typingInput.value;

    if (typedText === currentText) {

        clearInterval(timerInterval);

        typingInput.disabled = true;

        typingResult.classList.remove("hidden");

    }

}

// RESTART TEST
function restartTypingTest() {

    clearInterval(timerInterval);

    typingStarted = false;

    startTime = null;

    typingInput.disabled = false;

    typingInput.value = "";

    timeDisplay.textContent = "0s";

    currentWpmDisplay.textContent = "0";

    averageWpmDisplay.textContent = "0";

    typingResult.classList.add("hidden");

    generateRandomText();
    updateCharacterState();

}

// RESTART BUTTON
restartBtn.addEventListener(
    "click",
    restartTypingTest
);

// UPDATE COUNTER
function updateCounter() {

    const text = textInput.value;

    // TOTAL CHARACTERS
    charCount.textContent = text.length;

    // CHARACTERS WITHOUT SPACES
    const noSpaces = text.replace(/\s/g, "");
    noSpaceCount.textContent = noSpaces.length;

    // AUTO RESIZE
    textInput.style.height = "auto";
    textInput.style.height = textInput.scrollHeight + "px";
}


// INPUT EVENT
textInput.addEventListener("input", updateCounter);


// CLEAR BUTTON
clearBtn.addEventListener("click", () => {

    textInput.value = "";

    updateCounter();

});


// COPY BUTTON
copyBtn.addEventListener("click", async () => {

    try {

        await navigator.clipboard.writeText(textInput.value);

        copyBtn.textContent = "Copied!";

        setTimeout(() => {
            copyBtn.textContent = "Copy Text";
        }, 2000);

    } catch (error) {

        alert("Failed to copy text.");

    }

});


// INITIAL RUN
updateCounter();

// SIDEBAR NAVIGATION
const sidebarIcons = document.querySelectorAll(".sidebar-icon");
const panels = document.querySelectorAll(".panel");


sidebarIcons.forEach((icon) => {

    icon.addEventListener("click", () => {

        // REMOVE ACTIVE ICON
        sidebarIcons.forEach((item) => {
            item.classList.remove("active");
        });

        // ADD ACTIVE ICON
        icon.classList.add("active");

        // TARGET PANEL
        const targetPanel = icon.dataset.panel;

        // HIDE ALL PANELS
        panels.forEach((panel) => {
            panel.classList.remove("active-panel");
        });

        // SHOW TARGET PANEL
        document
            .getElementById(targetPanel)
            .classList.add("active-panel");

    });

});

// INITIALIZE TYPING TEST
generateRandomText();