const fs = require("fs");

// promise版
function readFilePromise (){
    return new Promise((resolve, reject) =>{
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
}

readFilePromise()
.then((data)=>{
    console.log("Promise版本成功", data);
})
.catch((err)=>{
    console.error(err);
})


// callback版
// fs.readFile("input.txt", "utf-8", (err, data) => {
//     if (err){
//         console.error("發生錯誤囉", err);
//     }else{
//         console.log("拿到資料:", data);
//     }
// } )