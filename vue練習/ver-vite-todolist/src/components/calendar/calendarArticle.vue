<template>
    <transition name="editOrRead">
        <article v-bind="$attrs">
            <div class="articleBox">
                <nav class="nav">
                    <!-- 檢視文章選單 -->
                    <nav class="topNav">
                        <button @mouseup="CLOSE_ALL_FUNCTIONS" class="buttons">
                            <img src="../../../public/images/添加代辦事項/X.svg" alt="">
                        </button>

                        <div>{{ title }}</div>

                        <button class="buttons noShowButton">
                        </button>
                    </nav>
                </nav>
                <CalenderArticleOptions />


                <div></div>



            </div>
        </article>
    </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import CalenderArticleOptions from "./calenderArticleOptions.vue";
export default {
    props: [],
    data() {
        return {
            style: [],
            title: "檢視清單"
        };
    },
    created() {
    },
    computed: {
        // ...mapState({
        //     UI: state => state.calendarDate.UI  //取 calendarDate 下的 UI
        // })
    },
    methods: {
        ...mapMutations(["CLOSE_ALL_FUNCTIONS"])
        // showArticle() {
        // }
    },
    components: { CalenderArticleOptions }
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
    background: rgba(0, 0, 0, 0.684);
    z-index: 9;
}

.articleBox {
    width: 100%;
    height: 100%;

}

/* header */
.topNav {
    position: relative;
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
</style>
