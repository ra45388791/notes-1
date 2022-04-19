<template>
    <transition name="editOrRead" @mouseup.self="closeAllObject">
        <article v-bind="$attrs">
            <div class="articleBox">
                <nav class="nav">
                    <!-- 檢視文章選單 -->
                    <nav class="topNav">
                        <button @mouseup="closeAllObject" class="buttons">
                            <img src="../../../public/images/添加代辦事項/X.svg" alt="">
                        </button>

                        <div>{{ title }}</div>

                        <button class="buttons noShowButton">
                        </button>
                    </nav>
                </nav>
                <CalenderArticleOptions ref="CalenderArticleOptions" :totalArticle="article"
                    @pushArticle="pushArticle" />


                <CalendarArticleContent v-bind="hoverArticle" />

            </div>
        </article>
    </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import CalenderArticleOptions from "./calenderArticleOptions.vue";
import CalendarArticleContent from "./calendarArticleContent.vue";
export default {
    props: [],
    data() {
        return {
            style: [],
            title: "檢視清單",
            hoverArticle: {}                                    //使用者正在使用的文章
        }
    },
    created() {
    },
    computed: {
        ...mapState({
            article: state => state.calendarDate.showArticlesData //取 calendarDate 下的 UI
        })
    },
    methods: {
        ...mapMutations(["CLOSE_ALL_FUNCTIONS"]),
        closeAllObject() {
            const vm = this;
            this.CLOSE_ALL_FUNCTIONS();                         //關閉vuex狀態
            this.$refs.CalenderArticleOptions.closeItem()       //關閉CalenderArticleOptions子組件的狀態
            setTimeout(() => {
                vm.hoverArticle = {}                            //清空文章暫存區
            }, 300)
        },
        pushArticle(e) {                                        //將選中的文章推入暫存區讓組件吃
            this.hoverArticle = {}
            this.hoverArticle = e
        }
    },
    components: { CalenderArticleOptions, CalendarArticleContent }
}
</script>
<style scoped>
*,
::after,
::before {
    box-sizing: border-box;
}

article {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(0, 0, 0, 0.684); */
    z-index: 9;
}

.articleBox {
    position: relative;
    padding-top: 4rem;
    width: 100%;
    height: 100%;

}

/* header */
.topNav {
    position: absolute;

    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 4rem;

    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    background: #126376;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

}

.buttons {
    margin: 0 1rem;
    width: 45px;
    height: 45px;
    background: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 100%;
    transition: 0.1s;
}

.buttons:active {
    background: rgba(255, 255, 255, 0.274);
}

.buttons img {
    width: 100%;
    height: 100%;
}

.noShowButton {
    visibility: hidden;
}


@media (min-width:1024px) {


    article {
        margin-left: 23rem;
        width: calc(100% - 23rem);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .articleBox {
        display: flex;

        padding-top: 3rem;
        width: 40rem;
        height: 25rem;
        border-radius: 0 0 20px 20px;
    }

    .topNav {
        height: 3rem;
        font-size: 1.8rem;
        border-radius: 20px 20px 0 0;
    }

    .buttons {
        width: 40px;
        height: 40px;
    }
}

@media (min-width: 1440px) {


    article {
        margin-left: 30rem;
        width: calc(100% - 30rem);
    }

    .articleBox {
        display: flex;

        padding-top: 3rem;
        width: 55rem;
        height: 35rem;
        border-radius: 0 0 20px 20px;
    }

}

@media (min-width: 1920px) {
    .articleBox {
        display: flex;

        padding-top: 3rem;
        width: 70rem;
        height: 40rem;
        border-radius: 0 0 20px 20px;
    }

}
</style>
