<template>
    <div v-if="weatherDataIsFetching" v-bind="$attrs" id="weatherPage">
        <div class="weatherPageBox">
            <weatherController :cityName="cityNames" :times="times" @pushData="getWeatherOption" />
            <newsBox v-bind="weatherData" :cityName="weather.city" :setTime="changeTime" @openMap="openTaiWanMap" />
            <TaiwanMap ref="taiwanMapTemp" :cityName="weather.city" @pushData="getWeatherOption" />
        </div>


    </div>
    <!-- <div v-else class="loading">
        暫時放著 沒甚麼用處
        讀取中
    </div> -->
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

import weatherController from './weatherController.vue';
import newsBox from './newsBox.vue';
import TaiwanMap from "./taiwanMap.vue";
export default {

    data() {
        return {
            weather: {
                city: '新北市',   //用戶選取的城市
                time: 0
            },
            weatherData: {  //預設選中的天氣參數
                wx: {
                    name: '晴天',
                    value: 0
                },
                minT: {
                    name: "0",
                    value: "C"
                },
                maxT: {
                    name: "0",
                    value: "C"
                },
                ci: {
                    name: "舒適"
                },
                pop: {
                    name: "0",
                    value: "%"
                },
            }
        }
    },
    created() {
        //呼叫政府氣象API
        // this.GET_WEATHER_API_DATA();
    },
    computed: {
        //取得處理好的資料
        ...mapState(['weatherDataIsFetching']),
        ...mapGetters(['TIDY_UP_WEATHER_DATA']),
        cityNames() {
            const box = this.TIDY_UP_WEATHER_DATA.data.map(e => {
                return e.cityName;
            })
            return box;
        },
        times() {
            const box = this.TIDY_UP_WEATHER_DATA.time.map(e => {
                return e
            })
            return box
        },
        changeTime() {
            return this.weather.time
        }

    },
    methods: {
        //選取的資料
        showWeatherData() {
            const vm = this;
            //找到指定的縣市資料
            // const checkedData = vm.TIDY_UP_WEATHER_DATA.data.filter(e => e.cityName === vm.weather.city)[0]
            const checkedData = vm.TIDY_UP_WEATHER_DATA.data.find(e => e.cityName === vm.weather.city)
            switch (this.weather.time) {
                case 0:
                    this.weatherData.wx = checkedData.wx.time0;
                    this.weatherData.minT = checkedData.minT.time0;
                    this.weatherData.maxT = checkedData.maxT.time0;
                    this.weatherData.ci = checkedData.ci.time0;
                    this.weatherData.pop = checkedData.pop.time0;
                    break;
                case 1:
                    this.weatherData.wx = checkedData.wx.time1;
                    this.weatherData.minT = checkedData.minT.time1;
                    this.weatherData.maxT = checkedData.maxT.time1;
                    this.weatherData.ci = checkedData.ci.time1;
                    this.weatherData.pop = checkedData.pop.time1;
                    break;
                case 2:
                    this.weatherData.wx = checkedData.wx.time2;
                    this.weatherData.minT = checkedData.minT.time2;
                    this.weatherData.maxT = checkedData.maxT.time2;
                    this.weatherData.ci = checkedData.ci.time2;
                    this.weatherData.pop = checkedData.pop.time2;
                    break;
            }

        },

        //取得用戶選的縣市/時間段
        /**
         * @param{
                    city: this.cityValue,
                    time: newVal
                }
        */
        getWeatherOption(e) {
            if (this.weather.city) this.weather.city = e.city;
            if (this.weather.time) this.weather.time = e.time;

            this.showWeatherData();
        },
        openTaiWanMap() {
            console.log(this.$refs);
            this.$refs.taiwanMapTemp.openMap();
        }


    },
    components: { weatherController, newsBox, TaiwanMap }
}

</script>



<style scoped>
#weatherPage {
    position: relative;
    width: 100vw;
    min-height: calc(100vh - 5rem - 3rem);
}

.weatherPageBox {
    position: relative;

    padding: 3.5rem 0;
    width: 100%;
    height: 100%;
}

@media (min-width: 1024px) {
    .weatherPageBox {
        display: flex;
        align-items: center;
        padding-top: 0;
    }

}
</style>
