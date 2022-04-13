/**
 * @處裡元素fadein 的 observer API 觀察模組
 * 模組化 observer 方法
 * 透過傳入四個參數來達到設定動畫並觀察的效果
 * 共需要傳入4個參數:
 * 1:元素的原始狀態,
 * 2:要執行的 css 動畫名稱,
 * 3:執行的長度,
 * 4:延遲多久後才執行
 */


/**
 *  使用範例                                         傳入參數
 *                實例化 class 使用 setAnimation方法('原始狀態','css動畫名稱','執行長度','延遲執行秒數')
 *  
 *      const fadein = new Fadein().setAnimation('opacity:0', 'leftFadeIn', 1, 300);
 *      fadein.observe(this.$refs.titleOne);              
 */
class setFadeInAnimation {
    constructor() {
    }
    /**
     * 設定動畫參數
     */
    setAnimation(originalStyle, AnimationName, second, delay) {
        const secondString = `${second}s`               //秒數轉成字串

        const set = function (element) {
            element.forEach(e => {
                e.target.style = originalStyle;         //元素原始狀態
                if (e.isIntersecting) {                 //如果觀察到
                    setTimeout(() => {                  //延遲執行
                        e.target.style = `animation: ${AnimationName} ${secondString} 0s ease-out;`;
                        setTimeout(() => {
                            // console.log(e.target);
                            e.target.style = ''         //清空style
                            newObserver.unobserve(e.target);  //取消觀察
                        }, second * 1000)
                    }, delay)//延遲幾秒觸發
                }
            })
        }

        /**
         * 實例化物件
         */
        const newObserver = new IntersectionObserver(set);
        return newObserver;
    }

    unobserveFunc() {

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
export { setFadeInAnimation };
