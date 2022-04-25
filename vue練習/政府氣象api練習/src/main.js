import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'


import index from './index.vue'

const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-EC139BA3-6665-4AEE-9A2E-D3B8D1DF96DB&format=JSON'





const store = createStore({
    state() {
        return {
            weatherData: [],
            time: []
        }
    },
    getters: {
        //處理取得的原始資料
        TIDY_UP_WEATHER_DATA(state) {
            const tidyUpData = state.weatherData.map((data) => {
                //取得資料中對應的天氣因素
                const wxData = data.weatherElement.find(e => { if (e.elementName === 'Wx') return e });         //天氣現象
                const PoPData = data.weatherElement.find(e => { if (e.elementName === 'PoP') return e });       //降雨機率
                const CIData = data.weatherElement.find(e => { if (e.elementName === 'CI') return e });         //舒適度
                const MinTData = data.weatherElement.find(e => { if (e.elementName === 'MinT') return e });     //最低溫度
                const MaxTData = data.weatherElement.find(e => { if (e.elementName === 'MaxT') return e });     //最高溫度

                //處理天氣現象時間參數
                function parseWx(event) {
                    const boxs = event.time.map(e => {
                        const box = {
                            name: e.parameter.parameterName,        //因子名稱
                            value: e.parameter.parameterValue       //因子代表值
                        }
                        return box;
                    })
                    return boxs;
                }
                // 降雨機率、最高溫、最低溫
                function parsePopMintMaxt(event) {
                    const boxs = event.time.map(e => {
                        const box = {
                            name: e.parameter.parameterName,                        //因子名稱
                            value: e.parameter.parameterUnit === 'C' ? 'C' : '%'    //不是度數 就是%數
                        }
                        return box;
                    })
                    return boxs;
                }
                // 舒適度
                function parseCI(event) {
                    const boxs = event.time.map(e => {
                        const box = {
                            name: e.parameter.parameterName,        //因子名稱
                        }
                        return box;
                    })
                    return boxs;
                }

                const wxDataTime = parseWx(wxData);
                const PoPDataTime = parsePopMintMaxt(PoPData);
                const MinTDataTime = parsePopMintMaxt(MinTData);
                const MaxTDataTime = parsePopMintMaxt(MaxTData);
                const CIDataTime = parseCI(CIData);

                // const times = wxData.time.map(time => {
                //     return {
                //         start: time.startTime,
                //         end: time.endTime,
                //     }
                // })


                //包裝
                const box = {
                    cityName: data.locationName,                    //城市名稱                                
                    Wx: wxDataTime,                                 //天氣現象
                    PoP: PoPDataTime,
                    MinT: MinTDataTime,
                    MaxT: MaxTDataTime,
                    CI: CIDataTime,
                }
                return box;

            })

            const times = state.time.map(e => {
                return {
                    start: e.startTime,
                    end: e.endTime,
                }
            })

            return {
                time: times,
                data: tidyUpData
            };
        }
    },
    mutations: {
        SET_WEATHER_MAIN_DATA(state, payload) {
            state.weatherData = payload;

            state.time = payload[0].weatherElement[0].time;


        }

    },
    actions: {
        async GET_WEATHER_API_DATA(context) {
            await axios.get(url)
                .then((event) => {
                    return event.data.records.location
                }).then((event) => {
                    context.commit('SET_WEATHER_MAIN_DATA', event);
                })
                .catch(function (err) {
                    console.log(new Error(err));
                })


        }


    }
})

const routes = [
    {
        path: '/',
        name: 'mainPage',
        component: () => import('./components/mainPage/mainPage.vue')
    },
    {
        path: '/weatherPage',
        name: 'weatherPage',
        component: () => import('./components/weatherPage/weatherPage.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

router.beforeEach(() => {

})

const vm = createApp(index);

vm.use(store);
vm.use(router);

vm.mount('#app')



