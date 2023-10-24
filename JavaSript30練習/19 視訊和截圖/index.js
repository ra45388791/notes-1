const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const snap = document.querySelector('.snap');
const strip = document.querySelector('.strip');

//實例化攝影機媒體，建立帶有url的 DOMString 
function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, Audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream)
            video.srcObject = localMediaStream;
            // console.log(video.srcObject)
            video.play();
        })
        .catch(error => {
            console.log(error);
        })
}

function paintToCanvas() {
    //設定canvas大小
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    //刷新視訊畫面，每16毫秒一張
    setInterval(() => {
        //擷取video拍攝到的圖像 "drawImage(image, x, y, width, height)"
        ctx.drawImage(video, 0, 0, width, height);
        //回傳一個imageData對象，用來描述 canvas 內要顯示的像素數據 "getImageData(x,y,width,height)"
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = rgbEffect(pixels)
        //將數據從已有的 imageData 對象繪製到 canvas 上 "putimageData(imageData, x, y)"
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function rgbEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        // pixels.data[i + 0] = pixels.data[i + 0] + 0;
        // pixels.data[i + 1] = pixels.data[i + 1] + 0;
        // pixels.data[i + 2] = pixels.data[i + 2] + 0;
    }
    // console.log(pixels.data);
    return pixels
}

async function takePhoto() {
    //播放聲音
    // snap.currentTime = 0;
    // snap.play();

    //截圖
    const data = canvas.toDataURL("image/jpeg");
    const a = document.createElement('a');
    a.href = data;
    a.setAttribute('download', 'handsome');
    // a.style.width = '200px';
    a.innerHTML = `<img src="${data}" alt="Handsome Man" />`
    strip.insertBefore(a, strip.firstChild)
    console.log(strip.firstChild)
}


getVideo();
//等待攝影機準備完成
video.addEventListener('canplay', paintToCanvas);


