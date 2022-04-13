/**
 * 模組化 observer 方法
 * 主要是透過觀測更改物件的style
 * 
 */



/**
 * 淡入
 */
const observerOpacity = new IntersectionObserver((element) => {
    element.forEach(e => {
        e.target.style = 'opacity:0';   //先把有註冊的元素設為透明
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.style = 'opacity:1';
                observerOpacity.unobserve(e.target);
            }, 300)
        }
    })
})


/**
 * 從上淡入
 * @keyframes topFadeIn {
    0% {
        opacity: 0;
        transform: translateY(-2rem);
    }
    100% {
        opacity: 1;
        transform: translateY(0rem);
    }
}
 */
const observerTopFadeIn = new IntersectionObserver((element) => {
    element.forEach(e => {
        e.target.style = 'opacity:0';   //先把有註冊的元素設為透明
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.style = 'animation: topFadeIn 1s 0s ease-out;';
                setTimeout(() => {
                    e.target.style = ''
                    observerTopFadeIn.unobserve(e.target);
                }, 1000)
            }, 300)
        }
    })
})


/**
 * @從底部fadein動畫要設置
 *  @keyframes bottomFadeIn {
        0% {
            opacity: 0;
            transform: translateY(2rem);
        }
        100% {
            opacity: 1;
            transform: translateY(0rem);
        }
    }
 */
const observerBottomFadeIn = new IntersectionObserver((element) => {
    element.forEach(e => {
        e.target.style = 'opacity:0';   //先把有註冊的元素設為透明
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.style = 'animation: bottomFadeIn 1s 0s ease-out;';
                setTimeout(() => {

                    e.target.style = ''
                    observerBottomFadeIn.unobserve(e.target);
                }, 1000)
            }, 300)
        }
    })
})

/**
 * 從左淡入
 * @keyframes leftFadeIn {
        0% {
            opacity: 0;
            transform: translateX(-2rem);
        }
        100% {
            opacity: 1;
            transform: translateX(0rem);
        }
    }
 * 
 */

const observerLeftFadeIn = new IntersectionObserver((element) => {
    element.forEach(e => {
        e.target.style = 'opacity:0';   //先把有註冊的元素設為透明
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.style = 'animation: leftFadeIn 1s 0s ease-out;';
                setTimeout(() => {

                    e.target.style = ''
                    observerLeftFadeIn.unobserve(e.target);
                }, 1000)
            }, 300)
        }
    })
})

/**
 * 從右淡入
 * 
 *  @keyframes rightFadeIn {
        0% {
            opacity: 0;
            transform: translateX(2rem);
        }
        100% {
            opacity: 1;
            transform: translateX(0rem);
        }
    }   
 */

const observerRightFadeIn = new IntersectionObserver((element) => {
    element.forEach(e => {
        e.target.style = 'opacity:0';   //先把有註冊的元素設為透明
        if (e.isIntersecting) {
            setTimeout(() => {
                e.target.style = 'animation: rightFadeIn 1s 0s ease-out;';
                setTimeout(() => {

                    e.target.style = ''
                    observerRightFadeIn.unobserve(e.target);
                }, 1000)
            }, 300)
        }
    })
})


class testClass {
    constructor() {
    }
    /**
     * 步驟1: 宣告變數 傳入 元素原始狀態 動畫名稱 執行時間 延遲幾秒執行
     */
    setAnimation(originalStyle, AnimationName, second, delay) {
        const secondString = `${second}s`

        return function (element) {

            element.forEach(e => {
                e.target.style = originalStyle;   //元素原始狀態
                if (e.isIntersecting) {
                    setTimeout(() => {
                        e.target.style = `animation: ${AnimationName} ${secondString} 0s ease-out;`;
                        setTimeout(() => {

                            e.target.style = ''
                            observerRightFadeIn.unobserve(e.target);
                        }, second * 1000)
                    }, delay)//延遲幾秒觸發
                }
            })

        }

    }
    /**
     * 步驟2:建構觀察API 傳入步驟1建構好的方法
     * 步驟3:(在操作的程式執行) 用 步驟2 建構的observer 物件註冊觀察事件
     */
    newObserver(setAnimetion) {
        return new IntersectionObserver(setAnimetion)
    }
}


/**
 * !使用時要在要做特效的元素加上: style="opacity:0;"
 * 
 * observerOpacity : 普通淡入
 * observerTopFadeIn : 從上淡入
 * observerBottomFadeIn : 從下淡入
 * observerLeftFadeIn : 從左淡入
 * observerRightFadeIn : 從右淡入
 * 
 */
export { testClass, observerOpacity, observerTopFadeIn, observerBottomFadeIn, observerLeftFadeIn, observerRightFadeIn };
