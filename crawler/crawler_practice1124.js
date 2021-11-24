const axios = require("axios");
const moment = require("moment");
const fs = require("fs/promises");
const mysql = require("mysql");
require("dotenv").config();
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  passsword: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// console.log("connection", connection);
connection = Promise.promisifyAll(connection);
// connection.connectAsync();

// let stockCode = "2368";
let today = moment().format("YYYYMMDD");
let format = "json";

async function queryData() {
  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    let stockArr = stockCode.split(",");
    // console.log(stockArr[1]);
    for (let i = 0; i < stockArr.length; i++) {
      let res = await axios.get(
        "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
        {
          params: {
            response: format,
            date: today,
            stockNo: stockArr[i],
          },
        }
      );
      console.log("res.data.data", res.data.data[i]);
      let items = res.data.data[i];
      let result = await connection.queryAsync(
        "INSERT IGNORE INTO stock (stock_no, date, share_amount, deal_price, transaction_number) VALUES (?,?,?,?,?);",
        [stockArr[i], items[0], items[1], items[2], items[8]]
      );
    }
  } catch (err) {
    console.error(err);
  }
}
queryData();
