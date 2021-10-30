let dowork = function(job, timer, cb){
    setTimeout(()=>{
        let dt = new Date();
        cb (null, `完成工作 ${job} at ${dt.toISOString()}`)
    },timer)
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

dowork("洗澡", 3000, function(err, data){
    if (err){
        console.error(err);
    }else{
        console.log(data);
        dowork("看電影", 5000, function(err, data){
            if (err){
                console.error(err);
            }else{
                console.log(data);  
                dowork("睡覺", 3000, function(err, data){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(data);
                    }
                })              
            }
        })
    }
})

