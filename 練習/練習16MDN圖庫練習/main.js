const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 添加圖片循環 */

for (let i = 1; i < 6; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', 'images/pic' + i + '.jpg');

    thumbBar.appendChild(newImage);


}

//監聽點擊的是那一個物件
thumbBar.addEventListener('click', function (e) {
    /**
     * 點擊預覽圖 把點擊預覽圖更新到大圖區
     * 
     * 
     * 讓tarGet 取得 e (傳入的物件)的 target( 最初觸發事件的DOM )
     * getUrl 取得 tarGet取得DOM的src(連結)值
     * 設定displayedImage 更新她的src值 等於getUrl的值
     */

    let tarGet = e.target;
    let getUrl = tarGet.getAttribute('src')

    displayedImage.setAttribute('src', getUrl);

    console.log(getUrl);

})



/* 編寫 變暗/變量 按钮功能 */

btn.addEventListener('click', function (e) {

    if (btn.getAttribute('class') === 'dark') {
        btn.setAttribute('class','light');
        btn.textContent = '變亮';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'


        console.log('變黑');
    } else { 
        btn.setAttribute('class','dark');
        btn.textContent = '變暗';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)'

        console.log('變亮');
    }

    // console.log(btn.getAttribute('class'));




})
