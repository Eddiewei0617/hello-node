// express 是 nodejs 的框架
const express = require("express");

let app = express(); // application

// 路由 router / route
// app.Method(Path, Handler)
// Method: GET, POST, PUT, DELETE, PATCH,...
// Handler 是一個函式，會有兩個參數 request, response
app.get("/", (req, res) => {
  res.send("我是Express首頁");
});

app.get("/member", (req, res) => {
  res.send("來到了會員頁");
});

app.get("/product", (req, res) => {
  res.send("來到了商品頁");
});

app.get("/cart", (req, res) => {
  res.send("來到了購物車");
});

// 3001 port
app.listen(3001, () => {
  console.log("express app 啟動了喔");
});
