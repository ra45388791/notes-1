<template>
    <li :class="getStyle">
        <button @mouseup="">
            {{ day }}
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
    created() {
        this.$nextTick(function () {

            //預設style
            this.styles.forEach(e => {
                this.style.push(e);
            })
            //今日
            if (this.today) {
                this.style.push('today');
            }
        })


    },
    computed: {

        //把style 轉成字串套用到 li上
        getStyle() {
            const styleString = this.style.join(' ');
            return styleString
        },
        articleIsClose() {
            if (this.article.state) return { class: 'upcoming', text: '已結案' };
            else return { class: 'close', text: '未結案' }
        }

    },
    methods: {
        showArticle() {

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
    padding: 0;

    width: 2.8rem;
    height: 2rem;

    color: #fff;
    background: rgba(51, 255, 0, 0);

    font-size: 1.5em;
    text-align: center;
    border: solid 3px rgba(167, 255, 255, 0);
    box-sizing: border-box;
    border-radius: 30px;

    transition: 0.1s;
}

button:focus {
    background: rgb(38, 215, 255);
    border-radius: 30px;

}

/* 是否結案 */
.text {
    margin-top: 5px;
    min-height: 1rem;
}

p {
    margin: 0;
    padding: 5px 2px;
    height: 1.6rem;
    color: #fff;
    font-size: 13px;
}

.upcoming {
    color: rgb(33, 124, 3);
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
    background: rgba(0, 72, 255, 0.808);
    transition: 0.2s;
}


.haveArticle button:active {
    background: rgb(80, 130, 255);
}

/* 
@media (min-width: 768px) {

    li {
        height: 4.5rem;
    }
}

@media (min-width: 1024px) {
    li {
        height: 3.5rem;
    }


}

@media (min-width: 1440px) {
    li {
        height: 5rem;
    }

}

@media (min-width: 1920px) {
    li {
        height: 7rem;
    }

} */
</style>
