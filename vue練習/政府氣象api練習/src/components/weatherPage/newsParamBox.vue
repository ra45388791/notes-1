<template>
    <div class="paramBox">
        <div class="name" :class="setClass.className">
            <h3>{{ paramName }}</h3>
        </div>
        <div class="value" :class="setClass.classValue">
            <p>{{ paramValue }}</p>
        </div>
    </div>
</template>
<script>
// import { mapState, mapGetters, mapActions } from "vuex";

export default {
    props: ['paramName', 'paramValue', 'setStyle'],    //接收資料
    emit: [],      //將選中的文章推上去
    data() {
        return {

        }
    },
    computed: {
        setClass() {

            switch (this.setStyle) {
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
        }
    },
    methods: {

    }
}
</script>
<style scoped>
.paramBox {
    display: flex;
    flex-wrap: nowrap;
    margin-bottom: 1rem;
    width: 20rem;
    height: 5rem;
    font-size: 1.5rem;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0 6px 10px -5px rgba(0, 0, 0, 0.6);
}

.name {
    flex: 4;
    line-height: 5rem;
    font-weight: bold;

    /* color: #fff; */
    /* background: rgb(14, 127, 220); */
    /* color: rgb(255, 255, 255);
    background: rgb(154, 176, 193); */
    border-radius: 15px 0 0 15px;
    transition: 0.5s;

}

.name h3 {
    margin: 0;
}

.value {
    flex: 8;

    /* color: rgb(14, 127, 220); */

    font-weight: bold;
    line-height: calc(5rem - 10px);
    border-radius: 0 15px 15px 0;
    /* border-top: 5px solid rgb(14, 127, 220);
    border-right: 5px solid rgb(14, 127, 220);
    border-bottom: 5px solid rgb(14, 127, 220); */
    transition: 0.5s;
}

.value p {
    display: inline-block;
    margin: 0;
    height: 100%;
}

/* 晴天 */
.summerName {
    color: #fff;
    background: rgb(255, 157, 0);
}

.summerValue {
    color: rgb(255, 157, 0);
    border-top: 5px solid rgb(255, 157, 0);
    border-right: 5px solid rgb(255, 157, 0);
    border-bottom: 5px solid rgb(255, 157, 0);

}

/* 有太陽的陰天 */
.partlyCloudyName {
    color: #fff;
    background: rgb(0, 221, 255);
}

.partlyCloudyValue {
    color: rgb(0, 221, 255);
    border-top: 5px solid rgb(0, 221, 255);
    border-right: 5px solid rgb(0, 221, 255);
    border-bottom: 5px solid rgb(0, 221, 255);

}

/* 陰天 */
.cloudyName {
    color: #fff;
    background: rgb(73, 101, 124);
}

.cloudyValue {
    color: rgb(73, 101, 124);
    border-top: 5px solid rgb(73, 101, 124);
    border-right: 5px solid rgb(73, 101, 124);
    border-bottom: 5px solid rgb(73, 101, 124);

}

/* 下雨 */
.rainyName {
    color: #fff;
    background: rgb(14, 127, 220);
}

.rainyValue {
    color: rgb(14, 127, 220);
    border-top: 5px solid rgb(14, 127, 220);
    border-right: 5px solid rgb(14, 127, 220);
    border-bottom: 5px solid rgb(14, 127, 220);

}

/* 雷雨 */
.thunderstormName {
    color: rgb(255, 255, 0);
    background: rgb(14, 127, 220);
}

.thunderstormValue {
    color: rgb(14, 127, 220);
    border-top: 5px solid rgb(14, 127, 220);
    border-right: 5px solid rgb(14, 127, 220);
    border-bottom: 5px solid rgb(14, 127, 220);

}

/* 雪 */
.snowName {
    color: rgb(255, 255, 255);
    background: rgb(165, 165, 165);
}

.snowValue {
    color: rgb(165, 165, 165);
    border-top: 5px solid rgb(165, 165, 165);
    border-right: 5px solid rgb(165, 165, 165);
    border-bottom: 5px solid rgb(165, 165, 165);

}

/* 起霧 */
.fogName {
    color: rgb(255, 255, 255);
    background: rgb(154, 176, 193);
}

.fogValue {
    color: rgb(154, 176, 193);
    border-top: 5px solid rgb(154, 176, 193);
    border-right: 5px solid rgb(154, 176, 193);
    border-bottom: 5px solid rgb(154, 176, 193);

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
