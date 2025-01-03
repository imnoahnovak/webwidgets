// Utility function to set a cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
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

// Utility function to set an item in local storage
function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Utility function to get an item from local storage
function getLocalStorageItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Utility function to remove an item from local storage
function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
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
    if (toggleButton) {
        toggleButton.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    }
}

// Initialize the theme from the cookie or default to "auto"
function initTheme() {
    const savedTheme = getCookie("theme") || "auto";
    applyTheme(savedTheme);
}

// Set up the toggle button functionality
function setupThemeToggle() {
    const toggleButton = document.getElementById("theme-toggle");
    if (toggleButton) {
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
}

// Function to edit the name
function editName() {
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
        const input = document.createElement("input");
        input.type = "text";
        input.value = document.getElementById("name").textContent;

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.addEventListener("click", function () {
            const newName = input.value;
            if (!/^[A-Za-z]+$/.test(newName)) {
                alert("Please enter a valid name.");
            } else {
                setCookie("name", newName, 30);
                document.getElementById("name").textContent = newName;
                document.getElementById("edit").innerHTML = "";
                document.getElementById("edit").appendChild(editButton);
            }
        });

        document.getElementById("edit").innerHTML = "";
        document.getElementById("edit").appendChild(input);
        document.getElementById("edit").appendChild(saveButton);
    });

    document.getElementById("edit").innerHTML = "";
    document.getElementById("edit").appendChild(editButton);
}

// Initialize the name from the cookie or default to "User"
function initName() {
    const savedName = getCookie("name") || "User";
    document.getElementById("name").textContent = savedName;
    editName();
}

// Initialize the clock settings
function initClock() {
    let is24HourFormat = getCookie('is24HourFormat') === 'true';
    let showSeconds = getCookie('showSeconds') === 'true';

    function startTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);

        let timeString = h + ":" + m;
        if (showSeconds) {
            timeString += ":" + s;
        }

        if (!is24HourFormat) {
            let AMPM = "AM";
            if (h > 12) {
                h = h - 12;
                AMPM = "PM";
            }
            if (h === 0) {
                h = 12;
            }
            timeString = h + ":" + m;
            if (showSeconds) {
                timeString += ":" + s;
            }
            timeString += " " + AMPM;
        }

        document.getElementById('txt').innerHTML = timeString;
        setTimeout(startTime, 1000);
    }

    function checkTime(i) {
        if (i < 10) { i = "0" + i; }  // add zero in front of numbers < 10
        return i;
    }

    document.getElementById('time-format-12').addEventListener('click', function () {
        is24HourFormat = false;
        setCookie('is24HourFormat', is24HourFormat, 30);
    });

    document.getElementById('time-format-24').addEventListener('click', function () {
        is24HourFormat = true;
        setCookie('is24HourFormat', is24HourFormat, 30);
    });

    document.getElementById('show-seconds').addEventListener('click', function () {
        showSeconds = !showSeconds;
        setCookie('showSeconds', showSeconds, 30);
        this.textContent = showSeconds ? "Hide Seconds" : "Show Seconds";
    });

    startTime();
}

// Function to get weather data
async function getWeatherData(latitude, longitude) {
    const url = `https://api.weather.gov/points/${latitude},${longitude}/forecast`;
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'YourAppName (your.email@example.com)'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Function to get the user's location and fetch weather data
function weatherLocation() {
    function showPosition(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude);
        getWeatherData(latitude, longitude)
            .then(data => {
                console.log(data);
                // Process and display the weather data as needed
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, function (error) {
            console.error('Error getting location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Initialize all preferences
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupThemeToggle();
    initName();
    initClock();
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        initTheme();
    }
});

// Get cookies as an object for better management
function getCookies() {
    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
        const [key, value] = cookie.trim().split('=');
        cookies[key] = decodeURIComponent(value);
    });
    return cookies;
}

let notes = []; // Array to store notes

// Save notes to localStorage
function saveNotesToStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotesFromStorage() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        notes = JSON.parse(storedNotes);
    }
}

// Show the editor for adding a note
function showEditor() {
    document.getElementById("editor-container").style.display = "flex";
    document.getElementById("note-title-input").value = ""; // Clear the title input
    document.getElementById("note-content-input").value = ""; // Clear the content textarea
}

// Hide the editor
function hideEditor() {
    document.getElementById("editor-container").style.display = "none";
}

// Save a new note
function saveNote() {
    const title = document.getElementById("note-title-input").value.trim();
    const content = document.getElementById("note-content-input").value.trim();
    const date = new Date().toLocaleString();

    if (!title || !content) {
        alert("Please provide both a title and content.");
        return;
    }

    const note = { title, content, date };
    notes.push(note);

    saveNotesToStorage();
    displayNotes(); // Refresh the displayed notes
    hideEditor();
}

// Display the list of notes
function displayNotes() {
    const notesList = document.getElementById("notes-list");
    notesList.innerHTML = ""; // Clear the list

    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note-preview";
        noteDiv.innerHTML = `
            <h4>${note.title}</h4>
            <p>${note.content.slice(0, 50)}...</p>
        `;

        // Attach the event listener to show note details
        noteDiv.addEventListener("click", () => showNoteDetails(index));
        notesList.appendChild(noteDiv);
    });
}

// Show the details of a selected note
function showNoteDetails(index) {
    const note = notes[index];
    if (!note) {
        console.error("No note found for index:", index);
        return;
    }

    // Update the preview panel with plain text
    document.getElementById("note-title-display").textContent = note.title || "Untitled Note";
    document.getElementById("note-date-display").textContent = note.date || "Unknown Date";
    document.getElementById("note-content-display").textContent = note.content || "No content available.";

    // Make the preview panel active
    const rightPanel = document.getElementById("right-panel");
    rightPanel.classList.add("active");
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
    loadNotesFromStorage();
    document.getElementById("add-note-button").addEventListener("click", showEditor);
    document.getElementById("save-note-button").addEventListener("click", saveNote);
    document.getElementById("cancel-note-button").addEventListener("click", hideEditor);
    displayNotes();
});
