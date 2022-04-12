/**
 * 模組化 observer 方法
 * 主要是把 style 的 opacity 改成1
 * 
 */

const observer = new IntersectionObserver((element) => {
    element.forEach(e => {
        if (e.isIntersecting) {
            setTimeout(() => {
                console.log('21364564654');
                e.target.style = 'opacity:1';
                observer.unobserve(e.target);
            }, 300)
        }
    })
})

export default observer;
