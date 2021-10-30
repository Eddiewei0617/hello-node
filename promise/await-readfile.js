const fs = require("fs");
// const {readFile} = require("fs");  => 只取用裡面的readFile

// promise版

    let p = new Promise((resolve, reject) =>{
        fs.readFile("input.txt", "utf-8", (err, data) => {
            // (err, data) => err一定要放前面
            if (err){
                reject(err)
                // console.error("發生錯誤囉", err);
            }else{
                resolve(data)
                // console.log("拿到資料:", data);
            }
        } )
    })

    console.log(p); // pending -> fulfilled / reject


// async/await版
// (()=>{})() 箭頭函式，最後一個()是直接呼叫執行的意思，為了一次執行的函式簡易寫法

(async() => {
    try{
        let data = await p;
        console.log("await 讀檔正確", data);
    }catch(e){
        console.error(e);
    }
})();

// p
// .then((data)=>{
//     console.log("Promise版本成功", data);
// })
// .catch((err)=>{
//     console.error(err);
// })

