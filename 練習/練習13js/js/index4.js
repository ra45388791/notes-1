/**
 * 在 // number 1 註釋下面是一些字符串，每個字符串
 * 包含一個產品名稱和一個冒號分隔的價格。我們希望您
 * 將其轉換為一個數組，並將其存儲在名為 products 的數組中。

    與 // number 2 註釋同一行的是 for 循環的開頭。在這
行中，我們目前有 i <= 0，這是一個條件測試，導致 for循環
立即停止，因為它說“當 i 不再小於或等於0”時停止，
而 i 從0開始。我們希望您使用條件測試來替換它，
當 i 不再小於 products 數組的長度時，該條件測試會停止循環。

    就在 // number 3 註釋的下方，我們希望您編寫一行代碼
，將當前數組項目（名稱：價格）分成兩個獨立的項目，
一個只包含該名稱，一個只包含該價格。如果您不確定如何執行此操作
，請參閱有用的字符串方法文章以獲得一些幫助，
甚至更好的看看本文中的轉換字符串和數組部分。

    作為上述代碼行的一部分，您還需要將價格從字符串轉換為數字。
如果你不記得如何做，請查看第一個字符串文章。

    有一個名為 total 的變量被創建，並在代碼的頂部賦值為 0。
在循環內（在 // number 4 註釋下面），我們希望您添加一行，
將當前項目價格添加到循環中的迭代變量，
以便在代碼結尾處將正確的總數打印到發票上。
您可能需要一個賦值運算符來執行此操作。

    我們希望您改變 // number 5 註釋的行，
以便使  itemText 變量等於“當前項目名稱 - $ 當前項目價格”，
例如“Shoes - $ 23.99”，以此將每個項目的正確信息都印在發票上。
這只是簡單的字符串連接，您應該對此很熟悉。

 */

//以下 MDN array作業1  印出產品名和金額
/**

let total = 0;
// list.innerHTML = '';
// totalBox.textContent = '';
// number 1
let products = ['Underpants:6.99', 'Socks:5.99', 'T-shirt:14.99', 'Trousers:31.99', 'Shoes:23.99',];

for (let i = 0; i < products.length; i++) { // number 2
    let asd = products[i].indexOf(':');

    let Name  = (products[i].slice(0,asd));
    let muny = (Number( products[i].slice(asd+1)));

    total = muny[i];

    let itemText = `${Name} - $ ${muny}`;



    let listItem = document.createElement('li');
    listItem.textContent = itemText;
    list.appendChild(listItem);
}

totalBox.textContent = 'Total: $' + total.toFixed(2);

*/


//以上 MDN array作業1



// MDN array 作業2
/**


var list = document.querySelector('.output ul');
var searchInput = document.querySelector('.output input');
var searchBtn = document.querySelector('.output button');

list.innerHTML = '';

var myHistory = [];


console.log(myHistory);
searchBtn.onclick = function () {
    // 如果搜索框不为空，我们则将搜索词添加到开头
    if (searchInput.value !== '') {
        // number 1

        myHistory.push(searchInput.value);



        // 清空显示的搜索关键词列表，防止显示
        // 每次输入搜索词都会重新生成显示的内容
        list.innerHTML = '';

        // 通过循环遍历，显示所有的搜索关键词
        for (var i = 0; i < myHistory.length; i++) {
            var itemText = myHistory[i];
            var listItem = document.createElement('li');
            listItem.textContent = itemText;
            list.appendChild(listItem);
        }

        // 如果数组的长度大于 5，那么便移除旧的搜索关键词
        if (myHistory.length >= 5) {
            // number 2
            myHistory.shift();

        }

        // 清空并聚焦到搜索框，准备下一次的搜索
        searchInput.value = '';
        searchInput.focus();
    }
}

*/
