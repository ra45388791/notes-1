<template>
    <div id="calenderPager">
        <div class="calenderBox">

            <div class="dayBox">
                <div class="day"></div>
            </div>

            <div class="dateBox">
                <div class="day">
                </div>
            </div>

            <div class="control">
                <div></div>
            </div>

        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {

        }
    },
    watch: {
    },
    methods: {
    }


}
</script>
<style scoped>
#calenderPager {
    width: 100%;

    /* -(body上下距離) */
    height: calc(100vh - 64px - 55px);

    background: #000;

}

.calenderBox {
    display: flex;
    width: 100%;
    height: 100%;
    background: #0f0;
}

.dayBox {}

.dateBox {}

.control {}
</style>
