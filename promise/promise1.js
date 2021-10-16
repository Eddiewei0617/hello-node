// Promise 是一個表示非同步運算的最終完成或失敗的物件
// 物件
// 最終成功
// 最終失敗
// 最終: 非同步完成的時候

let doWork = function (job, timer) {
    // 物件 new Promise(...) --> 建立一個 Promise 物件
    // 建構式(Promise) 必須要傳一個一個函式 executer 執行者
    // executor(處理成功 resolve, 處理失敗 reject) --> executor是一個函式
    // new <any>(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void) => Promise<any>
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let dt = new Date();
        // 如果會失敗， reject("錯誤的訊息")  pending ==> rejected
        // reject("故意失敗了");
  
        // 成功的 pending ==> resolved / fulfilled
        resolve(`完成工作 ${job} at ${dt.toISOString()}`);
      }, timer);
    });
  };
  
  let dt = new Date();
  console.log(`開始工作 at ${dt.toISOString()}`);
  
  // 刷牙(3000) --> 吃早餐(5000) --> 寫功課(3000)
  let brushPromise = doWork("刷牙", 3000);
  console.log("brushPromise: ", brushPromise);
  // Promise { <pending> }
  // brushPromise 是一個 Promise 物件，而且他的狀態是在 pending
  // fulfilled (resolved) ==> 成功
  // rejected             ==> 失敗
  // *狀態只能改變一次*
  
  // then 然後做什麼事 （狀態改變之後）
  //.then裡面包含兩個函式，第一個式如果成功fulfilled，第二個則是失敗rejected
  // brushPromise.then(fn1, fn2);
  brushPromise
    .then(
      (data) => {
        // fulfilled 時執行 <---> resolve
        // data可以自己假設，但是在這個位置填寫，程式會偵測到上面所設置的resolve的內容 
        console.log("fulfilled", data);
        let eatPromise = doWork("吃早餐", 5000); // doWork 會回傳一個 new Promise
        return eatPromise; // 在這裡回傳一個 promise
        // brushPromise.then(fn1, fn2) 的回傳結果是這一個 eatPromise
      },
      (err) => {
        // rejected 時執行 <---> reject
        console.error("rejected", err);
      }
    )
    // eatPromise.then
    .then(
      (data) => {
        console.log("fulfilled", data);
        let homeworkPromise = doWork("寫功課", 3000);
        return homeworkPromise;
      },
      (err) => {
        console.error("rejected", err);
      }
    )
    .then(
      (data) => {
        console.log("fulfilled", data);
      },
      (err) => {
        console.error("rejected", err);
      }
    );
  
  // promise chain