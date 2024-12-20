document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const loadButton = document.getElementById('loadButton');
    const backButton = document.getElementById('backButton');
    const forwardButton = document.getElementById('forwardButton');
    const iframe = document.getElementById('iframe');
    const iframeHistory = [];
    let currentIndex = -1;

    loadButton.addEventListener('click', () => {
        const url = input.value;
        if (url) {
            iframe.src = url;
            iframeHistory.push(url);
            currentIndex++;
        } else {
            alert("No URL provided.");
        }
    });

    backButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            iframe.src = iframeHistory[currentIndex];
        } else {
            alert("No previous URL.");
        }
    });

    forwardButton.addEventListener('click', () => {
        if (currentIndex < iframeHistory.length - 1) {
            currentIndex++;
            iframe.src = iframeHistory[currentIndex];
        } else {
            alert("No next URL.");
        }
    });
});