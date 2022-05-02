<template>
    <div v-if="weatherDataIsFetching" v-bind="$attrs" id="weatherPage">
        <div class="weatherPageBox">
            <weatherController :cityName="cityNames" :times="times" @pushData="getWeatherOption" />
            <newsBox v-bind="weatherData" :cityName="weather.city" :setTime="changeTime" />
        </div>
    </div>
    <div v-else class="loading">
        <!-- 暫時放著 沒甚麼用處 -->
        讀取中
    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

import weatherController from './weatherController.vue';
import newsBox from './newsBox.vue';
export default {

    data() {
        return {
            weather: {
                city: '',   //用戶選取的城市
                time: 0
            },
            weatherData: {
                wx: '',
                minT: '',
                maxT: '',
                ci: '',
                pop: '',
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

            this.weather.city = e.city;

            this.weather.time = e.time;

            this.showWeatherData();

        }

    },
    components: { weatherController, newsBox }
}

</script>



<style scoped>
#weatherPage {
    position: relative;
    width: 100vw;
    height: calc(100vh - 5rem);
}

.weatherPageBox {
    position: relative;
    padding-top: 3.5rem;
    width: 100%;
    height: 100%;
    /* background: #000; */
}

.content {
    /* background: #000; */
    height: 100%;
}
</style>
