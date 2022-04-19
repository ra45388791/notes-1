<template>
    <transition name="editOrRead">
        <article v-bind="$attrs" v-show="UI.addArticle" id="addArticle">
            <!-- 檢視文章選單 -->
            <nav class="topNav">
                <button @mouseup="CLOSE_ALL_FUNCTIONS" class="buttons back">
                    <img src="../../../public/images/添加代辦事項/X.svg" alt="返回">
                </button>

                <div>{{ title }}</div>

                <button type="submit" form="articleForm" class="buttons check">
                    <img src="../../../public/images/添加代辦事項/O.svg" alt="提交按鈕">
                </button>
            </nav>
            <!-- 編輯區 -->
            <div class="content">
                <div class="article">

                    <form id="articleForm" method="POST" action="/" @submit.prevent="formSubmit" class="">

                        <input type="text" name="title" placeholder="標題" :value="form.title" class="formTitle">

                        <input type="date" name="date" :value="form.date" class="formDate">

                        <textarea name="content" cols="30" rows="17" placeholder="內文" :value="form.content"
                            class="formContent"></textarea>
                    </form>

                </div>
            </div>

        </article>
    </transition>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import uuid from "../../../script/uuid.js"

export default {
    data() {
        return {
            title: '新增清單',
        };
    },
    created() {
    },
    computed: {
        ...mapState({
            UI: 'UI',
            form: 'temporaryStorageArticle'
        })
    },
    methods: {
        ...mapMutations(['CHANGE_ADD_ARTICLE_STATE', 'CLOSE_ALL_FUNCTIONS']),
        ...mapActions(['SUBMIT_ARTICLES']),
        formSubmit: function (e) {
            const id = uuid();                  //生成id
            const title = e.target.title.value;
            const content = e.target.content.value;
            const date = e.target.date.value;
            const setDate = this.setDate();

            if (!title || !date || !content) {
                alert('標題、內文或日期不能為空!')
                return;
            }
            const checkDate = this.checkDate(date)
            if (!checkDate) return;        //檢查日期是否為過去

            const box = {
                id: id,                         //id
                title: title,                   //標題
                content: content,               //內容

                date: date,                     //結束日期
                setDate: setDate,               //設定日期

                state: false,                   // 預設false
                stateImg: 'images/close.png',  // 預設待辦
            }

            // !將文章推入主資料
            // this.axiosSubmit('POST', 'addArticle', box);
            this.SUBMIT_ARTICLES({
                method: 'POST',
                func: 'addArticle',
                data: box
            }).then((e) => {
                //檢查 如果回傳 true 成功; 回傳 false 失敗
                console.log(e);
            })

        },

        checkDate: function (e) {               //確認時間是否為未來
            const todayDate = new Date();       //取得系統時間
            const dateData = {                  //拆開文章設定時間
                y: parseInt(e.slice(0, 4)),
                m: parseInt(e.slice(5, 7)),
                d: parseInt(e.slice(8)),
            };

            // 檢查年份是否為過去
            if (dateData.y < todayDate.getFullYear()) {
                alert('日期不能是過去');
                return false;
            }

            // 檢查輸入日期是否是過去
            if (dateData.m < todayDate.getMonth() + 1) {
                alert('日期不能是過去');
                return false;
            } else if (dateData.m === todayDate.getMonth() + 1) {
                if (dateData.d < todayDate.getDate()) {
                    alert('日期不能是過去');
                    return false;
                }
            }

            return true
        },
        setDate: function (e) {                 //處裡設定當下的時間
            const setDate = new Date()
            const year = String(setDate.getFullYear())
            let month = String(setDate.getMonth() + 1)
            let day = String(setDate.getDate())


            if (month.length === 1) {
                month = `0${month}`;
            }
            if (day.length === 1) {
                day = `0${day}`;
            }

            return `${year}-${month}-${day}`;
        }
    }
}
</script>
<style scoped>
#addArticle {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: #0C4553;
    z-index: 9;
}

.topNav {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 4rem;
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    background: #126376;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

}

.buttons {
    margin: 0 1rem;
    width: 45px;
    height: 45px;
    background: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 100%;
    transition: 0.1s;
}

.buttons:active {
    background: rgba(255, 255, 255, 0.274);
}

.check {
    width: 50px;
    height: 50px;
}

.buttons img {
    width: 100%;
    height: 100%;
}

.content {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
    width: 100vw;
    height: calc(100vh - 4rem);
    /* word-break: break-all; */


}

.article {
    margin: 1rem 0;
    padding: 0 2rem;
    width: 350px;
    font-size: 1.2em;
    box-sizing: border-box;
    color: #fff;

    overflow: hidden;

}

#articleForm {
    display: flex;
    flex-direction: column;
    height: 100%;
}

#articleForm .formTitle,
#articleForm .formDate,
#articleForm .formContent {
    width: 100%;
    color: #fff;
    background: #126376;
    border: 1px solid #00FFF0;
    border-radius: 5px;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

#articleForm .formTitle::placeholder,
#articleForm .formDate,
#articleForm .formContent::placeholder {
    color: rgb(206, 206, 206);
}

#articleForm .formTitle {
    margin-bottom: 0.8rem;
    padding: 0.5rem;
    width: 100%;
    height: 35px;
}

#articleForm .formDate {
    margin: 0 auto;
    margin-bottom: 0.8rem;
    padding: 0 1rem;
    width: 10.5rem;
}

#articleForm .formContent {
    padding: 0.5rem;
    width: 100%;
    height: 100%;

}



@media (min-width:1024px) {

    #addButton {
        left: 5.5rem;
        bottom: 1.5rem;

        width: 12rem;
        height: 3rem;

        border-radius: 30px;
    }

    .article {
        width: 500px;
    }
}

@media (min-width:1440px) {
    .topNav {
        height: 4rem;
        font-size: 2rem;
    }

    .buttons {
        margin: 0 1rem;
        width: 45px;
        height: 45px;
        background: rgba(0, 0, 0, 0);
        border: none;
        border-radius: 100%;
        transition: 0.1s;
    }

    .check {
        width: 55px;
        height: 55px;
    }

    .content {
        display: flex;
        justify-content: center;
        margin-top: 4.5rem;
        width: 100vw;
        height: calc(100vh - 4.5rem);
    }

    .article {
        width: 45rem;
    }

    #articleForm .formTitle,
    #articleForm .formDate,
    #articleForm .formContent {
        font-size: 1.5rem;
    }

    #articleForm .formTitle {

        height: 2.5rem;
    }

    #articleForm .formDate {
        margin: 0 auto;
        margin-bottom: 0.8rem;
        padding: 0 1rem;
        width: 12rem;
    }

}
</style>
