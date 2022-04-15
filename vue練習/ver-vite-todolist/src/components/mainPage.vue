<template>
    <div v-bind="$attrs" class="content">
        <!-- v-show="UI.UIShow" -->
        <Article v-for="article of mainArticles" :key="article.id" v-bind="article" />
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
        ...mapState(['mainArticles'])
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
