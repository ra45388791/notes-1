<template>
    <div v-bind="$attrs" class="articleContent">
        <div class="articleContentBox">
            <div class="title">
                <h3>
                    {{ title }}
                </h3>
            </div>
            <div class="date">
                <h4>
                    設定清單日期 : {{ setDate }}
                </h4>
                <h4>
                    預計達成日期 : {{ date }}
                </h4>
            </div>
            <div class="content">
                <p>
                    {{ content }}
                </p>
            </div>

        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ["id", "state", "stateImg", "title", "content", "setDate", "date"],
    data() {
        return {

        }
    },
    computed: {
        getArticle() {

        }
    },
    methods: {


    }


}
</script>
<style scoped>
*,
::after,
::before {
    box-sizing: border-box;
}

.articleContent {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fff;
    background: #1b697d;
    overflow-y: scroll;
}

.articleContentBox {
    padding: 3rem 1rem 2rem;
    width: 350px;

    height: 100%;
    /* background: rgb(159, 159, 159); */
}

.title {
    text-align: center;
    font-size: 1.5rem;
}

.articleContentBox h3 {
    display: inline-block;
    margin: 0 0 1rem;
    width: 100%;
    word-break: break-word;
}

.date {
    text-align: center;
    font-size: 1.25rem;

    border-top: solid 1px rgb(255, 255, 255);
    border-bottom: solid 1px rgb(255, 255, 255);
}

.date h4 {
    margin: 0.8rem 0;
}

.content {
    font-size: 1rem;
    text-indent: 2em;
}
</style>
