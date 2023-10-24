const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const prigressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');

prigressBar.style.flexBasis = `0%`

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function scrub(e) {
    // (滑鼠位置 / 進度條長度) * 影片長度
    // (0.2) * 300
    let length = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = length;
}

function skip(e) {
    const icon = this.dataset.skip;
    video.currentTime += parseFloat(icon);
}

function updateProgress(e) {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleProgress(e) {
    const length = (this.currentTime / this.duration) * 100;


    prigressBar.style.flexBasis = `${length}%`;
}

function handleRangeUpdate(e) {
    video[this.name] = this.value;
};

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateProgress);
video.addEventListener('pause', updateProgress);


//快進
skipButtons.forEach((e) => { e.addEventListener('click', skip) });
//音量 速度
ranges.forEach((e) => { e.addEventListener('change', handleRangeUpdate) })
ranges.forEach((e) => { e.addEventListener("mouseover", handleRangeUpdate) })
//進度條
video.addEventListener('timeupdate', handleProgress);

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => { mousedown === true ? scrub(e) : null });
progress.addEventListener('mousedown', () => { mousedown = true });
progress.addEventListener('mouseup', () => { mousedown = false });
progress.addEventListener('mouseout', () => { mousedown = false });
