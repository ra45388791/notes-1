let data = {
    vueDomShow: false,
    isTrueOrFalse: '',                       //v-model 選項輸入測試
    message: '---請選擇---',                    //第一行訊息
    message2: '倒轉插值',                   //倒轉插值
    color: '',                              //顏色
    divdom: '<div>這是一個測試圖片的div</div>', //圖片
    a: 1,                                   //watch測試
    seeIf: '',                            //v-if 測試
    vueInput: '',                           //v-model 表單輸入測試

    vueForItems1: [
        { forMessage: 'for1' },
        { forMessage: 'for2' },
        { forMessage: 'for3' }
    ],
    vueForItems2: {
        title: 'for 的 title測試1',
        author: 'for 的 author測試2',
        publishedAt: '2022-01-17'
    },

    vueColorData: '',                           //變色表單 
    vueBgColor: 'background-color: #ffffff;'    //變色區域
}
// 阻止修改現有屬性 指定某個屬性不能被修改
// Object.freeze(data);


let app = new Vue({
    el: '#app',
    data: data,
    test: {
        and: 1324324
    },
    methods: {
        //v-on 選項切換監控
        vueSelect: function () {
            let d = app.$data.isTrueOrFalse;
            if (d === 'true') {
                data.message = d;
                //改變字體顏色
                data.color = 'testRed';
                // 傳進v-html 中的圖片tag
                data.divdom = '<img src="img/17d50c0.jpg" alt="">';

                app.$data.seeIf = true;
            } else if (d === 'false') {
                data.message = d;
                //改變字體顏色
                data.color = 'testBlue';
                // 傳進v-html 中的圖片tag
                data.divdom = '<img src="img/1587963.jpg" alt="">';

                app.$data.seeIf = false;
            } else {
                data.message = '---請選擇---'
                data.color = '';
                data.divdom = '<div>這是一個測試圖片的div</div>';
                app.$data.seeIf = '';
            }
        },
        //v-on 點擊事件監控
        appbtn: function () {
            app.$data.divdom = `<div>${app.$data.vueInput}</div>`;
            app.$data.vueInput = '';
            this.reset();
        },
        //顏色跟著表單一起便色
        vueColorF: function () {
            app.$data.vueBgColor = `background-color: ${app.$data.vueColorData};`;
        },
        reset: function () {
            //取得自訂義屬性值
            // console.log(this.$options.test);
        }
    },
    computed: {
        //寫法1
        reversedMessage() {
            return this.message2.split('').reverse().join('')
        }

        //寫法2
        // reversedMessage: function () {
        //     return this.message2.split('').reverse().join('')
        // }
    },
    watch: {
        //將 watch寫在vue中的方法
        a: function (newValue, oldValue) {
            console.log(`新值: ${newValue}  舊值: ${oldValue}`);
        }
    },



});

//觀察 app.data.message中的值 
//會回傳兩個值 被賦予的新值 和 被取代的舊值
// app.$watch('a', function (newValue, oldValue) {
//     console.log(`新值: ${newValue}  舊值: ${oldValue}`);
// });
app.$data.a = 995;


