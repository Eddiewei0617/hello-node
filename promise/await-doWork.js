// Promise 是一個表示非同步運算的最終完成或失敗的"""物件"""
// 物件
// 最終成功
// 最終失敗
// 最終: 非同步完成的時候


let doWork = function (job, timer, isOK) {
    // 物件 new Promise(...) --> 建立一個 Promise 物件
    // 建構式(Promise) 必須要傳一個一個函式 executer 執行者
    // executor(處理成功 resolve, 處理失敗 reject)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let dt = new Date();
        // 如果會失敗， reject("錯誤的訊息")  pending ==> rejected
        // reject("故意失敗了");
  
        // 成功的 pending ==> resolved / fulfilled
        // resolve(`完成工作 ${job} at ${dt.toISOString()}`);
  
        if (isOK) {
          resolve(`完成工作 ${job} at ${dt.toISOString()}`);
        } else {
          reject("故意失敗了");
        }
      }, timer);
    });
  };
  
  // async await版
  async function allJobs(){
      let data1 = await doWork("刷牙", 3000, true);
      console.log("data1", data1);

      let data2 = await doWork("吃早餐", 5000, true);
      console.log("data2", data2);

      let data3 = await doWork("寫功課", 3000, true);
      console.log("data3", data3);
  }

  console.log("before");
  allJobs()
  console.log("after");

//   doWork("刷牙", 3000, true)
//     .then((data) => {
//       // fulfilled 時執行 <---> resolve
//       console.log("fulfilled", data);
//       // 如果傳入 then 的 handler 函式回傳一個 promise，一個等價的 Promise 將被展現給方法串接中的下一個 then 。
//       return doWork("吃早餐", 5000, true); // doWork 會回傳一個 new Promise
//     })
//     // eatPromise.then
//     .then((data) => {
//       console.log("fulfilled", data);
//       return doWork("寫功課", 3000, true);
//     })
//     // homeworkPromise.then
//     .then((data) => {
//       console.log("fulfilled", data);
//     })
//     .catch((err) => {
//       // 攔截前面的 then 第二個參數要做的那個錯誤處理函式
//       console.error("rejected", err);
//     });