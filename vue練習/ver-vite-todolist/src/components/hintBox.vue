<template>
    <transition>
        <div v-show="UI.hint.success" id="successBox" class="box">
            <p>操作成功</p>
        </div>
    </transition>
    <transition>
        <div v-show="UI.hint.fail" id="failBox" class="box">
            <p>操作失敗</p>
        </div>
    </transition>

</template>
<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
        };
    },
    created() {

    },
    computed: {
        ...mapState(['UI'])
    },

}
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.box {
    position: fixed;
    left: calc(50% - 6rem);
    bottom: 8rem;

    width: 12rem;
    height: 3rem;

    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    line-height: 3rem;
    text-align: center;
    border-radius: 0.5rem;
}

#successBox {
    background: rgba(77, 255, 0, 0.8);
}

#successBox p {
    margin: 0;
}

#failBox {
    background: rgba(255, 38, 0, 0.8);
}

#failBox p {
    margin: 0;
}
</style>
