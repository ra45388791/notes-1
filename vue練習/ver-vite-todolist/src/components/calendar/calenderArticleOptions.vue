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

            <button @mouseup="changItemState" class="showBtn" :class="show ? 'buttonShowState' : 'buttonCloseState'">
                <div class="showBtnBox">
                </div>
            </button>

        </div>
    </transition>
</template>
<script>
export default {
    props: ['totalArticle'],    //接收到的所有文章
    emit: ['pushArticle'],      //將選中的文章推上去
    data() {
        return {
            style: [],
            show: false,
        }
    },
    computed: {
        setTotalArticle() {
            if (this.totalArticle.length === 1) {
                this.pushArticleData(this.totalArticle[0])
            } else if (this.totalArticle.length > 1) {
                this.openItem();
            }
            return this.totalArticle;
        }


    },
    methods: {
        changItemState() {                  //切換選擇區狀態
            this.show = !this.show;
        },
        closeItem() {                       //關閉選擇區
            this.show = false;
        },
        openItem() {                        //開啟選擇區
            const vm = this;
            setTimeout(() => {
                vm.show = true;
            }, 300)
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
    padding: 5px 1.5rem;
    height: 24rem;
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
    box-shadow: inset 0 -5px 0px 0px rgb(34, 209, 212);
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

    border: 5px solid #02b2da;
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
}

.articleOption:active {
    background: rgb(0, 93, 136);
}

.title {
    padding-left: 0.5rem;
    width: 70%;
    max-width: 70%;
    font-size: 1.25rem;
    text-align: start;
    border-right: 5px solid #02b2da;

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
    bottom: -3rem;
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

@media (min-width: 768px) {
    .itemCloseState {
        padding: 0rem 1.5rem;
        height: 0rem;
    }

    .itemShowState {
        padding: 5px 1.5rem;
        height: 11.5rem;
    }

    .optionsBox {
        display: flex;
        justify-content: space-around;
        align-content: start;
        flex-wrap: wrap;
    }

    .articleOption {
        margin: 0 1%;
        margin-bottom: 0.5rem;
        width: 48%;


    }

    .articleOption:nth-last-child(1) {
        /* 讓最後一個元素靠左 */
        margin-right: auto;
    }
}

@media (min-width: 1024px) {
    .itemCloseState {
        padding: auto;
        height: 24rem;
    }

    .itemShowState {
        padding: auto;
        height: 24rem;
    }

    .buttonCloseState {
        right: 0;
    }

    .buttonShowState {
        right: calc(50% - 1.625rem);

    }

    .options {
        position: relative;
        right: auto;
        top: auto;
        padding: 0rem 0;
        width: 50%;
        height: 100%;
        box-shadow: inset 4px -3px 0px 0px #1b697d;
        border-radius: 0 0 0 20px;

    }

    .optionsBox {
        display: flex;
        justify-content: space-around;
        align-content: start;
        flex-wrap: wrap;
        padding: 0.7rem 1.5rem;
    }

    .articleOption {
        margin: 0;
        margin-bottom: 0.5rem;
        width: 100%;
    }

    .showBtn {
        display: none;
    }

}

@media (min-width: 1440px) {
    .options {
        width: 40%;
    }
}

@media (min-width: 1920px) {
    .options {
        width: 30%;
    }
}
</style>
