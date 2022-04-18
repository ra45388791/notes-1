<template>
    <div v-bind="$attrs" id="calenderPager">
        <div class="calenderBox">

            <div class="dayBox">
                <ul class="day">
                    <li v-for="item of weekdays" :key="item.text"> {{ item.text }}
                    </li>
                </ul>
            </div>

            <div class="dateBox">
                <ul class="day">

                    <li is="vue:DayBox" v-for="days of beforeMonthDays" v-bind="days" :key="days.id">
                    </li>

                    <li is="vue:DayBox" v-for="days of thisMonthDays" v-bind="days" :key="days.id">
                    </li>

                    <li is="vue:DayBox" v-for="days of afterMonthDays" v-bind="days" :key="days.id">
                    </li>
                </ul>
            </div>
            <transition>

                <div class="control" :class="showControl ? 'showControl' : 'closeControl'">

                    <button @mouseup="monthReduce" class="reduce"></button>

                    <input :value="chooseDateRes" @input="setDate" type="month">

                    <button @mouseup="monthPlus" class="plus"></button>


                    <div class="showControlButton">
                        <button @mouseup.stop="showControl = !showControl"
                            :class="showControl ? 'triggerControl' : 'notTriggerControl'"></button>
                    </div>
                </div>
            </transition>

        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import DayBox from "./dayBox.vue";


export default {
    data() {
        return {
            weekdays: [
                { text: "一" },
                { text: "二" },
                { text: "三" },
                { text: "四" },
                { text: "五" },
                { text: "六" },
                { text: "日" },
            ],
            chooseDate: {
                year: NaN,
                month: NaN
            },
            showControl: false
        };
    },
    created() {
        this.$nextTick(function () {
            const today = new Date;
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            this.chooseDate.year = year;
            this.chooseDate.month = month;
        })


    },
    computed: {
        ...mapState(["mainArticles"]),
        //今日年月日
        today() {
            const today = new Date;
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate();
            const date = this.workWithNumbers(month, day);

            return `${year}-${date.month}-${date.day}`;
        },
        //月份控制器參數
        chooseDateRes() {
            if (String(this.chooseDate.month).length === 1) {
                return `${this.chooseDate.year}-0${this.chooseDate.month}`;
            }
            else {
                return `${this.chooseDate.year}-${this.chooseDate.month}`;
            }
        },
        //選中月分
        thisMonthDays() {
            let arrayDays = [];


            //原始年、月參數
            const originYear = this.chooseDate.year;
            const originMonth = this.chooseDate.month - 1;

            // 取得本月最後一天
            const totalLastDate = new Date(originYear, originMonth + 1, 0);
            const totalDate = totalLastDate.getDate();

            //包裝
            for (let i = 0; i < totalDate; i++) {
                //基礎套用class
                const styles = [];

                const thisMonth = this.workWithNumbers(originMonth + 1, i + 1);
                const id = `${originYear}-${thisMonth.month}-${thisMonth.day}`;

                const article = this.searchArticle(id);
                // if (article) styles.push('haveArticle');


                //包裝
                arrayDays.push({
                    id: id,
                    day: i + 1,
                    styles: styles,
                    today: this.isToday(id),     //如果日期是今天 設為true 否則 false
                    article: article
                });
            }
            return arrayDays;
        },
        //前一個月顯示
        beforeMonthDays() {
            let arrayDays = [];



            //原始年、月參數
            const originYear = this.chooseDate.year;
            const originMonth = this.chooseDate.month - 1;

            // 取得本月星期幾
            const firstDate = new Date(originYear, originMonth, 1);
            let firstDayWeek = firstDate.getDay();

            // 前一個月的最後一天
            const lastDay = new Date(originYear, originMonth, 0);
            let oldDaysBefore = lastDay.getDate();
            if (firstDayWeek === 0) {
                firstDayWeek = 7; // 如果是禮拜天 星期參數會是0
                oldDaysBefore -= 5;
            }
            else {
                //前一個月最後一天 - (本月星期x - 2) 
                oldDaysBefore -= (firstDayWeek - 2);
            }
            // 填充空格的上個月天數
            for (let i = 0; i < firstDayWeek - 1; i++) {
                //基礎套用class
                const styles = ['oldDays']

                //如果原始月份-1 === 0 代表是 12月
                const before = this.workWithNumbers(originMonth === 0 ? 12 : originMonth, oldDaysBefore);
                const id = `${originYear}-${before.month}-${before.day}`;

                const article = this.searchArticle(id);
                // if (article) styles.push('haveArticle');

                //包裝
                arrayDays.push({
                    id: `before-${id}`,
                    day: oldDaysBefore,
                    styles: styles,
                    today: this.isToday(id),        //如果日期是今天 設為true 否則 false
                    article: article
                });
                oldDaysBefore++;
            }
            return arrayDays;
        },
        //下一個月顯示
        afterMonthDays() {
            let arrayDays = [];


            //原始年、月參數
            const originYear = this.chooseDate.year;
            const originMonth = this.chooseDate.month - 1;
            const oldDaysAfter = 42 - (this.thisMonthDays.length + this.beforeMonthDays.length);
            for (let i = 0; i < oldDaysAfter; i++) {
                //基礎套用class
                const styles = ['oldDays']

                const after = this.workWithNumbers(originMonth + 2, i + 1);
                const id = `${originYear}-${after.month}-${after.day}`;



                const article = this.searchArticle(id);
                // if (article) styles.push('haveArticle');


                //包裝
                arrayDays.push({
                    id: `after-${id}`,
                    day: i + 1,
                    styles: styles,
                    today: this.isToday(id),     //如果日期是今天 設為true 否則 false
                    article: article
                });

            }
            return arrayDays;
        },

        totalMonth() {
            const totalMonth = this.beforeMonthDays.concat(this.thisMonthDays, this.afterMonthDays);
            return totalMonth
        }
    },
    methods: {
        //使用者手動設定月份
        setDate: function (e) {
            this.chooseDate.year = Number(e.target.value.slice(0, 4));
            this.chooseDate.month = Number(e.target.value.slice(5));
        },
        monthReduce: function () {
            if (this.chooseDate.month === 1) {
                this.chooseDate.year -= 1;
                this.chooseDate.month = 12;
                return;
            }
            this.chooseDate.month -= 1;
        },
        monthPlus: function () {
            if (this.chooseDate.month === 12) {
                this.chooseDate.year += 1;
                this.chooseDate.month = 1;
                return;
            }
            this.chooseDate.month += 1;
        },

        workWithNumbers: function (month, day) {
            //處裡如果數字為個位數在前方+1個0 以配對資料
            let idMonth = "";
            let idDay = "";
            //如果小於10 在數字前 + 一個0
            if (month + 1 < 10)
                idMonth = `0${month}`;
            else
                idMonth = `${month}`;
            if (day + 1 < 10)
                idDay = `0${day}`;
            else
                idDay = `${day}`;
            return { month: idMonth, day: idDay };
        },
        isToday: function (date) {
            if (this.today === date) return true;
            else return false;
        },
        searchArticle: function (date) {
            const search = this.mainArticles.find(function (e) {
                if (e.date === date) return e;
            })

            if (search) return search;
            else return false;
        }

    },
    components: { DayBox }
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


*,
::after,
::before {
    box-sizing: border-box;
}




/* 星期區 */
#calenderPager {
    width: 100%;
    /* -(body上下距離) */
    height: calc(100vh - 64px - 100px);

}

.calenderBox {
    display: flex;
    flex-direction: column;

    width: 100%;
    /*補足異點下面的缺少高度*/
    height: calc(100vh - 64px);
    text-align: center;
    background: #126376;
}

.dayBox {
    padding: 1rem 1rem 0;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 700;
    box-sizing: border-box;

}

.dayBox .day {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    padding: 0;

}

.dayBox .day::before {
    content: "";
    position: absolute;
    left: calc(50% - 47.5%);
    top: 3rem;
    width: 95%;

    border-bottom: solid 3px rgb(255, 255, 255);
    border-radius: 10%;
}

.dayBox .day li {
    display: inline-block;
    width: calc(100% / 7);
}


/* 日期區 */
.dateBox {

    padding: 1rem 1rem 0;

    width: 100%;
    height: 100%;
}

.dateBox .day {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0;
    padding: 0;
    width: 100%;
}


/* 控制器 */
.control {
    position: fixed;
    right: 0;
    bottom: -2px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 60px;
    padding-left: 10vw;
    width: 110vw;
    height: 5rem;

    background: rgb(0, 132, 255);
    border-radius: 50px 0 0 50px;
    border: 5px solid rgb(0, 213, 255);
    box-sizing: border-box;
    transition: 0.5s ease-in-out;
    z-index: 10;
}

.showControl {
    right: 0;
}

.closeControl {
    right: -110vw;
}


.reduce {
    position: relative;
    margin-right: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.264);
    border: 0;
    border-radius: 100%;
}

.reduce::before {
    content: "";
    position: absolute;
    left: calc(50% - 1rem);
    top: calc(50% - 0.2rem);
    width: 2rem;
    height: 0.4rem;
    background: rgb(0, 132, 255);

}

.plus {
    position: relative;
    margin-left: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    background: rgba(255, 255, 255, 0.264);
    border: 0;
    border-radius: 100%;
}

.plus::before {
    content: "";
    position: absolute;
    left: calc(50% - 1rem);
    top: calc(50% - 0.2rem);
    width: 2rem;
    height: 0.4rem;
    background: rgb(0, 132, 255);

}

.plus::after {
    content: "";
    position: absolute;
    left: calc(50% - 0.2rem);
    top: calc(50% - 1rem);
    width: 0.4rem;
    height: 2rem;
    background: rgb(0, 132, 255);

}

.showControlButton button {
    position: fixed;
    right: -2.5rem;
    bottom: 3.7rem;
    width: 5rem;
    height: 5rem;
    border: 1px solid rgb();
    background: rgb(0, 166, 255);
    border: 0;
    border-radius: 100%;
    box-shadow: 0 0 10px -5px #000;
    transition: 0.5s ease-in-out;

}

.showControlButton button::before {
    content: "";
    position: absolute;
    left: 0.5rem;
    top: calc(50% - 0.125rem);
    width: 1.3rem;
    height: 0.25rem;
    border-radius: 50px;
    background: rgb(0, 247, 255);
    box-shadow: 0 7px 0 0 rgb(0, 247, 255), 0 -7px 0 0 rgb(0, 247, 255);
}

.showControlButton button::after {
    content: "";
    position: absolute;
    right: 0.8rem;
    top: calc(50% - 0.8rem);
    width: 0;
    height: 0;

    border-top: 0.8rem solid rgb(0, 132, 255, 0);
    border-bottom: 0.8rem solid rgb(0, 132, 255, 0);
    border-left: 0rem solid rgb(0, 247, 255, 0);
    border-right: 0.8rem solid rgb(0, 247, 255);
}

.triggerControl {
    transform: rotate(180deg);
}

.notTriggerControl {
    transform: rotate(0deg);
}

@media (min-width: 1024px) {
    #calenderPager {

        /* -(body上下距離) */
        height: 100vh;
        /* max-height: 100vh; */
    }

    .calenderBox {
        /*補足一點下面的缺少高度*/
        height: 100%;
    }



    .control {
        position: fixed;
        right: 0;
        bottom: 0;
        margin-bottom: 0px;
        padding: 0;
        width: calc(100% - 23rem);
        height: 5rem;

        border-radius: 20px 0 0 0;
        border: 5px solid rgb(0, 213, 255);
        border-bottom: 0;

    }



    .showControl {
        right: 0;
        bottom: 0;
    }

    .closeControl {
        right: 0;
        bottom: -5rem;
    }

    .showControlButton button {
        position: fixed;
        right: -2.5rem;
        bottom: 0rem;
        width: 5rem;
        height: 5rem;
        transition: 0.5s ease-in-out;
    }



    .showControlButton button::after {
        right: 0.6rem;
        top: calc(50% - 0.6rem);

        border-top: 0rem solid rgb(0, 247, 255, 0);
        border-bottom: 0.8rem solid rgb(0, 247, 255);
        border-left: 0.8rem solid rgb(0, 247, 255, 0);
        border-right: 0.8rem solid rgb(0, 247, 255, 0);
    }
}

@media (min-width: 1440px) {

    .control {

        width: calc(100% - 30rem);

    }

}

@media (min-width: 1920px) {

    /* 星期區 */
    .dayBox {
        font-size: 2rem;
    }

    .dayBox .day::before {
        top: 4rem;
    }

    /* 控制器 */
    .control {

        width: calc(100% - 40rem);
        height: 8rem;
        border: 8px solid rgb(0, 213, 255);
        border-bottom: 0;

    }


    .closeControl {
        right: 0;
        bottom: -8rem;
    }

    .reduce {
        margin-right: 2rem;
        width: 5rem;
        height: 5rem;
    }

    .reduce::before {
        content: "";
        position: absolute;
        left: calc(50% - 1.75rem);
        top: calc(50% - 0.35rem);
        width: 3.5rem;
        height: 0.7rem;
    }

    .plus {
        margin-left: 2rem;
        width: 5rem;
        height: 5rem;
    }

    .plus::before {

        left: calc(50% - 1.75rem);
        top: calc(50% - 0.35rem);
        width: 3.5rem;
        height: 0.7rem;
    }

    .plus::after {

        left: calc(50% - 0.35rem);
        top: calc(50% - 1.75rem);
        width: 0.7rem;
        height: 3.5rem;
    }

    .control input {
        font-size: 2rem;

    }


    .showControlButton button {
        position: fixed;
        right: -4rem;
        bottom: 0rem;
        width: 8rem;
        height: 8rem;
        transition: 0.5s ease-in-out;
    }

    .showControlButton button::before {

        left: 1rem;
        top: calc(50% - 0.125rem);
        width: 2.3rem;
        height: 0.5rem;
        border-radius: 1px;
        background: rgb(0, 247, 255);
        box-shadow: 0 15px 0 0 rgb(0, 247, 255), 0 -15px 0 0 rgb(0, 247, 255);
    }

    .showControlButton button::after {
        right: 0.8rem;
        top: calc(50% - 1rem);

        border-top: 0rem solid rgb(0, 247, 255, 0);
        border-bottom: 1.3rem solid rgb(0, 247, 255);
        border-left: 1.3rem solid rgb(0, 247, 255, 0);
        border-right: 1.3rem solid rgb(0, 247, 255, 0);
    }


}
</style>
