<template>
    <li :class="getStyle">
        <button @click="showArticle">
            <p>
                {{ day }}
            </p>
        </button>
        <div class="text">
            <p v-show="article" :class="articleIsClose.class">{{ articleIsClose.text }}</p>
        </div>
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
            // CLOSE_ARTICLE: 'CLOSE_ALL_FUNCTIONS'
        }),
        showArticle() {
            if (!this.article) return;                  //確認是否有文章
            this.SHOW_ARTICLE('')
            // this.$store.commit('CHANGE_CALENDAR_SHOW_STATE');
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
    padding: 0 0.5rem;

    width: 3rem;
    height: 50%;

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
    padding: 0;
    font-size: 1.5rem;

}

/* 是否結案 */
.text {
    margin-top: 5px;
    height: 50%;
}

p {
    margin: 0;
    padding: 5px 2px;
    height: 1.6rem;
    color: #fff;
    font-size: 13px;
}

.upcoming {
    color: rgb(0, 0, 0);
    background: rgb(0, 255, 0);
    border-radius: 5px;
}

.close {
    color: rgb(255, 255, 255);
    background: #f00;
    border-radius: 5px;

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
        height: 70%;
        border-radius: 100%;
    }

    button:hover {
        background: rgb(38, 215, 255);
        border-radius: 100%;

    }

    button p {
        padding: 0;
        font-size: 1.5rem;
        line-height: 3rem
    }

    /* 是否結案 */
    .text {
        margin-top: 5px;
        height: 30%;
    }

    p {
        margin: 0;
        padding: 5px 2px;
        height: 100%;
        color: #fff;
        font-size: 1rem;
    }
}

@media (min-width: 1920px) {
    li {
        height: 7.5rem;
    }

    button {
        width: 4.8rem;
        height: 60%;
    }

    button p {
        padding: 0;
        font-size: 2.3rem;
        line-height: 4.3rem
    }

    .text {
        height: 40%;
    }

    p {
        margin: 0;
        padding: 5px 5px;
        height: 100%;
        color: #fff;
        font-size: 1.5rem;
        line-height: 2.5rem
    }
}
</style>
