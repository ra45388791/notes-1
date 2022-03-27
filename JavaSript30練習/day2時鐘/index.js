
const timeHand = document.querySelector('#timeHand');
let hourHand = timeHand.children[2];
let minuteHand = timeHand.children[1];
let secondHand = timeHand.children[0];



function updateTime() {
    const time = new Date();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    console.log(hour + ':' + minute + ':' + second);

    hourHand.style.transform = `rotate(${(hour * 30) + (minute * 0.5)}deg)`;
    minuteHand.style.transform = `rotate(${minute * 6}deg)`;
    secondHand.style.transform = `rotate(${second * 6}deg)`;
}


setInterval(() => {
    updateTime();
}, 1000);