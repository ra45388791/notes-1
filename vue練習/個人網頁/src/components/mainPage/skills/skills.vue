<template>
    <section id="skills">
        <h2 class="zhTitle" ref="title1">我的技能</h2>
        <h3 class="enTitle" ref="title2">My Skills</h3>
        <div ref="navRef" class="skillBox">
            <skillsNav></skillsNav>
            <SkillsArticle></SkillsArticle>
        </div>
        <SkillFloatingBlock></SkillFloatingBlock>
    </section>
</template>

<script>
// 自製 observer 方法
import { setFadeInAnimation as Fadein } from '../../../../script/observerFunc.js'

import skillsNav from './skillsNav.vue'
import SkillsArticle from './skillsArticle.vue';
import SkillFloatingBlock from "./skillFloatingBlock.vue";


export default {
    data() {
        return {
            showTitle: false,
        };
    },
    mounted() {
        //動畫
        let ref = this.$refs
        const fadein = new Fadein().setAnimation('opacity:0', 'bottomFadeIn', 1, 300);

        fadein.observe(ref.title1)
        fadein.observe(ref.title2)
        fadein.observe(ref.navRef)


    },
    components: { skillsNav, SkillsArticle, SkillFloatingBlock }

}



</script>

<style scoped>
h2,
h3 {
    margin: 10px 0;
    color: rgb(251, 255, 255);

    transition: 1s;
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