import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'


import index from './index.vue'

const url = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-EC139BA3-6665-4AEE-9A2E-D3B8D1DF96DB&format=JSON'


/**
 * wx 天氣現象
 * !maxt 最高溫度
 * !mint 最高溫度
 * !ci 舒適度
 * pop 降雨機率
 */




const store = createStore({
    state() {
        return {
            weatherDataIsFetching: false,
            weatherData: [],
            time: []
        }
    },
    getters: {
        //處理取得的原始資料
        TIDY_UP_WEATHER_DATA(state) {
            //主資料
            const tidyUpData = state.weatherData.map((data) => {
                //取得資料中對應的天氣因素
                const wxData = data.weatherElement.find(e => { if (e.elementName === 'Wx') return e });         //天氣現象
                const PoPData = data.weatherElement.find(e => { if (e.elementName === 'PoP') return e });       //降雨機率
                const CIData = data.weatherElement.find(e => { if (e.elementName === 'CI') return e });         //舒適度
                const MinTData = data.weatherElement.find(e => { if (e.elementName === 'MinT') return e });     //最低溫度
                const MaxTData = data.weatherElement.find(e => { if (e.elementName === 'MaxT') return e });     //最高溫度

                //處理天氣現象時間參數
                function parseWx(event) {
                    const boxs = {
                        time0: {
                            name: event.time[0].parameter.parameterName,
                            value: event.time[0].parameter.parameterValue
                        },
                        time1: {
                            name: event.time[1].parameter.parameterName,
                            value: event.time[1].parameter.parameterValue
                        },
                        time2: {
                            name: event.time[2].parameter.parameterName,
                            value: event.time[2].parameter.parameterValue
                        }
                    }
                    return boxs;
                }
                // 降雨機率、最高溫、最低溫
                function parsePopMintMaxt(event) {

                    const boxs = {

                        time0: {
                            name: event.time[0].parameter.parameterName,
                            value: event.time[0].parameter.parameterUnit === 'C' ? 'C' : '%'
                        },
                        time1: {
                            name: event.time[1].parameter.parameterName,
                            value: event.time[1].parameter.parameterUnit === 'C' ? 'C' : '%'
                        },
                        time2: {
                            name: event.time[2].parameter.parameterName,
                            value: event.time[2].parameter.parameterUnit === 'C' ? 'C' : '%'
                        }

                    }

                    return boxs;
                }
                // 舒適度
                function parseCI(event) {
                    const boxs = {
                        time0: {
                            name: event.time[0].parameter.parameterName,
                        },
                        time1: {
                            name: event.time[1].parameter.parameterName,
                        },
                        time2: {
                            name: event.time[2].parameter.parameterName,
                        }
                    }
                    return boxs;
                }

                const wxDataTime = parseWx(wxData);
                const PoPDataTime = parsePopMintMaxt(PoPData);
                const MinTDataTime = parsePopMintMaxt(MinTData);
                const MaxTDataTime = parsePopMintMaxt(MaxTData);
                const CIDataTime = parseCI(CIData);

                //包裝
                const box = {
                    cityName: data.locationName,                    //城市名稱                                
                    wx: wxDataTime,                                 //天氣現象
                    pop: PoPDataTime,
                    minT: MinTDataTime,
                    maxT: MaxTDataTime,
                    ci: CIDataTime,
                }
                return box;

            })
            //時間
            const times = state.time.map(e => {
                return {
                    start: e.startTime,
                    end: e.endTime,
                }
            })
            //組合 主資料/時間
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
        },
        CHANGE_WEATHER_PAGE_STATE(state, payload) {
            state.weatherDataIsFetching = payload;
        }

    },
    actions: {
        async GET_WEATHER_API_DATA(context) {

            context.commit('CHANGE_WEATHER_PAGE_STATE', false);
            await axios.get(url)
                .then((event) => {
                    return event.data.records.location
                }).then((event) => {
                    context.commit('SET_WEATHER_MAIN_DATA', event);
                    //渲染天氣預報頁面
                    context.commit('CHANGE_WEATHER_PAGE_STATE', true);
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

router.beforeEach(async (to, form) => {
    console.log(to);
    let data = store.getters.TIDY_UP_WEATHER_DATA;

    // console.log(data.time.length);
    if (data.time.length === 0 || data.data.length === 0) {
        await store.dispatch('GET_WEATHER_API_DATA');
        data = store.getters.TIDY_UP_WEATHER_DATA;
        console.log(data);
    }


    // if (to.path === '/weatherPage') {

    // }


})

const vm = createApp(index);

vm.use(store);
vm.use(router);

vm.mount('#app')



