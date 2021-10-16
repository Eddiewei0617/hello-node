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

readfilePractice()
.then((data)=>{
    console.log("各位觀眾", data);
})
.catch((err) => {
    console.error(err);
})