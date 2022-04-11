<template>
    <section id="work">
        <div class="title">
            <h2>我的作品</h2>
        </div>
        <div class="content">
            <WorkBox
                v-for=" work of worksData"
                v-bind="work"
                @openArticle="setArticle"
                class="workLastBox"
            ></WorkBox>
        </div>

        <WorkDynamicWall
            :articleDatas="pushArticleData"
            :showArticles="showArticle"
            @closeArticle="showArticle = false"
        ></WorkDynamicWall>
    </section>
</template>

<script>
import WorkBox from "./workBox.vue";
import worksJson from "../../../assets/works.json";
import WorkDynamicWall from "./workDynamicWall.vue";

export default {
    data() {
        return {
            worksData: worksJson,
            showArticle: false,
            /**
             * 要動到 worksJson 需要跟著修改以下組件
             *  work.vue
             *  workBox.vue
             *  WorkDynamicWall.vue
             *  WorkDynamicWallPhotoBox.vue
             * 
            */
            pushArticleData: {
                id: 0,
                title: "",
                content: [],
                image: "",
                photos: [],
                button: []
            }
        };
    },
    mounted() {

    },
    computed: {

    },
    methods: {
        setArticle: function (e) {
            this.pushArticleData = {}   //清空文章
            this.pushArticleData = e;   //設定文章
            this.showArticle = true

        }
    },
    components: { WorkBox, WorkDynamicWall }
}
</script>

<style scoped>
#work {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 3rem 0 11rem;
    background: rgb(29, 29, 29);
    overflow: hidden;
}

#work::before {
    /* #work 高度太小會被字頂出去*/
    content: "works";
    position: absolute;
    top: 15rem;
    left: -15rem;
    font-size: 15rem;
    font-weight: bold;
    color: #ffffff18;

    transform: rotate(90deg);
}

#work .title {
    align-self: start;
    margin: 0 4rem;
    margin-bottom: 5rem;
    text-align: start;
}
#work .title h2 {
    position: relative;
    font-size: 3rem;
    font-weight: bold;
    color: #00ffee;
}

#work .title h2::before {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 17rem;
    height: 1px;
    background: #fff;
}
#work .title h2::after {
    content: "";
    position: absolute;
    bottom: -5px;
    width: 4.5rem;
    height: 1px;
    background: #fff;
    transform: rotate(90deg);
}
#work .content {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
}
@media (min-width: 768px) {
    /* 控制顯示作品一行欄位數 */
    #work .content {
        flex-direction: row;
        flex-wrap: wrap;
        width: calc(18rem * 2);
    }
    #work .content > div:nth-last-child(1) {
        margin-right: auto;
    }
}
@media (min-width: 1024px) {
    /* 控制顯示作品一行欄位數 */
    #work .content {
        flex-direction: row;
        flex-wrap: wrap;
        width: calc(18rem * 3);
    }
    #work .content > div:nth-last-child(1) {
        margin-right: auto;
    }
}

@media (min-width: 1440px) {
    /* 控制顯示作品一行欄位數 */
    #work .content {
        flex-direction: row;
        flex-wrap: wrap;
        width: calc(18rem * 4);
    }
    #work .content > div:nth-last-child(1) {
        margin-right: auto;
    }
}
</style>