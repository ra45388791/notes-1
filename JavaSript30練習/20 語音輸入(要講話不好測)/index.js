const words = document.querySelector('.words');

//google || Firefox
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition();
recognition.interimResult = true;
// recognition.lang = 'zh-tw';

console.log(words)
let p = document.createElement('p');
words.appendChild(p);






recognition.addEventListener('result', function (e) {
    console.log(e);
});

recognition.start();