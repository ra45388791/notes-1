const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let score = 0;
let outCount = 0;

function startGame() {

    const newGame = setInterval(() => {

        if (outCount <= holes.length - 2) {
            if (createMouse()) {
                outCount++
                console.log(outCount)
            }

        }

    }, 500);

}

function createMouse() {
    let index = rangeNumber(6)
    if (checkUpIsUndefined(holes[index]) === false) return false;

    holes[index].classList.add('up');
    setTimeout(() => {
        if (checkUpIsUndefined(holes[index])) return;
        holes[index].classList.remove('up');
        outCount--
    }, rangeNumber(4) * 1000);

    return true
}

function rangeNumber(range) {
    const number = Math.round(Math.random() * range) - 1
    return number < 0 ? 0 : number;
}

function checkUpIsUndefined(element) {
    return Array.from(element.classList).find(hole => hole === 'up') === undefined;
}

holes.forEach(e => {
    e.addEventListener('click', element => {
        console.log(e)
        if (checkUpIsUndefined(e)) return;
        e.classList.remove('up');
        score += 1;
        scoreBoard.innerText = score;
        outCount--

    })
})