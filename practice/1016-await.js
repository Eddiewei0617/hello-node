// let dowork = function(job, timer, isOK){
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             let dt = new Date();
//             if(isOK){
//                 resolve(`完成工作 ${job} at ${dt.toISOString()}`);
//             }else{
//                 reject("失敗了啦!");
//             }            
//         }, timer)
//     })
// };

// async function allWorks(){
//     let work1 = await dowork("泡咖啡", 2000, true);
//     console.log(work1);

//     let work2 = await dowork("寫作業", 2000, true);
//     console.log(work2);

//     let work3 = await dowork("洗衣服", 2000, true);
//     console.log(work3);
// }
//  allWorks()

// let dt = new Date();
// console.log(`開始工作 at ${dt.toISOString()}`);

// dowork("泡咖啡", 2000, true)
// .then((data)=>{
//     console.log("fulfilled" + data); //出來泡咖啡
//     return dowork("寫作業", 2000, true);
// })
// .then((data)=>{
//     console.log("fulfilled" + data); //出來寫作業
//     return dowork("洗衣服", 2000, true);
// })
// .then((data)=>{
//     console.log("fulfilled" + data); //出來洗衣服
// })
// .catch((err)=>{         //catch 會捕捉被否決的promise，因此上面不管哪裡出現錯誤，catch總能抓到
//     console.error("rejected" + err);
// })

// ----------------------------------------------------------------

const fs = require ("fs");

function readfilePractice(){
    return new Promise((resolve, reject) => {
        fs.readFile("input.txt", "utf-8", (err, data) => {
            if (err){
                reject(err);
            }else{
                resolve(data)
            }
        })
    })
}

// function正常寫法
// async function readfileGo (){
//     let gogo = await readfilePractice();
//     console.log("await的方法readfile :", gogo);
// }
// readfileGo()


// function箭頭函式一次呼叫執行
(async() => {
    try{
        let gogo = await readfilePractice();
        console.log("await的方法readfile :", gogo);
    }catch(e){
        console.error(e);
    }
})()