window.onload = function () {
    contantLazyLoading();
}


function contantLazyLoading() {
    //取得每一張圖片
    const images = document.querySelectorAll('img');

    //每個擁有DOMFadeinAni 的class名稱都要執行淡入動畫
    const DOMFadeinAni = document.querySelectorAll('.DOMFadeinAni');

    //透過observer實例callback此方法
    //圖片觀察
    const imageCallback = entries => {
        //傳入的參數中有一個 isIntersecting 屬性 (true : 圖片被看到) (false : 圖片沒被看到)
        entries.forEach(entry => {
            if (entry.isIntersecting) {     //如果為true代表看到圖片
                const image = entry.target;                         //被看到的圖片
                const data_src = image.getAttribute('data-src');    //取得圖片中的data-src屬性值
                image.setAttribute('src', data_src);                //創造src屬性 並賦予他上面取得的 data-src 屬性
                image.removeAttribute('data-src');  //刪除 data-src 屬性
                imageObserver.unobserve(image);                          //刪除觀察動作  不要讓他繼續觀察
            }
        })
    }

    //文字觀察
    const textCallback = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target;
                setTimeout(() => {
                    text.style.animation = 'textDomLook 1s ease-out forwards';
                    setTimeout(() => {
                        text.classList.remove('DOMFadeinAni');
                        text.style.animation = '';
                        textObserver.unobserve(text);
                    }, 1000);
                }, 300);
            }
        })
    }

    //實例化IntersectionObserver api
    const imageObserver = new IntersectionObserver(imageCallback);  //圖片
    const textObserver = new IntersectionObserver(textCallback);    //文字

    //遍歷每一個圖片 把 observer中的 observe 方法都加到圖片中 觀察圖片
    //圖片
    registerObserveEvent(images, imageObserver);
    //文字
    registerObserveEvent(DOMFadeinAni, textObserver);
}
//forEach每一個物件都註冊觀察事件
function registerObserveEvent(eventArray, observeObject) {
    eventArray.forEach(image => {
        observeObject.observe(image);
    })
}


