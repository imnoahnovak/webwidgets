function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()}`;
}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

function setLocalStorageItem(key, value) {
    localStorage
        .setItem(key, JSON.stringify(value));
}

function getLocalStorageItem(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
}

function note() {
    const note = getLocalStorageItem("note");
    if (note) {
        document.getElementById("note").textContent = note;
    }
}