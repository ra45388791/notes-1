/**
 * 此程式為運算使用者輸入十個數字中哪個最大哪個最小
 * 並顯示出來
 */

const numberfield = document.querySelector('.numberField');     //輸入框
let numberfieldArray = [];  //記得改

const numbersubmit = document.querySelector('.numberSubmit');   //按鈕

const output = document.querySelector('.outPut');
const promptmessage = document.querySelector('.promptMessage'); //提示訊息區
const numberarray = document.querySelector('.numberArray');     //數字欄
const numberbig = document.querySelector('.numberBig');         //最大數字
const numbersmall = document.querySelector('.numberSmall');     //最小數字



let roundCount = 1;     //回合數
let resetnumberButton;  //重設按鈕
numberfield.focus();    //給輸入區焦點

function inputNumberdeta(j) {

    count = Number(numberfield.value);          //取得傳入的值
    


    if (count == '' || isNaN(count)) {
        promptmessage.textContent = '輸入錯誤 ! 請重新輸入 !';
        promptmessage.style.backgroundColor = 'darkgray';
        promptmessage.style.color = 'white';
        numberfield.value = '';                     //清空輸入區
        console.log(count);
        

    } else if (roundCount === 10) {
        //把最後一次紀錄推進陣列
        numberfieldArray.push(count);
        //印出已經輸入的值
        numberarray.textContent += count + ' ';     

        //鎖住輸入區
        numberfield.disabled = true;
        numbersubmit.disabled = true;

        //更改文字區
        numberfield.value = '';                     //清空輸入區
        promptmessage.textContent = '運算完成!';
        promptmessage.style.backgroundColor = "red";
        console.log('運算開始');
        //呼叫運算函式
        calculation();

    } else {
        //將資料推進陣列
        numberfieldArray.push(count);
        console.log(numberfieldArray);
        
        //處裡文字     
        numberarray.textContent += count + ' ';     //印出已經輸入的值
        promptmessage.textContent = "請繼續輸入";
        promptmessage.style.backgroundColor = 'royalblue';
        promptmessage.style.color = 'white';
        roundCount++;
        // console.log(roundCount);

        numberfield.value = '';
        numberfield.focus();
    }





}

//監聽送出按鈕
numbersubmit.addEventListener('click', inputNumberdeta);

//監聽鍵盤按下事件
window.addEventListener('keydown', enterKeydown);
function enterKeydown(keyinValue) {      //接受按下鍵盤的按鈕內容值
    // console.log(keyinValue);
    if (keyinValue.key === 'Enter' && numberfield == document.activeElement) {     //如果收到的值之中的 code值 完全等於 code:"Enter" 值
        numbersubmit.click();           //按下送出按鈕
    }
}


//運算
function calculation() {
    // 宣告比較值 
    let big = Number.NEGATIVE_INFINITY;
    let small = Number.MAX_VALUE;


    for (var i = 0; i < numberfieldArray.length; i++) {
        if (numberfieldArray[i] > big) {
            big = numberfieldArray[i];
            console.log('最大' + big);
        }
        if (numberfieldArray[i] < small) {
            small = numberfieldArray[i];
            console.log('最小:' + small);
        }

    }
    numberbig.textContent += big;
    numbersmall.textContent += small;

    resetnumberButton = document.createElement('button');
    resetnumberButton.textContent = '重新開始遊戲';

    output.append(resetnumberButton);

    resetnumberButton.addEventListener('click', resetnumberGame);


}

function resetnumberGame() {
    //重設回合數值
    roundCount = 1;

    //重設文字按鈕
    promptmessage.textContent = '';
    promptmessage.style.backgroundColor = 'rgb(206, 206, 206)';

    resetOutput = document.querySelectorAll('.outPut p'); //重設p中所有文字
    for (var i = 0; i < resetOutput.length; i++) {
        resetOutput[i].textContent = '';
    }
    numberarray.textContent = '數字 : ';
    numberbig.textContent = '最大 : ';
    numbersmall.textContent = '最小 : ';
    resetnumberButton.parentNode.removeChild(resetnumberButton);

    numberfieldArray = [];  //清空array內容
    console.log(numberfieldArray);

    numberfield.disabled = false;
    numbersubmit.disabled = false;
    numberfield.focus();
}