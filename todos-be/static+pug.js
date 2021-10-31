// express 是 nodejs 的框架
const express = require("express");
const path = require("path");
let app = express(); // application

// app.use(PATH, express.static(檔案夾))
// express.static("檔案資料夾名稱")是內建的中間件
app.use("/static", express.static("static"));
// http://localhost:3001/static/about.html  --> 直接打那個資料夾裡面的檔名就好

// app.set 設定這個 application 的一些變數
// views: 告訴 app view 的檔案夾是哪一個
// view engine: 告訴 app 你用哪一種 view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

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

app.get("/api/test", (req, res) => {
  res.json({
    name: "ashley",
    job: "engineer",
  });
});

// 3001 port
app.listen(3001, () => {
  connection.connect();
  console.log("express app 啟動了喔");
});
