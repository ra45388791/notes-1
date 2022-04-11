<template>
    <section id="about">
        <div class="title">
            <h2 class="zhTitle">{{ zhTitle }}</h2>
            <h2 class="enTitle">{{ enTitle }}</h2>
        </div>
        <div class="content">
            <article>
                <p style="font-weight: bold;">{{ content }}</p>
                <p>{{ content2 }}</p>
                <p>{{ content3 }}</p>
            </article>
        </div>
        <div class="imgBox">
            <img src="/public/about/生活照.jpg" alt srcset />
        </div>
    </section>
</template>

<script>

export default {
    data() {
        return {
            zhTitle: "關於我",
            enTitle: "about",
            content1: {
                a: "嗨 你好，我今年",
                b: "歲，畢業於台北城市科技大學。我喜好接觸新的事物，討厭一成不變，我擁有很強的定力能長時間專注於某種事物上，只要是做我喜歡做的事我會是個非常有毅力的人。"
            },
            content2: "我開始接觸程式這個世界要從我大學時期開始說起，在我讀大學的時期製作專題的課堂上我與我的夥伴們製作專案時發現我喜歡寫程式，只要寫幾句語法就能讓畫面動起來對當時的我來說是很新奇的，這是我最初發現我有能力寫出可以運作的程式的時候，但在通過專題製作這堂課之後為了其他畢業條件暫時沒有碰程式這一塊。",
            content3: '在畢業之後為了家業開始接觸了前端技術這塊，起初只接觸了 HTML、CSS 這兩項，對我來說稍嫌枯燥乏味但在加入JavaScript後整個世界都不一樣了，對我來說寫JavaScript已經變成了我的其中一個興趣，而我也並不打算只把這門技術拿來寫網頁，在未來我想要用這門技術製作出能被廣泛使用的軟體。',
            date: NaN
        };
    },
    mounted() {
        const year = new Date().getFullYear();
        this.date = year - 1999;        //計算我的年齡
    },
    computed: {
        content() {
            return this.content1.a + this.date + this.content1.b;
        }
    },
    methods: {

    },
    components: {}
}



</script>

<style scoped>
h2 {
    margin: 10px 0;
}

#about {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    padding: 8vh 2rem;
}
.title {
    margin-bottom: 2rem;
    width: 100%;

}
.content {
    margin-bottom: 2rem;
    width: 100%;
    line-height: 1.5rem;
    text-align: justify;
}
#about .enTitle {
    font-size: 2rem;
    text-align: center;
}
#about .zhTitle {
    font-size: 3rem;

    text-align: center;
}
#about p {
    text-indent: 2em;
}
#about .imgBox {
    width: 90vw;
}
#about .imgBox img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
    box-shadow: 0 15px 15px -10px #000;
}

@media (min-width: 768px) {
    .content {
        width: 60%;
    }
    #about .imgBox {
        width: 460px;
    }
}
@media (min-width: 1024px) {
    #about {
        /* padding: 8vh 20%; */
        flex-wrap: wrap;
        justify-content: center;
    }
    .content {
        margin-bottom: 0;

        margin-right: 3rem;
        width: 384px;
    }



    #about .imgBox {
        width: 384px;
    }
}
</style>