/**
 * 模擬唯一id碼生成
 */

const uuid = function () {
    let time = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        time += performance.now();
    }

    // 回傳經過替換的 x 。 y要經過特殊處裡
    // x代表要被替換的每個字元
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) {
            time = Math.floor(time / 16);
            const random = (time + Math.random() * 16) % 16 | 0;

            // 如果處裡的字串是x 回傳 random 。
            // 如果是 y 回傳16位元數 0x3 or 0x8 相當於 3 or 8
            return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
        });
}

export default uuid