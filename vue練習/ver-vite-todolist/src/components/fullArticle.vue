<template>
    <transition name="editOrRead">
        <article id="fullArticle">
            <!-- 檢視文章選單 -->
            <nav class="topNav">
                <button @mouseup="CLOSE_ALL_FUNCTIONS" class="buttons">
                    <img src="../../public/images/添加代辦事項/X.svg" alt="">
                </button>

                <div>{{ title }}</div>

                <button class="buttons noShowButton">
                </button>
            </nav>
            <!-- 內文 -->
            <div class="content">
                <div class="article">
                    <div class="title">
                        <h3>
                            {{ showArticle.title }}
                        </h3>
                    </div>
                    <div class="date">
                        <p>設定清單日期 : {{ showArticle.setDate }}</p>
                        <p>預計達成日期 : {{ showArticle.date }}</p>
                    </div>
                    <div class="itemContent">
                        <p>{{ showArticle.content }}</p>
                    </div>
                </div>
            </div>
        </article>
    </transition>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Article from "./article.vue"

export default {
    data() {
        return {
            title: "清單內容"
        };
    },
    created() {

    },
    computed: {
        ...mapState({
            mainArticles: 'mainArticles',
            UI: 'UI',
            showArticle: 'temporaryStorageArticle'
        }),
    },
    methods: {
        ...mapMutations(['CLOSE_ALL_FUNCTIONS'])
    },
    components: { Article }
}
</script>
<style scoped>
#fullArticle {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #0C4553;
    z-index: 9;
}

.topNav {
    position: fixed;
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
    margin: 0 01rem;
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

.content {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    width: 100vw;
    height: calc(100vh - 4rem);
    word-break: break-all;


}

.article {
    margin: 1rem 0;
    padding: 0 2rem;
    width: 350px;

    border: 5px solid #fff;
    border-radius: 20px 0 0 20px;
    box-sizing: border-box;
    color: #fff;
    overflow-y: scroll;
}

.article .title {
    text-align: center;
    font-size: 1.5rem;
}

.article .title h3 {
    margin: 1rem 0;
}

.article .date {
    text-align: center;
    font-size: 1.25rem;

    border-top: solid 1px rgb(255, 255, 255);
    border-bottom: solid 1px rgb(255, 255, 255);
}

.article .date p {
    margin: 0.8rem 0;
}

.article .itemContent {
    font-size: 1rem;
    text-indent: 2em;

}

@media (min-width:768px) {
    .article {
        width: auto;
        min-width: 350px;
        max-width: 500px;
    }


    .article .title {

        font-size: 1.75rem;
    }

    .article .title h3 {
        margin: 1rem 0;
    }

    .article .date {
        font-size: 1.5rem;
    }

    .article .itemContent {
        font-size: 1.3rem;
    }
}
</style>
