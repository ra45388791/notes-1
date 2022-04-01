<template>
    <div class="container d-flex justify-content-center">
        <clockTemp>
            <pointer :hour-temp="hour" :minute-temp="minute" :second-temp="second"></pointer>
        </clockTemp>
    </div>
</template>

<script>
import clockTemp from './components/clockTemp.vue';
import pointer from './components/pointer.vue';

export default {
    data() {
        return {
            hour: 0,
            minute: 0,
            second: 0,
        };
    },
    created() {
        this.$nextTick(function () {
            const vm = this;
            setInterval(function () {
                const date = new Date();
                vm.hour = date.getHours();
                vm.minute = date.getMinutes();
                vm.second = date.getSeconds();
            }, 1000);

        });
    },
    methods: {
    },
    components: { clockTemp, pointer }
}
</script>

<style>
#app {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgb(10, 148, 190);
}
</style>