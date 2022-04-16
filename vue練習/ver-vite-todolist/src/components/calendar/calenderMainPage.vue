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
                    <li v-for="i of 5" class="oldDays" :key="i">
                        <button>
                            10
                        </button>
                    </li>
                    <li v-for="i of 30" :key="i">
                        <button>
                            12
                        </button>
                    </li>
                    <li v-for="i of 5" class="oldDays" :key="i">
                        <button>
                            11
                        </button>
                    </li>
                </ul>
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
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            weekdays: [ // 星期幾
                { text: '一' }, { text: '二' }, { text: '三' }, { text: '四' }, { text: '五' }, { text: '六' }, { text: '日' },
            ],
            chooseDate: {
                year: 2022,
                month: 4
            }

        }
    },
    computed: {
        chooseDateRes() {
            if (String(this.chooseDate.month).length === 1) {
                return `${this.chooseDate.year}-0${this.chooseDate.month}`
            } else {
                return `${this.chooseDate.year}-${this.chooseDate.month}`
            }
        }
    },
    methods: {
        monthReduce: function () {
            if (this.chooseDate.month === 1) {
                this.chooseDate.year -= 1;
                this.chooseDate.month = 12;
                return
            }
            this.chooseDate.month -= 1;
        },
        monthPlus: function () {
            if (this.chooseDate.month === 12) {
                this.chooseDate.year += 1;
                this.chooseDate.month = 1;
                return
            }
            this.chooseDate.month += 1;

        }
    }


}
</script>
<style scoped>
*,
::after,
::before {
    box-sizing: border-box;
}

li {
    list-style: none;
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

.dateBox li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 7);

    height: 3.5rem;
}

.dateBox button {
    position: relative;
    padding: 0;

    width: 2.5rem;
    height: 2.5rem;

    color: #fff;
    background: rgba(51, 255, 0, 0);

    font-size: 1.5em;
    text-align: center;
    border: solid 3px rgba(167, 255, 255, 0);
    box-sizing: border-box;
    border-radius: 30px;

    transition: 0.1s;
}

.dateBox button:focus {
    background: rgb(38, 215, 255);
    border-radius: 30px;

}

/* !過去日期 */
.dateBox .oldDays div {
    color: rgba(255, 255, 255, 0.5);

}

/* !未來日期 */
.control {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
    width: 100%;
    height: 5rem;
    background: rgb(19, 178, 241);
}

@media (min-width: 768px) {

    .dateBox li {
        height: 3.5rem;
    }
}

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

    .dateBox li {
        height: 3.5rem;
    }

    .control {
        margin-bottom: 0;
        height: 100%;
    }
}

@media (min-width: 1440px) {
    .dateBox li {
        height: 5rem;
    }

}

@media (min-width: 1920px) {
    .dateBox li {
        height: 7rem;
    }

}
</style>
