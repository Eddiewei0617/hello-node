const request = require("request"); // 請求進入他人網站
const cheerio = require("cheerio");
const axios = require("axios");
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
connection = Promise.promisifyAll(connection);
connection.connectAsync();

async function burtons() {
  return request(
    {
      url: "https://www.evo.com/shop/snowboard/snowboards/nitro",
      method: "GET",
    },
    (error, res, body) => {
      if (error || !body) {
        console.error(error);
      } else {
        console.log("準備來抓雪板囉");
      }
      const data = [];
      const $ = cheerio.load(body);
      const list = $(
        ".results-products .results-product-thumbs .product-thumb"
      );
      //   console.log("length", list.length);

      for (let i = 0; i < list.length; i++) {
        const name = list
          .eq(i)
          .find(".product-thumb-details a .product-thumb-title")
          .text();
        const price = list
          .eq(i)
          .find(".product-thumb-details a .product-thumb-price span")
          .text();
        const image = list
          .eq(i)
          .find(".product-thumb-details a .product-thumb-image-wrapper img")
          .attr("src");
        data.push({ image, name, price });
        //   console.log(data);

        try {
          let result = await connection.queryAsync(
            "INSERT IGNORE INTO snowboard (name, price, image) VALUES (?,?,?)",
            data[i].name,
            data[i].price,
            data[i].image
          );
          console.log("insert", result);
        } catch (e) {
          console.error(e);
        }
      }
    }
  );
}
burtons();
