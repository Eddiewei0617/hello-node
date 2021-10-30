let doWork = function (job) {
  // 物件 new Promise(...) --> 建立一個 Promise 物件
  // 建構式(Promise) 必須要傳一個一個函式 executer 執行者
  // executor(處理成功 resolve, 處理失敗 reject)
  let seconds = Math.random() * 1000;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      // 如果會失敗， reject("錯誤的訊息")  pending ==> rejected
      // reject("故意失敗了");

      // 成功的 pending ==> resolved / fulfilled
      resolve(`完成工作 ${job} at ${dt.toISOString()}`);
    }, seconds);
  });
};

let job1 = doWork("第1個");
let job2 = doWork("第2個");
let job3 = doWork("第3個");
Promise.all([job1, job2, job3])
  .then((result) => {
    console.log("result", result);
    // 第四件事
  })
  .catch((err) => {
    console.error(err);
  });
