const storge_str = ['t', 'e', 's', 't'];
const storge_key = [];


window.addEventListener('keyup', function (event) {
    storge_key.push(event.key);
    // split 第一個參數式負數的話，則從最後一個字開始。
    storge_key.splice(-storge_str.length - 1, storge_key.length - storge_str.length);

    if (storge_key.join('') === storge_str.join('')) {
        this.document.querySelector('body').innerText = storge_key.join('');
    }

    console.log(event.key, storge_key);
});