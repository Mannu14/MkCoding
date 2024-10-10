const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
progressBar = container.querySelector(".progress-bar"),
videoTimeline = container.querySelector(".video-timeline"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input"),
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
skipBackword = container.querySelector(".skip-backward i"),
skipForword = container.querySelector(".skip-forward i"),
playPauseBtn = container.querySelector(".play-pause i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
picInPicBtn = container.querySelector(".pic-in-pic span"),
fullscreenBtn = container.querySelector(".fullscreen i");
let timer;

const hideControles = () =>{
    if(mainVideo.paused) return;  // if video is paused return
    timer = setTimeout(() => {
        container.classList.remove("show-controls");
    }, 1000);
}
hideControles();

container.addEventListener("mousemove", () =>{
    container.classList.add("show-controls");
    clearTimeout(timer); // clear timer
    hideControles();  // calling hideControles
});
const formatTime = time =>{
    // getting seconds ,minutes, hours
    let seconds  = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);
    // adding 0 at the beginning if the particular value is less then 10
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if(hours == 0){ // if hours is 0 return minuts & seconds only else return all
        return `${minutes} : ${seconds}`;
    }
    return `${hours} : ${minutes} : ${seconds}`;
};

mainVideo.addEventListener("click",()=>{
    if(playPauseBtn.classList.contains("fa-play")){
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        mainVideo.play()
    }
    else{
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        mainVideo.pause()
    }
});

mainVideo.addEventListener("timeupdate", e =>{
    let {currentTime, duration} = e.target; // getting currentTime & duration of the video
    let percent = (currentTime / duration) * 100;  // getting percent
    progressBar.style.width = `${percent}%`;  // passing percent as progressBar width
    currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", e =>{
    videoDuration.innerText = formatTime(e.target.duration);  // passing video duration as videoDuration innertext
});

videoTimeline.addEventListener("click", e =>{
    let timelineWidth = videoTimeline.clientWidth;  // getting videoTimeline width
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration; // updating video currentTime
});

const draggableProgressBar = e =>{
    let timelineWidth = videoTimeline.clientWidth;  // getting videoTimeline width
    progressBar.style.width = `${e.offsetX}px`;  // passing offsetX value as progressbar width
    mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration; // updating video currentTime
    currentVidTime.innerText = formatTime(mainVideo.currentTime); // passing video current time as current time as currentVidTime innertext
}

videoTimeline.addEventListener("mousedown", () =>{  // calling draggableProgressBar function on mousemove event
    videoTimeline.addEventListener("mousemove", draggableProgressBar);
});

container.addEventListener("mouseup", () =>{  // removeing mousemove listener on mouseup event
    videoTimeline.removeEventListener("mousemove", draggableProgressBar);
});

videoTimeline.addEventListener("mousemove", e =>{
    const progressTime = videoTimeline.querySelector("span");
    let offsetX = e.offsetX; // getting mouseX position
    progressTime.style.left = `${offsetX}px`; // passing offsetX value as progressTime left value
    let timelineWidth = videoTimeline.clientWidth;  // getting videoTimeline width
    let percent = (e.offsetX / timelineWidth)  *mainVideo.duration; // getting percent
    progressTime.innerText = formatTime(percent); // passing percent as progressTime innerText
});

volumeBtn.addEventListener("click",()=>{
    if(!volumeBtn.classList.contains("fa-volume-high")){ // if volume icon isn't volume high icon
        mainVideo.volume = 0.5;    // passing 0.5 value as video volume
        volumeBtn.classList.replace("fa-volume-xmark","fa-volume-high");
    }
    else{
        mainVideo.volume = 0.0;  // passing 0.0 value as video volume, so the video mute
        volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark");
    }
    volumeSlider.value = mainVideo.volume;  // update slider value according to the video volume
});

volumeSlider.addEventListener("input", (e)=>{
    mainVideo.volume = e.target.value;   // passing slider value a video volume
    if(e.target.value == 0){   // if slider value is 0, then change icon to mute icon
        volumeBtn.classList.replace("fa-volume-high","fa-volume-xmark");
    }
    else{
        volumeBtn.classList.replace("fa-volume-xmark","fa-volume-high");
    }
});

speedBtn.addEventListener("click", ()=>{
    speedOptions.classList.toggle("show");  // toggle show class
});

speedOptions.querySelectorAll("li").forEach(option => {
    option.addEventListener("click",()=>{
        mainVideo.playbackRate = option.dataset.speed;  // passing option dataset value as video playback value
        speedOptions.querySelector(".active").classList.remove("active");  // remove active class
        option.classList.add("active");  // adding active class on the selected option
    })
});


document.addEventListener("click", e =>{  // hide speed options on document click
    if(e.target.tagName !=="SPAN" || e.target.className !== "material-symbols-rounded"){
        speedOptions.classList.remove("show");
    }
});

picInPicBtn.addEventListener("click", () =>{
    mainVideo.requestPictureInPicture();  // changing video mode to picture in picture
});

fullscreenBtn.addEventListener("click",()=>{
    container.classList.toggle("fullscreen");
    if(document.fullscreenElement){ // if video is already in fullscreen mode
        fullscreenBtn.classList.replace("fa-compress", "fa-expand");
        return document.exitFullscreen();  // exit from fullscreen mode and return
    }
    fullscreenBtn.classList.replace("fa-expand", "fa-compress");
    container.requestFullscreen();  // go to full screen mode
});

skipBackword.addEventListener("click",()=>{
    mainVideo.currentTime -= 5; // subtract 5 second from the current video time
});

skipForword.addEventListener("click",()=>{
    mainVideo.currentTime += 5; // add 5 second to the current video time
});

playPauseBtn.addEventListener("click",()=>{
    mainVideo.paused ? mainVideo.play() : mainVideo.pause();  // if video is pause, play the video else pause the video
});

mainVideo.addEventListener("play",()=>{  // if video is play, change icon to pause
    playPauseBtn.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener("pause",()=>{  // if video is pause, change icon to pause
    playPauseBtn.classList.replace("fa-pause", "fa-play");
});


// =====================music player =====

let allMusic = [
    {
        name: "Waterfalls",
        artist: "Krishna",
        img: "coca",
        src: "Waterfalls",
        titlename: "Lakh Laahnta - Ravneet | Official Video | Shehnaaz Gill | Super Hit Song | Juke Dock"
    },
    {
        name: "background",
        artist: "Jai Shree Ram",
        img: "DARANI",
        src: "background",
        titlename: "Binary Tree is defined as a tree data structure where each node has at most 2 children."
    },
    {
        name: "first_video_index_html",
        artist: "Mr. beast",
        img: "DARMI_COOL",
        src: "first_video_index_html",
        titlename: "Since each element in a binary tree can have only 2 children"
    },
    {
        name: "write a python program to find out common letters between two string",
        artist: "technic Gyan",
        img: "Dil_sambhal_ja_Zara",
        src: "ab_savan_bhi",
        titlename: "1. write a python program to find out common letters between two string"
    },
    {
        name: "Fancy Lugai",
        artist: "KR. jite",
        img: "Fancy_Lugai",
        src: "bhole_o_tera",
        titlename: "Learn more about Binary Tree in DSA Self Paced Course"
    }
]
// =================== music list ==========
const mainAudio = document.querySelector("#main-audio");
const song_details_div = document.querySelector(".song-details-div");
musicName = document.querySelector(".song-details-name");
musicArtist = song_details_div.querySelector(".song-details-artist");
musicImg = song_details_div.querySelector(".song-details-div img");

let musicIndex = Math.floor((Math.random() * allMusic.length + 1));

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingNow();
});

// load music function
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].titlename;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `imagevideo/${allMusic[indexNumb - 1].img}.JPG`;
    mainAudio.src = `music/${allMusic[indexNumb - 1].src}.mp4`;
}
function playMusic(){
    mainAudio.play();
}

const music_list = document.querySelector(".music-list");
const ulTag = music_list.querySelector("ul");

// let's create li according to the array length
for(let i = 0; i < allMusic.length; i++){
    let liTag = `<li li-index="${i + 1}">
                   <div class="row">
                       <img src="imagevideo/${allMusic[i].img}.JPG" alt="Name">
                       <div class="rowwrite">
                       <span>${allMusic[i].name}</span>
                       <p>${allMusic[i].artist}</p>
                       </div>
                   </div>
                   <audio class="${allMusic[i].src}" src="music/${allMusic[i].src}.mp4"></audio>
                   <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", ()=>{
        let audioDuration = liAudioTag.duration;
         let totalMin = Math.floor(audioDuration / 60);
         let totalSec = Math.floor(audioDuration % 60);
         if(totalSec < 10){
            totalSec = `0${totalSec}`;
         }
         liAudioDuration.innerText = `${totalMin}:${totalSec}`;
         // adding t duration attribute which we'll use below
         liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
}
const allLiTags = ulTag.querySelectorAll("li");
function playingNow(){
    for(let j = 0; j < allLiTags.length; j++){
        let audioTag = allLiTags[j].querySelector(".audio-duration");
        // let's remove playing class from all other li expect the last one
        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
            // pass again minuts in songs after playing class
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration; 
        }

        if(allLiTags[j].getAttribute("li-index") == musicIndex){
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "playing";
        }
    
        // adding onclick attribute in all li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}
// let's play song on li click
function clicked(element){
    // getting li index of particular clicked li tag
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;  // passing that liIndex to musicIndex
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}