document.addEventListener('DOMContentLoaded', function() {
    const mediaElement = document.getElementById('mediaElement'); // Replace with your media element's ID
    const fileInput = document.getElementById('fileInput'); // Replace with your file input element's ID

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const source = mediaElement.querySelector('source');
            source.src = url;
            mediaElement.load(); // Load the new source
            mediaElement.play(); // Optionally start playing the media
        }
    });

    mediaElement.addEventListener('play', function() {
        // Code to show media playback
        console.log('Media is now playing');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(function () {
        notification.style.bottom = '10px';
    }, 100); // Delay to allow transition effect
    setTimeout(function () {
        notification.style.opacity = '0';
        notification.style.bottom = '-100px';
        setTimeout(function () {
            notification.style.display = 'none';
        }, 1000); // Match the transition duration
    }, 7000); // 10 seconds
});