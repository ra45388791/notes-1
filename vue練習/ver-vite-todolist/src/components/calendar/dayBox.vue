<template>
    <li :class="getStyle">
        <button @click="showArticle">
            <p>
                {{ day }}
            </p>
        </button>
        <!-- <div class="text"> //好像可以拿掉
            <p v-show="article" :class="articleIsClose.class">{{ articleIsClose.text }}</p>
        </div> -->
    </li>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: ['id', 'day', 'styles', 'today', 'article'],
    data() {
        return {
            style: []
        }
    },
    computed: {

        //把style 轉成字串套用到 li上

        //預設style

        getStyle() {
            this.style = [];
            if (this.styles.length > 0) {
                this.styles.forEach(e => {
                    this.style.push(e);
                })
            }

            //今日
            if (this.today) {
                this.style.push('today');
            }

            if (this.article) {
                this.style.push('haveArticle');
            }

            const styleString = this.style.join(' ');
            return styleString
        },

        articleIsClose() {
            if (this.article.state) return { class: 'upcoming', text: '已結案' };
            else return { class: 'close', text: '未結案' }
        }

    },
    methods: {
        ...mapMutations({
            SHOW_ARTICLE: 'CHANGE_CALENDAR_SHOW_STATE',
            PUSH_ARTICLE: 'PUSH_SHOW_ARTICLE_DATA'

        }),
        showArticle() {
            if (!this.article) return;                  //確認是否有文章
            this.SHOW_ARTICLE();                        //開啟文章區
            this.PUSH_ARTICLE(this.article)             //將文章推入vuex
        }
    }


}
</script>
<style scoped>
*,
::after,
::before {
    box-sizing: border-box;
}

/* 日期區 */

li {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 0.2rem;
    width: calc(100% / 7);
    height: 4rem;

    list-style: none;

}

button {
    position: relative;
    margin: 0;
    padding: 0 0;

    width: 3rem;
    height: 3rem;

    color: #fff;
    background: rgba(51, 255, 0, 0);

    text-align: center;
    border: solid 3px rgba(167, 255, 255, 0);
    box-sizing: border-box;
    border-radius: 30px;

    cursor: pointer;

    transition: 0.1s;
}

button:hover {
    background: rgb(38, 215, 255);
    border-radius: 30px;

}

button p {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;

}



/* 今日style */
.today button {
    border: solid 2px rgb(255, 255, 255);
    box-sizing: border-box;
}

/* !過去/未來日期 */
.oldDays button {
    color: rgba(255, 255, 255, 0.5);
}

.haveArticle button {
    position: relative;
    background: rgba(0, 255, 179, 0.808);
    transition: 0.2s;
}


.haveArticle button:active {
    background: rgb(80, 130, 255);
}


@media (min-width: 1440px) {
    li {
        margin-top: 0.5rem;
        height: 5rem;

    }

    button {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 100%;
    }

    button:hover {
        background: rgb(38, 215, 255);
        border-radius: 100%;

    }

    button p {
        font-size: 1.5rem;
        line-height: 3rem
    }


}

@media (min-width: 1920px) {
    li {
        height: 6rem;
    }

    button {
        width: 5rem;
        height: 5rem;
    }

    button p {
        margin: 0;
        padding: 0;
        font-size: 2.5rem;
        line-height: 2.5rem;
    }

}
</style>
