<template>
    <div v-bind="$attrs" class="content">
        <!-- v-show="UI.UIShow" -->
        <Article v-show="articleShow === 'allItem'" v-for="article of main" :key="article.id" v-bind="article" />
        <Article v-show="articleShow === 'toDo'" v-for="article of toDoState" :key="article.id" v-bind="article" />
        <Article v-show="articleShow === 'getThingsDone'" v-for="article of getThingsDoneState" :key="article.id"
            v-bind="article" />
    </div>
    <Loading />
    <HintBox />

    <!-- 添加文章按鈕 -->
    <!-- <transition name="addButtonAni">
        <button @mouseup="CHANGE_ADD_ARTICLE_STATE" v-show="UI.UIShow" id="addButton" type="button"></button>
    </transition> -->

    <div v-show="main.length === 0" class="hintText">
        <!-- 此提示使用 fixed 蓋板，可能會遮擋住操作 -->
        <h3>暫時還沒有代辦事項喔~</h3>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Article from "./article.vue"
import Loading from "./loading.vue"
import HintBox from "./hintBox.vue";

export default {
    data() {
        return {};
    },
    created() {

    },
    computed: {
        ...mapState({
            main: 'mainArticles',
            articleShow: 'showStateArticle',
            // UI: 'UI'
        }),
        toDoState() {
            return this.main.filter(e => e.state === false);
        },
        getThingsDoneState() {
            return this.main.filter(e => e.state === true);
        }
    },
    methods: {
        ...mapMutations(['CHANGE_ADD_ARTICLE_STATE'])

    },

    components: { Article, Loading, HintBox }
}
</script>
<style scoped>
.content {
    position: relative;
    width: 100%;
    height: auto;
}



.hintText {

    position: fixed;
    display: flex;
    left: 0;
    top: 0;
    color: rgb(42, 134, 164);
    width: 100%;
    height: 100%;
}

.hintText h3 {
    margin: auto;
}

@media (min-width: 1024px) {
    .content {
        /* max-width: 80%; */
    }

    /* #addButton {
        position: fixed;
        left: 5.5rem;
        bottom: 1.5rem;

        width: 12rem;
        height: 3rem;

        border-radius: 30px;
    } */

    .hintText {
        margin-left: 23rem;
        width: calc(100% - 23rem);
    }
}

@media (min-width: 1440px) {


    .hintText {
        margin-left: 30rem;
        width: calc(100% - 30rem);

    }
}
@media (min-width: 1440px) {


    .hintText {
        margin-left: 30rem;
        width: calc(100% - 30rem);

    }
}
</style>
