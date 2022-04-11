<template>
    <transition>
        <div class="workArticle" v-show="showArticles" @click.self="closeArticle">
            <article class="article">
                <div class="media">
                    <WorkDynamicWallPhotoBox
                        :dynamicPhotos="articleData.photos"
                        :dynamicButton="articleData.button"
                    ></WorkDynamicWallPhotoBox>
                </div>
                <div class="message">
                    <nav>
                        <button class="workButton" style="visibility: hidden;"></button>
                        <h3>{{ workDynamicWallTitle }}</h3>
                        <button @mouseup="closeArticle" type="button" class="workButton"></button>
                    </nav>
                    <div class="message-article">
                        <div class="message-overflow">
                            <div class="message-content">
                                <h4>{{ articleData.title }}</h4>
                                <div class="message-content-div">
                                    <p
                                        v-for="content of articleData.content"
                                        :key="content.id"
                                    >{{ content.text }}</p>
                                </div>
                            </div>

                            <div class="superLink">
                                <!-- <a
                                    v-show="ishref"
                                    :href="articleData.href"
                                    target="_blank"
                                    class="workButton"
                                >
                                    前往作品
                                    <img
                                        src="../../../public/works/icon/foreign.png"
                                        alt="linkIcon"
                                    />
                                </a>-->
                                <a
                                    v-for="hrefs of hrefButton"
                                    :href="hrefs.link"
                                    :key="hrefs.id"
                                    target="_blank"
                                    class="workButton"
                                >
                                    {{ hrefs.name }}
                                    <img :src="hrefs.icon" alt="linkIcon" />
                                </a>
                                <router-link
                                    v-for="router of routerButton"
                                    :to="router.link"
                                    :key="router.id"
                                    target="_blank"
                                    class="workButton"
                                >
                                    {{ router.name }}
                                    <img :src="router.icon" alt="linkIcon" />
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </transition>
</template>

<script>
/**
 * 要動到 worksJson 需要跟著修改以下組件
 *  work.vue
 *  workBox.vue
 *  WorkDynamicWall.vue
 *  WorkDynamicWallPhotoBox.vue
 * 
*/
import WorkDynamicWallPhotoBox from "./workDynamicWallPhotoBox.vue";




export default {
    props: ["articleDatas", "showArticles"],

    watch: {
        articleDatas: function (newVal, oldVal) {
            this.articleData = newVal;
        },
        showArticles: function (newVal, oldVal) {
            this.showArticle = newVal;
        }
    },
    data() {
        return {
            workDynamicWallTitle: "作品介紹",
            articleData: {
                id: 0,
                title: "",
                content: [],
                image: "",
                photos: [],
                button: []
            },
            showArticle: false,
            // ishref: true, //判斷外部連結是 router 還是 href
        };
    },
    computed: {
        hrefButton: function () {
            const href = this.articleData.button.filter((e) => e.type === "href");
            return href;
        },
        routerButton: function () {
            const router = this.articleData.button.filter((e) => e.type === "router");
            return router;

        }
    },
    methods: {
        closeArticle() {
            setTimeout(() => {
                this.articleData.photos = []
            }, 300)
            this.$emit("closeArticle");
        },
        goToSuperLink(e) {
            location.href = e;
        }
    },
    components: { WorkDynamicWallPhotoBox }
}



</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
.v-enter-to,
.v-leave-from {
    opacity: 1;
}

.workButton {
    padding: 0 1rem;
    height: 2.5rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    background: none;

    border: 3px solid rgb(113, 113, 113);
    box-sizing: border-box;
    border-radius: 30px;
}
.workButton img{
    max-width: 16px;
    max-height: 16px;
}

.workArticle {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.461);
    z-index: 9;
}
.article {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.647);
    border: 1px solid rgb(50, 50, 50);
    box-sizing: border-box;
}

.media {
    width: 100%;
    height: 60%;
    /* height: 24rem; */
}
.message {
    display: flex;
    flex-direction: column;
    /* justify-content: start; */
    padding: 0;
    width: 100%;
    height: 40%;
    background: rgb(29, 29, 29);
}

/* 選單 */
nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 23%;
    background: rgb(29, 29, 29);
    border-bottom: 1px solid rgb(88, 88, 88);
}
nav button {
    position: relative;
    margin: 0 1.5rem;
    transition: transform 0.3s, background-color 0.1s;
    cursor: pointer;
}
nav button::before {
    content: "";
    position: absolute;
    left: calc(50% - 0.75rem);
    top: calc(50% - 0.15rem);
    width: 1.5rem;
    height: 0.3rem;
    background: #fff;
    transform: rotate(45deg);
}
nav button::after {
    content: "";
    position: absolute;
    left: calc(50% - 0.75rem);
    top: calc(50% - 0.15rem);
    width: 1.5rem;
    height: 0.3rem;
    background: #fff;
    transform: rotate(-45deg);
}

nav button:hover {
    transform: rotate(180deg);
}

nav button:active {
    background: rgb(89, 89, 89);
}

nav h3 {
    font-size: 1.5rem;
    color: #fff;
}

/* 訊息區 */
.message-article {
    padding: 1rem 0;
    height: 60%;
}

.message-overflow {
    display: flex;
    flex-direction: column;

    /* padding: 0.5rem 1rem; */
    height: 100%;
    overflow-y: scroll;
}
.message-content {
    display: flex;
    flex-direction: column;
}

.message-content h4 {
    line-height: 3rem;
    font-size: 1.5rem;
    color: #fff;
}
.message-content-div {
    margin: 0.2rem 0;
    width: 100%;
    color: #fff;
    align-self: flex-start;
    word-wrap: break-word;
}
.message-content p {
    margin: 0;
    margin-bottom: 1rem;
    padding: 0 1.5rem;
    line-height: 1.5rem;
    text-indent: 2em;

    text-align: start;
    /* overflow-y: scroll; */
}

/* 按鈕 */
.message .superLink {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 1rem 0 1rem;
    width: 100%;
    height: 25%;
}
.message .superLink a {
    width: 11rem;
    margin: 0.5rem 0.5rem;

    line-height: 2.4rem;
    text-decoration: none;
}

@media (min-width: 425px) {
    .article {
        width: 26rem;
        height: 40rem;
    }
    .media {
        min-height: 0;
    }
}

@media (min-width: 1024px) {
    .article {
        flex-direction: row;
        width: 50rem;
        height: 30rem;
    }
    .media {
        width: 60%;
        height: 100%;
    }
    .message {
        width: 40%;
        height: 100%;
    }
    nav {
        height: 3.5rem;
    }

    .message-article {
        height: 77%;
    }
}
</style>