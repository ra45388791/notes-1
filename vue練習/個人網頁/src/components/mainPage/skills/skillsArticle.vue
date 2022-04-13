<template>
    <article @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseLeave" @mouseleave="mouseLeave"
        ref="articleScroll">
        <div class="articleBox">
            <SkillsArticleBox v-for="skill of skillsArticleGetter" v-bind="skill" :key="skill.id" class="articles">
            </SkillsArticleBox>
        </div>
    </article>
</template>

<script>
import { setFadeInAnimation as Fadein } from '../../../../script/observerFunc.js'

import { mapState } from "vuex";
import SkillsArticleBox from "./skillsArticleBox.vue";



export default {
    data() {
        return {
            isMouseDown: false,                                 //是否按下滑鼠
            pos: {                                              //拖曳參數
                left: 0,
                x: 0
            },
        };
    },
    mounted() {
        const rigthFadein = new Fadein().setAnimation('opacity:0', 'rigthFadeIn', 1, 300);
        rigthFadein.observe(this.$refs.articleScroll)
    },
    computed: {
        ...mapState(["skillDatas", "skillPage"]),               //vuex資料
        skillsArticleGetter() {                                 //把文章資料抽出
            const vm = this;
            const article = this.skillDatas.find(function (e) {
                if (e.id === vm.skillPage) {
                    return e.article;
                }
            });
            return article.article;
        }
    },
    methods: {
        mouseDown: function (e) {

            this.isMouseDown = true;                            // 是否按下
            console.log(this.$refs.articleScroll.style);
            this.$refs.articleScroll.style.cursor = "grabbing"  // 滑鼠樣式
            this.pos.left = this.$refs.articleScroll.scrollLeft;//卷軸滾動位置
            this.pos.x = e.clientX;                             //滑鼠所在位置
        },
        mouseMove: function (e) {
            const dx = e.clientX - this.pos.x;
            if (this.isMouseDown) {
                this.$refs.articleScroll.scrollLeft = this.pos.left - dx;
            }
        },
        mouseLeave: function (e) {
            this.$refs.articleScroll.style.cursor = "grab"
            this.isMouseDown = false
        },
        // 切換按鈕高亮狀態 和 vuex 狀態提交
        changeSkillsArticle(e) {
            this.buttonFocus = e;
            this.CHENGE_SKILL_PAGE(e);        // 提交id 到 vuex
        }
    },
    components: { SkillsArticleBox }
}



</script>

<style scoped>
article {
    margin: 1rem 0;
    width: 100%;
    height: 20rem;
    background: linear-gradient(175deg,
            #3d7bff 0%,
            #11dfdf 100%,
            transparent 0);

    border-top: 4px solid rgb(0, 225, 255);
    border-bottom: 4px solid rgb(0, 225, 255);

    /* overflow-y: hidden; */
    overflow-x: scroll;
}

article::-webkit-scrollbar {
    display: none;
}

.articleBox {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
    flex-direction: column;
    flex-wrap: wrap;

    height: 20rem;
}

.articles:nth-last-child(1)::after {
    content: "";
    position: absolute;
    visibility: hidden;
    top: 0;
    right: -1.7rem;

    width: 1px;
    height: 1px;
}
</style>