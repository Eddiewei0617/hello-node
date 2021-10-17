const axios = require("axios");
// moment套件使用，為了讓每天時間都會自動更新
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  // 上面引用了第三方套件dotenv是可以避免資料庫密碼在上傳時被駭，使用的語法是: process.env.XXXX
  host: process.env.DB_HOST,
  //port:"3306"     //mysql預設埠號通常是3306
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect();

// 用一個function 把要insert的資料用promise包起來
function insertPromise(insertData) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT IGNORE INTO stock (stock_no, date, share_amount, deal_price, transaction_number) VALUES (?,?,?,?,?);",
      insertData,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve("成功引入", results);
        }
      }
    );
  });
}

// 以await的方式確實插入資料庫
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

    let insertData = [
      stockCode,
      firstItem[0],
      firstItem[1],
      firstItem[2],
      firstItem[8],
    ];

    let result = await insertPromise(insertData);
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
}
crawlerAwait();
