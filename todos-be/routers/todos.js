const express = Require("express");
const router = express.Router();
// 子站的感覺

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

module.exports = router;
