if ("geolocation" in navigator) {
    console.log("OK");
} else {
    console.log("error");
}
//一次性拿地理資料
// navigator.geolocation.getCurrentPosition((e) => {
//     console.log(e)
// })

navigator.geolocation.watchPosition((e) => {
    console.log(e)
},
    (e) => {
        console.log(e)
    }
)
