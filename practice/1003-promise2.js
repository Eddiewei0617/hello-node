// 需要設定非同步事件時可以使用promise，而大致上的流程如下 :
// 先設定一個叫做dowork(可換)的function函式(裡面須包含要做的事、持續多久、是否成功true or false)
// -> 接著在函式裡設定好回傳promise物件的executor function(內含resolve和reject兩個引數)
// -> 接著設定多久後執行的timeout並判斷成功失敗與否
// 如此一來以上就設定好一旦呼叫dowork後會發生的事了

// 開始工作

// 呼叫dowork函式 -> 帶入要做的事、持續多久、是否成功true or false的參數
// -> 接著使用promise特有的then來執行成功或失敗的結果
// -> 如果成功，我們就假設一個參數叫做data以連結上方的resolve內容，並且印出
// -> 接著告訴程式要return回傳下一件要做的事然後用.then串接
// -> 做完所有事後，最後使用catch來偵測出前面有的錯誤並印出 (catch會捕捉被否決的promise，因此上面不管哪裡出現錯誤，catch總能抓到)

let dowork = function(job, timer, isOK){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let dt = new Date();
            if(isOK){
                resolve(`完成工作 ${job} at ${dt.toISOString()}`);
            }else{
                reject("失敗了啦!");
            }            
        }, timer)
    })
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

dowork("泡咖啡", 2000, true)
.then((data)=>{
    console.log("fulfilled" + data); //出來泡咖啡
    return dowork("寫作業", 2000, true);
})
.then((data)=>{
    console.log("fulfilled" + data); //出來寫作業
    return dowork("洗衣服", 2000, true);
})
.then((data)=>{
    console.log("fulfilled" + data); //出來洗衣服
})
.catch((err)=>{         //catch 會捕捉被否決的promise，因此上面不管哪裡出現錯誤，catch總能抓到
    console.error("rejected" + err);
})