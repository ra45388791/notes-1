<template>
    <nav
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseLeave"
        @mouseleave="mouseLeave"
        ref="scrollBar"
    >
        <SkillNavButton
            v-for=" skill of skillData"
            v-bind="skill"
            @focusButton="changeSkillsArticle"
            :class="buttonFocus === skill.id ? 'buttonFocus' : ''"
            key=" skill.id"
        ></SkillNavButton>
    </nav>
</template>

<script>
import { mapMutations } from "vuex";
import SkillNavButton from "./skillNavButton.vue";

export default {
    data() {
        return {
            isMouseDown: false,
            pos: {
                left: 0,
                x: 0
            },
            buttonFocus: 0

        };
    },
    computed: {
        skillData() {
            return this.$store.state.skillDatas;
        },
    },
    methods: {
        ...mapMutations(['CHENGE_SKILL_PAGE']),
        // 處裡使用者拖曳事件
        mouseDown: function (e) {
            this.isMouseDown = true;
            this.$refs.scrollBar.style.cursor = "grabbing"
            this.pos.left = this.$refs.scrollBar.scrollLeft;
            this.pos.x = e.clientX;
        },
        mouseMove: function (e) {

            const dx = e.clientX - this.pos.x;
            if (this.isMouseDown) {
                this.$refs.scrollBar.scrollLeft = this.pos.left - dx;
            }
        },
        mouseLeave: function (e) {
            this.$refs.scrollBar.style.cursor = "grab"
            this.isMouseDown = false
        },
        // 切換按鈕高亮狀態 和 vuex 狀態提交
        changeSkillsArticle(e) {
            this.buttonFocus = e;
            this.CHENGE_SKILL_PAGE(e);        // 提交id 到 vuex
        }

    },
    components: { SkillNavButton }
}



</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 1rem auto;
    padding: 0 0.5rem;
    width: 20rem;
    height: 4rem;
    background: rgb(102, 196, 255);
    /* border-top: 4px solid rgb(0, 225, 255); */
    /* border-bottom: 4px solid rgb(0, 225, 255); */
    border: 4px solid rgb(0, 225, 255);
    overflow: scroll;
    cursor: grab;
    border-radius: 50px;
}
nav::-webkit-scrollbar {
    display: none;
}

.buttonFocus {
    /*被按下時套用*/
    color: white;
    background-color: rgb(0, 221, 255);
}
</style>