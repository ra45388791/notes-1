<template>
    <div class="article" @mouseup="openArticle">

        <div class="articleHeader">
            <div class="top">
                <div class="title">
                    <h3>{{ title }}</h3>
                </div>
            </div>

            <div class="min">
                <div class="content">
                    <p> {{ content }} </p>
                </div>
            </div>


            <div class="articleState">
                <div class="date oldDate">{{ parseSetDate.month }}/{{ parseSetDate.day }}</div>
                <div class="state">
                    <img :src="stateImg" alt="">
                </div>
                <div class="date newDate">{{ parseEndDate.month }}/{{ parseEndDate.day }}</div>
            </div>

        </div>

        <div class="setButton">
            <button @mouseup.stop="openSet"></button>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {

    props: ['id', 'itemShow', 'state', 'stateImg', 'title', 'content', 'setDate', 'date'],
    data() {
        return {


        }
    },
    created() {


    },
    computed: {
        parseSetDate() {
            const month = this.setDate.slice(5, 7);
            const day = this.setDate.slice(8);
            return {
                month: month,
                day: day,
            }
        },
        parseEndDate() {
            const month = this.date.slice(5, 7);
            const day = this.date.slice(8);
            return {
                month: month,
                day: day,
            }
        }
    },
    methods: {
        ...mapMutations(['OPEN_FULL_ARTICLES', 'TEMPORARY_STORAGE_ARTICLES']),
        // 打開文章
        openArticle: function () {
            const box = {
                id: this.id,
                title: this.title,
                content: this.content,
                setDate: this.setDate,
                date: this.date,
                state: this.state,
                stateImg: this.stateImg,
            }


            this.OPEN_FULL_ARTICLES();
            this.TEMPORARY_STORAGE_ARTICLES(box)

        },
        // 打開設定清單
        openSet: function () {
            console.log('456');
        }


    }
}
</script>
<style scoped>
.article {
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center;

    align-content: center; */
    position: relative;
    margin: 1rem auto;
    padding: 2rem 2rem 1rem;


    width: 270px;
    height: 230px;
    color: #fff;

    background: #0084A3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 40px;

}

.article .articleHeader {
    display: flex;
    flex-direction: column;
    justify-content: start;
    /* align-items: start; */
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    /* background: #000; */
}

.article .top {
    width: 100%;
    /* height: 2rem; */
    height: 20%;
}


.top .title {
    margin: 0;
    font-size: 1.5rem;

    width: 80%;

    white-space: nowrap;
    overflow: hidden;
    /* background: #000; */
}

.top .title h3 {
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
}

.min {
    width: 100%;
    height: 60%;
}


.min .content {
    height: 7.5rem;
    overflow: hidden;
}

.min .content p {
    display: inline-block;
    margin: 0;
    color: #fff;
    line-height: 1.5em;
    text-indent: 2em;

    /* text-align: justify; */
    text-align: start;

    word-break: break-all;
    overflow: hidden;
}

.article .articleState {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 20%;

}


.article .articleState .date {
    padding: 8.5px 16px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5rem;
    color: #00FFF0;
    background: #0084A3;
    border: 1px solid #00CFFF;
    border-radius: 30px;
}

.articleState .state {
    width: 32px;
    height: 32px;
}

.article .articleState .state img {
    width: 100%;
    height: 100%;
}

.setButton {
    position: absolute;
    top: 1rem;
    right: 1.5rem;

    width: 50px;
    height: 50px;

    border-radius: 100%;
    /* background: #000; */
}

.setButton button {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #1BAACB;
    /* background: #0C4553; */
    border: none;
    border-radius: 100%;
    transition: 0.2s;
}

.setButton button:active {
    background: #50b5cc;
}

.setButton button::before {
    content: "";
    position: absolute;
    left: calc(50% - 3.5px);
    top: calc(50% - 3.5px);
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 12px 0px 0px rgb(255 255 255 / 70%),
        0px -12px 0px 0px rgb(255 255 255 / 70%);
}

/*
*/

@media (min-width:1024px) {
    .article {
        width: 80%;
    }

    .article .articleState .oldDate::before {
        content: '設定日期 : ';
    }

    .article .articleState .newDate::before {
        content: '結束日期 : ';
    }

    .setButton {
        width: 100px;
        height: 50px;
        /* background: #000; */
        border-radius: 30px;
    }

    .setButton button {
        border-radius: 30px;
    }

    .setButton button::before {
        content: "SET";
        position: static;
        left: calc(50% - 3.5px);
        top: calc(50% - 3.5px);
        width: 7px;
        height: 7px;
        font-size: 1.5rem;
        font-weight: bold;
        color: #fff;

        border-radius: 30px;
        background: rgba(255, 255, 255, 0);
        box-shadow: none;
    }
}
</style>
