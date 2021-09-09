// function displayMessage(msgText, msgType) {
//     const html = document.querySelector('html');

//     const panel = document.createElement('div');
//     panel.setAttribute('class', 'msgBox');
//     html.appendChild(panel);

//     const msg = document.createElement('p');
//     msg.textContent = msgText;
//     panel.appendChild(msg);

//     const closeBtn = document.createElement('button');
//     closeBtn.textContent = 'x';
//     panel.appendChild(closeBtn);

//     closeBtn.onclick = function () {
//         panel.parentNode.removeChild(panel);
//     }

//     if (msgType === 'warning') {
//         msg.style.backgroundImage = 'url(images/warning.png)';
//         panel.style.backgroundColor = 'red';
//     } else if (msgType === 'chat') {
//         msg.style.backgroundImage = 'url(images/chat.png)';
//         panel.style.backgroundColor = 'aqua';
//     } else {
//         msg.style.paddingLeft = '20px';
//     }


// }

// const btn = document.querySelector('button');
// btn.onclick = function () {
//     displayMessage('Brian: Hi there, how are you today?','chat');

// };
//以上 按下按鈕出現提示框



// return開始
const input = document.querySelector('.numberInput');
const para = document.querySelector('p');

function squared(num) {
    return num * num;
}

function cubed(num) {
    return num * num * num;
}

function factorial(num) {
    let x = num;
    while (x > 1) {
        num *= x - 1;
        x--;
    }

    return num;

}




input.onkeyup = function () {

    var num = input.value;
    if (isNaN(num)) {
        para.textContent = 'You need to enter a number!';
    }
    else {
        para.textContent = num + ' squared is ' + squared(num) + '. ' +
            num + ' cubed is ' + cubed(num) + '. ' +
            num + ' factorial is ' + factorial(num) + '.';
        
    }
}


