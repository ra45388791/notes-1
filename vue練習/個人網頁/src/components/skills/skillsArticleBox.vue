<template>
    <div class="articlesContent">
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
    computed: {

    }

}



</script>

<style scoped>
.articlesContent {
    position: relative;
    margin: 1rem 1.6rem;
    width: 320px;
    height: 128px;
    box-shadow: inset 0 0px 100px 0 rgba(255, 255, 255, 0.221);
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
    border-top: 95px solid rgba(0, 0, 0, 0);
    border-bottom: 33px solid rgb(0, 238, 255);
    border-left: 75px solid rgba(0, 0, 0, 0);
    border-right: 80px solid rgba(0, 0, 0, 0);
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