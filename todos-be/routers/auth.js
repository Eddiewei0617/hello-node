const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const registerRules = [
  body("email").isEmail().withMessage("Email欄位請正確填寫"),
  body("password").isLength({ min: 6 }).withMessage("密碼長度至少為6位數"),
  // 自訂的檢查確認密碼方式，回傳確認密碼=密碼，但如果value的值不等於註冊的密碼，那就給一個訊息是"密碼不一致"
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("密碼不一致"),
];

// 整個是長這樣 : /api/auth/register
router.post("/register", registerRules, async(req, res) => {
  //   console.log("req.body", req.body);
  //   req.body {
  //   email: 'junnywei15@gmail.com',
  //   name: 'Eddie',
  //   password: '123123',
  //   confirmPassword: '123123',
  //   photo: null
  // }

  //  TODO: 驗證資料
  //  使用 express-validator
  const validateResult = validationResult(req);
  // 通常這個驗證的回傳值是錯誤，意思是，如果有錯誤:validateResult裡就不是空的
  //   console.log(validateResult);  // 回傳錯誤陣列
  if (!validateResult.isEmpty()) {
    // validateResult 不是空的，那表示有欄位沒有通過驗證
    let error = validateResult.array();
    return res.status(400).json({ code: 99, message: error });
  }
  // 表示 validateResult 是空的 ==> 都通過驗證了

  //  TODO: 是否已註冊
  // 比對從前端傳進來的email(req.body.email)，如果我們後端的資料庫裡members資料有此email了，就回傳一個json格式說明錯誤
  try{
    let member = await RTCPeerConnection.queryAsync("SELECT * FROM members WHERE email=?", req.body.email);
    if (member.length>0){
      return res.josn({code:"1101", message:"該email已註冊"})
    }
  }

  //  TODO: 密碼加密

  //  TODO: 建立一筆資料

  res.json({ result: "OKOK" });
});

module.exports = router;
