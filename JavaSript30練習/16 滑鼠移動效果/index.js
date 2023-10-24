const hero = document.querySelector('.hero');
const texth1 = document.querySelector('h1');

const walk = 100;

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e
    console.log(e.target);
    console.log(x, y);
    console.log(width, height)
    // console.log(e.target.offsetLeft, e.target.offsetTop)
    // console.log((x / width * walk) - (walk / 2))
    if (this !== e.target) {
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }
    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));
    // console.log((x / width * walk) - (walk / 2));

    texth1.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    `;


    // console.log(x, y);
}

hero.addEventListener('mousemove', shadow);