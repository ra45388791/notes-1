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
            articleShow: 'showStateArticle'
        }),
        toDoState() {
            return this.main.filter(e => e.state === false);
        },
        getThingsDoneState() {
            return this.main.filter(e => e.state === true);
        }
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

@media (min-width: 1024px) {
    .content {
        /* max-width: 80%; */
    }

}
</style>
