var A=Object.defineProperty,P=Object.defineProperties;var R=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var F=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var I=(e,t,i)=>t in e?A(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,d=(e,t)=>{for(var i in t||(t={}))F.call(t,i)&&I(e,i,t[i]);if(f)for(var i of f(t))W.call(t,i)&&I(e,i,t[i]);return e},w=(e,t)=>P(e,R(t));import{m as D,_ as T,o as c,c as h,a as s,f as y,v as x,F as v,g,n as b,h as C,p as V,d as S,t as l,i as U,r as N,b as k,j as B}from"./index.5071863d.js";const H={props:["cityName","times"],emit:["pushData"],data(){return{style:[],show:!1,areaValue:0,cityValue:"",timeValue:0}},watch:{cityValue:function(e){e&&(this.$emit("pushData",{city:e,time:this.timeValue}),this.closeItem(),console.log("\u57CE\u5E02\u89F8\u767C"))},timeValue:function(e){(e||e===0)&&(this.$emit("pushData",{city:this.cityValue,time:e}),this.closeItem(),console.log("\u6642\u9593\u89F8\u767C"))}},mounted(){this.$nextTick(function(){const e=this.parseCityName[this.areaValue].city[0];this.cityValue=e})},computed:w(d({},D(["weatherDataIsFetching"])),{parseCityName(){const e=new RegExp(/(臺北市)|(新北市)|(基隆市)|(新竹市)|(桃園市)|(新竹縣)|(宜蘭縣)/g),t=new RegExp(/(臺中市)|(苗栗縣)|(彰化縣)|(南投縣)|(雲林縣)/g),i=new RegExp(/(高雄市)|(臺南市)|(嘉義市)|(嘉義縣)|(屏東縣)|(澎湖縣)/g),m=new RegExp(/(花蓮縣)|(臺東縣)/g),n=new RegExp(/(金門縣)|(連江縣)/g),o=this.cityName.filter(r=>{if(e.test(r))return r}),a=this.cityName.filter(r=>{if(t.test(r))return r}),p=this.cityName.filter(r=>{if(i.test(r))return r}),E=this.cityName.filter(r=>{if(m.test(r))return r}),$=this.cityName.filter(r=>{if(n.test(r))return r});return[{id:0,area:"\u5317\u90E8",city:o},{id:1,area:"\u4E2D\u90E8",city:a},{id:2,area:"\u5357\u90E8",city:p},{id:3,area:"\u6771\u90E8",city:E},{id:4,area:"\u96E2\u5CF6",city:$}]},parseTimes(){return this.times.map((t,i)=>{const m=t.start.slice(11,13),n=t.end.slice(11,13);let o="",a="";switch(m){case"00":o="\u65E9\u4E0A 0 \u9EDE";break;case"06":o="\u65E9\u4E0A 6 \u9EDE";break;case"18":o="\u665A\u4E0A 6 \u9EDE";break}switch(n){case"00":a="\u65E9\u4E0A 0 \u9EDE";break;case"06":a="\u65E9\u4E0A 6 \u9EDE";break;case"18":a="\u665A\u4E0A 6 \u9EDE";break}return{id:i,time:`${o} ~ ${a}`}})},changeCity(){return this.parseCityName[this.areaValue].city.map((t,i)=>({id:i,city:t}))}}),methods:{changItemState(){this.show=!this.show},closeItem(){this.show=!1},openItem(){const e=this;setTimeout(()=>{e.show=!0},300)}}},u=e=>(V("data-v-89c13f44"),e=e(),S(),e),Y={class:"optionsBox"},M={for:"area"},j=u(()=>s("h3",null," - \u8ACB\u9078\u64C7\u5730\u5340 - ",-1)),z=["value"],O={for:"city"},G=u(()=>s("h3",null," - \u8ACB\u9078\u64C7\u7E23\u5E02 - ",-1)),L=["value"],q={for:"time"},J=u(()=>s("h3",null," - \u8ACB\u9078\u64C7\u6642\u9593\u6BB5 - ",-1)),K=["value"],Q=u(()=>s("h3",null,"\u9078\u64C7\u7E23\u5E02",-1)),X=u(()=>s("div",{class:"showControllerButton"},null,-1)),Z=[X];function tt(e,t,i,m,n,o){return e.weatherDataIsFetching?(c(),h("div",{key:0,class:b(["options",n.show?"itemShowState":"itemCloseState"])},[s("div",Y,[s("label",M,[j,y(s("select",{"onUpdate:modelValue":t[0]||(t[0]=a=>n.areaValue=a),name:"area",id:"area"},[(c(!0),h(v,null,g(o.parseCityName,a=>(c(),h("option",{value:a.id,key:a.id},l(a.area),9,z))),128))],512),[[x,n.areaValue]])]),s("label",O,[G,y(s("select",{"onUpdate:modelValue":t[1]||(t[1]=a=>n.cityValue=a),name:"city",id:"city",onInput:t[2]||(t[2]=(...a)=>e.pushData&&e.pushData(...a))},[(c(!0),h(v,null,g(o.changeCity,a=>(c(),h("option",{key:a.city,value:a.city},l(a.city),9,L))),128))],544),[[x,n.cityValue]])]),s("label",q,[J,y(s("select",{"onUpdate:modelValue":t[3]||(t[3]=a=>n.timeValue=a),name:"time",id:"time",onInput:t[4]||(t[4]=(...a)=>e.pushData&&e.pushData(...a))},[(c(!0),h(v,null,g(o.parseTimes,a=>(c(),h("option",{key:a.id,value:a.id},l(a.time),9,K))),128))],544),[[x,n.timeValue]])])]),s("div",{onMouseup:t[6]||(t[6]=(...a)=>o.changItemState&&o.changItemState(...a)),class:"controllerButton"},[Q,s("button",{onMouseup:t[5]||(t[5]=(...a)=>o.changItemState&&o.changItemState(...a)),class:b(["showBtn",n.show?"buttonShowState":"buttonCloseState"])},Z,34)],32)],2)):C("",!0)}var et=T(H,[["render",tt],["__scopeId","data-v-89c13f44"]]),at="/assets/summer.8c7c35bd.svg",st="/assets/sunny.e3d11859.jpg";const it={props:["ci","maxT","minT","pop","wx","cityName","setTime"],data(){return{}},created(){},mounted(){this.weatherData()},watch:{cityName(e){this.weatherData()}},computed:d({},D(["weatherDataIsFetching"])),methods:{weatherData(){}}},_=e=>(V("data-v-4d7ae116"),e=e(),S(),e),ot={key:0,id:"news"},nt={class:"newsBox"},rt={class:"headerBox"},ct={class:"headerContent"},ht={class:"cityAndIcn"},mt={class:"cityName",style:{color:"#fff"}},lt=_(()=>s("div",{class:"headerIcn"},[s("img",{src:at,alt:""})],-1)),dt={class:"temperature"},ut={class:"lowestTemperature"},_t={class:"lowestCount"},pt=_(()=>s("div",{class:"lowestText"}," \u6700\u4F4E\u6EAB\u5EA6 ",-1)),wt=_(()=>s("div",{style:{"font-size":"4rem"}}," - ",-1)),yt={class:"maximumTemperature"},xt={class:"maximumCount"},vt=_(()=>s("div",{class:"maximumText"}," \u6700\u9AD8\u6EAB\u5EA6 ",-1)),gt=_(()=>s("div",{class:"imgBox"},[s("img",{style:{opacity:"0.5"},src:st,alt:""})],-1));function Dt(e,t,i,m,n,o){return e.weatherDataIsFetching?(c(),h("div",ot,[s("div",nt,[s("div",rt,[s("div",ct,[s("div",ht,[s("div",mt,l(i.cityName),1),lt]),s("div",dt,[s("div",ut,[s("div",_t,l(i.minT.name),1),pt]),wt,s("div",yt,[s("div",xt,l(i.maxT.name),1),vt])])]),gt])])])):C("",!0)}var Tt=T(it,[["render",Dt],["__scopeId","data-v-4d7ae116"]]);const ft={data(){return{weather:{city:"",time:0},weatherData:{wx:"",minT:"",maxT:"",ci:"",pop:""}}},created(){},computed:w(d(d({},D(["weatherDataIsFetching"])),U(["TIDY_UP_WEATHER_DATA"])),{cityNames(){return this.TIDY_UP_WEATHER_DATA.data.map(t=>t.cityName)},times(){return this.TIDY_UP_WEATHER_DATA.time.map(t=>t)},changeTime(){return this.weather.time}}),methods:{showWeatherData(){const e=this,t=e.TIDY_UP_WEATHER_DATA.data.find(i=>i.cityName===e.weather.city);switch(this.weather.time){case 0:this.weatherData.wx=t.wx.time0,this.weatherData.minT=t.minT.time0,this.weatherData.maxT=t.maxT.time0,this.weatherData.ci=t.ci.time0,this.weatherData.pop=t.pop.time0;break;case 1:this.weatherData.wx=t.wx.time1,this.weatherData.minT=t.minT.time1,this.weatherData.maxT=t.maxT.time1,this.weatherData.ci=t.ci.time1,this.weatherData.pop=t.pop.time1;break;case 2:this.weatherData.wx=t.wx.time2,this.weatherData.minT=t.minT.time2,this.weatherData.maxT=t.maxT.time2,this.weatherData.ci=t.ci.time2,this.weatherData.pop=t.pop.time2;break}},getWeatherOption(e){this.weather.city=e.city,this.weather.time=e.time,this.showWeatherData()}},components:{weatherController:et,newsBox:Tt}},It={class:"weatherPageBox"},bt={key:1,class:"loading"};function Nt(e,t,i,m,n,o){const a=N("weatherController"),p=N("newsBox");return e.weatherDataIsFetching?(c(),h("div",B({key:0},e.$attrs,{id:"weatherPage"}),[s("div",It,[k(a,{cityName:o.cityNames,times:o.times,onPushData:o.getWeatherOption},null,8,["cityName","times","onPushData"]),k(p,B(n.weatherData,{cityName:n.weather.city,setTime:o.changeTime}),null,16,["cityName","setTime"])])],16)):(c(),h("div",bt," \u8B80\u53D6\u4E2D "))}var Vt=T(ft,[["render",Nt],["__scopeId","data-v-a90d095c"]]);export{Vt as default};
