<template>
    <div v-show="itemShow" @mouseup="openArticle" class="article">

        <div class="articleHeader">
            <!-- 標題 -->
            <div class="top">
                <div class="title">
                    <h3>{{ title }}</h3>
                </div>
            </div>

            <!-- 內文預覽 -->
            <div class="min">
                <div class="content">
                    <p> {{ content }} </p>
                </div>
            </div>

            <!-- 文章日期/狀態 -->
            <div class="articleState">
                <div class="date oldDate">{{ parseSetDate.month }}/{{ parseSetDate.day }}</div>
                <div class="state">
                    <img :src="stateImg" alt="">
                </div>
                <div class="date newDate">{{ parseEndDate.month }}/{{ parseEndDate.day }}</div>
            </div>

        </div>

        <div class="setButton">
            <button @mouseup.stop="openSet"></button>
            <ArticleSetItem :state="setArticleItemState" @close="closeSet" @upcomingState="setArticleState"
                @caseClosedState="setArticleState" @editArticleFunc="editArticle" @deleteArticleFunc="deleteArticle" />
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions } from "vuex";
import ArticleSetItem from "./articleSetItem.vue";
export default {
    props: ["_id", "state", "stateImg", "title", "content", "setDate", "date"],
    data() {
        return {
            itemShow: true,
            setArticleItemState: false  //設定清單是否展開
        };
    },
    created() {
    },
    computed: {
        parseSetDate() {
            const month = this.setDate.slice(5, 7);
            const day = this.setDate.slice(8);
            return {
                month: month,
                day: day,
            };
        },
        parseEndDate() {
            const month = this.date.slice(5, 7);
            const day = this.date.slice(8);
            return {
                month: month,
                day: day,
            };
        }
    },
    methods: {
        //切換秀出全文章狀態、將文章推入暫存區、切換編輯文章狀態
        ...mapMutations(["CHANGE_SHOW_FULL_ARTICLE_STATE", "TEMPORARY_STORAGE_ARTICLES", "CHANGE_EDIT_ARTICLE_STATE"]),
        //提交文章並更新整個文章串
        ...mapActions(['SUBMIT_ARTICLES']),

        // 打開文章
        openArticle: function () {
            const box = {
                _id: this._id,
                title: this.title,
                content: this.content,
                setDate: this.setDate,
                date: this.date,
                state: this.state,
                stateImg: this.stateImg,
            };
            this.CHANGE_SHOW_FULL_ARTICLE_STATE();
            this.TEMPORARY_STORAGE_ARTICLES(box);
        },
        //設定文章狀態
        setArticleState: function (e) {
            if (this.state === e.state) return;

            const box = {
                _id: this._id,
                state: e.state,
                stateImg: e.stateImg,
            }
            this.SUBMIT_ARTICLES({
                method: 'PATCH',
                func: 'chengeState',
                data: box
            })
        },
        //開啟編輯文章介面
        editArticle: function () {
            this.CHANGE_EDIT_ARTICLE_STATE();
            const box = {
                _id: this._id,
                title: this.title,
                content: this.content,
                setDate: this.setDate,
                date: this.date,
                state: this.state,
                stateImg: this.stateImg,
            };
            this.TEMPORARY_STORAGE_ARTICLES(box);

        },

        //!刪除
        deleteArticle: function () {
            if (!this.state) {          //如果事項尚未結案，確認是否刪除
                const check = confirm("事項尚未結案，確定刪除嗎?");
                if (!check) return;
            }

            this.SUBMIT_ARTICLES({
                method: 'DELETE',
                func: 'DELETE',
                data: { _id: this._id }
            })
        },

        // 打開設定清單
        openSet: function () {
            this.setArticleItemState = true;
        },
        closeSet: function () {
            this.setArticleItemState = false;
        }
    },
    components: { ArticleSetItem }
}
</script>
<style scoped>
.article {
    position: relative;
    margin: 1rem auto;
    padding: 2rem 2rem 1rem;


    width: 270px;
    height: 230px;
    color: #fff;

    background: #0084A3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 40px;

}

.article .articleHeader {
    display: flex;
    flex-direction: column;
    justify-content: start;
    /* align-items: start; */
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    /* background: #000; */
}

.article .top {
    width: 100%;
    /* height: 2rem; */
    height: 20%;
}


.top .title {
    margin: 0;
    font-size: 1.5rem;

    width: 80%;

    white-space: nowrap;
    overflow: hidden;
    /* background: #000; */
}

.top .title h3 {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
}

.min {
    width: 100%;
    height: 60%;
}


.min .content {
    height: 7.5rem;
    overflow: hidden;
}

.min .content p {
    display: inline-block;
    margin: 0;
    color: #fff;
    line-height: 1.5em;
    text-indent: 2em;

    /* text-align: justify; */
    text-align: start;

    word-break: break-all;
    overflow: hidden;
}

.article .articleState {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 20%;
}


.article .articleState .date {
    padding: 8.5px 16px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5rem;
    color: #00FFF0;
    background: #0084A3;
    border: 1px solid #00CFFF;
    border-radius: 30px;
}

.articleState .state {
    width: 32px;
    height: 32px;
}

.article .articleState .state img {
    width: 100%;
    height: 100%;
}

.setButton {
    position: absolute;
    top: 1rem;
    right: 1.5rem;

    width: 50px;
    height: 50px;

    border-radius: 100%;
    /* background: #000; */
}

.setButton button {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #1BAACB;
    /* background: #0C4553; */
    border: none;
    border-radius: 100%;
    cursor: pointer;
    transition: 0.2s;
}

.setButton button:active {
    background: #50b5cc;
}

.setButton button::before {
    content: "";
    position: absolute;
    left: calc(50% - 3.5px);
    top: calc(50% - 3.5px);
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 12px 0px 0px rgb(255 255 255 / 70%),
        0px -12px 0px 0px rgb(255 255 255 / 70%);
}

@media (min-width:1024px) {
    .article {
        width: 80%;
    }

    .article .articleState .oldDate::before {
        content: '設定日期 : ';
    }

    .article .articleState .newDate::before {
        content: '結束日期 : ';
    }

    .setButton {
        width: 100px;
        height: 50px;
        /* background: #000; */
        border-radius: 30px;
    }

    .setButton button {
        border-radius: 30px;
    }

    .setButton button::before {
        content: "SET";
        position: static;
        left: calc(50% - 3.5px);
        top: calc(50% - 3.5px);
        width: 7px;
        height: 7px;
        font-size: 1.5rem;
        font-weight: bold;
        color: #fff;

        border-radius: 30px;
        background: rgba(255, 255, 255, 0);
        box-shadow: none;
    }
}

@media (min-width:1920px) {
    .article {

        height: 290px;
        color: #fff;

    }

    .top .title {
        font-size: 2rem;
    }

    .min {
        height: 50%;
    }

    .min .content {
        height: 9.5rem;
    }

    .min .content p {
        margin-top: 0.2rem;
        font-size: 1.5rem;
        line-height: 1.5em;

    }

    .article .articleState {
        height: 30%;
    }

    .article .articleState .date {
        padding: 8.5px 16px;
        font-size: 1.5rem;
    }


    .articleState .state {
        width: 2.2rem;
        height: 2.2rem;
    }


    .setButton {
        top: 2.3rem;
        right: 3rem;
        width: 7rem;
        height: 3rem;
        border-radius: 80px;
    }

    .setButton button {
        border-radius: 80px;
    }

    .setButton button::before {
        left: calc(50% - 3.5px);
        top: calc(50% - 3.5px);
        width: 7px;
        height: 7px;
        font-size: 1.6rem;


        border-radius: 30px;
    }


}
</style>
