<template>
    <div v-if="weatherDataIsFetching" id="news">
        <div class="newsBox">
            <!-- 城市標題 -->
            <div class="headerBox">
                <div class="headerContent">
                    <div class="cityAndIcn">

                        <!-- 文字 -->
                        <div class="cityName">
                            {{ cityName }}
                        </div>
                        <!-- 氣象圖片 -->
                        <div class="headerIcn">
                            <!-- 晴天 -->
                            <img :class="setImage === 0 ? 'photoIn' : 'photoOut'"
                                src="../../assets/images/weatherPage/icon/summer.svg" alt="">
                            <!-- 有太陽的陰天 -->
                            <img :class="setImage === 1 ? 'photoIn' : 'photoOut'"
                                src="../../assets/images/weatherPage/icon/partlyCloudy.webp" alt="">
                            <!-- 陰天 -->
                            <img :class="setImage === 2 ? 'photoIn' : 'photoOut'"
                                src="../../assets/images/weatherPage/icon/cloudy.png" alt="">
                            <!-- 下雨 -->
                            <img :class="setImage === 3 ? 'photoIn' : 'photoOut'"
                                src="../../assets/images/weatherPage/icon/rainy.webp" alt="">
                            <!-- 雷雨 -->
                            <img :class="setImage === 4 ? 'photoIn' : 'photoOut'"
                                src="../../assets/images/weatherPage/icon/thunderstorm.png" alt="">
                            <!-- 雪 -->
                            <img :class="setImage === 5 ? 'photoIn' : 'photoOut'"
                                src="../../assets/images/weatherPage/icon/Snow.png" alt="">
                            <!-- 起霧 -->
                            <img :class="setImage === 6 ? 'photoIn' : 'photoOut'"
                                src="../../assets/images/weatherPage/icon/fog.webp" alt="">
                        </div>
                    </div>
                    <!-- 溫度 -->
                    <div class="temperature">
                        <div class="lowestTemperature">
                            <div class="lowestCount">
                                {{ minT.name }}
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
                                {{ maxT.name }}
                            </div>
                            <div class="maximumText">
                                最高溫度
                            </div>
                        </div>

                    </div>
                </div>
                <!-- 背景 -->
                <div class="imgBox">
                    <!-- 晴天 -->
                    <img :class="setImage === 0 ? 'photoIn' : 'photoOut'"
                        src="../../assets/images/weatherPage/boxBgImg/summer.webp" alt="">
                    <!-- 有太陽的陰天 -->
                    <img :class="setImage === 1 ? 'photoIn' : 'photoOut'"
                        src="../../assets/images/weatherPage/boxBgImg/partlyCloudy.webp" alt="">
                    <!-- 陰天 -->
                    <img :class="setImage === 2 ? 'photoIn' : 'photoOut'"
                        src="../../assets/images/weatherPage/boxBgImg/cloudy.webp" alt="">
                    <!-- 下雨 -->
                    <img :class="setImage === 3 ? 'photoIn' : 'photoOut'"
                        src="../../assets/images/weatherPage/boxBgImg/rainy.webp" alt="">
                    <!-- 雷雨 -->
                    <img :class="setImage === 4 ? 'photoIn' : 'photoOut'"
                        src="../../assets/images/weatherPage/boxBgImg/thunderstorm.webp" alt="">
                    <!-- 雪 -->
                    <img :class="setImage === 5 ? 'photoIn' : 'photoOut'"
                        src="../../assets/images/weatherPage/boxBgImg/Snow.webp" alt="">
                    <!-- 起霧 -->
                    <img :class="setImage === 6 ? 'photoIn' : 'photoOut'"
                        src="../../assets/images/weatherPage/boxBgImg/fog.webp" alt="">
                </div>
            </div>
            <NewsParamBox :paramName="'天氣'" :paramValue="wx.name" :setStyle="setImage" />
            <NewsParamBox :paramName="'舒適度'" :paramValue="ci.name" :setStyle="setImage" />
            <NewsParamBox :paramName="'降雨率'" :paramValue="`${pop.name}${pop.value}`" :setStyle="setImage" />
        </div>


    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import NewsParamBox from "./newsParamBox.vue";

export default {
    //氣象資料 / 設定時間
    props: ["ci", "maxT", "minT", "pop", "wx", "cityName", "setTime"],
    data() {
        return {

        };
    },
    created() {
    },
    mounted() {
        this.weatherData();
    },
    watch: {
        cityName(newVal) {
            this.weatherData();
        },
    },
    computed: {
        ...mapState(["weatherDataIsFetching"]),

        setImage() {
            const wxValue = this.wx.value;
            //晴天 
            if (wxValue === 1) return 0;
            // 有太陽的晴天
            else if (wxValue >= 2 && wxValue <= 3) return 1;
            // 陰天
            else if (wxValue >= 4 && wxValue <= 7) return 2;
            // 下雨
            else if (wxValue >= 8 && wxValue <= 14 || wxValue >= 19 && wxValue <= 20 || wxValue >= 29 && wxValue <= 31) return 3;
            // 雷雨
            else if (wxValue >= 15 && wxValue <= 18 || wxValue >= 21 && wxValue <= 22 || wxValue >= 33 && wxValue <= 36) return 4;
            // 雪
            else if (wxValue === 23 || wxValue === 42) return 5;
            // 霧
            else if (wxValue >= 24 && wxValue <= 28 || wxValue === 32 || wxValue >= 37 && wxValue <= 41) return 6;
            // 防止沒有值時傳了空值
            else return 0;
        }
    },
    methods: {
        weatherData() {
            //使用陣列取值會報錯 
            // this.wxData = this.wx[this.setTime].name;
            // this.MinTData = this.minT[this.setTime].name;
            // this.MaxTData = this.maxT[this.setTime].name;
            // this.CIData = this.ci[this.setTime].name;
            // this.PoPData = this.pop[this.setTime].name;
            // switch (this.setTime) {
            //     case 0:
            //         this.wxData = this.wx.time0;
            //         this.MinTData = this.minT.time0;
            //         this.MaxTData = this.maxT.time0;
            //         this.CIData = this.ci.time0;
            //         this.PoPData = this.pop.time0;
            //         break;
            //     case 1:
            //         this.wxData = this.wx.time1;
            //         this.MinTData = this.minT.time1;
            //         this.MaxTData = this.maxT.time1;
            //         this.CIData = this.ci.time1;
            //         this.PoPData = this.pop.time1;
            //         break;
            //     case 2:
            //         this.wxData = this.wx.time2
            //         this.MinTData = this.minT.time2;
            //         this.MaxTData = this.maxT.time2;
            //         this.CIData = this.ci.time2;
            //         this.PoPData = this.pop.time2;
            //         break;
            // }
            // return {
            //     Wx: this.Wx[this.setTimes].name,
            //     CI: this.CI[this.setTimes].name,
            //     MinT: this.MinT[this.setTimes].name,
            //     MaxT: this.MaxT[this.setTimes].name,
            //     PoP: this.PoP[this.setTimes].name,
            // }
        },
    },
    components: { NewsParamBox }
}

</script>
<style scoped>
.photoIn {
    animation: photoIn 1s ease forwards;
}

.photoOut {
    animation: photoOut 1s ease forwards;
}

#news {
    height: 100%;
    /* background: #000; */
}

.newsBox {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
    padding-top: 2rem;
    max-width: 30rem;
}

.headerBox {
    position: relative;
    margin-bottom: 1rem;
    padding-top: 1rem;
    width: 20rem;
    height: 15rem;
    background: rgb(255, 255, 255);
    border-radius: 20px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.426);
    overflow: hidden;
}

/* .headerBox::before {
    content: "";
    position: absolute;
    top: -50%;
    right: 0;



    width: 100px;
    height: 300px;
    background: rgba(255, 255, 255, 0.811);
    transform: rotate(-50deg);

    z-index: 2;
} */

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
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    border-right: 3px solid #fff;
}

.headerIcn {
    position: relative;
    margin-left: auto;
    margin-right: 2rem;
    width: 3rem;
    height: 3rem;
}

.headerIcn::before {
    content: "";
    position: absolute;
    top: -25%;
    right: -25%;



    width: 150%;
    height: 150%;
    background: rgb(255, 255, 255);
    /* transform: rotate(-50deg); */
    border-right: 5px solid rgb(92, 173, 255);
    border-bottom: 5px solid rgb(92, 173, 255);
    border-radius: 10px;

}

.headerIcn img {
    position: absolute;
    top: 0;
    left: 0;
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
</style>
