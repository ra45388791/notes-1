<template>
    <div class="content">
        <!-- v-show="UI.UIShow" -->
        <Article v-for="article of mainArticles" v-bind="article" />

    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Article from "./article.vue"

export default {
    data() {
        return {};
    },
    created() {

    },
    computed: {
        ...mapState(['mainArticles'])
    },

    components: { Article }
}
</script>
<style scoped>
.content {
    /* margin: auto; */
    position: relative;
    width: 100%;
    height: auto;
    /* background: #000; */
}

@media (min-width: 1024px) {
    .content {
        /* max-width: 80%; */
    }

}
</style>
