const dataAges = Array.from(document.querySelectorAll('[data-time]'));
const secen = dataAges.map((e) => e.dataset.time)
    .map((e) => {
        const [min, secen] = e.split(':');
        return Math.round(min * 60) + Math.round(secen)
    }).reduce((a, b) => {
        // a 加總結果  b 本次加總對象
        // console.log(a + " --- " + b);
        return a + b
    })
let left = secen
console.log(secen)

const hours = Math.floor(left / 3600);
left = left % 3600;
const minutes = Math.floor(left / 60);
left = left % 60;
console.log(dataAges);
console.log(`${hours}:${minutes}:${left}`);
