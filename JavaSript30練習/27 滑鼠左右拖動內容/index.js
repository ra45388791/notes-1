const items = document.querySelector('.items');
let isDown = false;
let scrollLocation;



items.addEventListener('mousemove', function (e) {
    if (!isDown) return
    // console.log('移動');

    // 滾動條 -= 滑鼠移動距離
    this.scrollLeft -= e.pageX - scrollLocation;
    //重新設定座標
    scrollLocation = e.pageX
});
items.addEventListener('mousedown', function (e) {
    // console.log('按下');
    isDown = true;
    scrollLocation = e.pageX;
    items.classList.add('active');
    // console.log(items.scrollLeft);
});
items.addEventListener('mouseup', function (e) {
    // console.log('上');
    isDown = false;
    this.classList.remove('active');
});
items.addEventListener('mouseleave', function (e) {
    // console.log('離開');
    isDown = false;
    this.classList.remove('active');
});
