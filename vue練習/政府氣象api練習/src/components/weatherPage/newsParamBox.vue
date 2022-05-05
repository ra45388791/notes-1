<template>
    <div class="paramBox">
        <!-- 天氣現象 -->
        <div class="Box wxBox" :class="setClass.className">
            <h3 class="name">{{ wx.name }}</h3>
            <p class="value">{{ wx.value }}</p>
        </div>
        <!-- 舒適度 -->
        <div class="Box ciBox">
            <h3 class="name">{{ ci.name }}</h3>
            <p class="value">{{ ci.value }}</p>
        </div>
        <!-- 降雨率 -->
        <div class="Box popBox" ref="popBoxRef">
            <div>
                <h3 class="name">{{ pop.name }}</h3>
                <p class="value"> {{ popMath }}%</p>
            </div>
            <div class="popMask" :style="popShadow"></div>
        </div>
    </div>
</template>
<script>

export default {
    props: ['wx', 'ci', 'pop', 'styleValue'],   //接收資料
    emit: [],                                   //將選中的文章推上去
    data() {
        return {
            popHeight: 0,                        // 取得降雨率元素高度
            popMath: 10                          // 降雨機率數字
        }
    },
    mounted() {
        // 取得降雨率元素高度
        this.popHeight = this.$refs.popBoxRef.offsetHeight;

    },
    watch: {
        'pop.value': function (newVal) {
            //降雨量數字增減特效
            const vm = this;
            const percentage = parseInt(/\d+/g.exec(newVal)[0]);
            const originCount = this.popMath;
            const isPlus = percentage > originCount;                //是否為往上增加 
            //取得差異值
            const setCount = percentage > originCount ? percentage - originCount : originCount - percentage;

            if (isPlus) {
                for (let i = 0; i < setCount; i++) {
                    ; (function (e) {
                        setTimeout(() => {
                            vm.popMath++;
                        }, e * 10)
                    })(i)
                }
            } else {
                for (let i = 0; i < setCount; i++) {
                    ; (function (e) {
                        setTimeout(() => {
                            vm.popMath--;
                        }, e * 10)
                    })(i)
                }
            }

        }
    },
    computed: {
        setClass() {

            switch (this.styleValue) {
                case 0:
                    // 晴天
                    return { className: 'summerName', classValue: 'summerValue' }
                case 1:
                    // 有雲的晴天
                    return { className: 'partlyCloudyName', classValue: 'partlyCloudyValue' }
                case 2:
                    // 陰天
                    return { className: 'cloudyName', classValue: 'cloudyValue' }
                case 3:
                    // 下雨
                    return { className: 'rainyName', classValue: 'rainyValue' }
                case 4:
                    // 雷雨
                    return { className: 'thunderstormName', classValue: 'thunderstormValue' }
                case 5:
                    // 雪
                    return { className: 'snowName', classValue: 'snowValue' }
                case 6:
                    // 霧
                    return { className: 'fogName', classValue: 'fogValue' }
            }
        },
        popShadow() {
            //降雨量水量增減特效
            return `height:${this.pop.value}`
        },
    },
    methods: {

    }
}
</script>
<style scoped>
.paramBox {
    display: flex;
    flex-wrap: wrap;

    width: 20rem;
    height: auto;
    font-size: 1.5rem;
    text-align: center;
    /* border-radius: 15px; */
    /* box-shadow: 0 6px 10px -5px rgba(0, 0, 0, 0.6); */
}

.Box {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    color: #fff;
    /* background: rgba(14, 127, 220); */
    transition: 0.5s
}


.name {

    margin: 0;
    margin-bottom: 0.5rem;
    padding-left: 2rem;

    font-size: 1.1rem;
    text-align: start;
    font-weight: normal;
}

.value {
    display: inline-block;
    margin: auto 0;
    text-align: center;
    font-weight: bold;
}


/* 天氣現象 */
.Box.wxBox {
    flex: 100%;
    /* border-bottom: solid 1px rgba(238, 238, 238); */
    /* background: rgba(14, 127, 220); */

}

/* 舒適度 */
.Box.ciBox {
    flex: 8;
    height: 13rem;
    background: rgb(53, 106, 212);
}

/* 降雨率 */
.Box.popBox {
    position: relative;
    flex: 4;
    padding-top: 0.8rem;
    background: #fff;
    color: #000;
    /* 動態設定陰影 */
    /* box-shadow: inset 0 calc(13rem * -0.3) 0 0 rgb(71, 234, 255); */
    border-right: solid 1px rgb(171, 171, 171);
    border-bottom: solid 1px rgba(171, 171, 171);
    overflow: hidden;
}

.Box.popBox>div {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 2;
}

.Box.popBox .name {
    display: inline-block;
    margin: 0 auto;
    padding: 0.2rem 0.8rem;
    text-align: center;

    color: rgb(255, 255, 255);
    background: rgb(0, 166, 255);

    border-radius: 5px;
}

.Box.popBox .value {
    display: block;
    margin: auto;
    padding: 20px 10px;
    color: #fff;
    border-radius: 100%;
    background: rgb(0, 166, 255);
}

.Box.popBox .popMask {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;

    background: rgb(71, 234, 255);
    z-index: 1;
    transition: 0.5s;
}

.Box.popBox .popMask::before {
    content: '';
    position: absolute;
    top: -15.4rem;
    left: calc(50% - 8rem);
    width: 16rem;
    height: 16rem;
    /* background: rgba(0, 0, 0, 0.289); */
    background: rgb(255, 255, 255);
    border-radius: 40%;

    transform: rotate(90deg);
    animation: popAni 6s 0s linear infinite;
}

@keyframes popAni {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(180deg);
    }
}






/* 晴天 */
.summerName {
    color: #fff;
    background: rgb(255, 157, 0);
}



/* 有太陽的陰天 */
.partlyCloudyName {
    color: #fff;
    background: rgb(255, 187, 0);
}


/* 陰天 */
.cloudyName {
    color: #fff;
    background: rgb(73, 101, 124);
}



/* 下雨 */
.rainyName {
    color: #fff;
    background: rgb(14, 127, 220);
}


/* 雷雨 */
.thunderstormName {
    color: rgb(255, 255, 0);
    background: rgb(14, 127, 220);
}


/* 雪 */
.snowName {
    color: rgb(255, 255, 255);
    background: rgb(165, 165, 165);
}


/* 起霧 */
.fogName {
    color: rgb(255, 255, 255);
    background: rgb(154, 176, 193);
}




/**
    name{
        字體顏色
        bg顏色
    }
    value{
        字體顏色
        border 顏色
    }

*/
</style>
