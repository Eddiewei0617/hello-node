// express 是 nodejs 的框架
const express = require("express");
require("dotenv").config();
const mysql = require("mysql");
const Promise = require("bluebird");

let connection = mysql.createConnection({
  host: process.env.DB_HOST, // 本機 127.0.0.1
  port: process.env.DB_PORT, // 埠號 mysql 預設就是 3306
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

// 利用 bluebird 把 connection 的函式都變成 promise
connection = Promise.promisifyAll(connection);

let app = express(); // application

// 準備取得todos的API
app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

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

// app.use(PATH, express.static(檔案夾))
// express.static("檔案資料夾名稱")是內建的中間件
app.use("/static", express.static("static"));
// http://localhost:3001/static/about.html  --> 直接打那個資料夾裡面的檔名就好

// 路由 router / route --> 其實也算是一種中間件
// app.Method(Path, Handler)
// Method: GET, POST, PUT, DELETE, PATCH,...
// Handler 是一個函式，會有兩個參數 request, response
app.get("/", (req, res) => {
  res.send("我是Express首頁");
});

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
