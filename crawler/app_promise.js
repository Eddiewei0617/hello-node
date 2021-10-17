//先和剛剛install的檔案axios請求用法
const axios = require("axios")

let format = "json";
let date = "20211017";
let stockCode = "2330";

//寫法一
// axios.get(`https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=${format}&date=${date}&stockNo=${stockCode}`)

//接著參考 https://www.npmjs.com/package/axios#axios-api 網站帶入爬蟲資料
//寫法二
axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?" , {
    params:{
        response: format,
        date: date,
        stockNo: stockCode 
    }
})
.then ((res) => {
    // 會用res是因為如果用平常的data，裡面很多資料中我們要的股票資訊也剛好叫做data物件，所以用個不一樣的變數
    // HTTP response
    console.log(res.data);
})
.catch((e) => {
    console.error(e);
})