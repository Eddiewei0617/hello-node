const axios = require("axios");
// moment套件使用，為了讓每天時間都會自動更新
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  //port:"3306"     //mysql預設埠號通常是3306
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

// connection.query('SELECT * FROM stock', function (error, results) {
//   if (error) {
//   console.error("資料庫錯誤", error);
//   // 通常error是物件，如果用+而不是,會出現[object, Object]看不到是甚麼錯誤
//   }else{
//       console.log(results);
//   }
// });
// connection.end();

async function crawlerAwait() {
  let format = "json";
  let date = moment().format("YYYYMMDD");
  // let stockCode = "2330";
  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    // console.log("stockCode", stockCode);
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
    // console.log(res.data);
    let firstItem = res.data.data[0];
    console.log(firstItem);
    // 0, 1, 2, 8項是我們要的資料
    connection.query(
      //加了IGNORE會讓你在每次insert不同資料時不會出現重複insert的問題
      "INSERT IGNORE INTO stock (stock_no, date, share_amount, deal_price, transaction_number) VALUES (?,?,?,?,?);",
      [stockCode, firstItem[0], firstItem[1], firstItem[2], firstItem[8]],
      (err, results) => {
        if (err) {
          console.error("資料庫錯誤", err);
        } else {
          console.log("db結果", results);
        }
      }
    );
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
}
crawlerAwait();
