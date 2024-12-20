// Utility function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const secure = "Secure"; // Ensure the cookie is only sent over HTTPS
    const httpOnly = "HttpOnly"; // Prevent JavaScript access to the cookie
    const sameSite = "SameSite=Lax"; // Adjust SameSite attribute as needed
    document.cookie = `${name}=${value};${expires};path=/;${secure};${httpOnly};${sameSite}`;
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
    document.body.classList.remove("light", "dark", "auto", "auto-light", "auto-dark");
    if (theme === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.body.classList.add(prefersDark ? "auto-dark" : "auto-light");
    } else {
        document.body.classList.add(theme);
    }
    const toggleButton = document.getElementById("theme-toggle");
    toggleButton.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
}

// Initialize the theme from the cookie or default to "auto"
function initTheme() {
    const savedTheme = getCookie("theme") || "auto";
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

        setCookie("theme", newTheme, 365 * 10); // Save the theme in a cookie for 10 years
        applyTheme(newTheme);
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupThemeToggle();
});