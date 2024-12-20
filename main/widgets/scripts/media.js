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

    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'controlsContainer';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.justifyContent = 'center';
    controlsContainer.style.marginTop = '10px';

    const playPauseButton = document.createElement('button');
    playPauseButton.textContent = 'Pause';
    playPauseButton.addEventListener('click', function() {
        if (mediaElement.paused) {
            mediaElement.play();
            playPauseButton.textContent = 'Pause';
        } else {
            mediaElement.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    const volumeControl = document.createElement('input');
    volumeControl.type = 'range';
    volumeControl.min = '0';
    volumeControl.max = '1';
    volumeControl.step = '0.1';
    volumeControl.value = mediaElement.volume;

    const volumeLabel = document.createElement('span');
    volumeLabel.textContent = `Volume: ${Math.round(volumeControl.value * 100)}%`;

    volumeControl.addEventListener('input', function() {
        mediaElement.volume = volumeControl.value;
        volumeLabel.textContent = `Volume: ${Math.round(volumeControl.value * 100)}%`;
    });

    const progressBar = document.createElement('input');
    progressBar.type = 'range';
    progressBar.min = '0';
    progressBar.max = '100';
    progressBar.value = '0';
    progressBar.addEventListener('input', function() {
        const seekTime = (progressBar.value / 100) * mediaElement.duration;
        mediaElement.currentTime = seekTime;
    });

    mediaElement.addEventListener('timeupdate', function() {
        const progress = (mediaElement.currentTime / mediaElement.duration) * 100;
        progressBar.value = progress;
        if (mediaElement.ended) {
            playPauseButton.textContent = 'Play';
        }
    });

    const rewindButton = document.createElement('button');
    rewindButton.textContent = 'Rewind 10s';
    rewindButton.addEventListener('click', function() {
        mediaElement.currentTime -= 10;
    });

    const fastForwardButton = document.createElement('button');
    fastForwardButton.textContent = 'Fast Forward 10s';
    fastForwardButton.addEventListener('click', function() {
        mediaElement.currentTime += 10;
    });

    controlsContainer.appendChild(playPauseButton);
    controlsContainer.appendChild(volumeControl);
    controlsContainer.appendChild(volumeLabel);
    controlsContainer.appendChild(progressBar);
    controlsContainer.appendChild(rewindButton);
    controlsContainer.appendChild(fastForwardButton);

    document.body.appendChild(controlsContainer);
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