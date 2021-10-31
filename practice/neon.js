let html = document.querySelector("html");    

    let doWork = function (job, timer, isOk) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (isOk) {
                    resolve(job)
                } else {
                    reject("有顏色錯誤囉!!!")
                }
            }, timer)
        })
    }
   
    // promise版本
    // doWork("red", 3000, true)
    //     .then((data) => {
    //         // console.log(data);  // color1
    //         html.style.backgroundColor = "red"
    //         return doWork("orange", 3000, true)
    //     })
    //     .then((data) => {
    //         html.style.backgroundColor = "orange"
    //         return doWork("yellow", 3000, true)
    //     })
    //     .then((data) => {
    //         html.style.backgroundColor = "yellow"
    //         return doWork("green", 3000, true)
    //     })
    //     .then((data) => {
    //         html.style.backgroundColor = "green"
    //         return doWork("blue", 3000, true)
    //     })
    //     .then((data) => {
    //         html.style.backgroundColor = "blue"
    //         return doWork("indigo", 3000, true)
    //     })
    //     .then((data) => {
    //         html.style.backgroundColor = "indigo"
    //         return doWork("purple", 3000, true)
    //     })
    //     .then((data) => {
    //         html.style.backgroundColor = "purple"            
    //     })
    //     .catch((e)=>{
    //         console.error(e);
    //     })


    // async|await 版本
    async function colorChange(){
        try{
        await doWork("red", 3000, true);
        html.style.backgroundColor = "red";

        await doWork("orange", 3000, true);
        html.style.backgroundColor = "orange";

        await doWork("yellow", 3000, true);
        html.style.backgroundColor = "yellow";

        await doWork("green", 3000, true);
        html.style.backgroundColor = "green";

        await doWork("blue", 3000, true);
        html.style.backgroundColor = "blue";

        await doWork("indigo", 3000, true);
        html.style.backgroundColor = "indigo";

        await doWork("purple", 3000, true);
        html.style.backgroundColor = "purple";
        } catch(e){
            console.error(e);
        }        
    }

    colorChange()




