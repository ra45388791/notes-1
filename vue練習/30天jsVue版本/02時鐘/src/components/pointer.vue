<template>
    <div class="main">
        <div id="hour" :style="rotateHour">
            <div></div>
        </div>
        <div id="minute" :style="rotateMinute">
            <div></div>
        </div>
        <div id="second" :style="rotateSecond">
            <div></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['hourTemp', 'minuteTemp', 'secondTemp'],
    data() {
        return {
            hour: this.hourTemp,
            minute: this.minuteTemp,
            second: this.secondTemp,
        }
    },
    mounted() {
    },
    computed: {
        rotateHour() {
            const rotateCount = this.hour * 30 + this.minute / 2;
            return `transform: rotate(${rotateCount}deg)`;

        },
        rotateMinute() {
            const rotateCount = this.minute * 6
            return `transform: rotate(${rotateCount}deg)`;

        },
        rotateSecond() {
            const rotateCount = this.second * 6
            return `transform: rotate(${rotateCount}deg)`;
        }
    },
    watch: {
        hourTemp(newData, oldData) {
            this.hour = newData;
        },
        minuteTemp(newData, oldData) {
            this.minute = newData;
        },
        secondTemp(newData, oldData) {
            this.second = newData;
        }
    },
    methods: {
    }

}
</script>

<style scoped>
.main {
    position: relative;
    width: 0px;
    height: 0px;
}
div > div {
    position: absolute;
}

/* #hour {
    transform: rotate(0deg);
}
#minute {
    transform: rotate(90deg);
} */
/* #second {
    transform: rotate(160deg);
} */

#hour > div {
    position: absolute;
    left: -2.5px;
    width: 5px;
    height: 10rem;
    background: rgb(0, 255, 238);

    border-radius: 50% 50% 100% 100%;
}

#minute > div {
    position: absolute;
    left: -2.5px;
    width: 5px;
    height: 15rem;
    background: rgb(0, 225, 255);

    border-radius: 50% 50% 100% 100%;
}

#second > div {
    position: absolute;
    left: -2.5px;
    width: 5px;
    height: 20rem;
    background: rgb(255, 0, 0);

    border-radius: 50% 50% 100% 100%;
}
</style>