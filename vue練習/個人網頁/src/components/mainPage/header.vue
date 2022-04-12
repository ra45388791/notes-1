<template>
    <header id="header">
        <div class="banner">
            <!-- <picture>
                <source srcset="/public/header/全身照xl.jpg" media="(min-width: 768px)" />
                <img src="/public/header/全身照sm.jpg" alt />
            </picture> -->
            <div class="content">
                <h2 ref="titleOne"><samp class="title1">{{ title }}</samp></h2>
                <h2 ref="titletwo"><samp class="title1">{{ title2 }}</samp></h2>
                <h3>{{ content1 }}</h3>
                <p>{{ content2 }}</p>
            </div>
            <div></div>
        </div>
    </header>
</template>

<script>

export default {
    data() {
        return {
            title: "HI!你好",
            title2: "我叫做張榮展",
            content1: "歡迎來到我的個人網頁!",
            content2: "你將會看到關於我的介紹、我會甚麼技能、我有甚麼作品、以及其他各式各樣的事情"
        };
    },
    mounted() {
        // console.log(this.$refs);
        // const a = this.$refs.titleOne.getBoundingClientRect();
        // console.log(a);
    },
    methods: {

    },
    components: {}
}



</script>

<style scoped>
#header {
    display: flex;
    justify-content: center;

    width: 100%;
    height: 40rem;

    background-image: url(/header/computer.jpg);
    background-position: top left 35%;
    background-repeat: no-repeat;
    background-size: cover;

    /* background: linear-gradient(45deg, #514ef7 30%, #00bbff 100%, transparent); */
}

.banner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    /* background: rgba(141, 219, 255, 0.3); */
    background: rgba(141, 198, 255, 0.2);

}

.banner::before {
    content: "";
    position: absolute;
    bottom: 1rem;
    left: calc(50% - 15px);

    border-top: 15px solid rgb(0, 255, 251);
    border-bottom: 0px solid rgb(0, 225, 0, 0);
    border-left: 15px solid rgb(0, 225, 0, 0);
    border-right: 15px solid rgb(0, 225, 0, 0);
    animation: triangle 1s 0s ease-in-out infinite;
}

@keyframes triangle {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(5px);

    }

    100% {
        transform: translateY(0px);

    }
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 2rem;
    padding: 1.5rem 2rem;
    border: px solid #fff;
    box-sizing: border-box;
    /* background: rgba(0, 0, 0, 0.5); */
    background: rgba(0, 119, 255, 0.5);
    border-radius: 30px;

}

.content h2 {
    padding: 0rem 0 0.5rem;
    font-size: 2.5rem;
    text-align: center;
    /* color: rgb(255, 174, 0); */
    /* color: #00ffee; */
}

.content .title1 {
    padding: 0.3rem 0rem 0.1rem;
    color: #fff;
    /* background: rgb(0, 106, 255); */
    border-radius: 10px;
}



.content h3 {
    margin: 0rem 0rem 1rem;
    font-size: 1.4rem;
    text-align: center;

    color: rgb(255, 255, 255);
    /* color: #00ffee; */
}

.content p {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    line-height: 1.3rem;
    text-align: start;
    color: rgb(255, 255, 255);
}



@media (min-width: 425px) {

    /* .content {
        margin-left: 2rem;
        max-width: 25rem;
    } */
}

@media (min-width: 768px) {
    #header {
        width: 100%;
        height: 100vh;

        background-image: url(/header/computer.webp);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;

        /* background: linear-gradient(45deg, #514ef7 30%, #00bbff 100%, transparent); */
    }

    /*
    .banner {}

    .content {

        width: 80vw;
        height: 50vh;
        max-width: none;
        box-sizing: border-box;
    }

    .content h2 {
        font-size: 4.5rem;
        text-align: start;
    }

    .content h3 {
        margin-top: 0.5rem;
        font-size: 2rem;
        text-align: start;
    }

    .content p {

        font-size: 1.5rem;
        text-align: start;
        line-height: 1.8rem;
        color: #fff;
        font-weight: bold;
    }

    */
}
</style>