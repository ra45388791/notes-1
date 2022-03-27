window.onload = function () {
    window.addEventListener("keydown", (e) => {
        let key = e.key.toUpperCase();
        switch (key) {
            case 'A':
            case 'S':
            case 'D':
            case 'F':
            case 'G':
            case 'H':
            case 'J':
            case 'K':
            case 'L':
                audioPlay(key);
                break;
        }
    });
}

function audioPlay(keys) {
    const key = document.querySelector(`.key${keys}`);
    const div = key.children[0];
    const audio = key.children[0].children[2];

    div.classList.toggle('divOnKey')
    key.classList.toggle('onKey');

    console.log(audio.duration);

    audio.currentTime = 0;
    audio.play();

    setTimeout(() => {
        div.classList.toggle('divOnKey')
        key.classList.toggle('onKey');
    }, 100);
}