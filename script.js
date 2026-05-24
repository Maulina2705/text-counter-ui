// ELEMENTS
const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");
const noSpaceCount = document.getElementById("no-space-count");

const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");


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