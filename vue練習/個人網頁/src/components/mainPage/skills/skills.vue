<template>
    <section id="skills">
        <h2 class="zhTitle">我的技能</h2>
        <h3 class="enTitle">My Skills</h3>
        <div class="skillBox">
            <skillsNav></skillsNav>
            <SkillsArticle></SkillsArticle>
        </div>
        <SkillFloatingBlock></SkillFloatingBlock>
    </section>
</template>

<script>
import skillsNav from './skillsNav.vue'
import SkillsArticle from './skillsArticle.vue';
import SkillFloatingBlock from "./skillFloatingBlock.vue";


export default {
    data() {
        return {

        };
    },
    components: { skillsNav, SkillsArticle, SkillFloatingBlock }

}



</script>

<style scoped>
h2,
h3 {
    margin: 10px 0;
    color: rgb(251, 255, 255);
}

#skills {
    position: relative;
    padding: 3rem 0;
    width: 100%;
    background: linear-gradient(45deg, #00bbff 0%, #514ef7 100%, transparent 0);
}

#skills .zhTitle {
    font-size: 3rem;
    text-align: center;
}
#skills .enTitle {
    font-size: 2rem;
    text-align: center;
}

#skills .skillBox {
    width: 100%;
}
</style>