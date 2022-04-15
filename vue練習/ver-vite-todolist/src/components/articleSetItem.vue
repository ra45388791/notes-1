<template>
    <transition name="setItem">
        <div v-show="setItemState" @mouseup.stop id="setItem">
            <div class="setBox">
                <button v-for="button of buttonData" :key="button.id" @mouseup.stop="closeSetItem" class="setButton">{{
                    button.name
                }}</button>
            </div>
        </div>
    </transition>
    <transition name="mask">
        <div v-show="setItemState" @mouseup.stop="closeSetItem" class="mask"></div>
    </transition>
</template>
<script>
import { mapMutations } from "vuex";
export default {
    props: ['state'],
    emits: ['close'],
    data() {
        return {
            buttonData: [
                {
                    id: 0,
                    name: '代辦'
                },
                {
                    id: 1,
                    name: '結案'
                },
                {
                    id: 2,
                    name: '修改'
                },
                {
                    id: 3,
                    name: '刪除'
                }
            ]
        }
    },
    created() {


    },
    computed: {
        setItemState() {
            return this.state;
        }
    },
    methods: {
        closeSetItem() {
            console.log('攔截');
            this.$emit('close');
        }

    }
}
</script>
<style scoped>
/* 遮罩 */
.mask-enter-active,
.mask-leave-active {
    transition: opacity 0.3s ease;
}

.mask-enter-from,
.mask-leave-to {
    opacity: 0;
}

/* 設定清單 */
.setItem-enter-active,
.setItem-leave-active {
    transition: opacity 0.5s ease, height 0.5s ease;
}

.setItem-enter-from,
.setItem-leave-to {
    opacity: 0;
    height: 0;
}

.setItem-enter-to,
.setItem-leave-from {
    opacity: 1;
    height: 172px;
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8;
}

#setItem {
    position: absolute;
    top: 50%;
    left: -8rem;

    padding: 0.25rem 1rem;

    width: 8rem;
    /* height: auto; */
    background: #0084A3;
    border: 2px solid #00fff0;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 15px;

    overflow-y: hidden;
    transition: 0.5s;

    z-index: 9;
}

.setBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;

    width: 100%;
    height: 100%;

    /* background: red; */
}

.setButton {
    margin: 0.25rem 0;
    width: 100%;
    height: 2rem;

    color: #fff;
    background: #0084A3;
    border: 1px solid #00ffff;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 4px #ffffff;
    transition: 0.1s
}

.setButton:active {
    background: #00CFFF;
}
</style>
