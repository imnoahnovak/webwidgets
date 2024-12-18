// Utility function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Utility function to get a cookie
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

// Apply the theme to the document
function applyTheme(theme) {
    document.body.classList.remove("light", "dark", "auto");
    document.body.classList.add(theme);
    const toggleButton = document.getElementById("theme-toggle");
    toggleButton.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
}

// Initialize the theme from the cookie or default to "auto"
function initTheme() {
    const savedTheme = getCookie("theme") || "auto";

    // Set a default theme based on system preferences if "auto" is selected
    if (savedTheme === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.body.style.setProperty("--bg-color", prefersDark ? "#000000" : "#ffffff");
        document.body.style.setProperty("--text-color", prefersDark ? "#ffffff" : "#000000");
    }

    applyTheme(savedTheme);
}

// Set up the toggle button functionality
function setupThemeToggle() {
    const toggleButton = document.getElementById("theme-toggle");
    toggleButton.addEventListener("click", () => {
        const currentTheme = getCookie("theme") || "auto";
        let newTheme;

        if (currentTheme === "light") {
            newTheme = "dark";
        } else if (currentTheme === "dark") {
            newTheme = "auto";
        } else {
            newTheme = "light";
        }

        setCookie("theme", newTheme, 7); // Save the theme in a cookie for 7 days
        applyTheme(newTheme);
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupThemeToggle();
});