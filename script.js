let btn = document.querySelector(".block");
let playIcon = document.querySelector(".fa-play");
let pauseIcon = document.querySelector(".fa-pause");
let video = document.querySelector("video");
let audio = document.querySelector("audio");
let songList = document.getElementsByClassName("song");
let slider = document.getElementById("slider");
let volume = document.getElementById("volume");
let volIcon = document.getElementsByClassName("volume")[0];
let timer = document.getElementById("timer");
volIcon.addEventListener("click", () => {
 // Toggle volume between 0% and 100%
 if (audio.volume > 0) {
  // Set volume to 0%
  audio.volume = 0;
 } else {
  // Set volume to 100%
  audio.volume = 1;
 }

 // Update the slider value to match the current volume level
 volume.value = audio.volume * 100;
});
btn.classList.add("disabled");
const videos = [
 {
  name: "nothing",
  src: "nothing",
 },
 {
  name: "ecstacy",
  src: "vids/Francisco Lachowski _ Ecstacy.mp4",
 },
 {
  name: "better off alone",
  src: "vids/dancin.mp4",
 },
 {
  name: "joe untitled",
  src: "vids/untitled.mp4",
 },
 {
  name: "Lucky Twice",
  src: "vids/Lucky Twice.mp4",
 },
 {
  name: "Say it right",
  src: "vids/Say it right sped up_v.mp4",
 },
 {
  name: "Don't Stop the music",
  src: "vids/Kevin Levrone Theme.mp4",
 },
 {
  name: "BRITNEY MANSON - FASHION",
  src: "vids/Fashion.mp4",
 },
 {
  name: "Lost Soul Down",
  src: "vids/Catwoman Edit __ THE LOST SOUL DOWN X LOST SOUL (Slowed + Reverb).mp4",
 },
 {
  name: "I will do it",
  src: "vids/I will do it.mp4",
 },
 {
  name: "stereo love",
  src: "vids/stereo love.mp4",
 },
 {
  name: "sea of feelings",
  src: "vids/sea of feelings.mp4",
 },
 {
  name: "Dancin",
  src: "vids/ricardo.mp4",
 },
 {
  name: "Chill Bill",
  src: "vids/Chill Bill.mp4",
 },
 {
  name: "on the floor",
  src: "vids/on the floor.mp4",
 },
 {
  name: "comfort chain",
  src: "vids/comfort chain.mp4",
 },
];

let song;
let isPlaying = false;

songList[0].addEventListener("click", () => {
 console.log("Doing Nothing");
});

for (let i = 1; i < songList.length; i++) {
 let currentSong = songList[i];
 currentSong.addEventListener("click", () => {
  slider.value = 0;
  // Set the initial song to the clicked song
  audio.src = currentSong.querySelector("audio").src;
  console.log(audio.src, songList[i]);
  // Remove 'songActive' class from all songs
  for (let j = 1; j < songList.length; j++) {
   songList[j].classList.remove("songActive");
  }

  // Add 'songActive' class to the clicked song
  currentSong.classList.add("songActive");
  song = i;
  // Check the condition with updated values of song and currentSong
  video.src = videos[song].src;
  btn.classList.remove("disabled");
  if (i !== song || !isPlaying) {
   playPause();
  }
 });
}

function playPause() {
 if (video.paused && audio.paused) {
  btn.style.border = "0px solid transparent";
  playIcon.classList.add("hidden");
  pauseIcon.classList.remove("hidden");
  video.play();
  audio.play();
  isPlaying = true;
 } else {
  video.pause();
  audio.pause();
  isPlaying = false;
  btn.style.border = "3px solid #262626";
  playIcon.classList.remove("hidden");
  pauseIcon.classList.add("hidden");
 }
}

btn.style.border = "3px solid #262626";

// Add this code after defining the 'audio' element
audio.addEventListener("ended", () => {
 // Reset the button state
 btn.classList.remove("paused");
 btn.style.border = "3px solid #262626";
 playIcon.classList.remove("hidden");
 pauseIcon.classList.add("hidden");
});

// Modify the existing click event listener
btn.addEventListener("click", () => {
 playPause();
 btn.classList.toggle("paused");

 if (audio.paused) {
  // If audio is paused, show play icon and border
  btn.style.border = "3px solid #262626";
  playIcon.classList.remove("hidden");
  pauseIcon.classList.add("hidden");
 } else {
  // video.play();
  // If audio is playing, show pause icon and remove border
  btn.style.border = "0px solid transparent";
  playIcon.classList.add("hidden");
  pauseIcon.classList.remove("hidden");
 }
});

slider.addEventListener("input", () => {
 const currentTime = (slider.value * audio.duration) / 100;
 audio.currentTime = currentTime;
});

audio.addEventListener("timeupdate", () => {
 const progress = (audio.currentTime / audio.duration) * 100;
 slider.value = progress;
 updateTimer();
});

volume.addEventListener("input", () => {
 audio.volume = volume.value / 100;
});

function updateTimer() {
 const minutes = Math.floor(audio.currentTime / 60);
 const seconds = Math.floor(audio.currentTime % 60);
 const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
  seconds
 ).padStart(2, "0")}`;
 timer.textContent = formattedTime;
}

document.addEventListener("keydown", (event) => {
 if (event.code === "Space") {
  // If the spacebar key is pressed, toggle play/pause
  playPause();
  btn.classList.toggle("paused");
 }
});

video.oncontextmenu = () => false;
