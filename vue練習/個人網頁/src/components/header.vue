<template>
    <header>
        <div class="banner">
            <div>
                <!-- <img src="../../public/全身照.jpg" alt="全身照" /> -->
                <picture>
                    <source srcset="../../public/全身照xl.jpg" media="(min-width: 800px)" />
                    <img src="../../public/全身照sm.jpg" alt />
                </picture>
                <h2>{{ title }}</h2>
                <h2>{{ title2 }}</h2>
                <p>{{ content }}</p>
            </div>
            <div></div>
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
    methods: {

    },
    components: {}
}



</script>

<style scoped>
header {
    display: flex;
    justify-content: center;

    padding: 8vh 0 0 0;
    width: 100vw;
    height: 92vh;
    
    background: linear-gradient(
        45deg,
        #514ef7 30%,
        /* #00b3ff 70%, */ #00bbff 100%,
        transparent
    );
    /* background: #514ef7; */
}
.banner {
    padding: 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 90vw;
    /* height: 80vh; */


    /* background: rgb(249, 249, 249); */
    /* box-shadow: 5px 5px 15px -5px #000; */
    /* border: solid 5px rgb(46, 190, 251); */
    /* border-radius: 0 30px 0 30px; */
    /* box-sizing: border-box; */
}
.banner picture {
    text-align: center;
}
.banner img {
    margin-bottom: 2.5rem;
    width: 70vw;
    border-radius: 30px;
    box-shadow: 0 3px 10px 0 #000;
}

.banner h2 {
    margin: 0;
    font-size: 2.5rem;
    text-align: start;
    color: rgb(255, 255, 255);
}

.banner p {
    padding: 0 5px;
    font-size: 1rem;
    text-align: start;
    color: #fff;
}
</style>