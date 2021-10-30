let dowork = function(job, timer){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            let dt = new Date();
            // reject("錯了啦");
            resolve(`完成工作 ${job} at ${dt.toISOString()}`)
        }, timer)
    })
};

let dt = new Date();
  console.log(`開始工作 at ${dt.toISOString()}`);

let showerPromise = dowork("洗澡", 3000);
console.log("showerPromise: ", showerPromise);

//.then裡面包含兩個函式，第一個式如果成功fulfilled，第二個則是失敗rejected
showerPromise.then(
    (data) => {
        console.log("fulfilled", data);
        let gamePromise = dowork("看比賽", 3000);
        return gamePromise;
    },
    (err) => {
        console.log("rejected", err);
    }
)
//執行上面預先準備的 gamePromise
.then(
    (data) => {
        console.log("fulfilled", data);
        let sleepPromise = dowork("睡覺", 2000);
        return sleepPromise;
    },
    (err) => {
        console.log("rejected", err);
    }
)
//執行上面預先準備的 sleepPromise
.then(
    (data) => {
        console.log("fulfilled", data);
    },
    (err) => {
        console.log("rejected", err);
    }
)