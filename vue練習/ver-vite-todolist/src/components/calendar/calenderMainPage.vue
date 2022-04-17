<template>
    <div id="calenderPager">
        <div class="calenderBox">

            <div class="dayBox">
                <ul class="day">
                    <li v-for="item of weekdays" :key="item.text"> {{ item.text }}
                    </li>
                </ul>
            </div>

            <div class="dateBox">
                <ul class="day">
 

                        <li is="vue:DayBox" v-for="days of month.dateData.before" v-bind="days" :key="days.id">
                        </li>

                        <li is="vue:DayBox" v-for="days of month.dateData.thisMonth" v-bind="days" :key="days.id">
                        </li>

                        <li is="vue:DayBox" v-for="days of month.dateData.after" v-bind="days" :key="days.id">
                        </li>

                    </ul>
                </div>
            </div>

            <div class="control">
                <button @mouseup="monthReduce">
                    -
                </button>
                <input v-model="chooseDateRes" type="month">
                <button @mouseup="monthPlus">
                    +
                </button>
            </div>

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
            }
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




        //總月份
        totalMonth: function () {
            let totalDate = []

            for (let i = 0; i < 12; i++) {
                const beforeData = this.beforeMonthDays(this.chooseDate.year, i + 1);
                const thisMonthData = this.thisMonthDays(this.chooseDate.year, i + 1);
                const afterData = this.afterMonthDays(this.chooseDate.year, i + 1, beforeData.length, thisMonthData.length);


                totalDate.push({
                    id: `${this.chooseDate.year}-${i + 1}`,
                    year: this.chooseDate.year,
                    month: i + 1,
                    dateData: {
                        before: beforeData,
                        thisMonth: thisMonthData,
                        after: afterData
                    }
                })
            }
            return totalDate
        }
    },
    methods: {
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

        //選中月分
        thisMonthDays: function (year, month) {
            let arrayDays = [];

            //基礎套用class
            const styles = [];

            //原始年、月參數
            const originYear = year;
            const originMonth = month - 1;
            // 取得本月最後一天
            const totalLastDate = new Date(originYear, originMonth + 1, 0);
            const totalDate = totalLastDate.getDate();
            //包裝
            for (let i = 0; i < totalDate; i++) {
                const thisMonth = this.workWithNumbers(originMonth + 1, i + 1);
                const id = `${originYear}-${thisMonth.month}-${thisMonth.day}`;


                //包裝
                arrayDays.push({
                    id: id,
                    day: i + 1,
                    styles: styles,
                    today: this.isToday(id)     //如果日期是今天 設為true 否則 false
                });
            }
            return arrayDays;
        },

        //前一個月顯示
        beforeMonthDays: function (year, month) {
            let arrayDays = [];

            //基礎套用class
            const styles = ['oldDays']

            //原始年、月參數
            const originYear = year;
            const originMonth = month - 1;
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
                //如果原始月份-1 === 0 代表是 12月
                const before = this.workWithNumbers(originMonth === 0 ? 12 : originMonth, oldDaysBefore);
                const id = `${originYear}-${before.month}-${before.day}`;

                //包裝
                arrayDays.push({
                    id: `before-${id}`,
                    day: oldDaysBefore,
                    styles: styles,
                    today: this.isToday(id)     //如果日期是今天 設為true 否則 false
                });
                oldDaysBefore++;
            }
            return arrayDays;
        },



        //下一個月顯示
        afterMonthDays: function (year, month, beforeLength, thisMonthLength) {
            let arrayDays = [];

            //基礎套用class
            const styles = ['oldDays']

            //原始年、月參數
            const originYear = year;
            const originMonth = month - 1;

            //42 - (前一個月+這個月的天數)
            const oldDaysAfter = 42 - (beforeLength + thisMonthLength);
            for (let i = 0; i < oldDaysAfter; i++) {
                const after = this.workWithNumbers(originMonth + 2, i + 1);
                const id = `${originYear}-${after.month}-${after.day}`;

                //包裝
                arrayDays.push({
                    id: `after-${id}`,
                    day: i + 1,
                    styles: styles,
                    today: this.isToday(id)     //如果日期是今天 設為true 否則 false
                });

            }
            return arrayDays;
        },

        isToday: function (date) {
            if (this.today === date) return true;
            else return false;
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
        }
    },
    components: { DayBox }
}
</script>
<style scoped>
*,
::after,
::before {
    box-sizing: border-box;
}



/* 星期區 */
#calenderPager {
    width: 100%;
    /* -(body上下距離) */
    height: calc(100vh - 64px - 65px);

}

.calenderBox {
    display: flex;
    flex-direction: column;

    width: 100%;
    /*補足異點下面的缺少高度*/
    height: 110%;
    text-align: center;
    background: rgb(19, 178, 241);
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

.control {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
    width: 100%;
    height: 5rem;
    background: rgb(19, 178, 241);
}



@media (min-width: 768px) {}

@media (min-width: 1024px) {
    #calenderPager {

        /* -(body上下距離) */
        height: 100vh;
        /* max-height: 100vh; */
    }

    .calenderBox {

        /*補足異點下面的缺少高度*/
        height: 100%;

    }


    .control {
        margin-bottom: 0;
        height: 100%;
    }
}

@media (min-width: 1440px) {}

@media (min-width: 1920px) {}
</style>
