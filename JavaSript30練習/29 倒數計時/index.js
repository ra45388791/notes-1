const timerButton = document.querySelectorAll('.timer__button');
const displayTimeLeft = document.querySelector('.display__time-left')
const custom = document.querySelector('#custom');
let CD_status = false;
let nowCountDownObject;

timerButton.forEach(function (e) {
    e.addEventListener('click', function (e) {
        timer(this.dataset.time)
    });
});

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    console.log(mins);

});

function timer(mins) {
    endCDObj(nowCountDownObject);

    const now = Date.now();
    const timer = now + mins * 1000;
    displayTimeLeft.innerHTML = mins;
    const timeout = setInterval(function (e) {
        const timeNow = Math.floor((timer - Date.now()) / 1000) + 1;
        displayTimeLeft.innerHTML = timeNow;
        if (timeNow <= 0) {

            clearInterval(timeout);
            CD_status = false
        }
    }, 1000)
    CD_status = true;
    nowCountDownObject = timeout;
}

function endCDObj(obj) {
    if (!CD_status) return
    if (nowCountDownObject === undefined) return
    clearInterval(obj)
}