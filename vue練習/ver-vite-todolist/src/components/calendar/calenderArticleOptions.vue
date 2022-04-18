<template>
    <transition name="">
        <div class="options">
            <div class="optionsBox">

                <button type="button" class="articleOption">
                    <div class="title">
                        <h3>
                            標題
                        </h3>
                    </div>
                    <div class="isClose">
                        <p>
                            已結案
                        </p>
                    </div>
                </button>
                <button type="button" class="articleOption">
                    <div class="title">
                        <h3>
                            標題
                        </h3>
                    </div>
                    <div class="isClose">
                        <p>
                            未結案
                        </p>
                    </div>
                </button>


            </div>
        </div>
    </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: [],
    data() {
        return {
            style: [],
        }
    },
    computed: {
        // ...mapState({
        //     UI: state => state.calendarDate.UI  //取 calendarDate 下的 UI
        // })


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

.options {
    padding: 1rem 1.5rem;
    width: 100%;
    height: 50%;

    background: rgb(0, 77, 82);
}

.optionsBox {
    width: 100%;
    height: 100%;

    /* background: red; */

}

.articleOption {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 5rem;
    color: #fff;
    background: rgb(0, 110, 161);

    border: 5px solid #00ffff;
    border-radius: 10px;
    box-sizing: border-box;
}

.title {
    width: 70%;
    font-size: 1.25rem;
    text-align: start;
}

.isClose {

    width: 30%;
}
</style>
