<template>
    <section id="about">
        <div ref="title" class="title">
            <h2 class="zhTitle">{{ zhTitle }}</h2>
            <h2 class="enTitle">{{ enTitle }}</h2>
        </div>
        <div class="content">
            <article ref="content">
                <p style="font-weight: bold;">{{ content }}</p>
                <p>{{ content2 }}</p>
                <p>{{ content3 }}</p>
            </article>
        </div>
        <div class="imgBox">
            <img ref="photo" src="/public/about/生活照.jpg" alt srcset>
            <div class="photoBg"></div>
        </div>
    </section>
</template>

<script>
import { setFadeInAnimation as Fadein } from '../../../script/observerFunc.js'
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
        // fadein動畫
        const bottomFadein = new Fadein().setAnimation('opacity:0', 'bottomFadeIn', 1, 300);
        bottomFadein.observe(this.$refs.title)

        const leftFadein = new Fadein().setAnimation('opacity:0', 'leftFadeIn', 1, 300);
        leftFadein.observe(this.$refs.content);
        const rigthFadeIn = new Fadein().setAnimation('opacity:0', 'rigthFadeIn', 1, 300);
        rigthFadeIn.observe(this.$refs.photo);

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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    padding: 5rem 2rem 10rem;
    overflow: hidden;
}

.title,
.content,
.imgBox {
    position: relative;
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
    z-index: 2;
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
    position: relative;
    width: 300px;
    height: 100%;
    border-radius: 30px;
    box-shadow: 0 15px 15px -10px #000;
    z-index: 2;
}


.photoBg {
    content: "";
    position: absolute;
    left: calc(50% - 9rem);
    top: -20%;

    width: 2.5rem;
    height: 25rem;

    background: rgb(0, 195, 255);

    border-radius: 50px;
    transform: rotate(45deg);

    z-index: 1;
    box-shadow: 4rem -5rem 0 0 rgb(251, 255, 0), 8rem 7rem 0 0 rgb(0, 195, 255), 12rem -7rem 0 0 rgb(255, 166, 0), 16rem 1rem 0 0 rgb(195, 0, 255), 20rem -3rem 0 0 rgb(255, 0, 0)
}

.photoBg:before {
    content: "";
    position: absolute;
    left: 0;
    top: -4rem;
    width: 3rem;
    height: 3rem;
    background: rgb(195, 0, 255);
    border-radius: 50px;
    box-shadow: 12rem -7rem 0 0 rgb(255, 0, 0), 4rem 25rem 0 0 rgb(255, 170, 0), 20rem 27rem 0 0 rgb(0, 191, 255)
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

    #about .imgBox img {
        width: 100%;
    }

    .photoBg {
        left: 20%;
        top: -30%;

        width: 3rem;
        height: 40rem;

        background: rgb(0, 195, 255);


        z-index: 1;
        box-shadow: 4.5rem -2rem 0 0 rgb(251, 255, 0), 9rem 7rem 0 0 rgb(0, 195, 255), 13rem -7rem 0 0 rgb(255, 166, 0), 17rem 1rem 0 0 rgb(195, 0, 255), 21rem -3rem 0 0 rgb(255, 0, 0)
    }

    .photoBg:before {
        left: 0;
        top: -4rem;
        width: 3rem;
        height: 3rem;

        background: rgb(195, 0, 255);
        border-radius: 50px;
        box-shadow: 13rem -7rem 0 0 rgb(255, 0, 0), 4.5rem 43rem 0 0 rgb(255, 170, 0), 21rem 42rem 0 0 rgb(0, 191, 255)
    }
}
</style>