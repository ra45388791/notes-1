<template>
    <div v-if="weatherDataIsFetching" class="options" :class="show ? 'itemShowState' : 'itemCloseState'">
        <div class="optionsBox">

            <label for="area">
                <h3>
                    - 請選擇地區 -
                </h3>
                <select v-model="areaValue" name="area" id="area">
                    <option v-for="area of parseCityName" :value="area.id" :key="area.id">{{ area.area }}
                    </option>
                </select>
            </label>

            <label for="city">
                <h3>
                    - 請選擇縣市 -
                </h3>
                <select v-model="cityValue" name="city" id="city" @input="pushData">
                    <option v-for="city of changeCity" :key="city.city" :value="city.city">{{ city.city }}</option>
                </select>
            </label>


            <label for="time">
                <h3>
                    - 請選擇時間段 -
                </h3>
                <select v-model="timeValue" name="time" id="time" @input="pushData">
                    <option v-for="time of parseTimes" :key="time.id" :value="time.id">{{ time.time }}</option>

                </select>
            </label>

        </div>

        <div @mouseup="changItemState" class="controllerButton">
            <h3>選擇縣市</h3>
            <button @mouseup="changItemState" class="showBtn" :class="show ? 'buttonShowState' : 'buttonCloseState'">
                <div class="showControllerButton">
                </div>
            </button>
        </div>

    </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    props: ['cityName', 'times'],    //接收資料
    emit: ['pushData'],      //將選中的文章推上去
    data() {
        return {
            style: [],
            show: false,
            areaValue: 0,       //地區
            cityValue: '',      //城市
            timeValue: 0,       //時間
        }
    },
    watch: {
        cityValue: function (newVal) {
            if (newVal) {
                this.$emit('pushData', {
                    city: newVal,
                    time: this.timeValue
                })
                this.closeItem();
                console.log('城市觸發');
            }
        },
        timeValue: function (newVal) {
            if (newVal || newVal === 0) {
                this.$emit('pushData', {
                    city: this.cityValue,
                    time: newVal
                })
                this.closeItem();
                console.log('時間觸發');
            }
        },
    },
    mounted() {
        this.$nextTick(function () {
            const firstCity = this.parseCityName[this.areaValue].city[0]
            this.cityValue = firstCity;
        })
    },
    computed: {
        ...mapState(['weatherDataIsFetching']),

        //取得變更過後的地區+時間
        // totalData() {
        //     return `${this.areaValue}+${this.timeValue}`
        // },
        parseCityName() {
            //取出指定區域縣市
            const northern = new RegExp(/(臺北市)|(新北市)|(基隆市)|(新竹市)|(桃園市)|(新竹縣)|(宜蘭縣)/g);
            const central = new RegExp(/(臺中市)|(苗栗縣)|(彰化縣)|(南投縣)|(雲林縣)/g)
            const south = new RegExp(/(高雄市)|(臺南市)|(嘉義市)|(嘉義縣)|(屏東縣)|(澎湖縣)/g)
            const east = new RegExp(/(花蓮縣)|(臺東縣)/g)
            const outlyingIslands = new RegExp(/(金門縣)|(連江縣)/g)

            const northernBox = this.cityName.filter((e) => { if (northern.test(e)) return e })
            const centralBox = this.cityName.filter((e) => { if (central.test(e)) return e })
            const southBox = this.cityName.filter((e) => { if (south.test(e)) return e })
            const eastBox = this.cityName.filter((e) => { if (east.test(e)) return e })
            const outlyingIslandsBox = this.cityName.filter((e) => { if (outlyingIslands.test(e)) return e })

            const box = [
                {
                    id: 0,
                    area: '北部',
                    city: northernBox
                },
                {
                    id: 1,
                    area: '中部',
                    city: centralBox
                },
                {
                    id: 2,
                    area: '南部',
                    city: southBox
                },
                {
                    id: 3,
                    area: '東部',
                    city: eastBox
                },
                {
                    id: 4,
                    area: '離島',
                    city: outlyingIslandsBox
                    ,
                }
            ]
            return box

        },
        parseTimes() {          //監聽時間參數

            const box = this.times.map((e, index) => {
                const start = e.start.slice(11, 13);
                const end = e.end.slice(11, 13);

                let textStart = '';
                let textEnd = '';

                switch (start) {
                    case '00':
                        textStart = '早上 0 點'
                        break;
                    case '06':
                        textStart = '早上 6 點'
                        break;
                    case '18':
                        textStart = '晚上 6 點'
                        break;
                }
                switch (end) {
                    case '00':
                        textEnd = '早上 0 點'
                        break;
                    case '06':
                        textEnd = '早上 6 點'
                        break;
                    case '18':
                        textEnd = '晚上 6 點'
                        break;
                }


                return {
                    id: index,
                    time: `${textStart} ~ ${textEnd}`
                }
            })

            return box;
        },
        //根據選取的地區顯示對應的縣市
        //並設定第一個城市值
        changeCity() {
            const box = this.parseCityName[this.areaValue].city.map((e, index) => {
                const boxis = {
                    id: index,
                    city: e
                }
                return boxis;
            })
            //設定第一個城市值

            return box
        },



    },
    methods: {
        changItemState() {                  //切換選擇區狀態
            this.show = !this.show;
        },
        closeItem() {                       //關閉選擇區
            this.show = false;
        },
        openItem() {                        //開啟選擇區
            const vm = this;
            setTimeout(() => {
                vm.show = true;
            }, 300)
        },

    }


}
</script>
<style scoped>
/* 動畫 */
.itemCloseState {
    height: 0rem;
}

.itemShowState {
    height: 22rem;
}

.buttonCloseState {
    transform: rotate(0deg);

}

.buttonShowState {
    transform: rotate(-180deg);
}


/* 開始 */
.options {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;

    background: rgb(239, 239, 239);

    transition: 0.5s ease-in-out;
    z-index: 9;
}

.optionsBox {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

.optionsBox div {
    text-align: center;
}

.optionsBox label {
    width: 100%;
    text-align: center;
    /* height: 0rem; */
}

.optionsBox label select {

    width: auto;
    height: 3rem;
    font-size: 2rem;
}




.controllerButton {
    position: relative;
    width: 100%;
    height: 3.5rem;
    background: rgb(82, 82, 82);
    box-shadow: 0 5px 10px 0 #000;
    border-radius: 0 0 20px 20px
}

.controllerButton h3 {
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
    color: #fff;
    line-height: 4rem
}

.showBtn {
    position: absolute;
    /* rigth 動畫 */
    right: 1.5rem;
    top: calc(50% - 1.25rem);
    padding: 0.25rem;

    width: 2.5rem;
    height: 2.5rem;
    background: rgb(255, 255, 255);
    border-radius: 100%;
    border: 0;

    transition: 0.5s ease-in-out;
}


.showControllerButton {
    width: 100%;
    height: 100%;

    /* border: 2px solid #00ffff;
    border-radius: 100%; */
}

.showControllerButton::before {
    content: "";
    position: absolute;
    left: calc(50% - 1rem);
    top: calc(50% - 2.5px);

    width: 2rem;
    height: 5px;
    background: rgba(82, 82, 82);

}

.showControllerButton::after {
    content: "";
    position: absolute;
    left: calc(50% - 2.5px);
    top: calc(50% - 1rem);

    width: 5px;
    height: 2rem;
    background: rgba(82, 82, 82);

}

/* @media (min-width: 768px) {
    .itemCloseState {
        padding: 0rem 1.5rem;
        height: 0rem;
    }

    .itemShowState {
        padding: 5px 1.5rem;
        height: 11.5rem;
    }

    .optionsBox {
        display: flex;
        justify-content: space-around;
        align-content: start;
        flex-wrap: wrap;
    }


}

@media (min-width: 1024px) {
    .itemCloseState {
        padding: auto;
        height: 24rem;
    }

    .itemShowState {
        padding: auto;
        height: 24rem;
    }

    .buttonCloseState {
        right: 0;
    }

    .buttonShowState {
        right: calc(50% - 1.625rem);

    }

    .options {
        position: relative;
        right: auto;
        top: auto;
        padding: 0rem 0;
        width: 50%;
        height: 100%;
        box-shadow: inset 4px -3px 0px 0px #1b697d;
        border-radius: 0 0 0 20px;

    }

    .optionsBox {
        display: flex;
        justify-content: space-around;
        align-content: start;
        flex-wrap: wrap;
        padding: 0.7rem 1.5rem;
    }


    .showBtn {
        display: none;
    }

}

@media (min-width: 1440px) {
    .options {
        width: 40%;
    }
}

@media (min-width: 1920px) {
    .options {
        width: 30%;
    }
} */
</style>
