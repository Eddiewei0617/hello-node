// express 是 nodejs 的框架
const express = require("express");
const path = require("path");
require("dotenv").config();

let app = express(); // application

// cors
const cors = require("cors");
const { API_URL } = require("../todos-fe/src/configs/config");
// let corsOptions = {
//   origin: "*", // 全部
// };
app.use(cors());

// 要拿到前端註冊時的物件資料，需使用中間件，才可以讀到body的資料
app.use(express.urlencoded({ extended: true }));
// 使用此中間件才能解析的到json格式
app.use(express.json());

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
app.get("/", (req, res) => {
  // res.send("我是Express首頁");
  // 告訴 express 這個路由要用的樣板檔案是哪一個
  let data = {
    name: "ashley",
    job: "engineer",
    cities: ["Taipei", "YiLan"],
  };
  res.render("index", data);
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

app.get("/api/test", (req, res) => {
  res.json({
    name: "ashley",
    job: "engineer",
  });
});

//-----------------------------------------------

// 原本這裡有 /api/todos 的相關路由
// 為了做router分流，產生一個中間件以做串接，比對"/api/todos"後進入".routers/todos"檔案繼續去比對
let todosRouter = require("./routers/todos");
app.use("/api/todos", todosRouter);

let authRouter = require("./routers/auth");
app.use("/api/auth", authRouter);

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
  // connection.connect();
  console.log("express app 啟動了喔");
});
