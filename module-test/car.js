// 預設其實有一個隱藏的句子，讓這兩個指向同一個記憶體
// module.exports = exports = {}


let brand = "Ford";
let color = "red";
let price = "100"; //萬
let size = "1000"; //cc數

function getBrand(){
    return brand;
}

function showInfo(){
    console.log(`這台車的顏色是 ${color}、CC數是${size}`);
}


// return module.exports
// 預設其實有一個隱藏的句子，回傳 module.exports

// react中的物件內容是不可以隨便改的，改法是建出一個新的記憶體空間再改裡面的東西

