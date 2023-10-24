//Web Speech API 中代表一發音的需求，此物件中包含可讓語音合成伺服器辨識的資訊，例如語言、音調、聲音、速率等
const msg = new SpeechSynthesisUtterance();

let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const text = document.querySelector('[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// console.log(speechSynthesis)
//當 speechSynthesis 中的 speechSynthesisVoice 產生改變時就會觸發
// speechSynthesisVoice 取得資料時需要時間，不透過監聽、async/await、Promise 會造成取得資料前就呼叫語音造成失敗bug
speechSynthesis.addEventListener('voiceschanged', function (e) {
    // speechSynthesis.getVoices() 包含所有 SpeechSynthesisVoice 物件的陣列
    voices = e.target.getVoices();
    let optionList = voices.map((voice) => {
        return `<option value="${voice.name}">${voice.name} ${voice.lang}</option>`
    })
    voicesDropdown.innerHTML = optionList.join('');
    msg.voice = voices[0];
    msg.text = text.value;

});

//設定語言
voicesDropdown.addEventListener('change', function (e) {

    msg.voice = voices.find(voice => voice.name === this.value) //找到指定語言
    speechSynthesis.cancel();   //停止目前語音
    speechSynthesis.speak(msg); //開始念語音
});

//設定語速、聲調
options.forEach(function (element) {
    element.addEventListener('change', function (e) {
        
        msg[this.name] = this.value;    //設定範圍input 賦值value
        speechSynthesis.cancel();   //停止目前語音
        speechSynthesis.speak(msg); //開始念語音
    })
})

//開始語音
speakButton.addEventListener('click', function (e) {
    speechSynthesis.cancel();   //停止目前語音
    speechSynthesis.speak(msg); //開始念語音
});

//停止語音
stopButton.addEventListener('click', function (e) {
    // speechSynthesis.pause(); //暫停語音
    speechSynthesis.cancel();   //停止目前語音
});
