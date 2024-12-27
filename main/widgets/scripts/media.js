document.addEventListener('DOMContentLoaded', function() {
    const mediaElement = document.getElementById('mediaElement'); 
    const fileInput = document.getElementById('fileInput');
    const originalBackgroundColor = document.body.style.backgroundColor;

    const uploadButton = document.querySelector('.custom-file-upload');
    uploadButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default action
        fileInput.click();
    });

    const settingsButton = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');
    settingsButton.addEventListener('click', function() {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
    
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'controlsContainer';
    controlsContainer.style.display = 'none'; // Initially hidden
    controlsContainer.style.justifyContent = 'center';
    controlsContainer.style.marginTop = '10px';
    controlsContainer.style.position = 'absolute'; // Adjust position
    controlsContainer.style.bottom = '20px'; // Adjust bottom position
    controlsContainer.style.left = '50%'; // Center horizontally
    controlsContainer.style.transform = 'translateX(-50%)'; // Center horizontally
    controlsContainer.style.transition = 'opacity 0.5s';
    controlsContainer.style.opacity = '1';

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
    volumeControl.step = '0.01';
    volumeControl.value = mediaElement.volume;

    const volumeLabel = document.createElement('span');
    volumeLabel.id = 'volumeLabel';
    volumeLabel.style.display = 'none';
    volumeLabel.textContent = `Volume: ${Math.round(volumeControl.value * 100)}%`;

    volumeControl.addEventListener('input', function() {
        mediaElement.volume = volumeControl.value;
        volumeLabel.textContent = `Volume: ${Math.round(volumeControl.value * 100)}%`;
        volumeLabel.style.display = 'inline';
        volumeLabel.classList.add('show');
        clearTimeout(volumeLabel.hideTimeout);
        volumeLabel.hideTimeout = setTimeout(function() {
            volumeLabel.classList.remove('show');
        }, 2000);
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
        mediaElement.style.display = 'block';
        if (mediaElement.ended) {
            playPauseButton.textContent = 'Play';
        }
    });

    const rewindButton = document.createElement('button');
    rewindButton.textContent = '-10s';
    rewindButton.addEventListener('click', function() {
        mediaElement.currentTime -= 10;
    });

    const fastForwardButton = document.createElement('button');
    fastForwardButton.textContent = '+10s';
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

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            mediaElement.src = url;
        }

        else {
            alert('Invalid file type. Please select a valid video or audio file.');
        }
    });

    mediaElement.addEventListener('play', function() {
        // Code to show media playback
        console.log('Media is now playing');
        controlsContainer.style.display = 'flex';
    });

    mediaElement.addEventListener('pause', function() {
        console.log('Media is paused');
        controlsContainer.style.display = 'flex';
    });

    mediaElement.addEventListener('ended', function() {
        console.log('Media has ended');
        controlsContainer.style.display = 'flex';
        document.body.style.backgroundColor = originalBackgroundColor;
    });

    let hideControlsTimeout;

    function showControls() {
        controlsContainer.style.opacity = '1';
        clearTimeout(hideControlsTimeout);
        hideControlsTimeout = setTimeout(hideControls, 3000); // Hide controls after 3 seconds of inactivity
    }

    function hideControls() {
        controlsContainer.style.opacity = '0';
    }

    document.addEventListener('mousemove', showControls);
    document.addEventListener('keydown', showControls);
    controlsContainer.addEventListener('mousemove', showControls);
    mediaElement.addEventListener('play', showControls);
    mediaElement.addEventListener('pause', showControls);

    showControls(); // Initialize controls visibility

    document.getElementById('theme-toggle').addEventListener('click', function () {
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
});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        // Reinitialize any state or UI that needs to be restored
        initTheme();
    }
});