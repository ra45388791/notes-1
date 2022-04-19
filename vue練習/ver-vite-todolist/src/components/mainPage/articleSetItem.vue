<template>
    <transition name="setItem">
        <div v-bind="$attrs" v-show="setItemState" @mouseup.stop id="setItem">
            <div class="setBox">
                <button @mouseup.stop="upcoming" class="setButton">{{ buttonData[0].name }}</button>
                <button @mouseup.stop="caseClosed" class="setButton">{{ buttonData[1].name }}</button>
                <button @mouseup.stop="editArticle" class="setButton">{{ buttonData[2].name }}</button>
                <button @mouseup.stop="deleteArticle" class="setButton">{{ buttonData[3].name }}</button>
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
    emits: ['close', 'upcomingState', 'caseClosedState', 'editArticleFunc', 'deleteArticleFunc', 'deleteArticleFunc'],
    data() {
        return {
            buttonData: [
                {
                    id: 0,
                    name: '待辦',
                },
                {
                    id: 1,
                    name: '結案',
                },
                {
                    id: 2,
                    name: '修改',
                },
                {
                    id: 3,
                    name: '刪除',
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
        closeSetItem() {    //關閉設定選單
            this.$emit('close');
        },
        upcoming() {        //代辦狀態
            this.$emit('upcomingState', {
                state: false,
                stateImg: 'images/close.png'
            });
            this.closeSetItem();
        },
        caseClosed() {      //結案狀態
            this.$emit('caseClosedState', {
                state: true,
                stateImg: 'images/check.png'
            });
            this.closeSetItem();
        },
        editArticle() {     //開啟編輯畫面
            this.$emit('editArticleFunc');
            this.closeSetItem();
        },
        deleteArticle() {   //刪除文章
            this.$emit('deleteArticleFunc')
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
    transition: opacity 0.3s ease, height 0.3s ease;
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
}

.setButton {
    margin: 0.25rem 0;
    width: 100%;
    height: 2rem;
    line-height: 1.9rem;
    color: #fff;
    background: #0084A3;
    border: 1px solid #00ffff;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 4px #ffffff;
    cursor: pointer;

    transition: 0.1s
}

.setButton:active {
    background: #00CFFF;
}

@media (min-width: 1920px) {

    .setItem-enter-to,
    .setItem-leave-from {
        /* opacity: 1;
        height: 259.91px; */
    }



    #setItem {

        top: 50%;
        left: -9rem;

        padding: 0.4rem 1rem;

        width: 9rem;
        background: #0084A3;
        border: 2px solid #00fff0;

        border-radius: 10px;
    }

    .setButton {
        margin: 0.rem 0;

        height: 2rem;

        font-size: 1.2rem;
        line-height: 2rem;

        border: 1px solid #00ffff;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0px 0px 4px #ffffff;
        transition: 0.1s
    }

}
</style>
