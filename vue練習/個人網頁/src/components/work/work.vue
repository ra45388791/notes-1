<template>
    <section id="work">
        <div class="title">
            <h2>我的作品</h2>
        </div>
        <div class="content">
            <WorkBox v-for=" work of worksData" v-bind="work"></WorkBox>
        </div>
    </section>
</template>

<script>
import WorkBox from "./workBox.vue";
import worksJson from "../../assets/works.json";


export default {
    data() {
        return {
            worksData: worksJson
        };
    },
    mounted() {
        // console.log(this.worksData);
    },
    computed: {},
    methods: {},
    components: { WorkBox }
}
</script>

<style scoped>
#work {
    position: relative;
    padding: 3rem 0;
    background: rgb(29, 29, 29);
}

#work::before {
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
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
}
</style>