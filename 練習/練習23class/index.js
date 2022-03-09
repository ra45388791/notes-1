const input = document.querySelector('input');
const button_1st = document.querySelector('.button_1st');
const button_2nd = document.querySelector('.button_2nd');
const p = document.querySelector('p');


/******************************************************
 *                  創造class
******************************************************/
class Bullshit {
    //靜態方法
    static welcome_tips() {
        return '溫馨提示 你這是在說廢話喔'
    }
    //靜態方法中的this 是指向class的
    static welcome() {
        p.innerHTML = this.welcome_tips();
    }

    //每次new 都會觸發這個 constructor 相當於宣告屬性。
    constructor(text, color) {
        //屬性
        this.text = text;
        this.color = color;
    }
    //在 class 中創造方法不需要 function 關鍵字，也不需要this。
    show() {
        p.innerHTML = this.text + input.value;
        p.style.color = this.color;
    }

    //set屬性
    set extra(value) {
        this.value = value;
        p.innerHTML += this.value;
    }
    get extra() {
        return `這些都是廢話 : ${this.text}, ${this.value}`
    }

};



/******************************************************
 *                  繼承class
 ******************************************************/
// Son_of_Bullshit 繼承自 Bullshit
class Son_of_Bullshit extends Bullshit {
    constructor(text, color, fontSize) {
        //!在子類寫 this 前 一定要寫 " super " 來調用要繼承的父類屬性
        super(text, color);
        this.fontSize = fontSize;
    }
    show() {
        p.innerHTML = this.text + p.innerHTML;
        p.style.color = this.color;
        p.style.fontSize = this.fontSize;
    }
}




button_1st.addEventListener('click', function () {
    const bullshit = new Bullshit('我知道', '#00a1d6');     //!注意 要寫在class後面 因為class 沒有聲明提升功能
    bullshit.show();                                        //執行 bullshit 中的show 方法
    bullshit.extra = '阿'
    console.log(bullshit.extra);
})

button_2nd.addEventListener('click', function () {
    const son_of_bullshit = new Son_of_Bullshit('你知道', '#f85b88', '30px');
    son_of_bullshit.show();
})

p.addEventListener('click', function () {
    //在呼叫靜態方法時 不要用 new呼叫 會報錯
    Bullshit.welcome();
})

var numbers = [4, 2, 5, 1, 3];
numbers.sort(function (x, y) {
    return x - y			//判斷 大於或小於0來決定位置
});
console.log(numbers);