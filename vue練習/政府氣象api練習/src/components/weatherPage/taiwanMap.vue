<template>
    <transition>
        <div v-bind="$attrs" @mouseup.self="closeMap" class="taiwanMap" :class="openMapState ? 'showMap' : 'closeMap'"
            :style="defaultStyle">

            <div class="taiwanMapBox">
                <nav class="mapNav">
                    <h3>
                        目標縣市
                    </h3>
                    <button @mouseup.self="closeMap"></button>
                </nav>
                <div class="mapBox">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:amcharts="http://amcharts.com/ammap"
                        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0">
                        <g>
                            <!-- 渲染地圖 -->
                            <path v-for="map of mapData" :id="map.id" :title="map.title" :key="map.id" class="land"
                                :class="cityName === map.zhName ? 'activeMap' : ''" :d="map.svgData"
                                @mouseup="checkedCity(map.zhName)" />
                        </g>
                    </svg>
                    <!-- 過小的區域用按鈕替代 -->
                    <div class="smallCityBtn">
                        <div class="cityBox outerIslands">
                            <button @mouseup="checkedCity('連江縣')">連江縣</button>
                            <button @mouseup="checkedCity('金門縣')">金門縣</button>
                            <button @mouseup="checkedCity('澎湖縣')">澎湖縣</button>
                        </div>

                        <div class="cityBox northernCity">
                            <button @mouseup="checkedCity('基隆市')">基隆市</button>
                            <button @mouseup="checkedCity('新北市')">新北市</button>
                            <button @mouseup="checkedCity('臺北市')">臺北市</button>
                        </div>

                        <div class="cityBox chiayiCity">
                            <button @mouseup="checkedCity('嘉義市')">嘉義市</button>
                            <button @mouseup="checkedCity('嘉義縣')">嘉義縣</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </transition>
    <!-- 
    <button @mouseup="openMap" class="mapBtn">
        <div>
            <img src="../../assets/images/weatherPage/map/map.png" alt="">
        </div>
    </button> -->

</template>
<script>
import mapDataJson from "../../assets/images/weatherPage/map/mapData.json"

export default {
    props: ['cityName'],                //接收資料
    emits: ['pushData'],
    data() {
        return {
            mapData: [],
            defaultStyle: '',           //控制地圖顯示
            openMapState: false
        }
    },
    created() {
        const vm = this;
        const view = window.innerWidth
        // 如果裝置寬度小於 1024 代表地圖不是直接顯示
        if (view < 1024) {
            vm.defaultStyle = 'visibility: hidden;'
        }

        this.mapData = mapDataJson;
    },
    mounted() {
        const vm = this;
        const view = window.innerWidth

        //防止一開始就出現地圖
        if (view < 1024) {
            setTimeout(() => {
                vm.defaultStyle = ''
            }, 500)
        }
    },
    computed: {


    },
    methods: {
        openMap() {
            this.openMapState = true;
        },
        closeMap() {
            this.openMapState = false;
        },
        checkedCity(e) {
            // console.log(e);
            this.$emit('pushData', {
                city: e
            })
        }
    }
}
</script>
<style scoped>
/* .v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
} */

.showMap {
    animation: showMap 0.5s ease-out forwards;
}

.closeMap {
    animation: closeMap 0.5s ease-out forwards;
}

@keyframes showMap {
    0% {
        visibility: hidden;
        opacity: 0;
    }

    1% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes closeMap {
    0% {
        opacity: 1;
    }

    99% {
        opacity: 0;
    }

    100% {
        visibility: hidden;
        opacity: 0;
    }

}


/* 開始 */

.taiwanMap {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;

    justify-content: center;
    align-items: center;

    width: 100%;
    height: calc(100% - 5rem);
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;

}


.taiwanMapBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 30rem;
}

.mapNav {
    position: relative;
    width: 100%;
    height: 3rem;
    background: rgb(0, 106, 255);
    text-align: center;
    line-height: 3rem;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
}

.mapNav h3 {
    margin: 0;
    padding: 0;
}

.mapNav button {
    position: absolute;
    top: 0;
    right: 0;

    width: 3rem;
    height: 3rem;

    background: rgb(0, 106, 255);
    border: 0;
}

.mapNav button:hover {
    background: rgb(58, 140, 255);
}

.mapNav button::before {
    content: "";
    position: absolute;
    top: calc(50% - 1.5px);
    left: calc(50% - 1rem);
    width: 2rem;
    height: 3px;
    background: #fff;
    transform: rotate(45deg);
}

.mapNav button::after {
    content: "";
    position: absolute;
    top: calc(50% - 1.5px);
    left: calc(50% - 1rem);
    width: 2rem;
    height: 3px;
    background: #fff;
    transform: rotate(135deg);
}



.mapBox {
    flex: 1;

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem;
    width: 100%;
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

    transition: fill 0.3s;
}

.taiwanMapBox .land:hover {
    fill: #00eaff;
}

.taiwanMapBox .activeMap {
    fill: #ff0000;
    transform: translate(-0.2rem, -0.2rem);
}

.smallCityBtn .cityBox {
    display: flex;
    flex-direction: column;

    position: absolute;

}

.smallCityBtn button {
    margin-bottom: 0.5rem;

    width: 5rem;
    height: 1.5rem;

    font-size: 1rem;
    color: #fff;

    background: rgb(0, 208, 255);

    border: none;
    border-radius: 10px;
    font-weight: bold;

}

/* 離島 */
.smallCityBtn .outerIslands {
    top: 0.5rem;
    left: 0.5rem;
}

.smallCityBtn .northernCity {
    top: 0.5rem;
    right: 0.5rem;
}

.smallCityBtn .chiayiCity {
    bottom: 0.5rem;
    left: 0.5rem;
}




.smallCityBtn button:hover {
    background: rgb(117, 230, 255);

}

/* .land[id="TW-LIE"] {
    position: relative;
} */




@media (min-width: 1024px) {
    .showMap {
        animation: none;
    }

    .closeMap {
        animation: none;
    }

    .taiwanMap {
        flex: 1;

        display: flex;
        flex-direction: column;

        position: relative;
        bottom: auto;
        left: auto;
        height: 100%;
        background: rgba(0, 0, 0, 0);
        opacity: 1;
        z-index: auto;
    }

    .mapNav {
        margin-bottom: 2rem;

        background: none;
    }

    .mapNav h3 {
        padding: 0rem 1rem;
        display: inline-block;

        color: #fff;
        /* border: solid 5px rgb(0, 102, 255); */
        background: rgb(0, 102, 255);
        border-radius: 10px;
    }

    .mapNav button {
        display: none;
    }

    .mapBox {

        border: dashed 5px rgb(146, 239, 255);
    }


}
</style>
