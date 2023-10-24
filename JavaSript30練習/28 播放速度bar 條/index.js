const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');
const flex = document.querySelector('.flex');




speed.addEventListener('mousemove', function (e) {
    // const barTop = this.scrollTop;
    const barY = e.pageY;
    const barHeight = this.offsetHeight;
    const moveSet = Math.round((barY / barHeight * 100) - 3);
    const speed = Math.round((4 * (moveSet * 0.01)) * 10000) / 10000;

    flex.playbackRate = speed;
    speedBar.innerHTML = `${speed}x`
    speedBar.style.height = `${moveSet}%`;
});