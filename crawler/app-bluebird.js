const axios = require("axios");
// moment套件使用，為了讓每天時間都會自動更新
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql");
require("dotenv").config();
const Promise = require("bluebird");

const connection = mysql.createConnection({
  // 上面引用了第三方套件dotenv是可以避免資料庫密碼在上傳時被駭，使用的語法是: process.env.XXXX
  host: process.env.DB_HOST,
  //port:"3306"     //mysql預設埠號通常是3306
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);

// bluebird 保留原本的函示
// connection.connect();
// 這是bluebird提供的，promise版的connect函式
connection.connectAsync();

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
          resolve(results);
        }
      }
    );
  });
}

// 以await的方式確實插入資料庫
async function crawlerAwait() {
  let format = "json";
  let date = moment().format("YYYYMMDD hh:mm:ss");
  console.log(date);
  // let stockCode = "2330";
  try {
    // 抓檔案裡的股票代號
    // let stockCode = await fs.readFile("stock.txt", "utf-8");
    // console.log("stockCode", stockCode);

    // 如果想呈現多個，可用split再跑for迴圈，split會把字串切成陣列，如下:
    let stockCode = await (await fs.readFile("stock.txt", "utf-8")).split(",");
    for (let i = 0; i < stockCode.length; i++) {
      //   console.log(stockCode.length);
      console.log(stockCode[i]);
      // 抓爬蟲
      let res = await axios.get(
        "https://www.twse.com.tw/exchangeReport/STOCK_DAY?",
        {
          params: {
            response: format,
            date: date,
            stockNo: stockCode[i],
          },
        }
      );
      // console.log(res.data);
      let firstItem = res.data.data[0];
      // console.log(firstItem);

      let result = await connection.queryAsync(
        "INSERT IGNORE INTO stock (stock_no, date, share_amount, deal_price, transaction_number) VALUES (?,?,?,?,?);",
        stockCode[i],
        firstItem[0],
        firstItem[1],
        firstItem[2],
        firstItem[8]
      );
      console.log("bluebird promise", result);
    }
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }

  crawlerAwait();
}
