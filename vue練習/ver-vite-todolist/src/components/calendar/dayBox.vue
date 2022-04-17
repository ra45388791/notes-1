<template>
    <li :class="getStyle">
        <button>
            {{ day }}

        </button>
    </li>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ['id', 'day', 'styles', 'today'],
    data() {
        return {
            style: []

        }
    },
    created() {
        this.$nextTick(function () {
            //預設style
            this.styles.forEach(e => {
                this.style.push(e);
            })
            //今日
            if (this.today) {
                this.style.push('today');
            }
        })

    },
    computed: {

        //把style 轉成字串套用到 li上
        getStyle() {
            const styleString = this.style.join(' ');
            return styleString
        }

    },
    methods: {


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

/* 日期區 */

li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 7);

    height: 3.5rem;
}

button {
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

button:focus {
    background: rgb(38, 215, 255);
    border-radius: 30px;

}

/* 今日style */
.today {

    background: #000;
}

/* !過去/未來日期 */
.oldDays button {
    color: rgba(255, 255, 255, 0.5);

}

@media (min-width: 768px) {

    li {
        height: 3.5rem;
    }
}

@media (min-width: 1024px) {
    li {
        height: 3.5rem;
    }


}

@media (min-width: 1440px) {
    li {
        height: 5rem;
    }

}

@media (min-width: 1920px) {
    li {
        height: 7rem;
    }

}
</style>
