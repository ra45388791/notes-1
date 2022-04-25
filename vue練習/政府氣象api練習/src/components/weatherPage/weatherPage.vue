<template>
    <div id="weatherPage">
        <div class="weatherPageBox">
            <weatherController :cityName="cityNames" :times="times" @pushData="getWeatherOption" />
            <newsBox v-bind="showWeatherData" :setTimes="weather.time" />
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

import weatherController from './weatherController.vue';
import newsBox from './newsBox.vue';
export default {

    data() {
        return {
            weather: {
                city: '',
                time: ''
            }
        }
    },
    created() {
        //呼叫政府氣象API
        this.GET_WEATHER_API_DATA();
    },
    computed: {
        //取得處理好的資料
        ...mapGetters(['TIDY_UP_WEATHER_DATA']),
        cityNames() {
            const box = this.TIDY_UP_WEATHER_DATA.data.map(e => {
                return e.cityName;
            })
            return box;
        },
        times() {
            return this.TIDY_UP_WEATHER_DATA.time
        },
        showWeatherData() {
            const vm = this;
            //找到指定的縣市資料
            const checkedData = vm.TIDY_UP_WEATHER_DATA.data.find(e => e.cityName === vm.weather.city)


            return checkedData;
        }
    },
    methods: {
        ...mapActions(['GET_WEATHER_API_DATA']),
        //取得用戶選的縣市/時間段
        getWeatherOption(e) {
            console.log(e);
            this.weather.city = e.city;
            this.weather.time = e.time;

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
