<template>
    <transition>
        <div v-bind="$attrs" v-show="openMapState" @mouseup="closeMap" class="taiwanMap">
            <div class="taiwanMapBox">

                <svg xmlns="http://www.w3.org/2000/svg" xmlns:amcharts="http://amcharts.com/ammap"
                    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0">
                    <g>
                        <!-- 渲染地圖 -->
                        <path v-for="map of mapData" :id="map.id" :title="map.title" :key="map.id" class="land"
                            :class="cityName === map.zhName ? 'activeMap' : ''" :d="map.svgData" />
                    </g>
                </svg>

            </div>
        </div>
    </transition>

    <button @mouseup="openMap" class="mapBtn">
        <div>
            <img src="../../assets/images/weatherPage/map/map.png" alt="">
        </div>
    </button>

</template>
<script>
import mapDataJson from "../../assets/images/weatherPage/map/mapData.json"

export default {
    props: ['cityName'],                //接收資料
    data() {
        return {
            mapData: [],
            openMapState: false
        }
    },
    created() {
        this.mapData = mapDataJson;
    },
    computed: {


    },
    methods: {
        openMap() {
            this.openMapState = true;
        },
        closeMap() {
            this.openMapState = false;
        }
    }
}
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.taiwanMap {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    z-index: 9;
    background: rgba(0, 0, 0, 0.5);
}

.taiwanMapBox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 30rem;
    height: 60%;
    background: rgb(0, 157, 255);

}

.taiwanMapBox svg {
    width: 306px;
    height: 394.19px;
}

.taiwanMapBox g {
    position: absolute;
    left: 0;
    top: 0;
    transform: scale(0.5)
}

.taiwanMapBox .land {
    fill: #00ff55;
    fill-opacity: 1;
    stroke: rgb(0, 0, 0);
    stroke-opacity: 1;
    stroke-width: 0.5;

    transition: fill 0.5s;
}

.taiwanMapBox .activeMap {
    fill: #ff0000;
    transform: translate(-0.2rem, -0.2rem);

}


.mapBtn {
    position: absolute;
    right: 0px;
    bottom: 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0;

    width: 4.3rem;
    height: 4.3rem;

    background: rgb(0, 106, 255);

    border: none;
}

.mapBtn:active {
    background: rgb(0, 255, 255);
}

.mapBtn div {
    width: 43px;
    height: 43px;
}

.mapBtn img {
    width: 100%;
    height: 100%;
}
</style>
