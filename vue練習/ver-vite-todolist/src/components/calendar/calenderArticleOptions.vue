<template>
    <transition name="">
        <div class="options" :class="show ? 'itemShowState' : 'itemCloseState'">
            <div class="optionsBox">

                <!-- 選擇要看哪一個清單的按紐 -->
                <button v-for="article of setTotalArticle" :key="article.id" @mouseup="pushArticleData(article)"
                    type="button" class="articleOption">
                    <div class="title">
                        <h3>
                            {{ article.title }}
                        </h3>
                    </div>
                    <div class="stateText" :class="article.state ? 'isClose' : 'isUpcoming'">
                        <p>
                            <samp> {{ article.state ? '已結案' : '待辦中' }}</samp>
                        </p>
                    </div>
                </button>

            </div>

            <button @mouseup="showItem" class="showBtn" :class="show ? 'buttonShowState' : 'buttonCloseState'">
                <div class="showBtnBox">
                </div>
            </button>

        </div>
    </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ['totalArticle'],
    emit: ['pushArticle'],
    data() {
        return {
            style: [],
            show: false,
        }
    },
    computed: {
        // ...mapState({
        //     UI: state => state.calendarDate.UI  //取 calendarDate 下的 UI
        // })

        setTotalArticle() {
            return this.totalArticle;
        }


    },
    methods: {
        showItem() {                        //切換選擇區狀態
            this.show = !this.show;
        },
        closeItem() {                       //關閉選擇區
            this.show = false;
        },
        pushArticleData(e) {                //將選中的文章推上去
            const box = {
                id: e.id,
                title: e.title,
                content: e.content,
                date: e.date,
                setDate: e.setDate,
                state: e.state,
                stateImg: e.stateImg
            }
            this.$emit('pushArticle', box);
            this.closeItem();               //關閉選單
        }

    }


}
</script>
<style scoped>
/* 動畫 */
.itemCloseState {
    padding: 0rem 1.5rem;
    height: 0rem;
}

.itemShowState {
    padding: 1rem 1.5rem;
    height: calc(5rem * 5);
}

.buttonCloseState {
    right: 0;
}

.buttonShowState {
    right: calc(50% - 1.625rem);

}




/* 開始 */

*,
::after,
::before {
    box-sizing: border-box;
}

.options {
    position: absolute;
    right: 0;
    top: 4rem;
    width: 100%;

    background: rgb(0, 77, 82);
    transition: 0.5s 0.5s ease-in-out;
}

.optionsBox {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}

.articleOption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0;
    width: 100%;
    height: 5rem;
    color: #fff;
    background: rgb(0, 110, 161);

    border: 5px solid #00ffff;
    border-radius: 10px;
    box-sizing: border-box;
}

.title {
    padding-left: 0.5rem;
    width: 70%;
    max-width: 70%;
    font-size: 1.25rem;
    text-align: start;
    border-right: 5px solid #00ffff;

}

.title h3 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* overflow-x: hidden; */
    max-height: 1.7rem;
}

.stateText {
    display: flex;
    justify-content: center;
    width: 30%;
}

.stateText p {
    display: inline-block;
    padding: 0;
    border-radius: 10px;
}

.isClose samp {
    padding: 0.25rem 0.7rem;
    border-radius: 10px;
    color: #000;
    background: rgb(15, 255, 15);
}

.isUpcoming samp {
    padding: 0.25rem 0.7rem;
    border-radius: 10px;
    background: red;
}


.showBtn {
    position: absolute;
    /* rigth 動畫 */
    bottom: -3.05rem;
    padding: 0.25rem;

    width: 3rem;
    height: 3rem;
    background: rgb(0, 147, 158);
    border-radius: 0 0 50px 50px;
    border: 0;
    transition: 0.5s;
}

.showBtnBox {


    width: 100%;
    height: 100%;

    /* background: #000; */
    border: 2px solid #00ffff;
    border-radius: 100%;
}

.showBtnBox::before {
    content: "";
    position: absolute;
    left: calc(50% - 0.65rem);
    top: 0.65rem;

    width: 0;
    height: 0;

    border-top: 0rem solid #00ffff00;
    border-bottom: 0.65rem solid #00ffff;
    border-left: 0.65rem solid #00ffff00;
    border-right: 0.65rem solid #00ffff00;
}

.showBtnBox::after {
    content: "";
    position: absolute;
    left: calc(50% - 0.65rem);
    bottom: 0.65rem;

    width: 0;
    height: 0;

    border-top: 0.65rem solid #00ffff;
    border-bottom: 0rem solid #00ffff00;
    border-left: 0.65rem solid #00ffff00;
    border-right: 0.65rem solid #00ffff00;
}
</style>
