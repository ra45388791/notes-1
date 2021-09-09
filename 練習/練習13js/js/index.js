let randomNumber = Math.floor(Math.random() * 100) + 1; //產生隨機數字
// console.log("隨機數字 = " + randomNumber);

//跟html中的guesses, lastResult, lowOrHi連結
const item = document.querySelector('.guessItem');

const guesses = document.querySelector(".guesses");
const guessRound = document.querySelector(".guessRound");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

//測試星星
const start = document.querySelector('.start');

//跟html中的guessSubmit, guessField連結
const guessSubmit = document.querySelector(".guessSubmit"); //提交按鈕
const guessField = document.querySelector(".guessField"); //輸入框

//猜測次數設為1
let guessCount = 1;
let resetButton; //重新開始按鈕
// guessField.focus();//讀取頁面時自動把滑鼠放進輸入欄位中





//檢查遊戲過程方法
function checkGuess() {
    /**
     * 抓取輸入的數值
     * 檢查是否為第一次猜測 / 如果是加入文字 "先前的猜測是:"
     * 在每次猜測完之後輸出猜測數值和回合數
     * 
     * 檢查是否完全等於隨機數值 / 如果是則輸出恭喜字樣並呼叫遊戲結束 setGameOver方法
     * 
     * 如果不是 檢查是否是第十回合 / 如果是則呼叫 遊戲結束 setGameOver方法
     * 
     * 如果不是 輸出錯誤字樣並更改元素背景色彩 
     * 並檢查數值猜得太高/低
     */

    //宣告一個變數 = 確保輸入的值是數字所以使用Number 去抓guessField 中的值
    var userGuess = Number(guessField.value);
    if (guessCount === 1) {             //檢查玩家是否是第一次猜測數字
        guesses.textContent = "先前的猜測是:";          //只有第一次會寫入這段中文 之後都是數字
    }
    guesses.textContent += userGuess + " ";             //把當前的值的尾端加上每一次猜測的數字並加上空格
    guessRound.textContent = "回合數:" + guessCount;    //回合數

    if (userGuess === randomNumber) {   //如果輸入的值 完全等於 隨機產生的值
        lastResult.textContent = "恭喜! 你答對了!";     //更改結果區文字
        lastResult.style.backgroundColor = "green";     //更改結果區背景顏色
        lowOrHi.textContent = "";                       //更低或更高提示區還原
        setGameOver();                                  //呼叫遊戲結束方法
    } else if (guessCount === 10) {     //如果猜測次數完全等於10
        lastResult.textContent = "!!! 遊戲結束 !!!";
        setGameOver();
    } else {
        lastResult.textContent = "錯誤!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
            lowOrHi.textContent = "猜太低了!";
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = "猜太高了!";
        }
    }

    guessCount++;                   //增加回合數
    guessField.value = '';          //重置元素數值
    guessField.focus();             //讓使用者的滑鼠鼠標放進輸入欄中

}

guessSubmit.addEventListener('click', checkGuess); //監聽按下按鈕事件時執行 checkGuess 方法

//遊戲結束方法
function setGameOver() {
    /**
     * 做4件事
     * 把表單輸入框和按鈕鎖起來。
     * 創造按鈕元素後加入'開始新遊戲'文字
     * 將做好的按鈕加入頁面最尾端
     * 監控是否按下 / 按下後呼叫resetGame方法
     */


    guessField.disabled = true;                             //把表單和按鈕的disabled屬性設為true將其無效化
    guessSubmit.disabled = true;                            //讓使用者無法按下按鈕和輸入

    resetButton = document.createElement('button');         // 創造一個按鈕元素
    resetButton.textContent = '開始新遊戲';                 // 在按鈕元素中添加 '開始新遊戲' 字樣
    // resetButton.style.background = 'yellow'; //用js更改按鈕樣式
    // resetButton.style.fontSize = '200%';     //用js更改按鈕樣式
    // resetButton.style.padding = '10px';      //用js更改按鈕樣式
    // resetButton.style.boxShadow = '3px 3px 6px black';//用js更改按鈕樣式
    // document.body.appendChild(resetButton);                 //將上方組合好的按鈕和文字加入到html最尾端
    item.append(resetButton);   //在item之中的最底下放入按鈕

    resetButton.addEventListener('click', resetGame)        //監控按鈕是否按下
}

//重設遊戲
function resetGame() {
    /**
     * 做6件事
     * 將回合數 guessCount 設回1
     * 清除所有 p 段落內文
     * 將重置按鈕 resetButton 移除
     * 將表單元素有效化，清空文字輸入並給予其焦點，準備好讓玩家能夠進行新一輪的猜測。
     * 將lastResult 段落元素的背景顏色設回白色。
     * 生成一個新的隨機數值，才不會讓玩家又猜一次重複的答案。
    */

    guessCount = 1;                                             //重設回合數為1

    var resetParas = document.querySelectorAll('.resetParas p');//取得.resetParas 這個段落中所有的p

    for (var i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';                 //這時所有的p都在resetParas中 用for迴圈1個1個把所有p清空

    }

    resetButton.parentNode.removeChild(resetButton);    //選取resetButton 的父元素後刪除父元素下的resetButton

    guessSubmit.disabled = false;                       //提交按鈕開啟
    guessField.disabled = false;                        //輸入框開啟
    guessField.value = '';                              //清空輸入框的值
    guessField.focus();                                 //把滑鼠放入輸入框中

    lastResult.textContent = '';
    lastResult.style.backgroundColor = 'rgb(206, 206, 206)';         //背景顏色設回白色
    // lastResult.style.color = 'rgb(206, 206, 206)';

    randomNumber = Math.floor(Math.random() * 100) + 1; //重新骰一個隨機數值
    // console.log("隨機數字 = " + randomNumber);
}

//印出星星
let shinyStart;                                         //用來放星星的容器
for (var i = 0; i < 10; i++) {
    shinyStart = document.createElement('p');           //創造一個p元素
    for (var n = 0; n < i; n++) {
        shinyStart.textContent += '* ';                 //在p元素中印出*
        //document.body.appendChild(shinyStart);
        start.append(shinyStart);                       //在class='start'中放入 印好*的p (shinyStart)
        
        // start.textContent = start.textContent+'*'; 
    }
}


