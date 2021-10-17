const axios = require("axios");

let format = "json";
let date = "20211017";
let stockCode = "2330";

async function crawlerAwait(){
    try{
        let res = await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY?",{
            params:{
                response: format,
                date: date,
                stockNo: stockCode 
            }
        });
        console.log(res.data);
    }catch(err){
        console.error(err);
    }    
}
crawlerAwait();