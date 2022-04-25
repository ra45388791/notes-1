<template>
    <div id="news">
        <div class="newsBox">
            <!-- 城市標題 -->
            <div class="headerBox">
                <div class="headerContent">
                    <div class="cityAndIcn">

                        <!-- 文字 -->
                        <div class="cityName" style="color:#fff">
                            <!-- {{ cityName }} -->
                        </div>
                        <!-- 氣象圖片 -->
                        <div class="headerIcn">
                            <img src="../../assets/images/weatherPage/icon/summer.svg" alt="">
                        </div>
                    </div>
                    <!-- 溫度 -->
                    <div class="temperature">
                        <div class="lowestTemperature">
                            <div class="lowestCount">
                                <!-- {{ MinTData }} -->
                            </div>
                            <div class="lowestText">
                                最低溫度
                            </div>
                        </div>
                        <div style="font-size: 4rem;">
                            -
                        </div>
                        <div class="maximumTemperature">
                            <div class="maximumCount">
                                <!-- {{ weatherData.MaxT }} -->
                            </div>
                            <div class="maximumText">
                                最高溫度
                            </div>
                        </div>

                    </div>
                </div>
                <!-- 背景 -->
                <div class="imgBox">
                    <img style="opacity: 0.5;" src="../../assets/images/weatherPage/sunny.jpg" alt="">
                </div>

            </div>

        </div>

    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import weatherController from './weatherController.vue';
export default {
    //氣象資料 / 設定時間
    props: ['CI', 'MaxT', 'MinT', 'PoP', 'Wx', 'cityName', 'setTimes'],
    data() {
        return {

        }
    },
    created() {

    },
    computed: {
        weatherData() {
            //使用陣列取值會報錯 

            return {
                // Wx: this.Wx[this.setTimes].name,
                // CI: this.CI[this.setTimes].name,
                // MinT: this.MinT[this.setTimes].name,
                // MaxT: this.MaxT[this.setTimes].name,
                // PoP: this.PoP[this.setTimes].name,
            }
        },
        // MinTData() { return this.MinT[this.setTimes].name }


    },
    methods: {


    },

}

</script>
<style scoped>
#news {
    height: 100%;
    /* background: #000; */
}

.newsBox {
    display: flex;
    justify-content: center;
    padding-top: 2rem;
}

.headerBox {
    position: relative;

    padding-top: 1rem;
    width: 20rem;
    height: 15rem;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.426);
    overflow: hidden;
}


.headerContent {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    z-index: 2;
}

.cityAndIcn {
    display: flex;
    justify-content: space-between;

}

.cityName {

    padding-left: 2rem;
    padding-right: 0.5rem;
    font-size: 2rem;
    font-weight: bold;
    border-right: 3px solid #fff;
}

.headerIcn {
    margin-left: auto;
    margin-right: 2rem;
    width: 3rem;
    height: 3rem;
}

.headerIcn img {
    width: 100%;
    height: 100%;
}

.temperature {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 2rem 1rem;
    text-align: center;
    color: #fff;
    font-weight: bold;
}

.lowestTemperature {}

.lowestTemperature .lowestCount {
    font-size: 3rem;
}

.maximumTemperature .maximumCount {
    font-size: 3rem;

}


.imgBox {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.imgBox img {
    width: 100%;
    height: 100%;
}
</style>
