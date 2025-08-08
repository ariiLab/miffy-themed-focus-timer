document.addEventListener('DOMContentLoaded', () => {
  let timer;
  let isRunning = false;

  const miffy = document.getElementById('miffy');
  const timerDisplay = document.getElementById('timer');
  const timerSelect = document.getElementById('timerSelect');
  let timeLeft = parseInt(timerSelect.value); //initial time from select

  const startBtn = document.getElementById('startBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const resetBtn = document.getElementById('resetBtn');

  function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent =
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  function startTimer() {
    if (!isRunning) {
        if (timeLeft === 0) {
            timeLeft = parseInt(timerSelect.value);
        }
      isRunning = true;
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateTimerDisplay();
        } else {
          clearInterval(timer);
          isRunning = false;
          alert("Focus session complete!💐");
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeLeft = parseInt(timerSelect.value);
    updateTimerDisplay();
  }

  timerSelect.addEventListener('change', () => {
   if (!isRunning) {
    timeLeft = parseInt(timerSelect.value);
    updateTimerDisplay();
  }
  });

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  updateTimerDisplay();

  // Music Player
  let currentIndex = 0;
  const audioPlayer = document.getElementById('audioPlayer');
  const trackSelect = document.getElementById('trackSelect');
  const musicPrevBtn = document.getElementById('musicPrevBtn');
  const musicPlayPauseBtn = document.getElementById('musicPlayPauseBtn');
  const musicNextBtn = document.getElementById('musicNextBtn');
  
  // set initial track
  audioPlayer.src = trackSelect.value;

  // change track by selection
  trackSelect.addEventListener('change', () => {
    audioPlayer.src = trackSelect.value;
    audioPlayer.play();
    musicPlayPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
  });

  //set initial play button
  musicPlayPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';

  //if the track ends continue plays another

audioPlayer.addEventListener('ended', () => {
  // Move to next track index (loop back if at end)
  currentIndex = (currentIndex + 1) % trackSelect.options.length;
  
  // Update the select dropdown visually
  trackSelect.selectedIndex = currentIndex;
  
  // Change audio source to next track
  audioPlayer.src = trackSelect.value;
  
  // Play the new track
  audioPlayer.play();
  
  // Update the play/pause button icon to pause
  musicPlayPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
});


  // music prev button
  document.getElementById('musicPrevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + trackSelect.options.length) % trackSelect.options.length;
    trackSelect.selectedIndex = currentIndex;
    audioPlayer.src = trackSelect.value;
    audioPlayer.play();
    musicPlayPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
  });

  // music play/pause button
  document.getElementById('musicPlayPauseBtn').addEventListener('click', () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      musicPlayPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
    } else {
      audioPlayer.pause();
      musicPlayPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
    }
  });

  // Next button
  document.getElementById('musicNextBtn').addEventListener('click', () => {
    currentIndex = (trackSelect.selectedIndex + 1) % trackSelect.options.length;
    trackSelect.selectedIndex = currentIndex;
    audioPlayer.src = trackSelect.value;
    audioPlayer.load();
    audioPlayer.play();
    musicPlayPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
  });
});




