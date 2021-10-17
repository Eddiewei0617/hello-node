const axios = require("axios");
// moment套件使用，為了讓每天時間都會自動更新
const moment = require("moment");
const fs = require("fs/promises");

// let format = "json";
// // let date = "20211017";
// // 將日期使用以上moment套件，就可以抓到每天某某股票的變化了
// let date = moment().format("YYYYMMDD");
// // console.log(date);
// let stockCode = "2330";

async function crawlerAwait() {
  let format = "json";
  let date = moment().format("YYYYMMDD");
  // let stockCode = "2330";
  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    console.log("stockCode", stockCode);
    // 如果想呈現多個，可用split再跑for迴圈

    let res = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY?",
      {
        params: {
          response: format,
          date: date,
          stockNo: stockCode,
        },
      }
    );
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}
crawlerAwait();
