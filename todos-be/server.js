// express 是 nodejs 的框架
const express = require("express");
const path = require("path");
require("dotenv").config();
const mysql = require("mysql");
const Promise = require("bluebird");
let app = express(); // application

// cors
const cors = require("cors");
// let corsOptions = {
//   origin: "*", // 全部
// };
app.use(cors());

let connection = mysql.createConnection({
  host: process.env.DB_HOST, // 本機 127.0.0.1
  port: process.env.DB_PORT, // 埠號 mysql 預設就是 3306
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);

// app.use 告訴 express 這裡有一個中間件(middleware)
// middleware 只是一個函式，會有三個參數
app.use((req, res, next) => {
  console.log("我是 AAAA 中間件");
  // 如果沒有 next，那就停在這裡
  next();
  // next 可以讓他往下一關前進
  // 但是目前這個中間件「不需要」知道下一個是誰
});

app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人來訪問 at ${current.toISOString()}`);
  // 完全不關心 next 是誰
  // 只知道要給下一個
  next();
  // 低耦合
});

// 路由 router / route --> 其實也算是一種中間件
// app.Method(Path, Handler)
// Method: GET, POST, PUT, DELETE, PATCH,...
// Handler 是一個函式，會有兩個參數 request, response

// 假如同時進到 /member 網址頁面，沒有next()的話，就不會進到"我是會員頁 2"這一part
app.get("/member", (req, res, next) => {
  console.log("來到了會員頁-1");
  //   next();
});
app.get("/member", (req, res) => {
  console.log("我是會員頁 2");
  res.send("我是會員頁2");
});

app.get("/product", (req, res) => {
  res.send("來到了商品頁");
});

app.get("/cart", (req, res) => {
  res.send("來到了購物車");
});

app.get("/api/test", (req, res) => {
  res.json({
    name: "ashley",
    job: "engineer",
  });
});

//-----------------------------------------------
// 準備取得todos的API
// 列表：全部資料
app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data); // 以json格式取得資料庫的資料內容
});

// /api/todos/24 。 24是指id:24的商品
// 根據 id 取得單筆資料
app.get("/api/todos/:todoId", async (req, res) => {
  // req.params.todoId --> req裡面的params功能會顯示出todoId的物件，我們再把它取出即可
  let data = await connection.queryAsync("SELECT * FROM todos WHERE id=?;", [
    req.params.todoId,
  ]); // 這裡的用法是指說:要找id=多少的呢? 就是後面[]裡的數字，有點像是之前php抓資料庫打 $sql= "4,5,6"

  // 以下表示: 只要有取到此商品(物件陣列)，那就顯示此商品的物件資訊；不然的話，回傳null或"NOT FOUND"
  if (data.length > 0) {
    res.json(data[0]); // 會回覆一個物件，而且是那"一"個商品的資料
  } else {
    // res.send(null)
    res.status(404).send("NOT FOUND");
    // 回傳錯誤的這兩種寫法都可以，端看團隊怎麼統一
  }
});

//--------------------------------------------

// 職責切割 :
// 這個中間件是負責做紀錄
app.use((req, res, next) => {
  console.log(`${req.url} 找不到路由`);
  next();
});
// 既然會走到所有路由後面的這個中間件
// 就表示前面所有路由中間件的 path 都比不到
// --> 404 !!
app.use((req, res, next) => {
  console.log("我是路由後面的錯誤中間件");
  res.status(404).send("NOT Found");
});

// 3001 port
app.listen(3001, () => {
  connection.connect();
  console.log("express app 啟動了喔");
});
