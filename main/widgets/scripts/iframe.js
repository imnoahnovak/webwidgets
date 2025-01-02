document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const loadButton = document.getElementById('loadButton');
    const backButton = document.getElementById('backButton');
    const forwardButton = document.getElementById('forwardButton');
    const iframe = document.getElementById('iframe');
    const iframeHistory = [];
    let currentIndex = -1;

    // Function to validate and sanitize URLs
    const sanitizeURL = (url) => {
        try {
            const parsedURL = new URL(url);
            if (['http:', 'https:'].includes(parsedURL.protocol)) {
                return parsedURL.href;
            } else {
                throw new Error('Unsupported protocol');
            }
        } catch (error) {
            alert("Invalid or unsafe URL.");
            return null;
        }
    };

    loadButton.addEventListener('click', () => {
        const url = sanitizeURL(input.value.trim());
        if (url) {
            iframe.src = url; // Safe assignment
            iframeHistory.push(url);
            currentIndex++;
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
