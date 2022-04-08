<template>
    <div class="articlesContent" @click="commitVuexSkillArticle">
        <div>
            <div class="imageBox" :style="imageSize">
                <img :src="image.url" alt="title" />
            </div>
            <div class="content">
                <h3>{{ title }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: ['id', 'image', 'title', 'content'],
    data() {
        return {
            imageSize: {
                width: this.image.width + 'px',
                height: this.image.height + 'px'
            }

        };
    },
    methods: {
        ...mapMutations(['COMMIT_SKILL_ARTICLE']),
        commitVuexSkillArticle: function (e) {
            const box = {
                id: this.id,
                image: {
                    url: this.image.url,
                    width: this.image.width,
                    height: this.image.height
                },
                title: this.title,
                content: this.content,
            }
            this.COMMIT_SKILL_ARTICLE(box);

        }
    }
// ! skills.json 後端內文還沒寫完
}



</script>

<style scoped>
.articlesContent {
    position: relative;
    margin: 1rem 1.6rem;
    width: 320px;
    height: 128px;
    box-shadow: inset 0 0px 100px 0 rgba(255, 255, 255, 0.221);
    cursor: pointer;

    transition: 0.5s;
}
.articlesContent:hover {
    box-shadow: inset 0 0px 100px 0 rgba(255, 255, 255, 0.875);
}

.articlesContent > div {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    user-select: none;
}

.articlesContent > div::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 0;
    width: 165px;
    height: 0px;
    border-top: 0px solid rgba(0, 0, 0, 0);
    border-bottom: 28px solid rgb(0, 238, 255);
    border-left: 77.5px solid rgba(0, 0, 0, 0);
    border-right: 77.5px solid rgba(0, 0, 0, 0);
}

.imageBox {
    position: relative;
    z-index: 1;
}
.imageBox img {
    width: 100%;
    height: 100%;
}

.content {
    margin: 0 1rem;
    color: rgb(255, 255, 255);

    font-size: 1.3rem;
}
</style>