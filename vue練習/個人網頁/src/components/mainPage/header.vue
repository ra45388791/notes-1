<template>
    <header id="header">
        <div class="banner">
            <picture>
                <source srcset="/public/header/全身照xl.jpg" media="(min-width: 768px)" />
                <img src="/public/header/全身照sm.jpg" alt />
            </picture>
            <div class="content">
                <h2 ref="titleOne">{{ title }}</h2>
                <h2 ref="titletwo">{{ title2 }}</h2>
                <p>{{ content }}</p>
            </div>
        </div>
    </header>
</template>

<script>

export default {
    data() {
        return {
            title: "HI! 你好",
            title2: "我叫做張榮展",
            content: "歡迎來到我的個人網頁，你將會看到關於我的介紹、我會甚麼技能、以及其他大大小小的事情。"
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

    padding: 8vh 0;
    width: 100%;
    height: 92vh;

    background: linear-gradient(45deg, #514ef7 30%, #00bbff 100%, transparent);
}
.banner {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    max-width: 337.5px;
}
.banner picture {
    text-align: center;
}
.banner img {
    margin-bottom: 2.5rem;
    width: 262.5px;
    height: 325.08px;
    border-radius: 30px;
    box-shadow: 0 3px 10px 0 #000;
}

.banner h2 {
    margin: 0;
    padding: 0 40px;
    font-size: 2.5rem;
    text-align: start;
    color: rgb(255, 255, 255);
}

.banner p {
    padding: 0 30px;
    font-size: 1rem;
    text-align: start;
    color: #fff;
}

@media (min-width: 425px) {
    .banner img {
        margin-bottom: 2.5rem;
        width: 300px;
        height: 371.52px;
    }
}

@media (min-width: 768px) {
    #header {
        background: linear-gradient(
            180deg,
            #00bbff 0%,
            #514ef7 70%,
            #fff 70%,
            #fff 100%,
            transparent 0
        );
    }
    .banner {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        max-width: none;

        /* background: rgb(249, 249, 249); */
        /* box-shadow: 5px 5px 15px -5px #000; */
        /* border: solid 5px rgb(46, 190, 251); */
        /* border-radius: 0 30px 0 30px; */
        /* box-sizing: border-box; */
    }
    .banner .content {
        max-width: 330px;
    }
    .banner img {
        margin-bottom: 2.5rem;
        width: 350px;
        height: 509.36px;
    }

    .banner h2 {
        padding: 0 40px;
    }

    .banner p {
        padding: 0 40px;
    }
}
</style>